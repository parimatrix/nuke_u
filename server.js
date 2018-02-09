/**
 * Created by ParikanshAndAtikant on 08/02/2018.
 */
const express = require('express');
const fs = require('fs');
const app = express();
const port = 2500;

app.use('/',express.static('public'));

app.listen(port, function () {
   console.log("Server is running on " + port);
});