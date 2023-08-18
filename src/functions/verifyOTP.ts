import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import sequelize from "../db_connection/db_connect";
import User from "../models/User";
import Profile from "../models/Profile";
import UserOtp from "../models/otp";
import * as jwt from "jsonwebtoken";
const secretKey = process.env.JWT_TOKEN;

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

    try {
        // Parse the request body as JSON
        const userReq = JSON.parse(otpDetails);

        // Extract email and OTP from the parsed user request
        const email: string = userReq.email || '';
        const otp: string = userReq.otp || '';

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

        if (user && user?.profile?.phone_number) {
            let condition = {
                user_id:user.id
            }
            let otpData = await UserOtp.findOne({ 
                attributes: ['otp', 'updatedAt'],
                where: condition }); 
            if(otpData){
                const currentTime = new Date();
                const otpExpirationTime = new Date(otpData.updatedAt);
                otpExpirationTime.setMinutes(otpExpirationTime.getMinutes() + 1); // OTP expires after 1 minute

                if (currentTime > otpExpirationTime) {
                    result = { status: false, message: "OTP has expired. Please request a new OTP." };
                    return {
                        status: 401, // Unauthorized
                        body: encryptDataFunction(result),
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        }
                    };
                }

                // Check if OTP matches
                if (otpData?.otp === otp) {
                    // OTP matches, generate and assign a token for authorization
                    let token = jwt.sign({
                        data: user
                      }, secretKey, { expiresIn: '1h' });
                    result = { status: true, message: "User Logged In Successfully.", data: { email: user.email, token: token,user:user } };
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
                    result = { status: false, message: "Verification code is not valid!" };
                    return {
                        status: 401, // Unauthorized
                        body: encryptDataFunction(result),
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        }
                    };
                }
            } else { 
                // Invalid OTP
                result = { status: false, message: "Verification code is not found!" };
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
    methods: ['POST'], // Allow only POST requests
    authLevel: 'anonymous', // No authentication required
    handler: verifyOTP // Use the 'verifyOTP' function to handle requests
});
