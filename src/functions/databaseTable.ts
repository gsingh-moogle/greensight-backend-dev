import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

// Import the function that encrypts the response.
import { encryptDataFunction } from "../helper/encryptResponseFunction";



// Import the JSON file containing the database list of table and column from  helper function.
const dbList = require("../helper/db");

// Define the databaseTable function that handles the HTTP request.
export async function databaseTable(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    let result;

    try {
        // Get the request body and parse it as JSON.
        const requestBody = await request.text();
        const bodyData = JSON.parse(requestBody);

        if (bodyData.db_id && bodyData.user_id) {
            let databaseTable = [];

            // Filter the dbList based on user_id and db_id.
            dbList?.filter((db: any) => {
                if (db?.user_id == bodyData.user_id && db?.db_id == bodyData.db_id) {
                    if (db?.tables) {
                        // Map tables and push them into the databaseTable array.
                        db?.tables?.map(({ tableName, t_id }) => {
                            databaseTable.push({ tableName: tableName, t_id: t_id });
                        });
                    }
                }
            });

            // Prepare the successful response.
            result = { status: true, message: "Database table fetched successfully.", data: databaseTable };
            return {
                status: 200, // OK
                body: encryptDataFunction(result),
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
                body: encryptDataFunction(result),
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
            body: encryptDataFunction(result),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*" // Allow cross-origin requests
            }
        };
    }
}

// Define an HTTP endpoint named 'databaseTable' with specific configurations.
app.http('databaseTable', {
    methods: ['GET', 'POST'], // Allow both GET and POST requests.
    authLevel: 'anonymous',   // Allow anonymous access without authentication.
    handler: databaseTable    // Specify the function to handle the HTTP requests.
});
