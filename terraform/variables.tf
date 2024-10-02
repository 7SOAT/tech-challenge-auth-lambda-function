variable "aws_iam_labrole_arn" {
    type = string
    description = "ARN da role na AWS"
}

variable "aws_region" {
    type = string
}

variable "aws_access_key_id" {
    type = string
}

variable "aws_secret_access_key" {
    type = string
}

variable "aws_session_token" {
    type = string
}

variable "aws_cognito_user_pool_id" {
    type = string
}

variable "aws_cognito_temporary_password" {
    type = string
}

variable "aws_cognito_client_auth_flow" {
    type = string
}

variable "aws_cognito_client_id" {
    type = string
}

variable "aws_cognito_default_user_group" {
    type = string
}