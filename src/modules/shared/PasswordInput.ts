import { MinLength } from "class-validator";
import { Field, InputType, ClassType } from 'type-graphql';

//input to share with all password fields to ensure validation
export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType({ isAbstract: true }) //isAbstract required to prevent error
  class PasswordInput extends BaseClass{

    @Field()
    @MinLength(5)
    password: string;
  }
  return PasswordInput
}