
import { auth } from "@/config/better-auth.config";
import { fromNodeHeaders } from "better-auth/node";
import type { Request, Response, NextFunction } from "express";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "No tienes acceso",
      });
    }

    // @ts-ignore
    req.user = session.user;
    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message || "Token inválido",
    });
  }
};

