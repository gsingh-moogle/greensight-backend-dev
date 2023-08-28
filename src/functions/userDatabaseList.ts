import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

// Import the JSON file containing the database list helper function.
const dbList = require("../helper/db");
import Company from "../models/main_model/Company";

// Import the function that encrypts the response.
import { encryptDataFunction } from "../helper/encryptResponseFunction";

// Import the  middleware for authentication.
import jwtMiddleware from "../middleware/auth";

// Define the userDatabaseList function that handles the HTTP request.
export async function userDatabaseList(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    let result;

    try {
        // Authenticate the user using the JWT middleware.
        let authenticate = await jwtMiddleware(request, context);

        // If authentication fails (status code 401), return the failure response.
        if (authenticate.status == 401) {
            return authenticate;
        } 

        else {
        // Retrieve a list of companies (databases) from the Company model.
        const database = await Company.findAll();

        // Map the company data to extract necessary information.
        const databaseTable = database?.map((i) => ({
            name: i?.name,
            id: i?.id
        }));

        // Prepare the successful response.
        result = { status: true, message: "Database fetched successfully.", data: databaseTable };
        let data = Company.getTableName()
        context.log(data, "table name")
        result = { status: true, message: "Database  fetched successfully.", data: database };
        return {
            status: 200, // OK
            body: encryptDataFunction(result), // Encrypt the response.
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*" // Allow cross-origin requests.
            }
        };
        }
    } catch (err) {
        // Prepare the response for error cases.
        result = { status: false, message: err.message };
        return {
            status: 400, // Bad Request
            body: encryptDataFunction(result),  // Encrypt the response.
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*" // Allow cross-origin requests.
            }
        };
    }
}

// Define an HTTP endpoint named 'userDatabaseList' with specific configurations.
app.http('userDatabaseList', {
    methods: ['GET', 'POST'], // Allow both GET and POST requests.
    authLevel: 'anonymous',   // Allow anonymous access without authentication.
    handler: userDatabaseList // Specify the function to handle the HTTP requests.
});
