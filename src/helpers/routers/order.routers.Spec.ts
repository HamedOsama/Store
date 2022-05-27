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
const result = userStore.create(user);
const newOrder = new Order();

describe('Testing order model;', (): void => {
    async () => {
        newOrder.create({
            status: 'active',
            user_id: String((await result).id),
        });
    };
    it('create order', async () => {
        expect((await await req.post('/api/orders/')).status).toBe(200);
    });

    it('get all orders', async () => {
        expect((await req.get('/api/orders')).status).toBe(200);
    });
    it('get one order', async () => {
        expect((await req.get('/api/orders/1')).status).toBe(200);
    });
    it('update one order', async () => {
        expect((await req.patch('/api/orders/1')).status).toBe(200);
    });
    it('delete one order', async () => {
        expect((await req.delete('/api/orders/1')).status).toBe(200);
    });
});
