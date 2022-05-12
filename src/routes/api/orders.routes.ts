import { Router } from 'express';
import * as controllers from '../../controllers/order.controller';

const routes = Router();
routes.route('/').get(controllers.getAll).post(controllers.create);

routes
    .route('/:id')
    .get(controllers.getOne)
    .patch(controllers.update)
    .delete(controllers.del);
// routes.get('/active/:id', controllers.getCurrent);
// routes.get('/completed/:id', controllers.getCompleted);
// routes.get('/:category', controllers.getByCategory);
export default routes;
