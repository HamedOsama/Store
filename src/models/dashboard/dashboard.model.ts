import db from '../../database';
import { QueryResult } from 'pg';
import Product from '../product.model';
import Order from '../order.model';

type topProduct = {
    product_name: string;
    quantity: number;
};

class DashboardModel {
    // Get Top 5 most popular products
    async topFivePopularProducts(): Promise<topProduct[]> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql =
                'SELECT product_name,SUM(quantity) AS quantity_sum FROM products INNER JOIN order_products ON products.id = order_products.product_id GROUP BY product_name ORDER BY quantity_sum DESC LIMIT 5;';
            // run query
            const result: QueryResult = await connection.query(sql);
            //release connection
            connection.release();
            return result.rows;
        } catch (err) {
            console.log(err);
            throw new Error(`unable get top 5 popular products: ${err}`);
        }
    }

    // Get products with specific category
    async productsByCategory(category: string): Promise<Product[]> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = 'SELECT * FROM products WHERE category=($1)';
            // run query
            const result: QueryResult = await connection.query(sql, [category]);
            //release connection
            connection.release();
            // return specific products
            return result.rows;
        } catch (err) {
            throw new Error(`unable get products with such category: ${err}`);
        }
    }

    // Get completed orders by specific user
    async completedOrders(
        user_id: string,
        order_status: string
    ): Promise<Order[]> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql =
                'SELECT * FROM orders WHERE user_id=($1) AND order_status=($2)';
            // run query
            const result: QueryResult = await connection.query(sql, [
                user_id,
                order_status,
            ]);
            //release connection
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`unable get completed orders by this user: ${err}`);
        }
    }
}
export default DashboardModel;
