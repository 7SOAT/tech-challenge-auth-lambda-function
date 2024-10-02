resource "aws_apigatewayv2_api" "auth_api" {
    name = "auth-api"
    protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
    api_id = aws_apigatewayv2_api.auth_api.id
    integration_type = "AWS_PROXY"
    integration_uri = aws_lambda_function.auth_function.invoke_arn
    payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "proxy_route" {
    api_id = aws_apigatewayv2_api.auth_api.id
    route_key = "ANY /{proxy+}"
    target = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "my_stage" {
    api_id = aws_apigatewayv2_api.auth_api.id
    name = "$default"
    auto_deploy = true
}

resource "aws_lambda_permission" "api_gateway" {
    statement_id = "AllowAPIGatewayInvoke"
    action = "lambda:InvokeFunction"
    function_name = aws_lambda_function.auth_function.arn
    principal = "apigateway.amazonaws.com"
    source_arn = "${aws_apigatewayv2_api.auth_api.execution_arn}/*/*"
}