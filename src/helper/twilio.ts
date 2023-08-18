'use strict';
require("dotenv").config();
const accountSid = Object.freeze(process.env.LIVE_ACCOUNT_SID); //account SID
const authToken = Object.freeze(process.env.LIVE_AUTH_TOKEN); //auth token
const twilioPhoneNumber = Object.freeze(process.env.LIVE_TWILIO_NUMBER); //auth token
const client = require('twilio')(accountSid, authToken);
export let sendVerificationCode =(data) => { 
    //generat auth tag for uniqueness...
    return client.messages  .create({
        body: data.message,
        from: twilioPhoneNumber,
        to: data.phone_number})
    .then(function(message){
        return message.sid;
    }).catch(
        (e)=>{
            console.log(e.message);
            return;
        }
    );
}