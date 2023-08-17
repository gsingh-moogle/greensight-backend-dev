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
        "logging": console.log
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