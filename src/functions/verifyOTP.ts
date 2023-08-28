import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import User from "../models/main_model/User";
import Profile from "../models/main_model/Profile";
import UserOtp from "../models/main_model/UserOtp";
import * as jwt from "jsonwebtoken";
const secretKey = process.env.JWT_TOKEN;

// Import the function that encrypts the response.
import { encryptDataFunction } from "../helper/encryptResponseFunction";
import { generateResponse } from '../helper/response';

// Main function to handle OTP verification requests
export async function verifyOTP(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    // Log the processing of the HTTP request
    context.log(`Http function processed request for url "${request.url}"`);
    try {
        // Read the OTP details from the request body
        const otpDetails = await request.text();
        

        // Parse the request body as JSON
        const userReq = JSON.parse(otpDetails);

        // Extract email and OTP from the parsed user request
        const email: string = userReq.email || '';
        const otp: string = userReq.otp || '';

        // Check if email and OTP are provided
        if (!email || !otp) {
            return generateResponse(401,false,"Email and OTP both are required");
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
                    return generateResponse(401,false,"OTP has expired. Please request a new OTP.");
                }

                // Check if OTP matches
                if (otpData?.otp == otp) {
                    // OTP matches, generate and assign a token for authorization
                    let token = jwt.sign({
                        data: user
                      }, secretKey, { expiresIn: '1h' });
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
                    // Invalid OTP
                    return generateResponse(401,false,"Verification code is not valid!");
                }
            } else { 
                // Invalid OTP
                return generateResponse(401,false,"Verification code is not found");
            }
        
            
        }

        // User not found or phone not provided
        return generateResponse(401,false,"User not found or phone not provided");

    } catch (err) {
        // Handle errors and return a response
        return generateResponse(401,false,err.message);
    }
};

// Define an HTTP endpoint named 'verifyOTP'
app.http('verifyOTP', {
    methods: ['POST'], // Allow only POST requests
    authLevel: 'anonymous', // No authentication required
    handler: verifyOTP // Use the 'verifyOTP' function to handle requests
});
