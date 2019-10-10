var express = require("express");
var fs = require("fs");
var app = express();
var yolov3 = require('../models/yolov3');
var multer, storage, path, crypto;
multer = require('multer');
path = require('path');
crypto = require('crypto');

upload_dir = 'C:\\Users\\johnc\\Documents\\2019-1-CECD4-O-n--6_Server\\uploads\\'
server_dir = 'C:\\Users\\johnc\\Documents\\2019-1-CECD4-O-n--6_Server\\'
yolov3_out_dir = 'C:\\Users\\johnc\\Documents\\2019-1-CECD4-O-n--6_Server\\output\\yolov3\\'
gen_inpaint_out_dir = 'C:\\Users\\johnc\\Documents\\2019-1-CECD4-O-n--6_Server\\output\\gen_inpaint\\'

var fs = require('fs');

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
    app.post('/yolov3',upload.single('image'), function(req, res) {
        yolov3.run_yolov3(server_dir+'/uploads/'+req.file.filename, server_dir+'/output/yolov3/'+req.fiel.filename);
    });


    app.get('/uploads/:file', function (req, res){
            file = req.params.file;
            var img = fs.readFileSync("/uploads/" + file);
            res.writeHead(200, {'Content-Type': 'image/jpg' });
            res.end(img, 'binary');

    });
};
// storage = multer.diskStorage({
//     destination : function(req,file,cb){
//         cb(null, 'uploads/')
//     },
//     filename: function(req,file,cb){
//         cb(null, file.fieldname+'_'+Date.now()+path.extname(file.originalname))
//     }
// })
// var upload = multer({
//     storage : storage
// })
// module.exports = function (app) {  
    
//     app.post('/yolov3', upload.single('image'), function(req, res) {
//         yolov3.run_yolov3(server_dir + 'uploads/' + req.file.filename , yolov3_out_dir)
//         res.sendStatus(200);
//     });



//     // storage = multer.diskStorage({
//     //     destination: server_dir+'\\uploads\\',
//     //     filename: function (req, file, cb) {
//     //         return crypto.pseudoRandomBytes(16, function (err, raw) {
//     //             if (err) {
//     //                 return cb(err);
//     //             }
//     //             return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
//     //         });
//     //     }
//     // });


//     // //Post files
//     // app.post(
//     //     "/yolov3",
//     //     multer({
//     //         storage: storage
//     //     }).single('upload'), function (req, res) {
//     //         console.log(req.file);
//     //         console.log(req.body);
//     //         // redirect to /uploads/ for uploading Image file
//     //         res.redirect("/uploads/" + req.file.filename);
//     //         console.log(req.file.filename);
//     //         //yolov3.run_yolov3(upload_dir+req.file.filename);
//     //         yolov3.run_yolov3(server_dir+"\\uploads\\"+req.file.filename , yolov3_out_dir);
//     //         return res.status(200).end();
//     // });


//     // app.get('/uploads/:upload', function (req, res){
// 	// 	file = req.params.file;
// 	// 	var img = fs.readFileSync(upload_dir + "/uploads/" + file);
// 	// 	res.writeHead(200, {'Content-Type': 'image/jpg' });
// 	// 	res.end(img, 'binary');
//     // });

//     // // GET index.html
//     // app.get('/',function(req,res){
//     //     fs.readFile('./index.html',function (err, data){
//     //         console.log("Started Connection");
//     //         res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
//     //         res.write(data);
//     //         res.end();
//     //     });
//     // });
// };