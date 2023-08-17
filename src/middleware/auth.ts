import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as jwt from "jsonwebtoken";
const secretKey = process.env.DB_HOST;
// Middleware function to validate JWT token
export async function jwtMiddleware(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    // Get the request body and parse it as JSON.
    const token = "dsfd";// request.headers.authorization?.split(' ')[1]; // Assuming token is in the "Authorization" header
    if (!token) {
        return {
            status: 401,
            body: "Unauthorized: Token missing"
          };
    }

    try {
        const decodedToken = jwt.verify(token, secretKey);
        const responseData = {
            message : "Authorization successful",
            token : decodedToken
        };
        // Token is valid, proceed to the next middleware or function
        request["users"] = JSON.stringify(responseData);
        return request;
    } catch (error) {
        return {
            status: 401,
            body: "Unauthorized: Invalid token"
          };
    }
};

export default jwtMiddleware;