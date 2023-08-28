import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

// Import the function that encrypts the response.
import { encryptDataFunction } from "../helper/encryptResponseFunction";
import sequelize from "../db_connection/db_connect";
import Company from "../models/Company";
import jwtMiddleware from "../middleware/auth";


// Define the databaseTable function that handles the HTTP request.
export async function databaseTable(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    let result;

    try {
        // Authenticate the user using the  middleware.
        let authenticate = await jwtMiddleware(request, context);

        // If authentication fails(status code 401), return the failure response.
        // if (authenticate.status == 401) {
        //     return authenticate;
        // }
        // else {
            // Get the request body and parse it as JSON.
            const requestBody = await request.text();
            const bodyData = JSON.parse(requestBody);

            if (bodyData?.db_id) {
                // Find the company (database) based on the provided ID.
                const database = await Company.findOne({
                    where: { id: bodyData?.db_id }
                });

                // Get details of the specified database using the sequelize function.
                const databaseDetail = await sequelize(database?.name)
                const queryInterface = databaseDetail.getQueryInterface();
                let schemas = await queryInterface.showAllSchemas();

                // Prepare the database table information.
                let databaseTable = [];
                Object.entries(schemas).map((schema) => {
                    databaseTable.push({ tableName: schema[1], t_id: "t_id" });
                })

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
            }
        // }
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
