import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import sequelize from "../db_connection/db_connect";
import User from "../models/User";
//import auth from "../middleware/auth";

export async function users(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

  try {
    const sequelizeConnection = sequelize(User);
    await sequelizeConnection.authenticate();
    
    const users = await User.findAll();
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
