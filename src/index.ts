import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';

import { redis } from './redis';

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/*.ts"], //ensures all resolvers are imported
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId; // return false if denied, cast to bool
    }
  });
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req })
  })

  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }));

  const SESSION_SECRET = 'woirjoiwergwoerpg';

  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: redis as any,
    }),
    name: "qid", //cookie name
    secret: SESSION_SECRET || "", //cookie secret usually from env
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  };

  app.use(session(sessionOption));

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('server started on localhost:4000/graphql')
  })
}

main();