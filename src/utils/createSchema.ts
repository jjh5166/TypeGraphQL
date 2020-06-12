import { CreateUserResolver } from './../modules/user/CreateUser';
import { buildSchema } from "type-graphql";
import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { LoginResolver } from "../modules/user/Login";
import { LogoutResolver } from "../modules/user/Logout";
import { MeResolver } from "../modules/user/Me";
import { RegisterResolver } from "../modules/user/Register";
import { CreateProductResolver } from '../modules/product/CreateProduct';

//abstracted for use in creating ApolloServer for app and tests
export const createSchema = () => buildSchema({
  resolvers: [
    ChangePasswordResolver,
    ConfirmUserResolver,
    ForgotPasswordResolver,
    LoginResolver,
    LogoutResolver,
    MeResolver,
    RegisterResolver,
    CreateUserResolver,
    CreateProductResolver
  ],
  authChecker: ({ context: { req } }) => {
    return !!req.session.userId; // return false if denied, cast to bool
  }
});