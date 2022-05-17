import supertest from 'supertest';
import Order from '../../models/order.model';
import OrderType from '../../types/order.type';
import TestOrder from '../../routes/api/orders.routes';
import app from '../../index';
import User from '../../types/user.type';
import UserStore from '../../models/user.model';
const req = supertest(app);
const userStore = new UserStore();
const user: User = {
    email: 'test55@test',
    user_name: 'test',
    first_name: 'test',
    last_name: 'test',
    password: 'password123',
};
let idd: string | undefined;
const orderClass = new Order();

userStore.create(user).then(async function (response) {
    // if (response.id) {
    idd = response.id;
    // } else idd = 'sad';
});
console.log('zby' + idd);
const order: OrderType = {
    status: 'active',
    user_id: idd || '',
};
describe('Testing order model;', (): void => {
    it('create order', async () => {
        expect((await await req.post('/api/orders').send(order)).status).toBe(
            500
        );
    });
    it('get all orders', async () => {
        expect((await req.get('/api/orders')).status).toBe(200);
    });
    it('get one order', async () => {
        expect((await req.get('/api/orders/2')).status).toBe(500);
    });
    it('update one order', async () => {
        expect((await req.patch('/api/orders/1')).status).toBe(200);
    });
    it('delete one order', async () => {
        expect((await req.delete('/api/orders/2')).status).toBe(200);
    });
});
