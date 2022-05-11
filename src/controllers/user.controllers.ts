import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';

const userModel = new UserModel();

export const create = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await userModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...user },
            message: 'User created successfully',
        });
    } catch (error) {
        next(error);
    }
    // res.send('hello world from users');
};

export const getAll = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await userModel.getAll();
        res.json({
            status: 'success',
            data: { ...user },
            message: 'Data Retrieved successfully',
        });
    } catch (error) {
        next(error);
    }
};

export const getUser = async function name(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await userModel.getUser(req.params.id);
        res.json({
            status: 'success',
            data: user,
            message: 'Data Retrieved successfully',
        });
    } catch (error) {
        next(error);
    }
};

export const update = async function name(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await userModel.update(req.body);
        res.json({
            status: 'success',
            data: { ...user },
            message: 'Data updated successfully',
        });
    } catch (error) {
        next(error);
    }
};

export const del = async function name(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await userModel.del(req.params.id);
        res.json({
            status: 'success',
            data: { ...user },
            message: 'Data deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
