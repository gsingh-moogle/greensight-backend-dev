
import * as crypto from "crypto-js";
// Import the secret key from the constant module.
const constant = require("../helper/constant");
let isDev = true;


export const encryptDataFunction = (data) => {
    let secret_key = constant.secret_key
    if (!isDev) {
        // Encrypt the JSON-stringified data using AES encryption and the secret key.
        const encryptedData = crypto.AES.encrypt(JSON.stringify(data), secret_key).toString();
        // Return the encrypted data as a string.
        return encryptedData;
    } else {
        const encryptedData = JSON.stringify(data).toString();

        return encryptedData;
    }
}