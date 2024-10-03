import * as dotenv from 'dotenv';

export interface ProcessEnv {
    AWS_REGION: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_SESSION_TOKEN: string;
    AWS_COGNITO_USER_POOL_ID: string;
    AWS_COGNITO_TEMPORARY_PASSWORD: string;
    AWS_COGNITO_CLIENT_AUTH_FLOW: string;
    AWS_COGNITO_CLIENT_ID: string;
    AWS_COGNITO_DEFAULT_USER_GROUP: string;
}

export function SetupEnvironments(): ProcessEnv{
    dotenv.config();

    return {
        AWS_REGION: process.env.REGION!,
        AWS_ACCESS_KEY_ID: process.env.ACCESS_KEY_ID!,
        AWS_SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY!,
        AWS_SESSION_TOKEN: process.env.SESSION_TOKEN!,
        AWS_COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID!,
        AWS_COGNITO_TEMPORARY_PASSWORD: process.env.COGNITO_TEMPORARY_PASSWORD!,
        AWS_COGNITO_CLIENT_AUTH_FLOW: process.env.COGNITO_CLIENT_AUTH_FLOW!,
        AWS_COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID!,
        AWS_COGNITO_DEFAULT_USER_GROUP: process.env.COGNITO_DEFAULT_USER_GROUP!,
    }
}
