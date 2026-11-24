import { type Request, type Response, type NextFunction } from "express";

export function loggerMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(`${req.method} ${req.url}`);
    next();
}