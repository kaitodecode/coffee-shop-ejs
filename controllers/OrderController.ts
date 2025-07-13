import express from 'express';

export const orderPage = async (req: express.Request, res: express.Response) => {
    try {
        // Ambil token dari cookie
        const token = req.cookies.token;

        if (!token) {
            return res.redirect("/");
        }


        const headers = {
            'Authorization': `Bearer ${token}`
        };

        // Ambil kategori dari API
        const categoryResponse = await fetch('http://localhost:5272/api/Category', {
            method: 'GET',
            headers: headers
        });

        if (!categoryResponse.ok) {
            console.log({categoryResponse})
            throw new Error('Failed to fetch categories');
        }

        const categories = await categoryResponse.json();

        if (!categories || !categories.data) {
            throw new Error('Categories data not found');
        }

        // Ambil produk dari API
        const productResponse = await fetch('http://localhost:5272/api/product', {
            method: 'GET',
            headers: headers
        });

        if (!productResponse.ok) {
            throw new Error('Failed to fetch products');
        }

        const productData = await productResponse.json();

        if (!productData || !productData.data) {
            throw new Error('Products data not found');
        }

        // Ambil data pesanan dari API
        const orderResponse = await fetch('http://localhost:5272/api/Order', {
            method: 'GET',
            headers: headers
        });

        if (!orderResponse.ok) {
            throw new Error('Failed to fetch orders');
        }

        const orderData = await orderResponse.json();

        if (!orderData || !orderData.data) {
            throw new Error('No orders found');
        }
        const customerResponse = await fetch('http://localhost:5272/api/customer', {
            method: 'GET',
            headers: headers
        });

        if (!customerResponse.ok) {
            throw new Error('Failed to fetch customers');
        }

        const customerData = await customerResponse.json();

        if (!customerData || !customerData.data) {
            throw new Error('No customers found');
        }

        // Simulasi keranjang belanja (cartItems)
        const cartItems = [
            { id: 1, name: 'Product 1', price: 5000, quantity: 2 },
            { id: 2, name: 'Product 2', price: 7000, quantity: 1 }
        ];
        // Filter produk berdasarkan kategori jika ada query parameter
        const selectedCategoryId = req.query.categoryId; // Ambil categoryId dari query
        let filteredProducts = productData.data;

        if (selectedCategoryId) {
            filteredProducts = filteredProducts.filter((product: any) => product.categoryId == selectedCategoryId);
        }



        // Render halaman order dengan kategori, produk, pesanan, dan keranjang yang sesuai
        res.render('order', {
            path: '/app/orders', // Menambahkan path untuk menandai menu aktif
            products: filteredProducts,
            categories: categories.data,
            selectedCategoryId: selectedCategoryId,
            orders: orderData.data,  // Mengirim data pesanan
            cartItems: cartItems,    // Mengirim data keranjang belanja
            customers: customerData.data  // Mengirim data customer
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
};
