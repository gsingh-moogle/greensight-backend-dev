// Import necessary modules and libraries
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as crypto from "crypto-js";

// Import the function that encrypts the response.
import { encryptDataFunction } from "../helper/encryptResponseFunction";


// Main function to handle login requests
export async function login(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    // Log the processing of the HTTP request
    context.log(`Http function processed request for url "${request.url}"`);

    let result; // Initialize a variable to hold the response data

    // Sample user data for authentication (can be replaced with a database query)
    let data = [
        { email: "manmeet.narula@greensight.ai", password: "ndDKycNN3U1ezUB" },
        { email: "vermaganesh@greensight.ai", password: "K_dpgCrAmvYtJ1c", phone: "9034129736" }
    ];

    try {
        // Read the request body
        const requestBody = await request.text();

        // Parse the request body as JSON
        const bodyData = JSON.parse(requestBody);

        // Extract email and password from the parsed bodyData
        const email: string = bodyData.email || '';
        const password: string = bodyData.password || '';
        let token: string = "fabcdefghijkl123mnop"; // Sample token for authorization

        // Check if email and password are provided
        if (!email || !password) {
            result = { status: false, message: "Email and Password both are required" };
            return {
                status: 401, // Unauthorized
                body: encryptDataFunction(result),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            };
        }

        // Define a type for user data
        interface UserData {
            email: string;
            password: string;
            phone?: string;
            token?: any;
        }

        // Find the user based on the provided email
        let user: UserData | undefined = data.find((item) => item.email === email);

        if (user) {
            if (user?.phone && user?.password === password) {
                // User has a phone number and password matches
                result = { status: true, message: "Verification code sent to registered phone number.", otp: true, data: { email: user.email, phone: user.phone } };
                return {
                    status: 200, // OK
                    body: encryptDataFunction(result),
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                };
            } else if (user?.password === password) {
                // Password matches, generate and assign a token for authorization
                user.token = token;
                result = { status: true, message: "User Logged In Successfully.", data: { email: user.email, token: user.token } };
                return {
                    status: 200, // OK
                    body: encryptDataFunction(result),
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                };
            }
        }

        // User not found or password incorrect
        result = { status: false, message: "Invalid email or password." };
        return {
            status: 401, // Unauthorized
            body: encryptDataFunction(result),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };

    } catch (err) {
        // Handle errors and return a response
        result = { status: false, message: err.message };
        return {
            status: 400, // Bad Request
            body: encryptDataFunction(result),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
    }
};

// Define an HTTP endpoint named 'login'
app.http('login', {
    methods: ['GET', 'POST'], // Allow both GET and POST requests
    authLevel: 'anonymous', // No authentication required
    handler: login // Use the 'login' function to handle requests
});
