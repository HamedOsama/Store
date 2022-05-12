import Order from '../../models/order-product.model';
import TestOrder from '../../routes/api/order-product.routes';

const orderClass = new Order();

describe('Testing order product model', (): void => {
    it('', async () => {
        expect((await TestOrder).get('/', orderClass.getAll)).toBeTruthy();
        expect((await TestOrder).get('/', orderClass.create)).toBeTruthy();
        expect((await TestOrder).get('/:id', orderClass.getOne)).toBeTruthy();
        expect((await TestOrder).get('/:id', orderClass.del)).toBeTruthy();
    });
});
