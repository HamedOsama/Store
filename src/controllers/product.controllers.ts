// import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import ProductModel from '../models/product.model';

const productModel = new ProductModel();

export const create = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const product = await productModel.create(req.body);
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
        const product = await productModel.getAll();
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
        if (!isNaN(+req.params.id)) {
            const product = await productModel.getOne(req.params.id);
            res.json({
                status: 'success',
                data: product,
                message: 'Data Retrieved successfully',
            });
        } else {
            const product = await productModel.getByCategory(req.params.id);
            res.json({
                status: 'success',
                data: { ...product },
                message: 'Data Retrieved successfully',
            });
        }
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
        const product = await productModel.update(req.body);
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
        const product = await productModel.del(req.params.id);
        res.json({
            status: 'success',
            data: { ...product },
            message: 'Data deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
