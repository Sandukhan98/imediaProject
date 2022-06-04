var express = require("express");
const { type } = require("os");
var app = express();
var cors = require('cors')
const { createClient } = require("webdav");


app.use(cors()) // Use this after the variable declaration
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended: true})); 
const request = require('request');
const cheerio = require('cheerio');
//get access token to execute lightspeed requests
function getHeader(callback){
    request({
        url: 'https://cloud.lightspeedapp.com/oauth/access_token.php', //URL to hit
        // qs: {from: 'blog example', time: +new Date()}, //Query string data
        method: 'POST',
        //Lets post the following key/values as form
        json: {
            "client_id": "1853a014a838e8ac2162be1f89dedc9a323fb6670c0264058a13f7496b0db88e",
            "client_secret": "2d0f4f50b05e8e5566e2d3eae18800024de1b3c3bfc33b2acc6ef30fe1f334dc",
            "refresh_token": "86be2f0b8aba57fbc63419f889238f5198ac46df",
            "grant_type": "refresh_token"
          }
    }, function(error, response, body){
        if(error) {
            console.error(error);
        } else {
            callback({
                Authorization : "Bearer " + body.access_token,
                Aceept : "application/json"
            });
        }
    });
}

function verifyClientExistence(found, notFound, number, email) {
    getHeader((header) => {
        request({
            url: 'https://api.lightspeedapp.com/API/Account/253647/Customer.json?load_relations=["Contact"]&Contact.mobile=' + number, //URL to hit
            // qs: {from: 'blog example', time: +new Date()}, //Query string data
            method: 'GET',
            headers : header
        }, function(error, response, body){
            if(error) {
                console.error(error);
            } else {
                jsResponse = JSON.parse(body)
                var count = parseInt(jsResponse["@attributes"].count)
                if(count > 0){
                    found(jsResponse.Customer);
                }
                else{
                    request({
                        url: 'https://api.lightspeedapp.com/API/Account/253647/Customer.json?load_relations=["Contact"]&Contact.email=' + email, //URL to hit
                        // qs: {from: 'blog example', time: +new Date()}, //Query string data
                        method: 'GET',
                        headers : header
                    }, function(error, response, body){
                        if(error) {
                            console.error(error);
                        } else {
                            jsResponse = JSON.parse(body)
                            var count = parseInt(jsResponse["@attributes"].count)
                            if(count  == 1){
                                found(jsResponse.Customer);
                            }
                            else if (count > 1) {
                                found(jsResponse.Customer[0]);
                            }
                            else{
                                notFound();
                            }
                        }
                    });
                }
            }
        });
    })
}

function addNewCustomer(info, callback){
    getHeader((header) => {
        request({
            url: 'https://api.lightspeedapp.com/API/Account/253647/Customer.json', //URL to hit
            // qs: {from: 'blog example', time: +new Date()}, //Query string data
            method: 'POST',
            headers : header,
            json: info
        }, function(error, response, body){
            if(error) {
                console.error(error);
            } else {
                callback({customerID : body.Customer.customerID});
            }
        });
    })
}

function getCbe2JsonKey(callback){

        request({
            url:"https://imedia-38182-default-rtdb.europe-west1.firebasedatabase.app/ip.json",
            method: 'GET'}, function (error, res, serverIpBody) {
                request({
                    url: "http://"+JSON.parse(serverIpBody)+":8000/config/config.json",
                    method: 'GET',
                }, function(error, response, body){
                    if(error) {
                        console.error(error);
                    } else {
                        var jsBody = JSON.parse(body)
                        callback(jsBody.cbe2json.ID, jsBody.cbe2json. secretKey);
                    }
                });
            })
}

//parsing html and getting information
function getCompanyInfo(vat, callback) {
    getCbe2JsonKey((CBE2JSONID, CBE2JSONsecretKey) => {
        request({
            url: "https://api.cbe2json.be/byCBE",
            method: 'POST',
            body : JSON.stringify({
                clientId : CBE2JSONID,
                secretKey : CBE2JSONsecretKey,
                data : {
                    cbe: vat.number
                  }
            })
        }, function(error, response, body){
            if(error) {
                console.error(error);
            } else {
                var jsBody = JSON.parse(body)
                var info = {}
    
                if(jsBody.enterpriseNumber){
                    info = {
                        tva : "BE" + jsBody.enterpriseNumber.replace(/\./g,""),
                        company : jsBody.denominations[0].denomination,
                        address : jsBody.addresses[0].streetFR + " " + jsBody.addresses[0].houseNumber,
                        zip : jsBody.addresses[0].zipcode,
                        city : jsBody.addresses[0].municipalityFR,
                        name : "",
                        lastname : ""
                    }
    
                    jsBody.establishments[0].contacts.forEach(element => {
                        if(element.contactType == "TEL")
                        info["tel"] = element.value.replace(/\//g, "").replace(/\./g, "");
                        else if(element.contactType == "EMAIL")
                        info["email"] = element.value;
                    });
                }
                else{
                    info = {
                    tva : "",
                    name : "",
                    address : "",
                    zip : "",
                    city : "",
                    tel : "",
                    email : "",
                    lastName : "",
                    company : ""
                    }
                }
                callback(info);
                
            }
        });
    })
}

// app.post("/vat", (req, res, next) => {
//     getCompanyInfo(req.query, (info) => {
//         res.send(info);
//     })
// });


app.post("/tva", (req, res, next) => {

    getCompanyInfo(req.body, (info) => {
        res.send(info);
    })
});



app.post("/addCustomer", (req, res, next) => {
    verifyClientExistence((customer) => {
        res.send({
            firstName : customer.firstName,
            lastName : customer.lastName,
            customerID : customer.customerID,
        })
    }, () => {
        addNewCustomer({
            firstName : req.body.name,
            lastName : req.body.lastname,
            vatNumber : req.body.tva,
            company : req.body.company,
            Contact : {
                Addresses : {
                    ContactAddress : {
                        address1 : req.body.address,
                        city : req.body.city,
                        zip : req.body.zip
                    }
                },
                Phones : {
                    Contact : {
                        number : req.body.tel,
                        useType : "Mobile"
                    }
                },
                Emails:{
                    ContactEmail : {
                        address : req.body.email,
                        useType : "Primary"
                    }
                }
            }
        }, (response) => {res.send({
            firstName : response.firstName,
            lastName : response.lastName,
            customerID : response.customerID,
        })})
    }, req.body.tel, req.body.email);
});

app.post("/exist", (req, res, next) => {
    verifyClientExistence((response)=>{
        res.send({
            found : true,
            firstName : response.firstName,
            lastName : response.lastName,
            customerID : response.customerID,
        });
    },
    () => {
        res.send({
            found : false,
        });
    }, null, req.body.email)
});

app.post("/workorder", (req, res, next) => {
    console.log(req.body); 
    res.send({response : "OK"});
});

app.get("/pubfiles", (req, res, next) => {

    request({
        url:"https://imedia-38182-default-rtdb.europe-west1.firebasedatabase.app/ip.json",
        method: 'GET'}, function (error, res, serverIpBody) {

            const client = createClient("http://"+JSON.parse(serverIpBody)+":8080/remote.php/dav/files/abdel/pub", {
                username: "abdel",
                password: "nassira8105"
                });
            
                client.getDirectoryContents("/").then((v)=>{
                    resList = []
                    v.forEach(element => {
                        resList.push({
                            filename : element.filename,
                            mime : element.mime
                        });
                    });
                    res.send(resList);
                });
        })
})

app.listen(3000, () => {
 console.log("Server running on port 3000");
 
});