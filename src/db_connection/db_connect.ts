import { Sequelize, Model, ModelCtor} from "sequelize-typescript";
import * as fs from 'fs';
import * as path from 'path';
import { dbConfig } from "./config";
const modelDir = path.join(__dirname, '../models/');

const sequelize = (dbName: string | null): Sequelize => {
    try {
    const options = {
        ...dbConfig,
        database: dbName || dbConfig.database,
        pool: {
            max: 10, // Maximum number of connections in the pool
            min: 0,  // Minimum number of connections in the pool
            idle: 10000, // Maximum time, in milliseconds, that a connection can be idle before being released
            acquire: 30000 // Maximum time, in milliseconds, to acquire a connection from the pool
        }
    };
    const db = new Sequelize(options);

    fs.readdirSync(modelDir)
    .filter((file) => {
        return (
        file.indexOf('.') !== 0 &&
        file.slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        const model = require(path.join(modelDir, file)).default;
        db.addModels([model]);
    });

    return db;
    } catch (err) {
        console.log('err',err);
    }
};

export default sequelize;