// import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import OrderProductModel from '../models/order-product.model';

const orderProductModel = new OrderProductModel();

export const create = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const product = await orderProductModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...product },
            message: 'product Added successfully',
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
        const product = await orderProductModel.getAll();
        res.json({
            status: 'success',
            data: { ...product },
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
        const product = await orderProductModel.getOne(req.params.id);
        res.json({
            status: 'success',
            data: product,
            message: 'Data Retrieved successfully',
        });
    } catch (error) {
        next(error);
    }
};
export const update = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const product = await orderProductModel.update(req.body, req.params.id);
        res.json({
            status: 'success',
            data: { ...product },
            message: 'Data updated successfully',
        });
    } catch (error) {
        next(error);
    }
};
export const del = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const product = await orderProductModel.del(req.params.id);
        res.json({
            status: 'success',
            data: { ...product },
            message: 'Data deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
