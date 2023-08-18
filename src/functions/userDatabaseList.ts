
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
        const database = await Company.findAll();
        let data = Company.getTableName()
        context.log(data, "table name")
        const test = sequelize("green_sight")
        // test.query('show tables').then(function (rows) {
        //     context.log(JSON.stringify(rows), "check row ");
        // });
        // const sequelized = await sequelize("Lowes")
        // sequelized.query('show tables').then(function (rows) {
        //     console.log(JSON.stringify(rows), "check row");
        // });
        result = { status: true, message: "Database  fetched successfully.", data: database };
        return {
            status: 200, // OK
            body:JSON.stringify(result), // encrypt the response 
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*" // Allow cross-origin requests
            }
        };
        // Get the request body and parse it as JSON.
        // const requestBody = await request.text();
        // const bodyData = JSON.parse(requestBody);

        // if (bodyData.user_id) {

        //     const database = Company.findAll();
        //     // Filter the database list based on the provided user_id and map it to a new format.
        //     const databaseTable = dbList?.filter((db: any) => db.user_id == bodyData.user_id).map((i) => ({
        //         name: i?.db_name,
        //         id: i?.db_id
        //     }));

        //     // Prepare the successful response.
        //     result = { status: true, message: "Database  fetched successfully.", data: database };
        //     return {
        //         status: 200, // OK
        //         body: JSON.stringify(result), // encrypt the response 
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Access-Control-Allow-Origin": "*" // Allow cross-origin requests
        //         }
        //     };

        // } else {
        //     // Prepare the response for unauthorized access.
        //     result = { status: false, message: "You are not authorized" };
        //     return {
        //         status: 400, // Bad Request
        //         body: encryptDataFunction(result), // encrypt the response 
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Access-Control-Allow-Origin": "*" // Allow cross-origin requests
        //         }
        //     };
        // }
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
