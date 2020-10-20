const { response } = require("express");
let express = require("express");
let router = express.Router();
let CacheManage = require('./../common/nodeCache');
let {getCookieUser,getInfoRepayment,getDataReviews} = require("./../fecredit");
const DATA_COOKIE="DATA_COOKIE";
router.get("/",async function(req,res){
    try {
        let {card,contract}= req.query;
        if(typeof card=="undefined"||typeof contract=="undefined"){
            return res.status(400).send({
                message:"Nhap Card va contact"
            })
        }
        let dataCookie=await getCookieUser();
        if(dataCookie=="GET_COOKIE_ERROR"){
            return res.send("GET_COOKIE_ERROR");
        }
        let dataInfo = await getInfoRepayment(card,contract,dataCookie);
        return res.status(200).send(dataInfo);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})
router.get("/review",async function(req,res){
    try {
        let {application,contract}= req.query;
        if(typeof application=="undefined"||typeof contract=="undefined"){
            return res.status(400).send({
                message:"Nhap application_id va contact_id"
            })
        }
        let dataCookie=await getCookieUser();
        if(dataCookie=="GET_COOKIE_ERROR"){
            return res.send("GET_COOKIE_ERROR");
        }
        let dataInfo = await getDataReviews(application,contract,dataCookie);
        return res.status(200).send(dataInfo);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})
module.exports = router;