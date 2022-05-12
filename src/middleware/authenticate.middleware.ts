import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import Error from '../interface/error.interface';
import config from '../config';
// import UserModel from '../models/user.model';

const handleUnauthorizedError = (next: NextFunction) => {
    const error: Error = new Error('Login error : Please try again');
    error.status = 401;
    next(error);
};

const validateTokenMiddleware = function (
    req: Request,
    _res: Response,
    next: NextFunction
) {
    try {
        // get authHeader
        const authHeader = req.get('Authorization');
        console.log(authHeader);
        // check authHeader
        if (authHeader) {
            //get value of token
            const bearer = authHeader.split(' ')[0].toLocaleLowerCase();
            const token = authHeader.split(' ')[1];
            // check if it bearer token or not
            if (token && bearer === 'bearer') {
                // verify token
                const decode = jwt.verify(
                    token,
                    config.token as unknown as string
                );
                if (decode) {
                    // next()
                    next();
                } else {
                    // failed to authenticate user
                    handleUnauthorizedError(next);
                }
            } else {
                // token type not bearer
                handleUnauthorizedError(next);
            }
        }
        // no token provided
        else {
            handleUnauthorizedError(next);
        }
    } catch (err) {
        handleUnauthorizedError(next);
    }
};

export default validateTokenMiddleware;
