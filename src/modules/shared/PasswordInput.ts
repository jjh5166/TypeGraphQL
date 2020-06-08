import { Min } from "class-validator";
import { Field, InputType } from 'type-graphql';

//input to share with all passport fields to ensure validation

@InputType()
export class PasswordInput {

  @Field()
    @Min(5)
  password: string;
}