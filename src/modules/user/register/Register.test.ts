import { Connection } from "typeorm";
import faker from 'faker';

import { gCall } from './../../../test-utils/gCall';
import { testConn } from './../../../test-utils/testConn';
import { User } from "../../../entity/User";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
})
afterAll(async () => {
  await conn.close()
})

const registerMutation = `
mutation Register($data: RegisterInput!) { 
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
`
describe('Register', () => {
  it.only("create user", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const response  = await gCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    })

    if (response.errors) {
      console.log(response.errors[0].originalError);
    }
    
    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });
    //database tests
    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.confirmed).toBeFalsy();
    expect(dbUser!.firstName).toBe(user.firstName);
  })
})