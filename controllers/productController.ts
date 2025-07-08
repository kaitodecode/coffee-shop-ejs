import { default as fetcher } from "../helper/fetcher";
import { Request, Response } from "express";

export const indexPage = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const result = await handleGetProducts(token)
    const products = result.data.data|| []
    console.log(products)
    res.render("products", { products })
}

export const create = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const result = await handleCreateProducts(token, req.body)

    console.log(result)
    if(!result.ok){
        res.redirect("/error")
    }else{
        res.redirect("/app/products")
    }
}

const handleGetProducts = async (token: string) => {

   const response = await fetcher('http://localhost:5272/api/product', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

const handleCreateProducts = async (token: string, body: any) => {
    const response = await fetch('http://localhost:5272/api/Product', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    });
    return response.json();
}