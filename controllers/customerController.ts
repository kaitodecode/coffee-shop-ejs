import { Request, Response } from "express";
import fetcher from "../helper/fetcher";

export const indexPage = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const result = await handleGetCustomers(token);
    const customers = result.data?.data || [];

    res.render("customers", {
        customers,
        path: "/app/customers",
    });
};

export const createOrUpdateCustomer = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        const { id } = req.body;
        let result;

        if (!id || id === "") {
            result = await handleCreateCustomer(token, req.body);
        } else {
            result = await handleUpdateCustomer(token, id, req.body);
        }

        res.redirect("/app/customers");
    } catch (error) {
        res.redirect("/app/errors/400");
    }
};

export const deleteCustomer = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const { id } = req.params;

    await fetch(http://localhost:5272/api/Customer/${id}, {
        method: "DELETE",
        headers: {
            Authorization: Bearer ${token},
        },
    });

    res.redirect("/app/customers");
};

const handleGetCustomers = async (token: string) => {
    return await fetcher("http://localhost:5272/api/Customer", {
        method: "GET",
        headers: {
            Authorization: Bearer ${token},
        },
    });
};

const handleCreateCustomer = async (token: string, body: any) => {
    const response = await fetch("http://localhost:5272/api/Customer", {
        method: "POST",
        headers: {
            Authorization: Bearer ${token},
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return response.json();
};

const handleUpdateCustomer = async (token: string, id: string, body: any) => {
    const response = await fetch(http://localhost:5272/api/Customer/${id}, {
        method: "PUT",
        headers: {
            Authorization: Bearer ${token},
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return response.json();
};