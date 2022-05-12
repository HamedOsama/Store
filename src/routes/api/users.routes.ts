import { Router } from 'express';
import * as controllers from '../../controllers/user.controllers';
import authenticationMiddleware from '../../middleware/authenticate.middleware';
const routes = Router();
// api/users
routes
    .route('/')
    .get(authenticationMiddleware, controllers.getAll)
    .post(controllers.create);

routes
    .route('/:id')
    .get(controllers.getUser)
    .patch(controllers.update)
    .delete(controllers.del);

routes.route('/authenticate').post(controllers.authenticate);
// routes.get(':id', controllers.getUser);
// routes.patch('/update-user', controllers.update);
// routes.delete('/delete-user', controllers.del);

export default routes;
