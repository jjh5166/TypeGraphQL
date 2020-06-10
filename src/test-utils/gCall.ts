import { graphql, GraphQLSchema } from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";

import { createSchema } from './../utils/createSchema';

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>
}

let schema: GraphQLSchema;
// utility function for graphgl call in tests
export const gCall = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema: schema,
    source,
    variableValues
  })
}
