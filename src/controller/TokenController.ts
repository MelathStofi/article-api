import {NextFunction, Request, Response} from "express";

export default class TokenController {

    async createToken(request: Request, response: Response, next: NextFunction) {
        return "yo";
    }

    async renewToken(request: Request, response: Response, next: NextFunction) {
        return "lo";
    }

}