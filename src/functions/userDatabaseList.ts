
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

// Import the JSON file containing the database list helper function.
const dbList = require("../helper/db");

// Import the function that encrypts the response.
import { encryptDataFunction } from "../helper/encryptResponseFunction";

// Define the userDatabaseList function that handles the HTTP request.
export async function userDatabaseList(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    let result;

    try {
        // Get the request body and parse it as JSON.
        const requestBody = await request.text();
        const bodyData = JSON.parse(requestBody);

        if (bodyData.user_id) {
            // Filter the database list based on the provided user_id and map it to a new format.
            const databaseTable = dbList?.filter((db: any) => db.user_id == bodyData.user_id).map((i) => ({
                name: i?.db_name,
                id: i?.db_id
            }));

            // Prepare the successful response.
            result = { status: true, message: "Database  fetched successfully.", data: databaseTable };
            return {
                status: 200, // OK
                body: encryptDataFunction(result), // encrypt the response 
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*" // Allow cross-origin requests
                }
            };

        } else {
            // Prepare the response for unauthorized access.
            result = { status: false, message: "You are not authorized" };
            return {
                status: 400, // Bad Request
                body: encryptDataFunction(result), // encrypt the response 
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*" // Allow cross-origin requests
                }
            };
        }
    } catch (err) {
        // Prepare the response for error cases.
        result = { status: false, message: err.message };
        return {
            status: 400, // Bad Request
            body: encryptDataFunction(result),  // encrypt the response 
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*" // Allow cross-origin requests
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
