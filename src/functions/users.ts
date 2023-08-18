import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import sequelizeInstances from "../db_connection/sequelize";
import User from "../models/main_model/User";
import Profile from "../models/main_model/Profile";
import jwtMiddleware from '../middleware/auth'


export async function users(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

  try {
    //let authenticate = await jwtMiddleware(request, context);
    // if (authenticate.status == 401) {
    //   return authenticate;
    // }
    console.log('sequelizeInstances',sequelizeInstances);

    let users = await sequelizeInstances.main.models.User.findOne({
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
