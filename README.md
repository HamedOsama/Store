# Online Store API

Build a Storefront Backend - Advanced Web Development egFWD - Second Project

This project was structured from scratch, with ZERO starter files.

# Installation

1. Install all node Dependencies

```bash
npm install
```
2. ## PostgresSQL for DB

- connect to the default postgres database with postgres user `psql -U postgres`
- In psql run the following to create a user 
    CREATE USER full_stack_user WITH PASSWORD 'pass1234';
- In psql run the following to create the dev and test database
    - `CREATE DATABASE store_dev;`
    - `CREATE DATABASE store_test;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c store_dev`
        - `GRANT ALL PRIVILEGES ON DATABASE store_dev TO store_user;`
    - Grant for test database
        - `\c store_test`
        - `GRANT ALL PRIVILEGES ON DATABASE store_test TO store_user;`
      
      
 # environment varibales  
3. create .env file which contains the following parameters:

```ts
port=3000
Node_ENV=dev
# setting database connection infromation 
PGHOST=localhost
PGPORT=5432
PGDATABASE=store_dev
PGDATABASE_TEST=store_test
PGUSER=full_stack_user
PGPASSWORD=pass1234
#password slat
BCRYPT_PASSWORD=your-secret-password
SLAT_ROUNDS=10
TOKEN_SECRET=your-secret-token
```

4.create database migrations

```bash
db-migrate up
```

5. run server

```bash
yarn run dev
```

## Tables

-   **users** `(id:uuid [primary key], username VARCHAR,firstname:VARCHAR, lastname:VARCHAR, password:VARCHAR)`
-   **products** `(id:SERAIAL [primary key], name:VARCHAR, category:VARCHAR, price: number )`
-   **orders** `(id:SERAIAL [primary key], order_status:VARCHAR, user_id:uuid [foreign_key to users table])`
-   **order_products** `(id:SERAIAL [primary key], quantity:number, order_id:number [foreign_key to orders table], product_id:number [foreign_key to products table])`

## API Endpoints

#### users:

-   GET ALL USERS route: 'http://localhost:3000/api/users' [GET]
-   GET ONE route: 'http://localhost:3000/api/users/id' [GET]
-   CREATE route: 'http://localhost:3000/api/users' [POST]
-   UPDATE route: 'http://localhost:3000/api/users/id' [PATCH]
-   DELETE route:'http://localhost:3000/api/users/id' [DELETE]

#### products:

-   GET ALL route: 'http://localhost:3000/api/products' [GET]
-   GET ONE route: 'http://localhost:3000/api/products/id' [GET]
-   CREATE route: 'http://localhost:3000/api/products' [POST]
-   UPDATE route: 'http://localhost:3000/api/products/id' [PATCH]
-   DELETE route: 'http://localhost:3000/api/products/id' [DELETE]

#### orders:

-   GET ALL route: 'http://localhost:3000/api/orders' [GET]
-   GET ONE route: 'http://localhost:3000/api/orders/id' [GET]
-   CREATE route: 'http://localhost:3000/api/orders' [POST]
-   UPDATE route: 'http://localhost:3000/api/oreders/id' [PATCH]
-   DELETE route: 'http://localhost:3000/api/orders/id' [DELETE]

#### orders:

-   GET ALL route: 'http://localhost:3000/api/orders-products/' [GET]
-   GET ONE route: 'http://localhost:3000/api/orders-products//id' [GET]
-   CREATE route: 'http://localhost:3000/api/orders-products/' [POST]
-   UPDATE route: 'http://localhost:3000/api/orders-products/id' [PATCH]
-   DELETE route: 'http://localhost:3000/api/orders-products//id' [DELETE]

#### dashboard:

-   topFivePopularProducts route: 'http://localhost:3000/api/topFive' [GET]
-   productsByCategory route: 'http://localhost:3000/api/getProductsByCategory:category [GET]
-   completedOrders route: 'http://localhost:3000/api/completedOrders' [GET]

### IMPORTANT SCRIPTS

* **yarn run dev**
* **yarn run test**
* **yarn run build**
