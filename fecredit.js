const request = require("request-promise");
let config = require("./config");
const URL_LOGIN ="https://portal.fecredit.com.vn/Default.aspx?a=l";
const URL_REPAYMEN= "https://portal.fecredit.com.vn/F1/PDFE_RP_Search.aspx";
const cheerio = require("cheerio");
let {parseCookie} = require("./common/string");
const getCookieUser = async ()=>{
    console.log(config);
    try {
        const options ={
            method:"POST",
            url:URL_LOGIN,
            headers:{
                Referer:"https://portal.fecredit.com.vn/Default.aspx?a=l",
                'Content-Type': 'application/x-www-form-urlencoded',
                "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
                'Connection':'keep-alive',
                'Accept':'*/*',
                'Host':'portal.fecredit.com.vn'
            },
            formData:{
                '__EVENTTARGET': '',
                '__EVENTARGUMENT': '',
                'ToolkitScriptManager1_HiddenField':' ;;AjaxControlToolkit, Version=4.1.60501.0, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e:en-US:5c09f731-4796-4c62-944b-da90522e2541:475a4ef5:5546a2b:d2e10b12:effe2a26:b209f5e5',
                'ctl00$MainContent$txtUserName': config.fecredit.username,
                'ctl00$MainContent$txtPassword': config.fecredit.password,
                'ctl00$MainContent$btnLogin': 'Login',
                'ctl00$hidGlobalGeneralError': 'Lỗi hệ thống, vui lòng liên hệ IT để được hỗ trợ. Cảm ơn.',
                'ctl00$hidGlobalAccessDeniedMsg': 'Bạn chưa được cấp quyền truy cập vào trang này, vui lòng liên hệ IT để được hỗ trợ. Cảm ơn.',
                '__VIEWSTATEGENERATOR': 'CA0B0334',
                '__VIEWSTATE': '/wEPDwULLTEyODM2MDcxMjkPZBYCZg9kFgICAw9kFhwCBQ8PFgIeB1Zpc2libGVoZGQCCw9kFgJmDw8WBB4IQ3NzQ2xhc3NlHgRfIVNCAgJkZAINDw8WAh8AaGQWAmYPDxYEHwFlHwICAmQWAgIBD2QWAgIVD2QWAmYPD2QWAh4Hb25jbGljawUzOyBfX2RvUG9zdEJhY2soJ2N0bDAwJG9iX21udV9TeXN0ZW1fSW5mbyRjdGwyNicsJycpZAIPD2QWAmYPDxYEHwFlHwICAmQWAgIBD2QWBAICD2QWAmYPD2QWAh8DBWd3aW5kb3cub3BlbignaHR0cDovL2ZlY3JlZGl0LmNvbS52bi8nKTtyZXR1cm4gZmFsc2U7OyBfX2RvUG9zdEJhY2soJ2N0bDAwJG9iX21udV9JbmZvcm1hdGlvbiRjdGwwNycsJycpZAIXD2QWAmYPD2QWAh8DBTM7IF9fZG9Qb3N0QmFjaygnY3RsMDAkb2JfbW51X0luZm9ybWF0aW9uJGN0bDI4JywnJylkAhEPZBYCZg8PFgQfAWUfAgICZGQCEw9kFgJmDw8WBB8BZR8CAgJkZAIVD2QWAmYPDxYEHwFlHwICAmRkAhcPZBYCZg8PFgQfAWUfAgICZGQCGQ9kFgJmDw8WBB8BZR8CAgJkZAIbD2QWAmYPDxYEHwFlHwICAmRkAh0PZBYCZg8PFgQfAWUfAgICZGQCHw9kFgJmDw8WBB8BZR8CAgJkZAIhD2QWAmYPDxYEHwFlHwICAmRkAicPZBYGAgEPDxYCHwBoZGQCAw8PFgIfAGdkFgRmD2QWAgIBDxBkZBYBZmQCBg8PFgQeG01haW5Db250ZW50X1VDX0NhcHRjaGExdGV4dAUFTTFUODIfAGhkFgJmD2QWAmYPZBYCAgEPDxYCHghJbWFnZVVybAVXL0NhcHRjaGFfR2V0SW1nVGV4dC5hc2h4P0NhcHRjaGFUZXh0PTZDeGVsUGZBNWptMFhXV0RCUTBEZWUlMmJHb01zMGk3dDY2cjZhJTJmQTB1NEw4JTNkZGQCBQ9kFgICBw8PFgQeG01haW5Db250ZW50X1VDX0NhcHRjaGEydGV4dAUFMkVRS1gfAGhkFgJmD2QWAmYPZBYCAgEPDxYCHwUFVy9DYXB0Y2hhX0dldEltZ1RleHQuYXNoeD9DYXB0Y2hhVGV4dD1UUGMlMmY1dmpXdUtoYTBNZEVoOUVJemh6Wm03ZFpGaFQ4d3dzMiUyZmNnd3gzbyUzZGRkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYBBR1jdGwwMCRNYWluQ29udGVudCRjaGtSZW1lbWJlckTFljORtBLiYW2QoChD2OQBEbH1'
      
            },
            resolveWithFullResponse:true
        }
        let data = await request(options);
        return "GET_COOKIE_ERROR" ;
    } catch (error) {
        result =error.response.headers['set-cookie'].join(";");
        let cookie =parseCookie(result);
        return cookie;
    }
}
const getInfoRepayment =async (cardNumber,contractNumber,cookie)=>{
    console.log(cookie);
    const options= {
            method: 'POST',
            url: URL_REPAYMEN,
            headers: {
            Referer: 'https://portal.fecredit.com.vn/Default.aspx?a=l',
            'Content-Type': 'application/x-www-form-urlencoded',
            cookie: cookie,
        },
        form:{
            'ctl00$MainContent$txtIDCardNumber': cardNumber,
            'ctl00$MainContent$txtContractNumber': contractNumber,
            'ctl00$MainContent$txtApplicationID': '',
            'ctl00$MainContent$btnSearch': 'Search',
            'ctl00$MainContent$hd_Search_With_Alt_Con': 'true',
            '__VIEWSTATEGENERATOR': 'A31B589B',
            '__EVENTVALIDATION': '/wEdAAtOynALMYCRIfQ14xSvcPHWzwgS2tdHylGRNRDDH4TjWG92wvJqlbgE0zRZaIL8JEXIjDfHLe4ehemt+mOXzjGnTxalVPyfTWhoUBGrQajq0K0+TBlGRd0gsGk2kWbzlNWfiPxz2fOjRGXG18EfY8QO2RYqGyxWFMH77RhHpwYYxYlfhb+NjPPWl0jAvq6Gk088BxC8Ppi6wNjTgPbKRc+vDHBeiL/N+tG0rlHRnP7CZY+5rmanOld7Wihf4t66gmxaSlai',
            '__VIEWSTATE': '/wEPDwULLTE2NTM0OTg3NTMPZBYCZg9kFgICAw9kFhoCBQ8PFgIeB1Zpc2libGVnZBYCAgIPFgIeBFRleHQFCEtTMjUwMzI0ZAILD2QWAmYPDxYEHghDc3NDbGFzc2UeBF8hU0ICAmRkAg0PZBYCZg8PFgQfAmUfAwICZBYCAgEPZBYQZg9kFgJmDw9kFgIeB29uY2xpY2sFMzsgX19kb1Bvc3RCYWNrKCdjdGwwMCRvYl9tbnVfU3lzdGVtX0luZm8kY3RsNjYnLCcnKWQCCw9kFgJmDw9kFgIfBAUzOyBfX2RvUG9zdEJhY2soJ2N0bDAwJG9iX21udV9TeXN0ZW1fSW5mbyRjdGw3NycsJycpZAIOD2QWAmYPD2QWAh8EBTM7IF9fZG9Qb3N0QmFjaygnY3RsMDAkb2JfbW51X1N5c3RlbV9JbmZvJGN0bDgwJywnJylkAhMPZBYCZg8PZBYCHwQFMzsgX19kb1Bvc3RCYWNrKCdjdGwwMCRvYl9tbnVfU3lzdGVtX0luZm8kY3RsODUnLCcnKWQCFQ9kFgJmDw9kFgIfBAUzOyBfX2RvUG9zdEJhY2soJ2N0bDAwJG9iX21udV9TeXN0ZW1fSW5mbyRjdGw4NycsJycpZAIyD2QWAmYPD2QWAh8EBTQ7IF9fZG9Qb3N0QmFjaygnY3RsMDAkb2JfbW51X1N5c3RlbV9JbmZvJGN0bDExNicsJycpZAI0D2QWAmYPD2QWAh8EBTQ7IF9fZG9Qb3N0QmFjaygnY3RsMDAkb2JfbW51X1N5c3RlbV9JbmZvJGN0bDExOCcsJycpZAI3D2QWAmYPD2QWAh8EBTQ7IF9fZG9Qb3N0QmFjaygnY3RsMDAkb2JfbW51X1N5c3RlbV9JbmZvJGN0bDEyMScsJycpZAIPD2QWAmYPDxYEHwJlHwMCAmQWAgIBD2QWEAICD2QWAmYPD2QWAh8EBWd3aW5kb3cub3BlbignaHR0cDovL2ZlY3JlZGl0LmNvbS52bi8nKTtyZXR1cm4gZmFsc2U7OyBfX2RvUG9zdEJhY2soJ2N0bDAwJG9iX21udV9JbmZvcm1hdGlvbiRjdGwzOScsJycpZAIHD2QWAmYPD2QWAh8EBTM7IF9fZG9Qb3N0QmFjaygnY3RsMDAkb2JfbW51X0luZm9ybWF0aW9uJGN0bDQ0JywnJylkAgkPZBYCZg8PZBYCHwQFMzsgX19kb1Bvc3RCYWNrKCdjdGwwMCRvYl9tbnVfSW5mb3JtYXRpb24kY3RsNDYnLCcnKWQCCw9kFgJmDw9kFgIfBAUzOyBfX2RvUG9zdEJhY2soJ2N0bDAwJG9iX21udV9JbmZvcm1hdGlvbiRjdGw0OCcsJycpZAIRD2QWAmYPD2QWAh8EBTM7IF9fZG9Qb3N0QmFjaygnY3RsMDAkb2JfbW51X0luZm9ybWF0aW9uJGN0bDU0JywnJylkAhUPZBYCZg8PZBYCHwQFMzsgX19kb1Bvc3RCYWNrKCdjdGwwMCRvYl9tbnVfSW5mb3JtYXRpb24kY3RsNTgnLCcnKWQCFw9kFgJmDw9kFgIfBAUzOyBfX2RvUG9zdEJhY2soJ2N0bDAwJG9iX21udV9JbmZvcm1hdGlvbiRjdGw2MCcsJycpZAIbD2QWAmYPD2QWAh8EBTM7IF9fZG9Qb3N0QmFjaygnY3RsMDAkb2JfbW51X0luZm9ybWF0aW9uJGN0bDY0JywnJylkAhEPZBYCZg8PFgQfAmUfAwICZGQCEw9kFgJmDw8WBB8CZR8DAgJkZAIVD2QWAmYPDxYEHwJlHwMCAmRkAhcPZBYCZg8PFgQfAmUfAwICZGQCGQ9kFgJmDw8WBB8CZR8DAgJkZAIbDw8WAh8AZ2QWAmYPDxYEHwJlHwMCAmQWAgIBD2QWAmYPZBYCZg8PZBYCHwQFKjsgX19kb1Bvc3RCYWNrKCdjdGwwMCRvYl9tbnVfTE0kY3RsMTQnLCcnKWQCHQ9kFgJmDw8WBB8CZR8DAgJkZAIfD2QWAmYPDxYEHwJlHwMCAmRkAiEPZBYCZg8PFgQfAmUfAwICZGRk4rFSlScvA2n4UHDssZ7psccEDPQ='
        }
    }
    let dataResult = await request(options);
    let $ = cheerio.load(dataResult);
    let card_number = $("#ctl01 > div.page > div.main > table:nth-child(7) > tbody > tr:nth-child(1) > td:nth-child(2)").text().trim();
    let application_id=$("#ctl01 > div.page > div.main > table:nth-child(7) > tbody > tr:nth-child(2) > td:nth-child(2)").text().trim(); 
    let contract_number=$("#ctl01 > div.page > div.main > table:nth-child(7) > tbody > tr:nth-child(3) > td:nth-child(2)").text().trim();
    let customer_name = $("#ctl01 > div.page > div.main > table:nth-child(7) > tbody > tr:nth-child(4) > td:nth-child(2)").text().trim();
    let address = $("#ctl01 > div.page > div.main > table:nth-child(7) > tbody > tr:nth-child(5) > td:nth-child(2)").text().trim();
    let monthly_due_date = $("#ctl01 > div.page > div.main > table:nth-child(7) > tbody > tr:nth-child(6) > td:nth-child(2)").text().trim();
    let first_date_repayment = $("#ctl01 > div.page > div.main > table:nth-child(7) > tbody > tr:nth-child(7) > td:nth-child(2)").text().trim();
    let total_loan_amount = $("#ctl01 > div.page > div.main > table:nth-child(7) > tbody > tr:nth-child(8) > td:nth-child(2)").text().trim();
    let loan_term = $("#ctl01 > div.page > div.main > table:nth-child(7) > tbody > tr:nth-child(9) > td:nth-child(2)").text().trim();
    let loan_EMI = $("#ctl01 > div.page > div.main > table:nth-child(7) > tbody > tr:nth-child(10) > td:nth-child(2)").text().trim();
    let PRODUCT_CODE=$("#ctl01 > div.page > div.main > table:nth-child(7) > tbody > tr:nth-child(11) > td:nth-child(2)").text().trim();
    const obj ={
        card_number:card_number,
        application_id:application_id,
        contract_number:contract_number,
        customer_name:customer_name,
        address:address,
        monthly_due_date:monthly_due_date,
        first_date_repayment:first_date_repayment,
        total_loan_amount:total_loan_amount,
        loan_term:loan_term,
        loan_EMI:loan_EMI,
        PRODUCT_CODE:PRODUCT_CODE
    }
    return obj ;
}
const getDataReviews =async (Application,Contract,cookie)=>{
    const options= {
        method: 'GET',
        url: `https://portal.fecredit.com.vn/F1/PDFE_Review.aspx?t=RPS&i=${Application}&c=${Contract}`,
        headers: {
            Referer:"https://portal.fecredit.com.vn/F1/PDFE_RP_Search.aspx" ,
            cookie: cookie,
        },
    }
    let data = await request(options);
    return data ;
}
module.exports={
    getCookieUser,
    getInfoRepayment,
    getDataReviews
}