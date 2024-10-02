resource "aws_lambda_function" "auth_function" {
  function_name = "authentication-lambda-dev-api"
  role = var.aws_iam_labrole_arn
  handler = "dist/main.authUser"
  runtime = "nodejs18.x"
  
  filename = "lambda.zip"

  memory_size = 128
  timeout = 10

  environment {
    variables = {
        REGION = var.aws_region
        ACCESS_KEY_ID = var.aws_access_key_id
        SECRET_ACCESS_KEY = var.aws_secret_access_key
        SESSION_TOKEN = var.aws_session_token
        COGNITO_USER_POOL_ID = var.aws_cognito_user_pool_id
        COGNITO_TEMPORARY_PASSWORD = var.aws_cognito_temporary_password
        COGNITO_CLIENT_AUTH_FLOW = var.aws_cognito_client_auth_flow
        COGNITO_CLIENT_ID = var.aws_cognito_client_id
        COGNITO_CLIENT_SECRET = var.aws_cognito_client_secret
        COGNITO_DEFAULT_USER_GROUP = var.aws_cognito_default_user_group
    }
  }

  tags = {
    Name = "authentication-lambda-function"
    STAGE = "dev"
  }
}

resource "aws_lambda_permission" "allow_invoke" {
    statement_id = "AllowExecutionFromAPI"
    action = "lambda:InvokeFunction"
    function_name = aws_lambda_function.auth_function.function_name
    principal = "apigateway.amazonaws.com"
}