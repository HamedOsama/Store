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
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    TOKEN_SECRET,
} = process.env;
// console.log(process.env);
export default {
    port: port,
    host: PGHOST,
    dbPort: PGPORT,
    database: node_env == 'dev' ? PGDATABASE : PGDATABASE_TEST,
    user: user,
    password: password,
    pepper: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
    token: TOKEN_SECRET,
};
