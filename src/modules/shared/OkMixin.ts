import { ClassType, Field, InputType } from "type-graphql";

//using a mixin allows more flexibility than extending types
export const OkMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class OkInput extends BaseClass {
    @Field()
    ok: boolean;
  }
  return OkInput;
};