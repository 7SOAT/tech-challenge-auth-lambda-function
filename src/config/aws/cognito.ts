import AWS = require("aws-sdk");
import { SetupEnvironments } from "../environments/config";

const {
    AWS_ACCESS_KEY_ID,
    AWS_REGION,
    AWS_SECRET_ACCESS_KEY_ID,
    AWS_SESSION_TOKEN,
} = SetupEnvironments();

AWS.config.update({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY_ID,
    sessionToken: AWS_SESSION_TOKEN
})

export const cognitoISP = new AWS.CognitoIdentityServiceProvider();