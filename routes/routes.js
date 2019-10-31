var express = require("express"); 
var fs = require('fs');
var app = express();
var yolov3 = require('../models/yolov3');
var inpaint = require('../models/gen_inpaint');
var multer, storage, path, crypto;
multer = require('multer');
path = require('path');
//crypto = require('crypto');

upload_dir = 'C:\\Users\\johnc\\Documents\\2019-1-CECD4-O-n--6_Server\\uploads\\'
server_dir = 'C:\\Users\\johnc\\Documents\\2019-1-CECD4-O-n--6_Server\\'
yolov3_out_dir = 'C:\\Users\\johnc\\Documents\\2019-1-CECD4-O-n--6_Server\\output\\yolov3\\'
gen_inpaint_out_dir = 'C:\\Users\\johnc\\Documents\\2019-1-CECD4-O-n--6_Server\\output\\gen_inpaint\\'


storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, 'uploads/')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname+'_'+Date.now()+path.extname(file.originalname))
    }
})
var upload = multer({
    storage : storage
})

module.exports = function(app) {


    app.get('/',function(req,res){
        res.end("Node-File-Upload");

    });
    app.post('/yolov3',upload.single('image'), function(req, res) {//filename.split('.').slice(0, -1).join('.')
        yolov3.run_yolov3(res, server_dir+'/uploads/'+req.file.filename, server_dir+'\\output\\yolov3\\'+req.file.filename.split('.').slice(0,-1).join('.'));
    });

    app.get('/uploads/:file', function (req, res){
            file = req.params.file;
            var img = fs.readFileSync("/uploads/" + file);
            res.writeHead(200, {'Content-Type': 'image/jpg' });
            res.end(img, 'binary');
    });

    app.post('/inpainting',upload.single('image'),function(req,res){
        var body = [];
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            var json_data = JSON.parse(body); // get string
            json_data = JSON.parse(json_data);// string to json object
            console.log(typeof(json_data));
            console.log(json_data);
            inpaint.run_gen_inpaint(req,res,json_data);
        });
    })
};
