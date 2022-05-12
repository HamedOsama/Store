import Dashboard from '../../models/dashboard/dashboard.model';
import dashboard from '../../routes/api/dashboard/dashboard.routes';

const orderClass = new Dashboard();

describe('Testing product model', (): void => {
    it('', async () => {
        expect(
            (await dashboard).get('/', orderClass.productsByCategory)
        ).toBeTruthy();
        expect(
            (await dashboard).get('/:id', orderClass.topFivePopularProducts)
        ).toBeTruthy();
    });
});
