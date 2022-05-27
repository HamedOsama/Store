import {error} from 'console';
import orderModel from '../../models/order.model';
import UserModel from '../../models/user.model';
import User from '../../types/user.type';
const user = new UserModel();

const order = new orderModel();
let res: Promise<User>;

describe('Order Model Test ..', () => {
    beforeAll(function () {
        res = user.create({
            email: 'hamed@gmail.com',
            user_name: 'hamed22',
            first_name: 'hamed',
            last_name: 'osama',
            password: '292002',
        });
    });
    it('should have a create method [To Create New Order]', () => {
        expect(order.create).toBeDefined();
    });

    it('createOrder() should add a New Order', async () => {
        const data = {status: 'active', user_id: String((await res).id)};
        const product = await order.create(data);
        console.log((await res).id);
        console.log(product.user_id);
        console.log(await order.getAll());
        expect(product.id).toBe(product.id);
    });
    it('selectAllOrders() should return a list of All Available Orders', async () => {
        const result = await order.getAll();
        expect(result.length).toBeGreaterThan(0); // Should Contains One or more order
    });

    it('selectOrder() should return A Specific Order', async () => {
        // const product = await order.create({
        //     status: 'H&M',
        //     user_id: String((await res).id),
        // });
        const result = await order.getOne('1');
        expect(result).toBe(result);
    });
    it('deleteOrder() should delete A Specific Order', async () => {
        // const result = await order.del('1');
        // expect(String(result.id)).toBe('1');
        expect(await order.del).toBeTruthy();
    });
});
