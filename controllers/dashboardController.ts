import { Request, Response } from "express"

export const dashboardPage = async (req: Request, res: Response) => {
    let orderData: any[] = [];
    let productData: any[] = [];

    try {
        console.log('Fetching orders data...');
        const orders = await fetch("http://localhost:5272/api/Order", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${req.cookies.token}`,
                'Accept': 'application/json'
            }
        });

        console.log(`Orders API Response Status: ${orders.status}`);
        if (orders.ok) {
            orderData = await orders.json();
            console.log(`Successfully fetched ${orderData.length} orders`);
        } else {
            console.warn(`Failed to fetch orders. Status: ${orders.status}`);
            orderData = []; // Ensure empty array on failure
        }

        console.log('Fetching products data...');
        const products = await fetch("http://localhost:5272/api/Product", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${req.cookies.token}`,
                'Accept': 'application/json'
            }
        });

        console.log(`Products API Response Status: ${products.status}`);
        if (products.ok) {
            const response = await products.json();
            productData = response.data || [];
            console.log(`Successfully fetched ${productData.length} products`);
        } else {
            console.warn(`Failed to fetch products. Status: ${products.status}`);
            productData = []; // Ensure empty array on failure
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        // Ensure arrays are empty on error
        orderData = [];
        productData = [];
    }

    // Calculate product statistics with safe defaults
    const totalProduk = {
        qty: productData?.length || 0,
        total: productData?.length > 0
            ? Number((productData.reduce((acc: number, product: { price: number }) =>
                acc + (product?.price || 0), 0) / productData.length).toFixed(2))
            : 0,
    }

    const totalTransaction = {
        qty: orderData?.length || 0,
        total: orderData?.length > 0
            ? Number((orderData.reduce((acc: number, order: { total: number }) =>
                acc + (order?.total || 0), 0) / orderData.length).toFixed(2))
            : 0,
    }

    console.log('Dashboard Statistics:', {
        totalProducts: totalProduk.qty,
        averagePrice: totalProduk.total,
        totalOrders: orderData?.length || 0
    });

    res.render("dashboard", {
        path: "/app/dashboard",
        totalProduk,
        orderData: orderData || [],
        productData: productData || []
    });
}
