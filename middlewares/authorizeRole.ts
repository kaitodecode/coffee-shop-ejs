import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ThisIsASecretKeyWithExactly32Char!!";

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      // Kembalikan response 401 Unauthorized kalau token tidak ada
      return;
    }

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const userRole = decoded.role; // dari ClaimTypes.Role di backend

      req.user = decoded;

      if (!allowedRoles.includes(userRole)) {
        // Role tidak diizinkan, kembalikan 403 Forbidden
        return;
      }

      // Role cocok, lanjut ke middleware / route berikutnya
      next();

    } catch (err) {
      console.error("JWT error:", err);
      // Token tidak valid atau error, kembalikan 401 Unauthorized
      return;
    }
  };
};
