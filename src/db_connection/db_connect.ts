import { Sequelize, Model, ModelCtor } from "sequelize-typescript";
import * as fs from 'fs';
import * as path from 'path';
import { dbConfig } from "./config";
const modelDir = path.join(__dirname, '../models/');

const sequelize = async (dbName: string | null): Promise<Sequelize> => {
    try {
        const options = {
            ...dbConfig,
            database: dbName || dbConfig.database,
            "logging": console.log
        };
        console.log(options, "check option")

        const db = new Sequelize(options);


        const queryInterface = db.getQueryInterface();
        const schemas = await queryInterface.showAllSchemas();
        // const tableNames = schemas?.map(schema => schema.name);
        // console.log('Table names:', tableNames);
        console.log(schemas, "schema")
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
        console.log('err', err);
    }
};

export default sequelize;