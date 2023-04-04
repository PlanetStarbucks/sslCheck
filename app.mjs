`use strict`;

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ssl = require('ssl-checker');

export const handler = async (event) => {
    let responseCode = 200;
    const params = event.queryStringParameters;
    const domain = params.url.split(',');
    
    let expirations = [];
    await Promise.all(domain.map(fn => ssl(fn, { method: "GET", port: 443 }).then((values) =>
        expirations.push(values)
    )));
    
    let responseBody = {
        message: expirations
    };
    
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