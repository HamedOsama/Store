import supertest from 'supertest';
import OrderProductModel from '../../models/order-product.model';
import Order from '../../models/order.model';
import OrderType from '../../types/order.type';
import OrderProductType from '../../types/order-products.types';
import Product from '../../models/product.model';
import TestOrder from '../../routes/api/order-product.routes';
import app from '../../index';
import User from '../../types/user.type';
import UserStore from '../../models/user.model';
const req = supertest(app);
const userStore = new UserStore();
const user: User = {
    email: 'test@test',
    user_name: 'test',
    first_name: 'test',
    last_name: 'test',
    password: 'password123',
};
let id: string | undefined;
userStore.create(user).then(function (response) {
    id = response.id;
});
const orderClass = new Order();
const order: OrderType = {
    status: 'active',
    user_id: id || '',
};
let orderID: undefined | string;
orderClass.create(order).then(function (response) {
    orderID = response.id;
});
let product_ID: undefined | string;
const orderProductClass = new OrderProductModel();
const product = {
    name: 'ff',
    price: 7,
    category: 'soda',
};
const productClass = new Product();
productClass.create(product).then(function (response) {
    product_ID = response.id;
});
const order_product: OrderProductType = {
    quantity: 5,
    product_id: product_ID || '',
    order_id: orderID || '',
};
orderProductClass.create(order_product);
describe('Testing order product model', (): void => {
    it('', async () => {
        expect(
            (await TestOrder).get('/', orderProductClass.getAll)
        ).toBeTruthy();
        expect(
            (await TestOrder).get('/', orderProductClass.create)
        ).toBeTruthy();
        expect(
            (await TestOrder).get('/:id', orderProductClass.getOne)
        ).toBeTruthy();
        expect(
            (await TestOrder).get('/:id', orderProductClass.del)
        ).toBeTruthy();
    });
});
