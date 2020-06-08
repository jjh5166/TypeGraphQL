import { Arg, Mutation, Resolver, Ctx } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { User } from '../../entity/User';
import { redis } from '../../redis';
import { forgotPasswordPrefix } from '../../constants/redisPrefixes';
import { ChangePasswordInput } from './changePassword/ChangePasswordInput';
import { MyContext } from '../../types/MyContext';

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(@Arg("data") { token, password }: ChangePasswordInput,
  @Ctx() ctx:MyContext
  ): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);

    if (!userId) {
      return null;
    }
    // could also use 'update' from typeorm
    const user = await User.findOne(userId)

    if (!user) {
      return null;
    }

    await redis.del(forgotPasswordPrefix + token); //remove token from redis

    user.password = await bcrypt.hash(password, 12);

    await user.save()

    ctx.req.session!.userId;

    return user;
  }
}
