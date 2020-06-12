
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import createResolver from '../../utils/CreateResolver';

export const CreateUserResolver = createResolver("User", User, RegisterInput, User);

//extending class method
// @Resolver()
// export class CreateUserResolver extends BaseCreateUser{}