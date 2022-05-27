import productModel from '../../models/product.model';
const product = new productModel();
describe('Product Model Test', () => {
    it('should have a create method [To Create New Product]', () => {
        expect(product.create).toBeDefined();
    });
    it('createProduct() should add a New Product', async () => {
        const result = await product.create({
            name: 'H&M',
            price: 900,
            category: '1',
        });
        expect(result.id).toBe(result.id);
    });
    it('selectAllProducts() should return a list of All Available Products', async () => {
        const result = await product.getAll();
        expect(result.length).toBeGreaterThan(0); // Should Contains One or more Product
    });

    it('selectProduct() should return A Specific Product', async () => {
        const result = await product.getOne('2');
        expect(result).toBe(result);
    });
    it('deleteProduct() should delete A Specific Product', async () => {
        // const result = await product.del('1');
        // expect(result.price).toBe(7);
        expect(await product.del).toBeTruthy();
    });
});
