import { createConnection } from 'typeorm';

//creates test connection
//drop boolean for use of testConn for initial connection and for each test file
export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "typegraphql-example-test",
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + "/../entity/*.*"]
  })
}