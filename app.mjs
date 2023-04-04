`use strict`;

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ssl = require('ssl-checker');

//The handler function for use with AWS API Gateway.  Exports the array with SSL expirations
export const handler = async (event) => {
    let responseCode = 200;

    //create const with params from the query string and splits the URL param by comma into an array
    const params = event.queryStringParameters;
    const domain = params.url.split(',');
    
    //uses ssl-checker module to generate SSL info.  
    //Promise.all to make all requests simultaneously and push into the expirations array
    let expirations = [];
    await Promise.all(domain.map(fn => ssl(fn, { method: "GET", port: 443 }).then((values) =>
        expirations.push(values)
    )));
    
    //construct the body of the response
    let responseBody = {
        message: expirations
    };
    
    //format response for the AWS Gateway. Stringify the responseBody and send in the response
    let response = {
        statusCode: responseCode,
        headers: {
            "x-custom-header" : "Hello Jose"
        },
        body: JSON.stringify(responseBody)
    };
    console.log("response: " + JSON.stringify(response));
    return response;
};