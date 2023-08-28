import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

// Import the function that encrypts the response.
import { encryptDataFunction } from "../helper/encryptResponseFunction";
import Company from "../models/Company";
import sequelize from "../db_connection/db_connect";

// Import the JSON file containing the database list and table from  helper .
const dbList = require("../helper/db");

// Set the secret key for encryption.

// Define the databaseTableColumn function that handles the HTTP request.
export async function databaseTableColumn(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    let result;

    try {
        // Get the request body and parse it as JSON.
        const requestBody = await request.text();
        const bodyData = JSON.parse(requestBody);
        let databaseTableColumn = [];
        console.log("Hello hnji")
        const database = await Company.findOne({
            where: { id: bodyData?.db_id }
        });
        console.log(database, "check database")
        // console.log("test")
        // const checkTableColumn = await Company.rawAttributes;
        // console.log(checkTableColumn, "checkTableColumn")

        // Get details of the specified database using the sequelize function.
        const databaseDetail = await sequelize("Lowes")
        console.log(databaseDetail, "databaseDetail")
        async function getTableColumns(tableName: string) {
            console.log(tableName,"tableName")
            const queryInterface = databaseDetail.getQueryInterface();
            const columns = await queryInterface.describeTable(tableName);
            console.log(columns, "check column")
            return columns;
        }

        const dynamicTableName = 'schneider_lowes';
        getTableColumns(dynamicTableName)
            .then(columns => {
                console.log(`Columns for table ${dynamicTableName}:`, columns);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        if (bodyData.db_id && bodyData.user_id && bodyData.table_id) {

            // let check = databaseDetail.define
            // console.log(check, "hnji")
            // Filter the dbList based on user_id and db_id, and map matching tables.
            dbList?.filter((db: any) => {
                db?.tables?.map((table: any) => {
                    // check table_id and of database and filter out the coloum of the table and push them in the databaseTableColumn array 
                    bodyData.table_id?.map((table_id: any) => {
                        if (db?.user_id == bodyData.user_id && db?.db_id == bodyData.db_id && table?.t_id == table_id) {
                            databaseTableColumn.push(table);
                        }
                    });
                });
            });
            // Prepare the successful response.
            result = { status: true, message: "Database table column fetched successfully.", data: databaseTableColumn };
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

// Define an HTTP endpoint named 'databaseTableColumn' with specific configurations.
app.http('databaseTableColumn', {
    methods: ['GET', 'POST'], // Allow both GET and POST requests.
    authLevel: 'anonymous',   // Allow anonymous access without authentication.
    handler: databaseTableColumn // Specify the function to handle the HTTP requests.
});
