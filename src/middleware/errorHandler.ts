import { NextFunction, Request, Response } from "express";

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    switch (true) {
        case err.name === "NotFound":
            return res.status(404).json({ message: err.message });
        case err.name === 'ValidationError':
            return res.status(400).json({ message: err.message });
        case err.name === 'UnauthorizedError':
            return res.status(401).json({ message: 'Unauthorized' });
        default:
            return res.status(500).json({ message: err.message });
    }
}