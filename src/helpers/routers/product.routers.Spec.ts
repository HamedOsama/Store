import Product from '../../models/product.model';
import TestProduct from '../../routes/api/products.routes';

const productClass = new Product();

describe('Testing product model', (): void => {
    it('', async () => {
        expect((await TestProduct).get('/', productClass.getAll)).toBeTruthy();
        expect((await TestProduct).get('/', productClass.create)).toBeTruthy();
        expect(
            (await TestProduct).get('/:id', productClass.getOne)
        ).toBeTruthy();
        expect(
            (await TestProduct).get('/:id', productClass.update)
        ).toBeTruthy();
        expect((await TestProduct).get('/:id', productClass.del)).toBeTruthy();
    });
});
