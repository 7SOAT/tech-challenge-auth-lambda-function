import { AdminListGroupsForUserRequest, AttributeListType, GroupListType } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { cognitoISP } from "../config/aws/cognito";
import { SetupEnvironments } from "../config/environments/config";
import { transformAttributes } from "./utils/transform-attributes";

const {
    AWS_COGNITO_USER_POOL_ID,
    AWS_COGNITO_TEMPORARY_PASSWORD,
    AWS_COGNITO_DEFAULT_USER_GROUP
} = SetupEnvironments();

export async function addUserInDefaultGroup(cpf: string) {
    try {
        await cognitoISP.adminAddUserToGroup({
            UserPoolId: AWS_COGNITO_USER_POOL_ID,
            Username: cpf,
            GroupName: AWS_COGNITO_DEFAULT_USER_GROUP,
        }).promise();
    } catch (e) {
        throw new Error("Erro ao adicionar usuário no grupo!");
    }
};

export async function registerUser(cpf: string, email?: string, name?: string) {
    const userAttributes: AttributeListType = []
    if (email) userAttributes.push({ Name: 'email', Value: email });
    if (name) userAttributes.push({ Name: 'name', Value: name });

    try {
        await cognitoISP.adminCreateUser({
            UserPoolId: AWS_COGNITO_USER_POOL_ID,
            Username: cpf,
            UserAttributes: userAttributes,
            TemporaryPassword: AWS_COGNITO_TEMPORARY_PASSWORD
        }).promise();

        return userAttributes?.length ? { ...transformAttributes(userAttributes), cpf } : { cpf };
    } catch {
        if ((!email && name) || (email && !name)) {
            throw new Error("Estão faltando parâmetros obrigatórios para o cadastro!");
        }
        throw new Error("Erro ao registrar usuário!");
    }
}

export async function getUserGroups(cpf: string): Promise<GroupListType | undefined> {
    const params: AdminListGroupsForUserRequest = {
        Username: cpf,
        UserPoolId: AWS_COGNITO_USER_POOL_ID,
    };

    try {
        const { Groups } = await cognitoISP.adminListGroupsForUser(params).promise();
        return Groups;
    } catch (err: any) {
        if (err.code === 'UserNotFoundException') {
            return undefined;
        } else {
            throw new Error(err);
        }
    }
}

export async function getUser(cpf: string) {
    const params: AdminListGroupsForUserRequest = {
        Username: cpf,
        UserPoolId: AWS_COGNITO_USER_POOL_ID,
    };

    try {
        console.log("vai dar certo")
        const result = await cognitoISP.adminGetUser(params).promise();
        console.log("eu confio")
        const sla = result?.UserAttributes ? { ...transformAttributes(result.UserAttributes), cpf } : { cpf }
        console.log("vambora", sla)
        return sla
    } catch (err: any) {
        console.log("deue rrado", err)
        if (err.code === 'UserNotFoundException') {
            return undefined;
        } else {
            throw new Error(err);
        }
    }
}
