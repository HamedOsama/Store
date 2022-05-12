create type IF NOT EXISTS Orderstatus as enum( 'active' , 'completed');
CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    order_status VARCHAR(50),
    user_id uuid REFERENCES users(id)
);