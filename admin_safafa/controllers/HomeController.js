
exports.Main = (req,res) => {
    res.render("courses");
}

exports.login = (req,res) => {
    res.render("login");
}
exports.events = (req,res) => {
    res.render("events");
}
exports.notFound = (req,res) => {
    res.render("not-found");
}


