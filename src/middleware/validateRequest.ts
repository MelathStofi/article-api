import { NextFunction, Request } from "express";

export default function validateRequest(req: Request, next: NextFunction, schema: any) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        const err = new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        err.name = "ValidationError";
        next(err);
    } else {
        req.body = value;
        next();
    }
}