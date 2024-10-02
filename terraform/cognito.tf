resource "aws_cognito_user_pool" "main_user_pool" {
    name = "afluga-users"

    password_policy {
        minimum_length = 8
        require_lowercase = false
        require_numbers   = false
        require_symbols   = false
        require_uppercase = false
    }

    username_attributes = []

    auto_verified_attributes = ["email"]

    admin_create_user_config {
      allow_admin_create_user_only = false
    }

    tags = {
        Name = "main-user-pool"
    }
}

resource "aws_cognito_user_pool_client" "main_client" {
    name = "main-user-pool-client"
    user_pool_id = aws_cognito_user_pool.main_user_pool.id

    explicit_auth_flows = [
        "ALLOW_CUSTOM_AUTH",
        "ALLOW_REFRESH_TOKEN_AUTH",
        "ALLOW_USER_SRP_AUTH"
    ]

    generate_secret = false

    supported_identity_providers = ["COGNITO"]
}

resource "aws_cognito_identity_pool" "main_identity" {
    identity_pool_name = "main-identity-pool"
    allow_unauthenticated_identities = true

    cognito_identity_providers {
        client_id = aws_cognito_user_pool_client.main_client.id
        provider_name = aws_cognito_user_pool.main_user_pool.endpoint
    }
}

resource "aws_cognito_identity_pool_roles_attachment" "main-role" {
    identity_pool_id = aws_cognito_identity_pool.main_identity.id

    roles = {
        authenticated = var.aws_iam_labrole_arn
    }
}

resource "aws_cognito_user_group" "customers" {
    name = "customers"
    user_pool_id = aws_cognito_user_pool.main_user_pool.id
}

resource "aws_cognito_user_group" "admins" {
    name = "admins"
    user_pool_id = aws_cognito_user_pool.main_user_pool.id
}