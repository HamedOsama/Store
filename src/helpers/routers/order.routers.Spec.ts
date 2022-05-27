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
    email: 'test155@test',
    user_name: 'test',
    first_name: 'test',
    last_name: 'test',
    password: 'password123',
};

const newOrder = new Order();
let data: object;
// async () => {
//     data = newOrder.create({
//         status: 'active',
//         user_id: String((await result).id),
//     });
// };
describe('Testing order model routes;', (): void => {
    it('create order', async () => {
        const result = await userStore.create(user);
        data = {
            status: 'active',
            user_id: result.id,
        };
        const res = await req.post('/api/orders/').send(data);
        expect(res.statusCode).toBe(200);
        // expect((await req.post('/api/orders/').send(data)).status).toBe(200);
    });

    it('get all orders', async () => {
        expect((await req.get('/api/orders')).status).toBe(200);
    });
    it('get one order', async () => {
        expect((await req.get(`/api/orders/${'1'}`)).status).toBe(200);
    });
    it('update one order', async () => {
        expect((await req.patch('/api/orders/1')).status).toBe(200);
    });
    it('delete one order', async () => {
        expect((await req.delete('/api/orders/1')).status).toBe(200);
    });
});
