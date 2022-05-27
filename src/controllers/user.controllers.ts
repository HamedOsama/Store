import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import UserModel from '../models/user.model';
import config from '../config';

const userModel = new UserModel();

export const signUp = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await userModel.create(req.body);
        res.json({
            status: 'success',
            data: {...user},
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
            data: {...user},
            message: 'Data Retrieved successfully',
        });
    } catch (error) {
        next(error);
    }
};

export const getUser = async function (
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

export const update = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await userModel.update(req.body);
        res.json({
            status: 'success',
            data: {...user},
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
        const user = await userModel.del(req.params.id);
        res.json({
            status: 'success',
            data: {...user},
            message: 'Data deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
export const signIn = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const {email, password} = req.body;
        const user = await userModel.authenticate(email, password);
        const token = jwt.sign({user}, config.token as unknown as string);
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message:
                    'The username and password do not match please try again',
            });
        }
        return res.status(200).json({
            status: 'success',
            data: {...user, token},
            message: 'User authenticated successfully',
        });
    } catch (error) {
        return next(error);
    }
};
