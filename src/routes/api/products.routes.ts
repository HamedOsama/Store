import { Router } from 'express';
import * as controllers from '../../controllers/product.controllers';

const routes = Router();
routes.route('/').get(controllers.getAll).post(controllers.create);

routes
    .route('/:id')
    .get(controllers.getOne)
    .patch(controllers.update)
    .delete(controllers.del);
// routes.get('/:category', controllers.getByCategory);
export default routes;
