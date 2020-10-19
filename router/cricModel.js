const request = require("request-promise");
let config = require("./../config");
let cheerio = require("cheerio");
let puppeteer = require("puppeteer");
const URL_LOGIN ="https://cic.org.vn/webcenter/j_security_check";

const loginToWeb = async (cmnd)=>{
    const browser = await puppeteer.launch({headless: false,
        ignoreHTTPSErrors: true,
        args:[
            "--disable-gpu",
            "--disable-setuid-sandbox",
            "--force-device-scale-factor",
            "--ignore-certificate-errors",
            "--unhandled-rejections=strict",
            "--no-sandbox",
        ]});
    const page = await browser.newPage();
    await page.setViewport({ width: 2000, height: 2000});
    await page.goto(URL_LOGIN,{
        waitUntil: 'networkidle2',
    });
    await page.evaluate((config) => {
        document.getElementById("username").value =config.cic.username ;
        document.getElementById("password").value =config.cic.password ;
    },config);
    await page.click("#login");
    await page.waitForNavigation("https://cic.org.vn/webcenter/portal/CMSPortal");
    await page.goto("https://cic.org.vn/webcenter/portal/CMSPortal/page1422/page1996",
    {
        waitUntil: 'networkidle2',
    })
    try {
        await page.evaluate((cmnd) => {
            document.getElementById("T:oc_5065589220region1:soc10::content").selectedIndex = 0;
            document.getElementById("T:oc_5065589220region1:strLoaiKH::content").selectedIndex = 1;
            document.getElementById("T:oc_5065589220region1:txtsocmt::content").value=cmnd ;
        },cmnd);
    } catch (error) {
        await browser.close();
    }
    let element = await page.$('[id="T:oc_5065589220region1:btntimkiemkh"]');
    await page.waitFor(100);
    await element.click();
    await page.waitFor(500);
    let data = await page.evaluate(() => document.querySelector('*').outerHTML);
    let $ = cheerio.load(data);
    let cic = $(".x10q>tbody>tr:nth-child(1)>td:nth-child(2)").text();
    if(!cic){
        await browser.close();
        throw "NOT_FOUND_CIC";
    }
    console.log(cic);
    await page.goto("https://cic.org.vn/webcenter/portal/CMSPortal?_afrLoop=503527279814704#%2Foracle%2Fwebcenter%2Fpage%2FscopedMD%2Fs774abad3_0d36_4122_a489_ccf21aaa3a66%2FPage225.jspx%40%3F_adf.ctrl-state%3Drgq4sieej_4",
    {
        waitUntil: 'networkidle2'
    })
    await page.evaluate((cic) => {
        document.getElementById("T:oc_6025695556region1:txtmacic::content").value = cic;
    },cic);
    let buttonSearch = await page.$('[id="T:oc_6025695556region1:btnhotrotimkiem"]');
    await buttonSearch.click();
    await page.waitFor(500);
    let buttonYes = await page.$('[id="T:oc_6025695556region1:tnYes"]');
    console.log(buttonYes);
    await buttonYes.click();
    console.log("Phong");
    await page.screenshot({path: 'example.png'});
    //await browser.close();
}
module.exports ={
    loginToWeb
}