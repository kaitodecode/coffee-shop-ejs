import express from 'express';
// Menangani rute untuk halaman order
export const orderPage = async (req: express.Request, res: express.Response) => {
    try {
        // Ambil token dari cookie
        const token = req.cookies.token;

        // Jika tidak ada token, arahkan ke halaman login
        if (!token) {
            return res.redirect("/");  // Jika tidak ada token, arahkan ke halaman login
        }

        // Header untuk autentikasi
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        // Ambil kategori dari API
        const categoryResponse = await fetch('http://localhost:5272/api/Category', {
            method: 'GET',
            headers: headers
        });

        // Jika gagal mengambil kategori
        if (!categoryResponse.ok) {
            console.log({categoryResponse})
            throw new Error('Failed to fetch categories');
        }

        const categories = await categoryResponse.json();

        // Log kategori untuk pengecekan
        console.log("Categories Response:", categories);

        if (!categories || !categories.data) {
            throw new Error('Categories data not found');
        }

        // Ambil produk dari API
        const productResponse = await fetch('http://localhost:5272/api/product', {
            method: 'GET',
            headers: headers
        });

        // Jika gagal mengambil produk
        if (!productResponse.ok) {
            throw new Error('Failed to fetch products');
        }

        const productData = await productResponse.json();

        // Log produk untuk pengecekan
        console.log("Product Response:", productData);

        if (!productData || !productData.data) {
            throw new Error('Products data not found');
        }

        // Menyaring produk berdasarkan categoryId (jika ada query parameter untuk kategori)
        const selectedCategoryId = req.query.categoryId;
        let filteredProducts = productData.data;

        if (selectedCategoryId) {
            filteredProducts = productData.data.filter((product: any) => product.categoryId == selectedCategoryId);
        }

        // Render halaman order dengan kategori dan produk yang sesuai
        res.render('order', {
            products: filteredProducts,
            categories: categories.data,
            selectedCategoryId: selectedCategoryId,
            path: "/app/orders"
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}


