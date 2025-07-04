let subscribers = [
    {
        name: "Adi",
        email: "adi@gmail.com"
    }
]

exports.getHomePage = (req, res) => {
    res.render("index", {subscribers: subscribers})
}

exports.getSubscribePage = (req, res) => {
    res.render("subscribe")
}

exports.saveSubcriber = (req, res) => {
    subscribers.push(req.body)
    res.render("thankyou")
}