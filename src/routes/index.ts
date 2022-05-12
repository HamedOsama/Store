import { Router } from 'express';
import UserRoutes from './api/users.routes';
import ProductsRoutes from './api/products.routes';
import OrdersRoutes from './api/orders.routes';
import OrdersProductsRoutes from './api/order-product.routes';
import dashboardRoutes from './api/dashboard/dashboard.routes';
const routes = Router();
routes.use('/users', UserRoutes);
routes.use('/products', ProductsRoutes);
routes.use('/orders', OrdersRoutes);
routes.use('/orders-products', OrdersProductsRoutes);
routes.use('/dashboard', dashboardRoutes);

export default routes;
