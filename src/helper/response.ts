import {encryptDataFunction} from './encryptResponseFunction'
export function generateResponse(code:number,status:boolean | string | Number, message:string, result={}, headers = {}) {
    let encryptData = encryptDataFunction(result);
    const response = {
        status: code,
        body: JSON.stringify({
            status:status,
            message:message,
            data:encryptData
    }),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            ...headers // Merge any additional headers provided
        }
    };
    return response;
}
