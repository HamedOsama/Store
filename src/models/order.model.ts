import db from '../database';
import Order from '../types/order.type';

class orderModel {
    // create order
    async create(o: Order): Promise<Order> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `INSERT INTO orders (order_status,user_id)values(
                 $1, $2) returning *`;
            // run query
            const result = await connection.query(sql, [o.status, o.user_id]);
            //release connection
            connection.release();
            // return created order
            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to create order ${error as Error}`);
        }
    }
    // get all orders
    async getAll(): Promise<Order[]> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `SELECT * FROM orders`;
            // run query
            const result = await connection.query(sql);
            //release connection
            connection.release();
            // return all orders
            return result.rows;
        } catch (error) {
            throw new Error(`Unable to retrieve orders\n ${error as Error}`);
        }
    }
    // get specific orders
    async getOne(id: string) {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `SELECT* FROM orders WHERE id =($1);`;
            // run query
            const result = await connection.query(sql, [id]);
            //release connection
            connection.release();
            // return specific order
            if (result.rows.length) {
                return result.rows[0];
            } else throw new Error('Not found');
        } catch (error) {
            throw new Error(`Unable to get order ${error as Error}`);
        }
    }
    // Get Current Order by  user id
    // async getCurrent(id: string) {
    //     try {
    //         // open connection with db
    //         const connection = await db.connect();
    //         const sql = `SELECT * FROM orders WHERE user_id=$1 and status ='active';`;
    //         // run query
    //         const result = await connection.query(sql, [id]);
    //         //release connection
    //         connection.release();
    //         // return specific order
    //         if (result.rows.length) {
    //             return result.rows[0];
    //         } else throw new Error('Not found');
    //     } catch (error) {
    //         throw new Error(`Unable to get order ${error as Error}`);
    //     }
    // }
    //  Get Completed Orders by user id
    // async getCompleted(id: string) {
    //     try {
    //         // open connection with db
    //         const connection = await db.connect();
    //         const sql = `SELECT * FROM orders WHERE user_id=$1 and status ='completed';`;
    //         // run query
    //         const result = await connection.query(sql, [id]);
    //         //release connection
    //         connection.release();
    //         // return specific order
    //         if (result.rows.length) {
    //             return result.rows;
    //         } else throw new Error('Not found');
    //     } catch (err) {
    //         throw new Error(`Unable to get order ${err as Error}`);
    //     }
    // }
    // update order
    async update(o: Order, req: string): Promise<Order> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `UPDATE orders
                    SET  user_id=$3, order_status = $2
                    where id= $1
                    RETURNING *
                    `;
            // run query
            const result = await connection.query(sql, [
                o.id || req,
                o.status,
                o.user_id,
            ]);
            //release connection
            connection.release();
            // return updated order
            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to update order info \n ${error as Error}`);
        }
    }
    // update order status
    async updateStatus(orderID: string, orderStatus: string): Promise<Order> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `UPDATE orders
                        SET order_status = $2
                        where id= $1
                        RETURNING *
                        `;
            // run query
            const result = await connection.query(sql, [orderID, orderStatus]);
            //release connection
            connection.release();
            // return updated order
            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to update order info \n ${error as Error}`);
        }
    }
    // delete order
    async del(id: string): Promise<Order> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `DELETE FROM orders
                WHERE id=$1
                RETURNING *
                `;
            // run query
            const result = await connection.query(sql, [id]);
            //release connection
            connection.release();
            // return deleted order
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Unable to delete order from database\n ${error as Error}`
            );
        }
    }
}

export default orderModel;
