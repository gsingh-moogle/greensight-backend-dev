import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import sequelize from "../db_connection/db_connect";
import User from "../models/User";

export async function users(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const sequelizeConnection = sequelize(User);
  try {
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
