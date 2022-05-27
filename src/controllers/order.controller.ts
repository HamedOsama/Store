import {NextFunction, Request, Response} from 'express';
import OrderModel from '../models/order.model';

const orderModel = new OrderModel();

export const create = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const product = await orderModel.create(req.body);
        res.json({
            status: 'success',
            data: {...product},
            message: 'Order Added successfully',
        });
    } catch (error) {
        next(error);
    }
};
export const getAll = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const product = await orderModel.getAll();
        res.json({
            status: 'success',
            data: {...product},
            message: 'Data Retrieved successfully',
        });
    } catch (error) {
        next(error);
    }
};
export const getOne = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const product = await orderModel.getOne(req.params.id);
        res.json({
            status: 'success',
            data: product,
            message: 'Data Retrieved successfully',
        });
    } catch (error) {
        next(error);
    }
};
// export const getCurrent = async function (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) {
//     console.log(req.params.id);
//     try {
//         const product = await orderModel.getCurrent(req.params.id);
//         res.json({
//             status: 'success',
//             data: product,
//             message: 'Data Retrieved successfully',
//         });
//     } catch (error) {
//         next(error);
//     }
// };
// export const getCompleted = async function (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) {
//     try {
//         const product = await orderModel.getCompleted(req.params.id);
//         res.json({
//             status: 'success',
//             data: { ...product },
//             message: 'Data Retrieved successfully',
//         });
//     } catch (error) {
//         next(error);
//     }
// };
export const update = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (req.body.user_id == undefined) {
            const product = await orderModel.updateStatus(
                req.params.id,
                req.body.status
            );
            res.json({
                status: 'success',
                data: product,
                message: 'Data updated successfully',
            });
        } else {
            const product = await orderModel.update(req.body, req.params.id);
            res.json({
                status: 'success',
                data: product,
                message: 'Data updated successfully',
            });
        }
    } catch (error) {
        next(error);
    }
};
// export const updateStatus = async function (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) {
//     try {
//         const product = await orderModel.updateStatus(
//             req.params.id,
//             req.body.is_done
//         );
//         res.json({
//             status: 'success',
//             data: product,
//             message: 'Data updated successfully',
//         });
//     } catch (error) {
//         next(error);
//     }
// };
export const del = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const product = await orderModel.del(req.params.id);
        res.json({
            status: 'success',
            data: {...product},
            message: 'Data deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
