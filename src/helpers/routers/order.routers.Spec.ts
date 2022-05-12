import Order from '../../models/order.model';
import TestOrder from '../../routes/api/orders.routes';

const orderClass = new Order();

describe('Testing order model', (): void => {
    it('', async () => {
        expect((await TestOrder).get('/', orderClass.getAll)).toBeTruthy();
        expect((await TestOrder).get('/', orderClass.create)).toBeTruthy();
        expect((await TestOrder).get('/:id', orderClass.getOne)).toBeTruthy();
        expect((await TestOrder).get('/:id', orderClass.del)).toBeTruthy();
    });
});
