import { Resolver, Mutation, Arg, ClassType, UseMiddleware } from "type-graphql";
import { Middleware } from 'type-graphql/dist/interfaces/Middleware';

export default function createResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleware?: Middleware<any>[]
) {
  @Resolver()
  abstract class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middleware || []))
    async create(@Arg("data", () => inputType) data: typeof inputType) {
      return entity.create(data).save();
    }
  }

  return BaseResolver;
}

// less flexible method, requires extending class
// function createBaseResolver<T extends ClassType, X extends ClassType>(
//   suffix: string,
//   returnType: T,
//   inputType: X,
//   entity: any
// ) {
//   @Resolver({ isAbstract: true })
//   abstract class BaseResolver {
//     @Mutation(() => returnType, {name: `create${suffix}`})
//     async create(@Arg("data", () => inputType) data: typeof inputType) {
//       return entity.create(data).save();
//     }
//   }

//   return BaseResolver;
// }