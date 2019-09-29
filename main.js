var express = require('express');
var connect = require('connect');
var app = express();
var port = process.env.PORT || 8080;

// Configuration
app.use(express.static(__dirname+'public'));

// Routes
require('./routes/routes.js')(app);

app.listen(port);
console.log('The App runs on port ' + port);


//http -f POST 127.0.0.1:8080/upload name='upload' upload@1.jpg