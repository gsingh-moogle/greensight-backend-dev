import {HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as jwt from "jsonwebtoken";
const secretKey = process.env.JWT_TOKEN;
// Middleware function to validate JWT token
export async function jwtMiddleware(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    // Get the request body and parse it as JSON.
    console.log('request.headers',request.headers, "0 request",  request.headers.get("authorization"));
    // const authorizationHeader = request.headers["authorization"].split(" ")[0];
    // console.log('authorizationHeader=================>',authorizationHeader);
    const token = request.headers.get("authorization")?request.headers.get("authorization"):'';//authorizationHeader?.split(' ')[1];
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