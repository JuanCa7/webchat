const express = require("express");
const router = express.Router();
const path = require("path");

const views = path.join(__dirname, "/../views");

router.get("/", (req,res)=>{
    res.sendFile(views + "/index.html");
})

router.get("/login", (req, res)=>{
    res.sendFile(views + "/login.html");
})

router.get("/register", (req, res)=>{
    res.sendFile(views + "/register.html");
})

module.exports = router;