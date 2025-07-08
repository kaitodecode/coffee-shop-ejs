const { default: fetcher } = require("../helper/fetcher");

exports.indexPage = async (req, res) => {
    const token = req.cookies.token;
    const result = await handleGetProducts(token)
    const products = result.data.data|| []
    console.log(products)
    res.render("products", { products })
}

exports.create = async (req, res) => {
    const token = req.cookies.token;
    const result = await handleCreateProducts(token, req.body)

    console.log(result)
    if(!result.ok){
        res.redirect("/error")
    }else{
        res.redirect("/app/products")
    }
}

const handleGetProducts = async (token) => {

   const response = await fetcher('http://localhost:5272/api/product', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

const handleCreateProducts = async (token, body) => {
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