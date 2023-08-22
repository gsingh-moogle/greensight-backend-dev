import { Sequelize } from "sequelize-typescript";
import * as fs from 'fs';
import * as path from 'path';
import { dbConfig } from "./config";
import { dbConst } from "./db_constant";
const sequelizeInstances: { [key: string]: Sequelize } = {};
let masterDbConnection: Sequelize | undefined = undefined;
const setupSequelize = async (): Promise<void> => {
    try {
        for (const database of Object.keys(dbConst)) {
            const modelObject = [];
            const options = {
                ...dbConfig,
                database: dbConst[database]['name'],
                logging: console.log
            };
            
            const sequelizeInstance = new Sequelize(options);
            const modelDir = path.join(__dirname, '../models', dbConst[database]['modelDir']);
            const modelFiles = fs.readdirSync(modelDir)
                .filter((file) => file.endsWith('.js'));
            for (const file of modelFiles) {
                const model = require(path.join(modelDir, file)).default;
                modelObject.push(model);
            }
            sequelizeInstance.addModels(modelObject);
            await sequelizeInstance.authenticate();
            if(database === 'main') masterDbConnection = sequelizeInstance;
            sequelizeInstances[database] = sequelizeInstance;
        }
    } catch (err) {
        console.log('err', err);
    }
};

async function main() {await setupSequelize() }
main().catch(error => console.error(error));
export {sequelizeInstances, masterDbConnection};