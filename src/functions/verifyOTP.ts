// Import necessary modules and libraries
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as crypto from "crypto-js";

// Import the function that encrypts the response.
import { encryptDataFunction } from "../helper/encryptResponseFunction";

// Main function to handle OTP verification requests
export async function verifyOTP(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    // Log the processing of the HTTP request
    context.log(`Http function processed request for url "${request.url}"`);
    
    // Read the OTP details from the request body
    const otpDetails = await request.text();

    // Sample OTP for demonstration (replace with your actual OTP validation logic)
    let otpMatch: string = '903412'

    let result; // Initialize a variable to hold the response data
    
    // Sample user data for authentication (can be replaced with a database query)
    let data = [
        { email: "manmeet.narula@greensight.ai", password: "ndDKycNN3U1ezUB" },
        { email: "vermaganesh@greensight.ai", password: "K_dpgCrAmvYtJ1c", phone: "9034129736" }
    ];

    try {
        // Parse the request body as JSON
        const userReq = JSON.parse(otpDetails);

        // Extract email and OTP from the parsed user request
        const email: string = userReq.email || '';
        const otp: string = userReq.otp || '';
        let token: string = "fabcdefghijkl123mnop"; // Sample token for authorization

        // Check if email and OTP are provided
        if (!email || !otp) {
            result = { status: false, message: "Email and OTP both are required" };
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

        if (user && user?.phone) {
            if (otpMatch === otp) {
                // OTP matches, generate and assign a token for authorization
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
            } else {
                // Invalid OTP
                result = { status: false, message: "Invalid OTP." };
                return {
                    status: 401, // Unauthorized
                    body: encryptDataFunction(result),
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                };
            }
        }

        // User not found or phone not provided
        result = { status: false, message: "Invalid email or phone." };
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

// Define an HTTP endpoint named 'verifyOTP'
app.http('verifyOTP', {
    methods: ['GET', 'POST'], // Allow both GET and POST requests
    authLevel: 'anonymous', // No authentication required
    handler: verifyOTP // Use the 'verifyOTP' function to handle requests
});
