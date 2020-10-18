require("dotenv").config();
let express = require("express");
let app = express();
let cros = require("cors");
let bodyParser  = require("body-parser");
let feCreditRoute = require("./router/fecredit");
let cicRouter = require("./router/cic");
app.use(cros());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.get("/",function(req,res){
    res.send("Hello");
})
app.use("/fecredit",feCreditRoute);
app.use("/crc",cicRouter);
app.listen(process.env.PORT||3000,function(){
    console.log("App running On Port : " + process.env.PORT||3000)
})