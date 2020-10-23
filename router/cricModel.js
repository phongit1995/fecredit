const request = require("request-promise");
let config = require("./../config");
let cheerio = require("cheerio");
let puppeteer = require("puppeteer");
var cookie = require('cookie');
const URL_LOGIN ="https://cic.org.vn/webcenter/j_security_check";
let {parseCookie,cookieArrayPase} = require("./../common/string");
const loginToWeb = async ()=>{
    const options = {
        uri:URL_LOGIN,
        method:"POST",
        headers:{
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36",
            "Referer": "https://cic.org.vn/webcenter/j_security_check",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        rejectUnauthorized: false,
        form:{
            j_username: "h79809001khanh1",
            j_password: "7199qpnX",
            j_character_encoding: "UTF-8",
            Login: "Login"
        }
    }
    try {
        let data  = await request(options);
    } catch (error) {
        result =error.response.headers['set-cookie'].join(";");
        let cookies =parseCookie(result);
        let newCookie = cookie.parse(cookies);
        newCookie = cookieArrayPase(newCookie);
        return {
            newCookie,
            cookies
        };
    }
}
const getDataSearch =async (cookie,cmnd)=>{
    const browser = await puppeteer.launch({headless: false,
    args:[
        "--disable-setuid-sandbox",
        "--ignore-certificate-errors",
        "--unhandled-rejections=strict",
        "--no-sandbox",
    ]});
    const page = await browser.newPage();
    await page.setViewport({ width: 2000, height: 2000});
    await page.setCookie(...cookie.newCookie);
    await page.goto("https://cic.org.vn/webcenter/portal/CMSPortal/page1422/page1996",
    {
            waitUntil: 'networkidle2',
    });
    let action = await page.evaluate(()=>{
        return document.getElementById("f1").action;
    })
    const cookies = await page.cookies();
    console.log(cookies);
    console.log(action);
    // await page.evaluate((cmnd) => {
    //     document.getElementById("T:oc_5065589220region1:soc10::content").selectedIndex = 0;
    //     document.getElementById("T:oc_5065589220region1:strLoaiKH::content").selectedIndex = 1;
    //     document.getElementById("T:oc_5065589220region1:txtsocmt::content").value=cmnd ;
    // },cmnd);
    // let element = await page.$('[id="T:oc_5065589220region1:btntimkiemkh"]');
    // await Promise.all([
    //     element.click(),
    //     waitForNetworkIdle(page, 100, 0) // equivalent to 'networkidle0'
    // ]);
    //     let data = await page.evaluate(() => document.querySelector('*').outerHTML);
    // let $ = cheerio.load(data);
    // let cic = $(".x10q>tbody>tr:nth-child(1)>td:nth-child(2)").text();
    // if(!cic){
    //     await browser.close();
    //     throw "NOT_FOUND_CIC";
    // }
    // console.log("cic la: " + cic);
    // await page.goto("https://cic.org.vn/webcenter/portal/CMSPortal?_afrLoop=503527279814704#%2Foracle%2Fwebcenter%2Fpage%2FscopedMD%2Fs774abad3_0d36_4122_a489_ccf21aaa3a66%2FPage225.jspx%40%3F_adf.ctrl-state%3Drgq4sieej_4",
    // {
    //     waitUntil: 'networkidle2'
    // })
    // const InputCic=await page.$('[id="T:oc_6025695556region1:txtmacic::content"]');
    // await InputCic.focus();
    // await page.keyboard.type(cic);
    // await Promise.all([
    //     page.focus('[id="T:oc_6025695556region1:txtdkkd::content"]'),
    //     waitForNetworkIdle(page, 100, 0) // equivalent to 'networkidle0'
    // ]);
    // let buttonSearch = await page.$('[id="T:oc_6025695556region1:btnhotrotimkiem"]');
    // await Promise.all([
    //     buttonSearch.click(),
    //     waitForNetworkIdle(page, 300, 0) // equivalent to 'networkidle0'
    // ]);
    // let buttonYes = await page.$('[id="T:oc_6025695556region1:tnYes"]');
    // await Promise.all([
    //     buttonYes.click()
    // ]);
    // let result = await page.evaluate(()=>{
    //     let cic = document.getElementById("T:oc_6025695556region1:txtmacic::content").value ;
    //     let dkkd = document.getElementById("T:oc_6025695556region1:txtdkkd::content").value ;
    //     let cmnd = document.getElementById("T:oc_6025695556region1:txtcmnd::content").value ;
    //     let ten = document.getElementById("T:oc_6025695556region1:txttenkh::content").value ;
    //     let diachi = document.getElementById("T:oc_6025695556region1:txtdiachi::content").value ;
    //     let dienthoai = document.getElementById("T:oc_6025695556region1:txtdienthoai::content").value ;
    //     let masothue = document.getElementById("T:oc_6025695556region1:txtmsthue::content").value ;
    //     let tgd = document.getElementById("T:oc_6025695556region1:txttgd::content").value ;
    //     return {
    //         cic,dkkd,cmnd,ten,diachi,dienthoai,masothue,tgd
    //     }
    // })
    // let dataHtml = await page.evaluate(() => document.querySelector('*').outerHTML);
    // $= cheerio.load(dataHtml);
    // let thongbao = $("tbody > tr:nth-child(4) > td.x51 > span").text();
    // await page.close();
    // return result ;
     await browser.close();
    
}
module.exports = {
    loginToWeb,
    getDataSearch
}
// const loginToWeb = async (cmnd)=>{
//     const browser = await puppeteer.launch({headless: true,
//         ignoreHTTPSErrors: true,
//         args:[
//             // "--disable-setuid-sandbox",
//             // "--force-device-scale-factor",
//             // "--ignore-certificate-errors",
//             // "--unhandled-rejections=strict",
//             "--no-sandbox",
//         ]});

//     const page = await browser.newPage();
//     await page.setViewport({ width: 2000, height: 2000});
//     await page.goto(URL_LOGIN,{
//         waitUntil: 'networkidle2',
//     });
//     await page.evaluate((config) => {
//         document.getElementById("username").value =config.cic.username ;
//         document.getElementById("password").value =config.cic.password ;
//     },config);
//     await page.click("#login");
//     await page.waitForNavigation("https://cic.org.vn/webcenter/portal/CMSPortal");
//     await page.goto("https://cic.org.vn/webcenter/portal/CMSPortal/page1422/page1996",
//     {
//         waitUntil: 'networkidle2',
//     })
//     try {
//         await page.evaluate((cmnd) => {
//             document.getElementById("T:oc_5065589220region1:soc10::content").selectedIndex = 0;
//             document.getElementById("T:oc_5065589220region1:strLoaiKH::content").selectedIndex = 1;
//             document.getElementById("T:oc_5065589220region1:txtsocmt::content").value=cmnd ;
//         },cmnd);
//     } catch (error) {
//         await browser.close();
//     }
//     let element = await page.$('[id="T:oc_5065589220region1:btntimkiemkh"]');
//     await Promise.all([
//         element.click(),
//         waitForNetworkIdle(page, 300, 0) // equivalent to 'networkidle0'
//     ]);
//     let data = await page.evaluate(() => document.querySelector('*').outerHTML);
//     let $ = cheerio.load(data);
//     let cic = $(".x10q>tbody>tr:nth-child(1)>td:nth-child(2)").text();
//     if(!cic){
//         await browser.close();
//         throw "NOT_FOUND_CIC";
//     }
//     console.log("cic la: " + cic);
//     await page.goto("https://cic.org.vn/webcenter/portal/CMSPortal?_afrLoop=503527279814704#%2Foracle%2Fwebcenter%2Fpage%2FscopedMD%2Fs774abad3_0d36_4122_a489_ccf21aaa3a66%2FPage225.jspx%40%3F_adf.ctrl-state%3Drgq4sieej_4",
//     {
//         waitUntil: 'networkidle2'
//     })
//     const InputCic=await page.$('[id="T:oc_6025695556region1:txtmacic::content"]');
//     await InputCic.focus();
//     await page.keyboard.type(cic);
//     await Promise.all([
//         page.focus('[id="T:oc_6025695556region1:txtdkkd::content"]'),
//         waitForNetworkIdle(page, 100, 0) // equivalent to 'networkidle0'
//     ]);
//     let buttonSearch = await page.$('[id="T:oc_6025695556region1:btnhotrotimkiem"]');
//     await Promise.all([
//         buttonSearch.click(),
//         waitForNetworkIdle(page, 200, 0) // equivalent to 'networkidle0'
//     ]);
//     let buttonYes = await page.$('[id="T:oc_6025695556region1:tnYes"]');
//     await Promise.all([
//         buttonYes.click(),
//         waitForNetworkIdle(page, 200, 0) // equivalent to 'networkidle0'
//     ]);
//     let result = await page.evaluate(()=>{
//         let cic = document.getElementById("T:oc_6025695556region1:txtmacic::content").value ;
//         let dkkd = document.getElementById("T:oc_6025695556region1:txtdkkd::content").value ;
//         let cmnd = document.getElementById("T:oc_6025695556region1:txtcmnd::content").value ;
//         let ten = document.getElementById("T:oc_6025695556region1:txttenkh::content").value ;
//         let diachi = document.getElementById("T:oc_6025695556region1:txtdiachi::content").value ;
//         let dienthoai = document.getElementById("T:oc_6025695556region1:txtdienthoai::content").value ;
//         let masothue = document.getElementById("T:oc_6025695556region1:txtmsthue::content").value ;
//         let tgd = document.getElementById("T:oc_6025695556region1:txttgd::content").value ;
//         return {
//             cic,dkkd,cmnd,ten,diachi,dienthoai,masothue,tgd
//         }
//     })
//     let dataHtml = await page.evaluate(() => document.querySelector('*').outerHTML);
//     $= cheerio.load(dataHtml);
//     let thongbao = $("tbody > tr:nth-child(4) > td.x51 > span").text();
//     console.log(thongbao);
//     await page.screenshot({path: 'example.png'});
//     await browser.close();
//     return result ;
// }
// module.exports ={
//     loginToWeb
// }
function waitForNetworkIdle(page, timeout, maxInflightRequests = 0) {
    page.on('request', onRequestStarted);
    page.on('requestfinished', onRequestFinished);
    page.on('requestfailed', onRequestFinished);
  
    let inflight = 0;
    let fulfill;
    let promise = new Promise(x => fulfill = x);
    let timeoutId = setTimeout(onTimeoutDone, timeout);
    return promise;
  
    function onTimeoutDone() {
      page.removeListener('request', onRequestStarted);
      page.removeListener('requestfinished', onRequestFinished);
      page.removeListener('requestfailed', onRequestFinished);
      fulfill();
    }
  
    function onRequestStarted() {
      ++inflight;
      if (inflight > maxInflightRequests)
        clearTimeout(timeoutId);
    }
  
    function onRequestFinished() {
      if (inflight === 0)
        return;
      --inflight;
      if (inflight === maxInflightRequests)
        timeoutId = setTimeout(onTimeoutDone, timeout);
    }
  }
