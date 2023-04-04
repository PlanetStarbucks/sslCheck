This module is for use with AWS Lambda and AWS API Gateway.  Gateway is configured to use the Lambda function, passing a comma separated list of URLs as a query param.  The function returns an array with the cert expirations of each URL.

To use, zip the repository and upload into a new function in Lambda.  Configure API Gateway to send GET requests to the function.  

Use with long lists of URLs may necessitate increasing the timeout of the Lambda function.  
