import { default as fetcher } from "../helper/fetcher";
import { Request, Response } from "express";

export const indexPage = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const result = await handleGetCategories(token)
    const categories = result.data.data || []
    console.log(categories)
    res.render("categories", { categories })
}

export const create = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const result = await handleCreateCategories(token, req.body)

    console.log(result)
    if(!result.ok){
        res.redirect("/error")
    }else{
        res.redirect("/app/categories")
    }
    // res.render("categories", { categories })
}

export const handleGetCategories = async (token: string) => {


    const response = await fetcher('http://localhost:5272/api/Category', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

export const handleCreateCategories = async (token: string, body: any) => {
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