import {HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as jwt from "jsonwebtoken";
const secretKey = process.env.JWT_TOKEN;
import {sequelizeInstances, masterDbConnection} from "../db_connection/sequelize";
// Middleware function to validate JWT token
export async function jwtMiddleware(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        // Get the request body and parse it as JSON.
        const token = request.headers.get("authorization")?request.headers.get("authorization").split(" ")[1]:'';
        if (!token) {
            return {
                status: 401,
                body: "Unauthorized: Token missing"
            };
        }
        const decodedToken = jwt.verify(token, secretKey);
        // Token is valid, proceed to the next middleware or function
        console.log('decodedToken',decodedToken['data']['companies']);
        request["users"] = JSON.stringify(decodedToken);

        request["db"] = sequelizeInstances[decodedToken['data']['companies'][0]['db_alias']].models
        return {
            status: 200,
            body: "Valid token"
        };
    } catch (error) {
        console.log('error', error);
        return {
            status: 401,
            body: "Unauthorized: Invalid token"
        };
    }
};

export default jwtMiddleware;