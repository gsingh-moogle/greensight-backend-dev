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
import { encryptDataFunction } from "../helper/encryptResponseFunction";
import Profile from "../models/main_model/Profile";
import UserOtp from "../models/main_model/UserOtp";
import bcrypt = require("bcrypt");
import { sendVerificationCode } from '../helper/twilio';

const createOrUpdateUser = (values: { [x: string]: any; }, condition: { user_id: any; }) => {
  
  sequelizeInstances.main.models.UserOtp.findOne({ where: condition }).then(function (obj) {
    // update
    if (obj) return obj.update(values);
    // insert
    return sequelizeInstances.main.models.UserOtp.create(values);
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
    // Parse the request body as JSON
    const bodyData = JSON.parse(requestBody);

    // Extract email and password from the parsed bodyData
    const email: string = bodyData.email || "";
    const password: string = bodyData.password || "";

    // Check if email and password are provided
    if (!email || !password) {
      result = {
        status: false,
        message: "Email and Password both are required",
      };
      return {
        status: 401, // Unauthorized
        body: encryptDataFunction(result),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
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
        role: 1,
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
          console.log('messageData', messageData);
          let sendMessage = await sendVerificationCode(messageData);
          if (sendMessage) {
            const result = {
              status: true,
              message: "Verification code send to registered phone number.",
              otp: true,
              code: code,
              data: {
                email: user.email,
                phone_number: user?.profile?.phone_number,
              },
            };

            return {
              status: 200, // OK
              body: encryptDataFunction(result),
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            };
          } else {
            return {
              status: 401, // Unauthorized
              body: encryptDataFunction({ error: "Error while sending verification code to registered phone number." }),
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            };
          }

        } else {
          // Password doesn't match
          return {
            status: 401, // Unauthorized
            body: encryptDataFunction({ error: "Invalid credentials." }),
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          };
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
            status: true,
            message: "User Logged In Successfully.",
            data: { email: user.email, token: token, user },
          };

          return {
            status: 200, // OK
            body: encryptDataFunction(result),
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          };
        } else {
          // Password doesn't match
          return {
            status: 401, // Unauthorized
            body: encryptDataFunction({ error: "Invalid credentials." }),
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          };
        }
      }
    }

    // User not found or password incorrect
    result = { status: false, message: "Invalid email or password." };
    return {
      status: 401, // Unauthorized
      body: encryptDataFunction(result),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (err) {
    // Handle errors and return a response
    result = { status: false, message: err.message };
    return {
      status: 400, // Bad Request
      body: encryptDataFunction(result),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
}

// Define an HTTP endpoint named 'login'
app.http("login", {
  methods: ["GET", "POST"], // Allow both GET and POST requests
  authLevel: "anonymous", // No authentication required
  handler: login, // Use the 'login' function to handle requests
});
