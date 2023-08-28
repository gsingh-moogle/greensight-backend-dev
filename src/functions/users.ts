import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import jwtMiddleware from '../middleware/auth'

export async function users(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

  try {
    let authenticate = await jwtMiddleware(request, context);
    if (authenticate.status == 401) {
      return authenticate;
    }
    console.log("request['db']",request['db']);
    let users = await request['db'].Company.findAll();
    console.log('user', users);
    return {
      status: 200,
      body: JSON.stringify(users)
    };
  } catch (error) {
    return { body: error };
  }
};

app.http('users', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: users
});
