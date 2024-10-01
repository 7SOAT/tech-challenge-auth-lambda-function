import { addUserInDefaultGroup, getUser, getUserGroups, registerUser } from "./aws/cognito-service";
import { SetupEnvironments } from "./config/environments/config";
import { generateToken } from "./jwt/generateToken";

export interface AuthCustomerRequest {
  cpf?: string;
  email?: string;
  name?: string;
}

export const authUser = async (request: AuthCustomerRequest): Promise<any> => {
  console.log("Starting to process an auth request", request);
  
  const { cpf, email, name } = request;
  const isGuest: boolean = !cpf && !email && !name;
  let isAdmin = false;
  let userAttributes = {};

  if (isGuest) return await generateToken({ isAdmin });
  console.log("User is not a guest", {cpf, email, name});

  try {
    console.log(SetupEnvironments())
    if (cpf) {
      const user = await getUser(cpf);
      console.log("User", user);
      userAttributes = user ?? await registerUser(cpf, email, name);

      console.log("userAttributes", userAttributes);

      const userGroups = await getUserGroups(cpf);

      console.log("userGroups", userGroups);

      if (!user || userGroups!.length === 0) {
        addUserInDefaultGroup(cpf)
        console.log("addUserInDefaultGroup");
      }

      isAdmin = userGroups?.find((group) => group.GroupName === "admins") ? true : false;
      console.log("isAdmin", isAdmin);

    }

    return await generateToken({ ...userAttributes, isAdmin });

  } catch (error: any) {
    return new Error(error);
  }
};


authUser({ cpf: "47051065809"})