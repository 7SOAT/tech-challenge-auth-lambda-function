import { AttributeListType } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { AuthCustomerRequest } from "../../main";

export function transformAttributes(attributes: AttributeListType): AuthCustomerRequest {
    const transformed: { [key: string]: string } = {};

    attributes.forEach(attribute => {
        if(attribute.Value){
            transformed[attribute.Name] = attribute.Value;
        }
    });

    return transformed as AuthCustomerRequest;
}