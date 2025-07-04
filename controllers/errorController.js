exports.pageNotFound = (req, res) => {
    res.redirect("/html/404.html")
}

exports.serverError = (req, res) => {
    res.redirect("/html/500.html")
}
