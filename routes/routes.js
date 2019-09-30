var express = require("express");
var fs = require("fs");
var app = express();
var yolov3 = require('../models/yolov3');
var multer, storage, path, crypto;
multer = require('multer')
path = require('path');
crypto = require('crypto');

module.exports = function (app) {
    storage = multer.diskStorage({
        destination: '/home/johnc/Desktop/2019-1-CECD4-O-n--6_Server/uploads/',
        filename: function (req, file, cb) {
            return crypto.pseudoRandomBytes(16, function (err, raw) {
                if (err) {
                    return cb(err);
                }
                return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
            });
        }
    });
    // Post files
    app.post(
        "/upload",
        multer({
            storage: storage
        }).single('upload'), function (req, res) {
            console.log(req.file);
            console.log(req.body);
            // redirect to /uploads/ for uploading Image file
            res.redirect("/uploads/" + req.file.filename);
            console.log(req.file.filename);
            yolov3.run_yolov3("/home/johnc/Desktop/2019-1-CECD4-O-n--6_Server/uploads/"+req.file.filename);
            return res.status(200).end();
    });
    app.get('/uploads/:upload', function (req, res) {
        file = req.params.upload;
        console.log(req.params.upload);
        var img = fs.readFileSync(__dirname + "/uploads/" + file);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(img, 'binary');
        console.log("Done");
        return;
    });
    
    // GET index.html
    app.get('/',function(req,res){
        fs.readFile('./index.html',function (err, data){
            res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
            res.write(data);
            res.end();
        });
    });
};