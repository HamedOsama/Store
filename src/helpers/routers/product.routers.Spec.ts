import supertest from 'supertest';
import Product from '../../models/product.model';
import TestProduct from '../../routes/api/products.routes';
import app from '../../index';

const req = supertest(app);
const product = {
    name: 'ff',
    price: 7,
    category: 'soda',
};
const productClass = new Product();
productClass.create(product);
describe('Testing product model', (): void => {
    it('initialize get all', async () => {
        expect((await TestProduct).get('/', productClass.getAll)).toBeTruthy();
    });
    it('initialize create ', async () => {
        expect((await TestProduct).get('/', productClass.create)).toBeTruthy();
    });
    it('initialize get one ', async () => {
        expect(
            (await TestProduct).get('/:id', productClass.getOne)
        ).toBeTruthy();
    });
    it('initialize update product ', async () => {
        expect(
            (await TestProduct).get('/:id', productClass.update)
        ).toBeTruthy();
    });
    it('initialize delete product ', async () => {
        expect((await TestProduct).get('/:id', productClass.del)).toBeTruthy();
    });
    it('get all products', async () => {
        expect((await req.get('/api/products')).status).toBe(200);
    });
    it('create product', async () => {
        expect(
            (await await req.post('/api/products').send(product)).status
        ).toBe(200);
    });
    it('get one product', async () => {
        expect((await req.get('/api/products/2')).status).toBe(200);
    });
    it('update one product', async () => {
        expect((await req.patch('/api/products/1')).status).toBe(200);
    });
    it('delete one product', async () => {
        expect((await req.delete('/api/products/1')).status).toBe(200);
    });
});
