import { NextFunction, Request, Response } from 'express';
import DashboardModel from '../../models/dashboard/dashboard.model';

const dashboardModel = new DashboardModel();

export const topFive = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const product = await dashboardModel.topFivePopularProducts();
        res.json({
            status: 'success',
            data: { ...product },
            message: 'product Added successfully',
        });
    } catch (error) {
        next(error);
    }
};
export const completedOrders = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const product = await dashboardModel.completedOrders(
            req.params.id,
            req.params.order_status
        );
        res.json({
            status: 'success',
            data: { ...product },
            message: 'Data Retrieved successfully',
        });
    } catch (error) {
        next(error);
    }
};
export const productsByCategory = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const product = await dashboardModel.productsByCategory(
            req.params.id || req.body.id
        );
        res.json({
            status: 'success',
            data: product,
            message: 'Data Retrieved successfully',
        });
    } catch (error) {
        next(error);
    }
};
// export const update = async function (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) {
//     try {
//         const product = await orderProductModel.update(req.body, req.params.id);
//         res.json({
//             status: 'success',
//             data: { ...product },
//             message: 'Data updated successfully',
//         });
//     } catch (error) {
//         next(error);
//     }
// };
// export const del = async function (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) {
//     try {
//         const product = await orderProductModel.del(req.params.id);
//         res.json({
//             status: 'success',
//             data: { ...product },
//             message: 'Data deleted successfully',
//         });
//     } catch (error) {
//         next(error);
//     }
// };
