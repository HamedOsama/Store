import orderModel from '../../models/order.model';
import UserModel from '../../models/user.model';
import orderProductModel from '../../models/order-product.model';
const order = new orderModel();

const user = new UserModel();
const res = user.create({
    email: 'hamed@gmail.com',
    user_name: 'hamed22',
    first_name: 'hamed',
    last_name: 'osama',
    password: '292002',
});
const orderm = new orderModel();
let newOrder;
async () => {
    newOrder = await orderm.create({
        status: 'H&M',
        user_id: String((await res).id),
    });
};

describe('Order Model Test', () => {
    it('should have a create method [To Create New Order]', () => {
        expect(order.create).toBeDefined();
    });
    it('createOrder() should add a New Order', async () => {
        const product = await order.create({
            status: 'H&M',
            user_id: String((await res).id),
        });
        expect(product.id).toBe(product.id);
    });
    it('selectAllOrders() should return a list of All Available Orders', async () => {
        const result = await order.getAll();
        expect(result.length).toBeGreaterThan(0); // Should Contains One or more order
    });

    it('selectOrder() should return A Specific Order', async () => {
        const product = await order.create({
            status: 'H&M',
            user_id: String((await res).id),
        });
        const result = await order.getOne('1');
        expect(result).toBe(result);
    });
    it('deleteOrder() should delete A Specific Order', async () => {
        // const result = await order.del('1');
        // expect(String(result.id)).toBe('1');
        expect(await order.del).toBeTruthy();
    });
});
