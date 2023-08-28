// Import necessary modules and libraries
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import * as jwt from "jsonwebtoken";
const secretKey = process.env.JWT_TOKEN;
import { sequelizeInstances, masterDbConnection } from "../db_connection/sequelize";
// Import the function that encrypts the response.

import bcrypt = require("bcrypt");
import { sendVerificationCode } from '../helper/twilio';
import { generateResponse } from '../helper/response';


const createOrUpdateUser = (values: { [x: string]: any; }, condition: { user_id: any; }) => {
    masterDbConnection.models.UserOtp.findOne({ where: condition }).then(function (obj) {
            // update
            if (obj) return obj.update(values);
            // insert
            return masterDbConnection.models.UserOtp.create(values);
        });
    };

// Main function to handle login requests
export async function login(
    request: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {
    let result; // Initialize a variable to hold the response data
    try {
        // Read the request body
        const requestBody = await request.text();
        const bodyData = JSON.parse(requestBody);

        // Extract email and password from the parsed bodyData
        const email: string = bodyData.email || "";
        const password: string = bodyData.password || "";

        // Check if email and password are provided
        if (!email || !password) {
            return generateResponse(401,false,"Email and Password both are required")
        }

        // Define a type for user data
        interface UserData {
            email?: string;
            password?: string;
            phone_number?: string;
            token?: any;
        }
        // Find the user based on the provided email
        let user: any = await masterDbConnection.models.User.findOne({
            where: {
                email: email,
            },
            include: [
                {
                    model: masterDbConnection.models.Profile,
                    attributes: [
                        "first_name",
                        "last_name",
                        "country_code",
                        "image",
                        "phone_number",
                    ],
                },
                {
                    model: masterDbConnection.models.Company,
                    attributes: [
                        "name",
                        "db_alias",
                        "logo"
                    ],
                },
            ],
        });
        if (user) {
            if (user && user?.profile?.phone_number) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    // Password matches and user has a phone number
                    let code = Math.floor(100000 + Math.random() * 900000);
                    code = 903412;
                    let whereCondition = {
                        user_id: user.id,
                    };
                    let updateValues = {
                        user_id: user?.id,
                        otp: code,
                        status: 0,
                    };
                    createOrUpdateUser(updateValues, whereCondition);
                    let messageData = {
                        message: 'Your verification code is :' + code,
                        phone_number: `${user.profile.country_code}${user.profile.phone_number}`
                    }
                    let sendMessage = true;//await sendVerificationCode(messageData);
                    if (sendMessage) {
                        const result = {
                            otp: true,
                            email: user.email,
                            code: code,
                            phone_number: user?.profile?.phone_number
                        };
                        return generateResponse(200,true,"Verification code send to registered phone number.",result)
                    } else {
                        return generateResponse(401,false,"Error while sending verification code to registered phone number.")
                    }

                } else {
                    // Password doesn't match
                    return generateResponse(401,false,"Invalid credentials.");
                }
            } else {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    //Password matches, generate and assign a token for authorization
                    let token = jwt.sign(
                        {
                            data: user,
                        },
                        secretKey,
                        { expiresIn: "1h" }
                    );
                    const result = {
                        id:user?.id,
                        email: user.email, 
                        token: token, 
                        name:user?.name,
                        role:user?.role,
                        profile:user?.profile,
                    };
                    return generateResponse(200,true,"User Logged In Successfully.",result);
                } else {
                    // Password doesn't match
                    return generateResponse(401,false,"Invalid credentials.");
                    
                }
            }
        }
        // User not found or password incorrect
        return generateResponse(401,false,"Invalid email or password.");
    } catch (err) {
        // Handle errors and return a response
        return generateResponse(400,false,err.message);
    }
}

// Define an HTTP endpoint named 'login'
app.http('login', {
    methods: ['GET', 'POST'], // Allow both GET and POST requests
    authLevel: 'anonymous', // No authentication required
    handler: login // Use the 'login' function to handle requests
});
