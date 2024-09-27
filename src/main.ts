import { addUserInDefaultGroup, getUser, getUserGroups, registerUser } from "./aws/cognito-service";
import { generateToken } from "./jwt/generateToken";

export interface AuthCustomerRequest {
  cpf?: string;
  email?: string;
  name?: string;
}

const authUser = async (request: AuthCustomerRequest): Promise<any> => {
  const { cpf, email, name } = request;
  const isGuest: boolean = !cpf && !email && !name;
  let isAdmin = false;
  let userAttributes = {};

  if (isGuest) return generateToken({ isAdmin });

  try {
    if (cpf) {
      const user = await getUser(cpf);
      userAttributes = user ?? await registerUser(cpf, email, name);

      const userGroups = await getUserGroups(cpf);

      if (!user || userGroups!.length === 0) {
        addUserInDefaultGroup(cpf)
      }

      isAdmin = userGroups?.find((group) => group.GroupName === "admins") ? true : false;
    }

    return generateToken({ ...userAttributes, isAdmin });

  } catch (error: any) {
    return new Error(error);
  }
};

exports.authUser = authUser;