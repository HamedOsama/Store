import dotenv from 'dotenv';
dotenv.config();
const {
    port,
    node_env,
    PGHOST,
    PGPORT,
    PGDATABASE,
    PGDATABASE_TEST,
    user,
    password,
} = process.env;
// console.log(process.env);
export default {
    port: port,
    host: PGHOST,
    dbPort: PGPORT,
    database: node_env == 'dev' ? PGDATABASE : PGDATABASE_TEST,
    user: user,
    password: password,
};
