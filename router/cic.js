let express = require("express");
let router = express.Router();
let {loginToWeb} = require("./cricModel");
router.get("/",async function(req,res){
    let {cmnd} = req.query;
    if(!cmnd){
        return res.send("NHAP_CMND");
    }
    let cookie =  await loginToWeb(312331999);
    console.log(cookie);
    res.send(cookie);
})
module.exports = router;