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
            const result = await orders.json();
            orderData = result.data || [];
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
            ? Number(orderData.reduce((acc: number, order: { total: number }) =>
                acc + (order?.total || 0), 0).toFixed(2))
            : 0,
    }

    const rataTerjual = {
        qty: orderData?.length > 0
            ? Number((orderData.reduce((acc: number, order: any) =>
                acc + 1, 0) / orderData.length)).toFixed(2)
            : 0,
        total: orderData?.length > 0
            ? Number((orderData.reduce((acc: number, order: { total: number }) =>
                acc + (order?.total || 0), 0) / orderData.length).toFixed(2))
            : 0,
    }

    // Group orders by date and calculate daily totals
    // Initialize an object with all days of the week set to 0
    const daysOfWeek = {
        'Sunday': 0,
        'Monday': 0,
        'Tuesday': 0,
        'Wednesday': 0,
        'Thursday': 0,
        'Friday': 0,
        'Saturday': 0
    };

    // Aggregate order totals by day
    const ordersByDate = orderData.reduce((acc: { [key: string]: number }, order: any) => {
        const date = new Date(order.orderDate).toLocaleDateString('en-US', { weekday: 'long' });
        acc[date] = (acc[date] || 0) + order.total;
        return acc;
    }, { ...daysOfWeek }); // Spread the daysOfWeek object as initial value

    // Prepare chart data
    const chart = {
        labels: Object.keys(ordersByDate),
        data: Object.values(ordersByDate)
    }

    console.log('Dashboard Statistics:', {
        totalProducts: totalProduk.qty,
        averagePrice: totalProduk.total,
        totalOrders: orderData?.length || 0
    });

let transactions = [];
try {
    const response = await fetch("http://localhost:5272/api/Order", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${req.cookies.token}`,
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        const result = await response.json();
        transactions = result.data || [];
    } else {
        console.warn(`Failed to fetch transactions. Status: ${response.status}`);
    }
} catch (error) {
    console.error("Error fetching transactions:", error);
}

res.render("dashboard", {
    path: "/app/dashboard",
    totalProduk,
    totalTransaction,
    rataTerjual,
    orderData: orderData || [],
    productData: productData || [],
    chart, // Add chart data to the response
    transactions
});
}
