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
//const sequelizeConnection = sequelize(null);
import bcrypt = require("bcrypt");

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
    let token: string = "fabcdefghijkl123mnop"; // Sample token for authorization

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
    let user: User | undefined = await User.findOne({
      where: {
        email: email,
        role:1
      },
      include: [
        {
          model: Profile,
          attributes: [
            "first_name",
            "last_name",
            "country_code",
            "image",
            "phone_number",
          ],
        },
      ],
    });


    if (user) {
      if (user && user?.profile?.phone_number) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          // Password matches
          context.log("/Password matches..");
          // Password matches and user has a phone number
          const result = {
            status: true,
            message: "Verification code sent to registered phone number.",
            otp: true,
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
          // Password doesn't match
          context.log("//Password doesn't match");
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
          context.log("/Password matches..else");
          //Password matches, generate and assign a token for authorization

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
          // ...rest of your code...
          context.log("//Password doesn't match..else");
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
