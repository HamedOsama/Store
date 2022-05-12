import { Router } from 'express';
import authenticationMiddleware from '../../../middleware/authenticate.middleware';
import * as controllers from '../../../controllers/dashboard/dashboard.controller';

const routes = Router();
routes.get('/topFive', authenticationMiddleware, controllers.topFive);
routes.get(
    '/completedOrders',
    authenticationMiddleware,
    controllers.completedOrders
);
routes.get(
    '/getProductsByCategory:category',
    authenticationMiddleware,
    controllers.productsByCategory
);

export default routes;
