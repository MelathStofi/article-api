import {NextFunction, Request, Response} from "express";
const uuidAPIKey = require("uuid-apikey");
import { getRepository } from "typeorm";
import { Token } from "../entity/Token";

export default class TokenController {

    private repository = getRepository(Token);

    async createToken(req: Request, res: Response, next: NextFunction) {
        const platform = req.body.platform ? req.body.platform : this.getPlatform(req.headers["user-agent"]);
        const tokenEntity = await this.repository.save({platform: platform});
        const token = uuidAPIKey.toAPIKey(tokenEntity.id, {"noDashes": true});
        return {token: token, remaining: tokenEntity.remaining };
    }

    async renewToken(req: Request, res: Response, next: NextFunction) {
        try {
            let token = req.headers.authorization;
            const tokenEntity = await this.repository.findOne(uuidAPIKey.toUUID(token, {"noDashes": true}));
            tokenEntity.remaining = 5;
            await this.repository.save(tokenEntity);
            return {remaining: tokenEntity.remaining};
        } catch (error) {
            error.name = "ValidationError";
            error.message = "Invalid token"
            next(error);
        }
    }

    getPlatform(userAgent: string) {
        if (userAgent.includes("Android ")) return "Android";
        if (userAgent.includes("Linux ")) return "Linux";
        if (userAgent.includes("iPhone OS")) return "iPhone OS";
        if (userAgent.includes("iPad OS")) return "iPad OS";
        if (userAgent.includes("Mac OS")) return "Mac OS";
        if (userAgent.includes("Windows Phone")) return "Windows Phone";
        if (userAgent.includes("Windows NT")) return "Windows";
        if (userAgent.includes("RIM Tablet")) return "Black Berry";
        return "WEB";
    }
}