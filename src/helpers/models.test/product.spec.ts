import Product from '../../models/product.model';

const productStore = new Product();

describe('Testing product model', (): void => {
    it('getAll method', (): void => {
        expect(productStore.getAll()).toBeDefined();
    });

    it('getOne method', (): void => {
        expect(productStore.getOne).toBeDefined();
    });

    it('CREATE method', (): void => {
        expect(productStore.create).toBeDefined();
    });
});
