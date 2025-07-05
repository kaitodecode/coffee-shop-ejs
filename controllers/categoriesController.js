const { default: fetcher } = require("../helper/fetcher");

exports.indexPage = async (req, res) => {
    const token = req.cookies.token;
    const result = await handleGetCategories(token)
    const categories = result.data.data || []
    console.log(categories)
    res.render("categories", { categories })
}

exports.create = async (req, res) => {
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

const handleGetCategories = async (token) => {

    const response = await fetcher('https://6ef7-180-244-164-198.ngrok-free.app/api/Category', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

const handleCreateCategories = async (token, body) => {
    const response = await fetch('https://6ef7-180-244-164-198.ngrok-free.app/api/Category', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    });
    return response.json();
}