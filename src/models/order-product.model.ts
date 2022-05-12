import db from '../database';
import OrderProduct from '../types/order-products.types';

class orderProductModel {
    // create order
    async create(o: OrderProduct): Promise<OrderProduct> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `INSERT INTO order_products (quantity,order_id,product_id)values(
                 $1, $2,$3) returning *`;
            // run query
            const result = await connection.query(sql, [
                o.quantity,
                o.order_id,
                o.product_id,
            ]);
            //release connection
            connection.release();
            // return created order
            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to create order ${error as Error}`);
        }
    }
    // get all orders
    async getAll(): Promise<OrderProduct[]> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `SELECT * FROM order_products`;
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
            const sql = `SELECT* FROM order_products WHERE id =($1);`;
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
    // update order
    async update(o: OrderProduct, req: string): Promise<OrderProduct> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `UPDATE order_products
                    SET  quantity=$2, order_id = $3 , product_id = $4
                    where id= $1
                    RETURNING *
                    `;
            // run query
            const result = await connection.query(sql, [
                o.id || req,
                o.quantity,
                o.order_id,
                o.product_id,
            ]);
            //release connection
            connection.release();
            // return updated order
            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to update order info \n ${error as Error}`);
        }
    }
    // delete order
    async del(id: string): Promise<OrderProduct> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `DELETE FROM order_products
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

export default orderProductModel;
