module.exports = (req, res, next) => {
    if(req.cookies.username && req.cookies.password){
        next();
    }else{
        res.redirect("login");
    }
}