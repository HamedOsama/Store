import db from '../database';
import Product from '../types/product.type';

class productModel {
    // create product
    async create(p: Product): Promise<Product> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `INSERT INTO products (product_name,price,category)values(
                 $1, $2, $3) returning *`;
            // run query
            const result = await connection.query(sql, [
                p.name,
                p.price,
                p.category,
            ]);
            //release connection
            console.log(result.rows[0]);
            console.log(1);
            connection.release();
            // return created product
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Unable to create product ${p.name} : ${error as Error}`
            );
        }
    }
    // get all products
    async getAll(): Promise<Product[]> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `SELECT * FROM products`;
            // run query
            const result = await connection.query(sql);
            //release connection
            connection.release();
            // return all products
            return result.rows;
        } catch (error) {
            throw new Error(`Unable to retrieve products\n ${error as Error}`);
        }
    }
    // get products by category name
    async getByCategory(category: string): Promise<Product[]> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `SELECT* FROM products WHERE category =($1);`;
            // run query
            const result = await connection.query(sql, [category]);
            //release connection
            connection.release();
            // return specific product
            if (result.rows.length) {
                return result.rows;
            } else throw new Error('Not found');
        } catch (error) {
            throw new Error(`Unable to get product ${error as Error}`);
        }
    }
    // get specific products by id
    async getOne(id: string) {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `SELECT* FROM products WHERE id =($1);`;
            // run query
            const result = await connection.query(sql, [id]);
            //release connection
            connection.release();
            // return specific product
            if (result.rows.length) {
                return result.rows[0];
            } else throw new Error('Not found');
        } catch (error) {
            throw new Error(`Unable to get product ${error as Error}`);
        }
    }
    // update product
    async update(p: Product): Promise<Product> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `UPDATE products
                    SET product_name = $2 , price=$3, category=$4 
                    where id= $1
                    RETURNING *
                    `;
            // run query
            const result = await connection.query(sql, [
                p.id,
                p.name,
                p.price,
                p.category,
            ]);
            //release connection
            connection.release();
            // return updated product
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Unable to update product info \n ${error as Error}`
            );
        }
    }
    // delete product
    async del(id: string): Promise<Product> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `DELETE FROM products
                WHERE id=$1
                RETURNING *
                `;
            // run query
            const result = await connection.query(sql, [id]);
            //release connection
            connection.release();
            // return deleted product
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Unable to delete product from database\n ${error as Error}`
            );
        }
    }
}

export default productModel;
