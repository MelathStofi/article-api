import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Token } from "../entity/Token";
const uuidAPIKey = require("uuid-apikey");

export default async function authorize(req: Request, res: Response, next: NextFunction) {
    try {
        const repository = getRepository(Token);
        const token = req.headers.authorization;
        const tokenEntity = await repository.findOne(uuidAPIKey.toUUID(token));
        if (!tokenEntity || tokenEntity.remaining === 0) throw Error;
        tokenEntity.remaining += -1;
        await repository.save(tokenEntity);
        next();
    } catch (error) {
        const err = new Error("Invalid token")
        err.name = "ValidationError";
        next(err);
    }
  }