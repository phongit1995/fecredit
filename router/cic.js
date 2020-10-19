let express = require("express");
let router = express.Router();
let {loginToWeb} = require("./cricModel");
router.get("/",async function(req,res){
    let cookie =  await loginToWeb(341734697);
    res.send("Phong");
})
module.exports = router;