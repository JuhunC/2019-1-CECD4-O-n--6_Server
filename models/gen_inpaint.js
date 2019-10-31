var util = require('util');
var sizeOf = require('image-size');
const exec = util.promisify(require('child_process').exec);

//var yolov3_dir = '/home/johnc/Desktop/2019-1-CECD4-O-n--6/yolov3';
var gen_inpaint_dir = 'C:\\Users\\johnc\\Documents\\2019-1-CECD4-O-n--6\\generative_inpainting'

exports.run_gen_inpaint = async function(req, res, json_data){
    // console.log(json_data['image_file_dir']);
    // console.log(typeof(json_data));

    var ori_file_dir ='';
    for (var key in json_data) {
        var item = json_data[key];
        if(key=='image_file_dir'){
            ori_file_dir = item[0];
            // console.log(ori_file_dir);
        }
        console.log(item);
    }
    

}