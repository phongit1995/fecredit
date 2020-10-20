let express = require("express");
let router = express.Router();
let {loginToWeb,getDataSearch} = require("./cricModel");
router.get("/",async function(req,res){
    let {cmnd} = req.query;
    if(!cmnd){
        return res.send("NHAP_CMND");
    }
    let cookie =  await loginToWeb();
    let data = await getDataSearch(cookie,cmnd);
    res.send(data);
})
module.exports = router;