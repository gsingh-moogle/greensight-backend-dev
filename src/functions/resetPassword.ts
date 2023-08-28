import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
// Import necessary modules and libraries
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
const secretKey = process.env.JWT_TOKEN;
import { sequelizeInstances, masterDbConnection } from "../db_connection/sequelize";
// Import the function that encrypts the response.

import bcrypt = require("bcrypt");
import { generateResponse } from '../helper/response';


const createOrUpdateUser = (values: { [x: string]: any; }, condition: { user_id: any; }) => {
    masterDbConnection.models.UserOtp.findOne({ where: condition }).then(function (obj) {
            // update
            if (obj) return obj.update(values);
            // insert
            return masterDbConnection.models.UserOtp.create(values);
        });
    };

export async function resetPassword(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const requestBody = await request.text();
        const bodyData = JSON.parse(requestBody);
        
        const email: string = bodyData.email || "";

        // Check if email is provided
        if (!email) {
            return generateResponse(400, false, "Email is required.");
        }

        // Find the user based on the provided email
        let user: any = await masterDbConnection.models.User.findOne({
            where: {
                email: email,
            },
        });

        if (user) {
            // Generate a verification code and send it to the user's email
            let verificationCode = Math.floor(100000 + Math.random() * 900000);
            verificationCode = 903412;
            let whereCondition = {
                user_id: user.id,
            };
            let updateValues = {
                user_id: user?.id,
                otp: verificationCode,
                status: 0,
            };
            createOrUpdateUser(updateValues, whereCondition);
            
            // Send the verification code to the user's email
            const emailContent = `Your verification code is: ${verificationCode}`;
            // Send the email to the user's email address

            return generateResponse(200, true, "Verification code sent.", {});
        } else {
            return generateResponse(404, false, "User not found.");
        }
    } catch (err) {
        return generateResponse(500, false, "An error occurred.");
    }
};

app.http('resetPassword', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: resetPassword
});


