import { type Request, type Response, type NextFunction } from "express";

export function errorMiddleware(
    erro: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (res.headersSent) {
        return next(erro);
    }

    if (erro instanceof SyntaxError && "body" in erro) {
        return res.status(400).json({
            mensagem: "JSON inválido"
        });
    }

    console.error(erro);

    return res.status(500).json({
        mensagem: "Erro interno do servidor"
    });
}