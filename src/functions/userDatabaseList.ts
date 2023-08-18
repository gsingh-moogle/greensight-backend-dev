
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

// Import the JSON file containing the database list helper function.
const dbList = require("../helper/db");
import Company from "../models/Company";

// Import the function that encrypts the response.
import { encryptDataFunction } from "../helper/encryptResponseFunction";
import sequelize from "../db_connection/db_connect";

// Define the userDatabaseList function that handles the HTTP request.
export async function userDatabaseList(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    let result;

    try {

        // Get the request body and parse it as JSON.
        // const requestBody = await request.text();
        // const bodyData = JSON.parse(requestBody);

        const database = await Company.findAll();
        const databaseTable = database?.map((i) => ({
            name: i?.name,
            id: i?.id
        }));
        console.log(databaseTable, "databaseTable")
        // Prepare the successful response.
        result = { status: true, message: "Database  fetched successfully.", data: databaseTable };
        return {
            status: 200, // OK
            body: JSON.stringify(result), // encrypt the response 
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*" // Allow cross-origin requests
            }
        };
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
