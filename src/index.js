var express = require('express')
var request = require('request');
var app = express();

//require('./mock/mock');

app.get('/health', function (req, res) {
   request.get('http://localhost:8080/health', (error, response, body) => {
       if(error) {
           res.send(error);
       }
       res.send(body);
   })
});

app.listen(3000);