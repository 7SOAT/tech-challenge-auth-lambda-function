import { addUserInDefaultGroup, getUser, getUserGroups, registerUser } from "./aws/cognito-service";
import { SetupEnvironments } from "./config/environments/config";
import { generateToken } from "./jwt/generateToken";

export interface AuthCustomerRequest {
  cpf?: string;
  email?: string;
  name?: string;
}

export const authUser = async (request: any, context?: any): Promise<any> => {
  console.log("Starting to process an auth request", context, request, request.body);
  
  console.log("sdjfbisudb", JSON.parse(request.body), JSON.parse(JSON.stringify(request.body)).cpf)
  const { cpf, email, name } = JSON.parse(JSON.stringify(request.body));
  console.log('aaaaa', cpf, email, name)
  const isGuest: boolean = !cpf && !email && !name;
  let isAdmin = false;
  let userAttributes = {};

  if (isGuest) return await generateToken({ isAdmin });
  
  console.log("User is not a guest", {cpf, email, name});

  try {
    console.log(SetupEnvironments())
    if (cpf) {
      const user = await getUser(cpf);
      console.log("Userr", user);
      userAttributes = user ?? await registerUser(cpf, email, name);

      console.log("userAttributes", userAttributes);

      const userGroups = await getUserGroups(cpf);

      console.log("userGroupss  ", userGroups);

      if (!user || userGroups!.length === 0) {
        addUserInDefaultGroup(cpf)
        console.log("addUserInDefaultGroup");
      }

      isAdmin = userGroups?.find((group: any) => group.GroupName === "admins") ? true : false;
      console.log("isAdminaa", isAdmin);

    }

    return await generateToken({ ...userAttributes, isAdmin });

  } catch (error: any) {
    return new Error(error);
  }
};
