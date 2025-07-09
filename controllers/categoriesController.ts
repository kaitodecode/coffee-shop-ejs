import { default as fetcher } from "../helper/fetcher";
import { Request, Response } from "express";

export const indexPage = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const result = await handleGetCategories(token)
    const categories = result.data.data || []

    console.log({
        path: "/app/categories"
    })

    res.render("categories", {
        categories,
        path: '/app/categories'  // Add this line
    })
}

export const create = async (req: Request, res: Response) => {

    try {
        const token = req.cookies.token;
        const { id } = req.body
        let result
        if (id == null || id == "") {
            result = await handleCreateCategories(token, req.body)
        } else {
            result = await handleUpdateCategories(token, req.body)
        }
        res.redirect("/app/categories")
    } catch (error) {
        res.redirect("/app/errors/400")
    }
    // res.render("categories", { categories })
}

export const destroy = async(req: Request, res: Response) => {
    const token = req.cookies.token;
    const { id } = req.params;
    await handleDeleteCategory(token, Number(id));
    res.redirect("/app/categories");
}


 const handleGetCategories = async (token: string) => {


    const response = await fetcher('http://localhost:5272/api/Category', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

 const handleCreateCategories = async (token: string, body: any) => {
    const response = await fetch('http://localhost:5272/api/Category', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    });
    return response.json();
}

 const handleUpdateCategories = async (token: string, body: any) => {
    const response = await fetch('http://localhost:5272/api/Category/' + body.id, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(body)
    });
    return response.json();
}

export const handleDeleteCategory = async(token: string, id: number) => {
    const response = await fetch('http://localhost:5272/api/Category/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
    });
    return response.json();
}