import { Router } from 'express';
import * as controllers from '../../controllers/order-product.controller';

const routes = Router();
routes.route('/').get(controllers.getAll).post(controllers.create);
routes
    .route('/:id')
    .get(controllers.getOne)
    .patch(controllers.update)
    .delete(controllers.del);
export default routes;
