import { default as fetcher } from "../helper/fetcher";
import { Request, Response } from "express";

const API_URL = "http://localhost:5272/api/Product";

export const indexPage = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const result = await handleGetProducts(token)
    const products = result.data.data || []
    res.render("products", { 
        products,
        path: req.path  // Add this line
    })
}

export const create = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const result = await handleCreateProducts(token, req.body)

    console.log(result)
        res.redirect("/app/products")
    }

export const update = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const id = req.params.id;
    const result = await handleUpdateProducts(token, id, req.body)

    console.log(result)
        res.redirect("/app/products")
    }

export const destroy = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const id = req.params.id;
    const result = await handleDeleteProducts(token, id)

    console.log(result)
        res.redirect("/app/products")
    }


const handleGetProducts = async (token: string) => {

   const response = await fetcher('http://localhost:5272/api/Product', {
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

const handleUpdateProducts = async (token: string, id: string, body: any) => {
    const response = await fetch(`http://localhost:5272/api/Product/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(body)
    });
    return response.json();
}

const handleDeleteProducts = async (token: string, id: string) => {
    const response = await fetch(`http://localhost:5272/api/Product/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
    });
    return response.json();
}

// export const update = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const token = req.cookies.token;
//     await fetch(`${API_URL}/${id}`), {
//         method: "PUT"
//     }
