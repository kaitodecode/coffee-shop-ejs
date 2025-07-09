import { default as fetcher } from "../helper/fetcher";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const result = await handleLogin(req.body)


    if (!result.ok) {
        res.redirect("/error")
    } else {
        res.cookie('token', result.data.token, {
            httpOnly: true,       // Tidak bisa diakses dari JS frontend
            secure: true,         // Hanya dikirim lewat HTTPS
            sameSite: 'strict',   // Cegah CSRF
            maxAge: 24 * 60 * 60 * 1000 // 1 hari dalam ms
        });
        res.redirect("/app/dashboard")
    }
};

export const register = async (req: Request, res: Response) => {
    const { email, password, name, isAdmin } = req.body;
    
    // Validate required fields
    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Email, password, and name are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password length
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Convert isAdmin to boolean if present
    req.body.isAdmin = isAdmin ? Boolean(isAdmin) : false;

    const result = await handleRegister(req.body)
    console.log(result)
    if (!result.ok) {
        res.redirect("/app/errors/400")
    } else {
        res.redirect("/")
    }
};

export const loginPage = (req: Request, res: Response) => res.render("login")
export const registerPage = (req: Request, res: Response) => res.render("register")
export const errorPage = (req: Request, res: Response) => res.render("error")

const handleLogin = async (userData: any) => {
    const response = await fetcher('http://localhost:5272/api/Auth/login', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
    return response;
};

const handleRegister = async (userData: any) => {
    const response = await fetch('http://localhost:5272/api/Auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    const data = await response.json();
    return {
        ok: response.ok,
        data: data
    };
};