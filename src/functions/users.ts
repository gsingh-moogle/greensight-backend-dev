import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import User from "../models/User";
import Profile from "../models/Profile";
import jwtMiddleware from '../middleware/auth'


export async function users(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

  try {
    let authenticate = await jwtMiddleware(request, context);
    console.log('authenticate',authenticate.status)
    if (authenticate.status == 401) {
      return authenticate;
    }

    let users = await User.findOne({
      attributes: ['email'],
      where: { id: 1 },
      include: [{
        model: Profile,
        attributes: ['first_name', 'last_name', 'country_code', 'image', 'phone_number']
      }]
    });

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
