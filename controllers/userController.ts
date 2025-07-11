import { default as fetcher } from "../helper/fetcher";
import { Request, Response } from "express";

const API_URL = "http://localhost:5272/api/users"

export const UsersPage = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const result = await handleGetUsers(token)
    const users = result.data || []
    res.render("users", {
        users,
        path: "/app/users"
    })
}

export const create = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    const fixedBody = {
        Name: req.body.name,
        Email: req.body.email,
        Password: req.body.password,
        IsAdmin: req.body.isadmin === "0"
    };

    console.log("Request Body (fixed):", fixedBody);

    const result = await handleCreateUsers(token, fixedBody);

    console.log("API Response (Create):", result);

    res.redirect("/app/users");
};


export const update = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const id = req.params.id;

    const fixedBody: any = {
        Id: Number(id),
        Name: req.body.name,
        Email: req.body.email,
        IsAdmin: req.body.isadmin === "0",
    };

    if (req.body.password) {
        fixedBody.Password = req.body.password;
    }

    console.log("Request Body (Update):", fixedBody);

    const result = await handleUpdateUsers(token, id, fixedBody);

    console.log("API Response (Update):", result);

    res.redirect("/app/users");
};



export const destroy = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const id = req.params.id;
    const result = await handleDeleteUsers(token, id)

    console.log(result)
    res.redirect("/app/users")
}


const handleGetUsers = async (token: string) => {

    const response = await fetcher('http://localhost:5272/api/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

const handleCreateUsers = async (token: string, body: any) => {
    const response = await fetch('http://localhost:5272/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    });
    return response.json();
}

const handleUpdateUsers = async (token: string, id: string, body: any) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    // Tangani jika backend tidak mengirimkan body (misal HTTP 204 No Content)
    if (response.status === 204 || response.headers.get("content-length") === "0") {
        return { success: true };
    }

    return response.json(); // Tetap parse jika ada body
};

const handleDeleteUsers = async (token: string, id: string) => {
    const response = await fetch(`http://localhost:5272/api/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
    });
    return response.json();
}