import order from '../../models/order.model';

const newOrder = new order();

describe('Testing order model', (): void => {
    it('getAll method', (): void => {
        expect(newOrder.getAll()).toBeDefined();
    });

    it('getOne method', (): void => {
        expect(newOrder.getOne).toBeDefined();
    });

    it('CREATE method', (): void => {
        expect(newOrder.create).toBeDefined();
    });
    it('Delete method should be defined', (): void => {
        expect(newOrder.del).toBeDefined();
    });
});
