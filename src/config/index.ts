import * as path from "path";
import {ConnectionOptions} from "typeorm";
import {config} from "dotenv";
config();

export const getServerDetails = () => {
    let port = parseInt(process.env.PORT);
    if (isNaN(port)) port = 8080;
    return {
        BASE_URL: process.env.BASE_URL ? process.env.BASE_URL : `http://localhost:${port}`,
        PORT: port
    };
};

export const getORMConfig = () => {
    const isCompiled = path.extname(__filename).includes('js');
    return {
        type: "mysql",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: !process.env.DB_NO_SYNC,
        logging: !process.env.DB_NO_LOGS,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 2000,
        entities: [
            `src/entity/**/*.${isCompiled ? "js" : "ts"}`
        ],
        migrations: [
            `src/migration/**/*.${isCompiled ? "js" : "ts"}`
        ],
        cli: {
            "entitiesDir": "src/entity",
            "migrationsDir": "src/migration",
        }
    } as ConnectionOptions;
}
