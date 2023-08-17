// Import necessary modules and libraries
import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import sequelize from "../db_connection/db_connect";

// Import the function that encrypts the response.
import { encryptDataFunction } from "../helper/encryptResponseFunction";
import User from "../models/User";
import Profile from "../models/Profile";

//const bcrypt = require("bcrypt");

// Main function to handle login requests
export async function login(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  // Log the processing of the HTTP request
  context.log(`Http function processed request for url "${request.url}"`);

  let result; // Initialize a variable to hold the response data

  // Sample user data for authentication (can be replaced with a database query)
  let data = [
    { email: "manmeet.narula@greensight.ai", password: "ndDKycNN3U1ezUB" },
    {
      email: "vermaganesh@greensight.ai",
      password: "K_dpgCrAmvYtJ1c",
      phone: "9034129736",
    },
  ];


  try {
    const sequelizeConnection = sequelize();
    
    // Read the request body
    const requestBody = await request.text();

    // Parse the request body as JSON
    const bodyData = JSON.parse(requestBody);

    // Extract email and password from the parsed bodyData
    const email: string = bodyData.email || "";
    const password: string = bodyData.password || "";
    let token: string = "fabcdefghijkl123mnop"; // Sample token for authorization
    
    // Check if email and password are provided
    if (!email || !password) {
      result = {
        status: false,
        message: "Email and Password both are required",
      };
      return {
        status: 401, // Unauthorized
        body: JSON.stringify(result), //encryptDataFunction(result),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
    }

    // Define a type for user data
    interface UserData {
      id?:number,
      email?: string;
      password?: string;
      phone_number?: string;
      token?: any;
    }

    // Find the user based on the provided email
    //let user: UserData | undefined = data.find((item) => item.email === email);

    let user: User | undefined = await User.findOne({
      where: {
        email: email,
      }
    });

    // if (user) {
    //   console.log('User:', user.toJSON());
    //   if (user.profile) {
    //     console.log('Profile:', user.profile.toJSON());
    //   }
    // }

    // Assuming 'user' contains the user object and 'password' is the input password

    // if (user) {
    //     if (user?.phone && user?.password === password) {
    //         // User has a phone number and password matches
    //         result = { status: true, message: "Verification code sent to registered phone number.", otp: true, data: { email: user.email, phone: user.phone } };
    //         return {
    //             status: 200, // OK
    //             body: encryptDataFunction(result),
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Access-Control-Allow-Origin": "*"
    //             }
    //         };
    //     } else if (user?.password === password) {
    //         // Password matches, generate and assign a token for authorization
    //         user.token = token;
    //         result = { status: true, message: "User Logged In Successfully.", data: { email: user.email, token: user.token } };
    //         return {
    //             status: 200, // OK
    //             body: encryptDataFunction(result),
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Access-Control-Allow-Origin": "*"
    //             }
    //         };
    //     }
    // }

    if (user) {
      context.log("level 22222222222222222222222", user)
      // let userProfile : UserData | undefined = await Profile.findOne({
      //   where: {
      //     id: user?.id,
      //   },
      // });
      context.log("level 3333333333 userProfile", user)
      // if (user && user?.phone_number) {
      //   bcrypt.compare(password, user.password, (err, passwordMatch) => {
      //     if (err) {
      //       return {
      //         status: 500, // Internal Server Error
      //         body: JSON.stringify({
      //           error: "An error occurred while comparing passwords.",
      //         }),
      //         headers: {
      //           "Content-Type": "application/json",
      //           "Access-Control-Allow-Origin": "*",
      //         },
      //       };
      //     }

      //     if (passwordMatch) {
      //       // Password matches and user has a phone number
      //       const result = {
      //         status: true,
      //         message: "Verification code sent to registered phone number.",
      //         otp: true,
      //         data: { email: user.email, phone: user.phone_number },
      //       };

      //       return {
      //         status: 200, // OK
      //         body: encryptDataFunction(result),
      //         headers: {
      //           "Content-Type": "application/json",
      //           "Access-Control-Allow-Origin": "*",
      //         },
      //       };
      //     } else {
      //       // Password doesn't match
      //       return {
      //         status: 401, // Unauthorized
      //         body: JSON.stringify({ error: "Invalid credentials." }),
      //         headers: {
      //           "Content-Type": "application/json",
      //           "Access-Control-Allow-Origin": "*",
      //         },
      //       };
      //     }
      //   });
      // } else {
      //   bcrypt.compare(password, user.password, (err, passwordMatch) => {
      //     if (err) {
      //       return {
      //         status: 500, // Internal Server Error
      //         body: JSON.stringify({
      //           error: "An error occurred while comparing passwords.",
      //         }),
      //         headers: {
      //           "Content-Type": "application/json",
      //           "Access-Control-Allow-Origin": "*",
      //         },
      //       };
      //     }

      //     if (passwordMatch) {
      //       // Password matches, generate and assign a token for authorization

      //       user.token = token;

      //       const result = {
      //         status: true,
      //         message: "User Logged In Successfully.",
      //         data: { email: user.email, token: user.token },
      //       };

      //       return {
      //         status: 200, // OK
      //         body: encryptDataFunction(result),
      //         headers: {
      //           "Content-Type": "application/json",
      //           "Access-Control-Allow-Origin": "*",
      //         },
      //       };
      //     } else {
      //       // Password doesn't match
      //       return {
      //         status: 401, // Unauthorized
      //         body: JSON.stringify({ error: "Invalid credentials." }),
      //         headers: {
      //           "Content-Type": "application/json",
      //           "Access-Control-Allow-Origin": "*",
      //         },
      //       };
      //     }
      //   });
      // }
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
    result = { status: false,changef:"dsfsdfsdfsdf", message: err.message };
    return {
      status: 400, // Bad Request
      body: JSON.stringify(result), //encryptDataFunction(result),
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
