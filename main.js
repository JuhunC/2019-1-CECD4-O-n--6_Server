var express = require('express');
var connect = require('connect');
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 8080;

// Configuration
app.use(express.static(__dirname+'public'));
//app.use(connect.cookieParser());
// app.use(connect.logger('dev'));
// app.use(connect.bodyParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
//app.use(connect.json);
// app.use(connect.urlencoded());
// Routes
require('./routes/routes.js')(app);

app.listen(port);
console.log('The App runs on port ' + port);


//http -f POST 127.0.0.1:8080/yolov3 name='upload' upload@2.jpg