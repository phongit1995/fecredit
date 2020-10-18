const request = require("request-promise");
let config = require("./../config");
let {parseCookie}= require("./../common/string");
let puppeteer = require("puppeteer");
const URL_LOGIN ="https://cic.org.vn/webcenter/j_security_check";

const loginToWeb = async ()=>{
    const browser = await puppeteer.launch({headless: false,waitUntil:['load','domcontentloaded','networkidle0','networkidle2']});
    const page = await browser.newPage();
    await page.setViewport({ width: 2000, height: 2000});
    await page.goto(URL_LOGIN,{
        waitUntil: 'domcontentloaded'
    });
    await page.evaluate((config) => {
        document.getElementById("username").value =config.cic.username ;
        document.getElementById("password").value =config.cic.password ;
    },config);
    await page.click("#login");
    await page.goto("https://cic.org.vn/webcenter/portal/CMSPortal/page1422/page1996?wc.contextURL=/spaces/CMSPortal&_adf.ctrl-state=60e25aptn_4&_afrLoop=413131963072947",
    {
        waitUntil: 'domcontentloaded'
    })
    await page.evaluate(() => {
        document.getElementById("T:oc_5065589220region1:soc10::content").selectedIndex = 0;
        document.getElementById("T:oc_5065589220region1:strLoaiKH::content").selectedIndex = 1;
        document.getElementById("T:oc_5065589220region1:txtsocmt::content").value=301362478 ;
    });
    let element = await page.$('[id="T:oc_5065589220region1:btntimkiemkh"]');
    await page.waitFor(100);
    await element.click({waitUntil: 'domcontentloaded'});
    // await Promise.all([element.click()])
    //await page.waitForSelector(".x10q>tbody");
    // let data = await page.evaluate(() => {
    //     return  document.querySelector(".p_AFFocused").children[1].innerText
    // });
    // console.log(data);
    console.log("Phong");
    await page.screenshot({path: 'example.png'});
    //await browser.close();
}
module.exports ={
    loginToWeb
}