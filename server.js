/**
 * Created by ParikanshAndAtikant on 08/02/2018.
 */
const express = require('express');
const fs = require('fs');
const app = express();
const port = 2500;
const SHA256 = require("crypto-js/sha256");

var blockchain = [{
    "name" : "nuke_u",
    "number" : 0,
    "bill_amt" : 42,
    "prev_hash" : 0,
    "curr_hash" : 42
}];
var price = [50];
fs.writeFile('blockchain.txt' , JSON.stringify(blockchain), function (err) {
    if(err) throw err;
    console.log("started blockchain in file");
});
fs.writeFile('price.txt' , JSON.stringify(price), function (err) {
    if(err) throw err;
    console.log("started price in file");
});
var curr_len = 0;
app.use('/',express.static('public'));

app.get('/get_prices',function (req,res) {
   res.send(JSON.stringify(price));
});
app.get('/insert_price',function (req,res) {
   var x = parseFloat(req.query.price);
   price.push(x);

    fs.writeFile('price.txt' , JSON.stringify(price), function (err) {
        if(err) throw err;
        console.log("started price in file");
    });
});
app.get('/addblock', function (req,res) {

    var obj = {
        "name" : req.query.name,
        "number" : parseInt(req.query.num),
        "bill_amt" : parseInt(req.query.bill_amt),
        "prev_hash" : blockchain[curr_len].curr_hash,
        "curr_hash" : SHA256("" + req.query.name + req.query.num + (req.query.bill_amt) + blockchain[curr_len].curr_hash)
    };
    blockchain.push(obj);
    curr_len++;
    fs.writeFile('blockchain.txt' , JSON.stringify(blockchain), function (err) {
        if(err) throw err;
        console.log("added block in chain");
        res.send("added block in chain");
    });
});


app.listen(port, function () {
   console.log("Server is running on " + port);
});