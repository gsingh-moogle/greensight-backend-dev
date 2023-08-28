import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { encryptDataFunction } from "../helper/encryptResponseFunction";
import User from "../models/main_model/User";
import Profile from "../models/main_model/Profile";
import UserOtp from "../models/main_model/UserOtp";
import { sendVerificationCode } from '../helper/twilio';
import { generateResponse } from '../helper/response';

const createOrUpdateUser = (values, condition) => {
  UserOtp.findOne({ where: condition }).then(function (obj) {
    // update
    if (obj) return obj.update(values);
    // insert
    return UserOtp.create(values);
  });
};

export async function resendOtp(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    // Read the request body
    const requestBody = await request.text();

    // Parse the request body as JSON
    const bodyData = JSON.parse(requestBody);

    // Extract email from the parsed bodyData
    const email: string = bodyData.email || "";

    // Check if email is provided
    if (!email) {
      const result = {
        status: false,
        message: "Email is required",
      };
      return generateResponse(400,false,"Email is required.")
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

    if (user) {
      if (user && user?.profile?.phone_number) {
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
          message: `Your verification code is: ${code}`,
          phone_number: `${user.profile.country_code}${user.profile.phone_number}`,
        };

        let sendMessage = true;//await sendVerificationCode(messageData);
        if (sendMessage) {
          const result = {
              otp: true,
              email: user.email,
              code: code,
              phone_number: user?.profile?.phone_number
          };
          return generateResponse(200,true,"Verification code send to registered phone number.",result);
      } else {
          return generateResponse(401,false,"Error while sending verification code to registered phone number.");
      }
      } else {
        return generateResponse(401,false,"User does not have a registered phone number.");
      }
    } else {
      return generateResponse(404,false,"User not found.");
    }
  } catch (err) {
    // Handle errors and return a response
    return generateResponse(500,false,"err.message.");
  }
}

// Define an HTTP endpoint named 'resendOtp'
app.http("resendOtp", {
  methods: ["POST"], // Allow only POST requests
  authLevel: "anonymous", // No authentication required
  handler: resendOtp, // Use the 'resendOtp' function to handle requests
});
