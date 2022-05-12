import bcrypt from 'bcrypt';
import db from '../database';
import User from '../types/user.type';
import config from '../config';

const hashPass = (password: string) => {
    const salt = +(config.salt as string);
    return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};
class UserModel {
    // create
    async create(u: User): Promise<User> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `INSERT INTO users (email,user_name,first_name,last_name,password)values(
                $1 , $2, $3, $4, $5) returning id,email,user_name,first_name,last_name`;
            // run query
            const result = await connection.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashPass(u.password),
            ]);
            //release connection
            connection.release();
            // return created user
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Unable to create ${u.user_name} : ${error as Error}`
            );
        }
    }
    // get all users
    async getAll(): Promise<User[]> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql =
                'SELECT id,email,user_name,first_name,last_name FROM users;';
            // run query
            const result = await connection.query(sql);
            //release connection
            connection.release();
            // return all users
            return result.rows;
        } catch (error) {
            throw new Error(
                `Unable to get users from database\n ${error as Error}`
            );
        }
    }
    // get specific user
    async getUser(id: string): Promise<User> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql =
                'SELECT id,email,user_name,first_name,last_name FROM users WHERE id =($1);';
            // run query
            const result = await connection.query(sql, [id]);
            //release connection
            connection.release();
            // return specific user
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Unable to get user from database\n ${error as Error}`
            );
        }
    }
    // update user
    async update(u: User): Promise<User> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `UPDATE users
                SET email = $1, user_name = $2 , first_name=$3,
                last_name=$4, password = $5
                where id= $6
                RETURNING id,email,user_name,first_name,last_name
                `;
            // run query
            const result = await connection.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashPass(u.password),
                u.id,
            ]);
            //release connection
            connection.release();
            // return updated user
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Unable to update user info from database\n ${error as Error}`
            );
        }
    }
    // delete user
    async del(id: string): Promise<User> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `DELETE FROM users
                WHERE id=$1
                RETURNING id,email,user_name,first_name,last_name
                `;
            // run query
            const result = await connection.query(sql, [id]);
            //release connection
            connection.release();
            // return deleted user
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Unable to delete user from database\n ${error as Error}`
            );
        }
    }
    // authenticate user
    async authenticate(email: string, password: string) {
        try {
            const connection = await db.connect();
            const sql = `SELECT password FROM users WHERE email=$1`;
            const result = await connection.query(sql, [email]);
            if (result.rows.length) {
                const { password: hashed } = result.rows[0];
                const isValid = bcrypt.compareSync(
                    `${password}${config.pepper}`,
                    hashed
                );
                if (isValid) {
                    const userInfo = await connection.query(
                        'SELECT id,email,user_name,first_name,last_name FROM users WHERE email =$1',
                        [email]
                    );
                    return userInfo.rows[0];
                }
            }
            connection.release();
            return null;
        } catch (error) {
            throw new Error(`this: ${error}`);
        }
    }
}

export default UserModel;
