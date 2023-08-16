
import { Sequelize, ModelCtor} from "sequelize-typescript";
import { dbConfig } from "./config";

const sequelize = (models: ModelCtor<any>): Sequelize => {
    const options = {
        ...dbConfig,
        pool: {
            max: 10, // Maximum number of connections in the pool
            min: 0, // Minimum number of connections in the pool
            idle: 10000, // Maximum time, in milliseconds, that a connection can be idle before being released
            acquire: 30000, // Maximum time, in milliseconds, to acquire a connection from the pool
        },
    };

    const db = new Sequelize(options);
    
    db.addModels([models]); // Add your models here

    return db;
};

export default sequelize;