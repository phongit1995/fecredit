let express = require("express");
let router = express.Router();
let {loginToWeb} = require("./cricModel");
router.get("/",async function(req,res){
    let cookie =  loginToWeb();
    res.send(cookie);
})
module.exports = router;