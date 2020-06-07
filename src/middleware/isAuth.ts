import { MiddlewareFn } from 'type-graphql';
import { MyContext } from 'src/types/MyContext';
// custom auth middleware, alternative to Authorization feature
export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error("not authenitcated")
    // Middleware can also break the middleware stack by not calling the next function.
    // This way, the result returned from the middleware will be used instead of calling
    // the resolver and returning it's result.
  }

  return next(); 
};