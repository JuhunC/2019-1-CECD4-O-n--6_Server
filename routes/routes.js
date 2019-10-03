var express = require("express");
var fs = require("fs");
var app = express();
var yolov3 = require('../models/yolov3');
var multer, storage, path, crypto;
multer = require('multer')
path = require('path');
crypto = require('crypto');

server_dir = 'C:\\Users\\johnc\\Documents\\2019-1-CECD4-O-n--6_Server\\'
yolov3_out_dir = 'C:\\Users\\johnc\\Documents\\2019-1-CECD4-O-n--6_Server\\output\\yolov3\\'
gen_inpaint_out_dir = 'C:\\Users\\johnc\\Documents\\2019-1-CECD4-O-n--6_Server\\output\\gen_inpaint\\'
module.exports = function (app) {
    storage = multer.diskStorage({
        destination: server_dir+'\\uploads\\',
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
            yolov3.run_yolov3(server_dir+"\\uploads\\"+req.file.filename , yolov3_out_dir);
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