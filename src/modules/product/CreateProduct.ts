import { Product } from './../../entity/Product';
import { InputType, Field } from 'type-graphql';
import createResolver from '../../utils/CreateResolver'
@InputType()
class ProductInput {
  @Field()
  name: string;
}

export const CreateProductResolver = createResolver("Product", Product, ProductInput, Product);

//less flexible method
// @Resolver()
// export class CreateProductResolver extends BaseCreateProduct{}