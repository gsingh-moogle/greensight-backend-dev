import { Sequelize } from "sequelize-typescript";
import * as fs from 'fs';
import * as path from 'path';
import { dbConfig } from "./config";
import { dbConst } from "./db_constant";
const sequelizeInstances: { [key: string]: Sequelize } = {};
const setupSequelize = async (): Promise<void> => {
    try {
        for (const database of Object.keys(dbConst)) {
            const options = {
                ...dbConfig,
                database: dbConst[database]['name'],
                logging: console.log
            };
            
            const sequelizeInstance = new Sequelize(options);
            await sequelizeInstance.authenticate();
            const modelDir = path.join(__dirname, '../models', dbConst[database]['modelDir']);
            
            const modelFiles = fs.readdirSync(modelDir)
                .filter((file) => file.endsWith('.js'));
            console.log('modelFiles',modelFiles);
            for (const file of modelFiles) {
                const model = require(path.join(modelDir, file)).default;
                sequelizeInstance.addModels([model]);
            }

            sequelizeInstances[database] = sequelizeInstance;
        }
    } catch (err) {
        console.log('err', err);
    }
};

async function main() {await setupSequelize() }
main().catch(error => console.error(error));
export default sequelizeInstances;