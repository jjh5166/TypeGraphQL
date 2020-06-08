import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { User } from '../../entity/User';
import { MyContext } from '../../types/MyContext'
@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true }) //nullable in case of invalid login
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null
    } // return null if no user is found

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return null
    } // return null if passwords do not match

    if (!user.confirmed) {
      return null;
      // user must be confirmed to log in
      // possible place for 'please confirm' message
    }
    ctx.req.session!.userId = user.id; //creates session in redis, sends back cookie

    return user;
  }
}