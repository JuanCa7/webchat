const express = require("express");
const router = express.Router();
const path = require("path");


const views = path.join(__dirname, "/../views");

const isLoggedIn = require("../middleware/isLoggedIn")

router.get("/", isLoggedIn, (req,res)=>{
    res.sendFile(views + "/index.html");
})

router.get("/login", (req, res)=>{
    res.sendFile(views + "/login.html");
})

module.exports = router;