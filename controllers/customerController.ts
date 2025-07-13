import { Request, Response } from "express";
import fetcher from "../helper/fetcher";

// GET: Menampilkan halaman customer
export const indexPage = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    console.log("[GET] Token:", token);

    const result = await handleGetCustomers(token); // ✅ perbaikan: bukan handleCreate
    const customers = result.data?.data || [];

    console.log("[GET] Customers:", customers.length);

    res.render("customers", {
        customers,
        path: "/app/customers",
    });
};

// POST: Menambahkan customer baru
export const create = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        const data = req.body;

        console.log("[CREATE] Request body:", data);

        if (data.id == "" || data.id == null){
            const { response, result } = await handleCreateCustomer(token, data);
            console.log("[CREATE] API Response:", result);
    
            if (!response.ok) {
                throw new Error(result.message || "Gagal menambahkan customer");
            }
            res.redirect("/app/customers");
        }else {
            const { response, result } = await handleUpdateCustomer(token, data.id,data);
            console.log("[Update] API Response:", result);
    
            if (!response.ok) {
                throw new Error(result.message || "Gagal menambahkan customer");
            }

            res.redirect("/app/customers");
        }


    } catch (error: any) {
        console.error("[CREATE ERROR]", error.message);

        res.redirect("/app/errors/400");
    }
};



// DELETE: Menghapus customer
export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        const { id } = req.params;
        console.log("[DELETE] Customer ID:", id);

        const response = await fetch(`http://localhost:5272/api/Customer/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log({response})

        if (!response.ok) {
            const result = await response.json();
            console.error("[DELETE] Failed:", result);
            throw new Error(result.message || "Gagal menghapus customer");
        }

        res.redirect("/app/customers");

    } catch (error: any) {
        console.error("[DELETE ERROR]", error.message);

        if (req.headers.accept?.includes("application/json")) {
            return res.status(500).json({ success: false, error: error.message });
        }

        res.redirect("/errors/400");
    }
};

// ✅ Helper: Ambil semua customer
const handleGetCustomers = async (token: string) => {
    return await fetcher("http://localhost:5272/api/Customer", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// ✅ Helper: Tambah customer
const handleCreateCustomer = async (token: string, data: any) => {
    const response = await fetch("http://localhost:5272/api/Customer", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    return { response, result };
};

const handleUpdateCustomer = async (token:string, id: string, data: any) => {
    const response = await fetch("http://localhost:5272/api/Customer/" + id, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    return { response, result };
};

const handleDeleteCustomer = async (token: string, id: string) => {
    const response = await fetch("http://localhost:5272/api/Customer/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();
    return { response, result };
};