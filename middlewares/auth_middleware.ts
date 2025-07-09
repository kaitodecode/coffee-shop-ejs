import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Only apply middleware to /app/* routes
    if (!req.path.startsWith('/app/')) {
        return next();
    }

    const token = req.cookies.token;
    if (token && token !== "null") {
        try {
            // Verify and decode the JWT token
            const decoded = jwt.verify(token, "ThisIsASecretKeyWithExactly32Char!!") as {
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
                exp: number;
                iss: string;
                aud: string;
            };
            const user = {
                id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
                email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
                role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
            };
            console.log({user});
            if (user.role !== "Admin" && req.path === "/app/categories") {
                return res.redirect("/app/dashboard");
            }
            next();
        } catch (error) {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
}

