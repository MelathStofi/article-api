import { NextFunction, Request } from "express";
import Err from "../error/Err";

export default function validateRequest(req: Request, next: NextFunction, schema: any) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(new Err("ValidationError", `${error.details.map(x => x.message).join(', ')}`));
    } else {
        req.body = value;
        next();
    }
}