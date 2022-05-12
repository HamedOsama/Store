import dashboardModel from '../../models/dashboard/dashboard.model';

const dashboard = new dashboardModel();

describe('Testing user model', (): void => {
    it('Completed Orders method should be defined', (): void => {
        expect(dashboard.completedOrders).toBeDefined();
    });

    it('Top Five Popular Products method should be defined', (): void => {
        expect(dashboard.topFivePopularProducts).toBeDefined();
    });

    it('Get products By Category method should be defined', (): void => {
        expect(dashboard.productsByCategory).toBeDefined();
    });
});
