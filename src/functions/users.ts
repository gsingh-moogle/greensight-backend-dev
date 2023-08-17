import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import sequelize from "../db_connection/db_connect";
import User from "../models/User";
import Profile from "../models/Profile";
//import auth from "../middleware/auth";
const sequelizeConnection = sequelize(null);
export async function users(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

  try {
    let users = await User.findOne({
      attributes: ['email'],
      where:{id:1},
      include:[{
          model: Profile,
          attributes: ['first_name','last_name','country_code','image','phone_number']
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
