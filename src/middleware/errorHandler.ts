import { NextFunction, Request, Response } from "express";

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    switch (true) {
        case typeof err === 'string':
            // custom application error
            const is404 = err.message.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        case err.name === 'ValidationError':
            // typeorm validation error
            return res.status(400).json({ message: err.message });
        case err.name === 'UnauthorizedError':
            // jwt authentication error
            return res.status(401).json({ message: 'Unauthorized' });
        default:
            return res.status(500).json({ message: err.message });
    }
}