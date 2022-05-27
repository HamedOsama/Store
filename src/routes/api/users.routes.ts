import {Router} from 'express';
import * as controllers from '../../controllers/user.controllers';
import authenticationMiddleware from '../../middleware/authenticate.middleware';
const routes = Router();
// api/users
routes
    .route('/')
    .get(authenticationMiddleware, controllers.getAll)
    .post(controllers.signUp);

routes
    .route('/:id')
    .get(authenticationMiddleware, controllers.getUser)
    .patch(authenticationMiddleware, controllers.update)
    .delete(authenticationMiddleware, controllers.del);

routes.route('/signin').post(controllers.signIn);
// routes.get(':id', controllers.getUser);
// routes.patch('/update-user', controllers.update);
// routes.delete('/delete-user', controllers.del);

export default routes;
