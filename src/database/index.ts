import { Pool } from 'pg';
import config from '../config';
const pool = new Pool({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    port: parseInt(config.dbPort as string),
});

pool.on('error', (err) => {
    console.log(err.message);
});
export default pool;
