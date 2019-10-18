var util = require('util');
var sizeOf = require('image-size');
const exec = util.promisify(require('child_process').exec);
var http = require('http');
var express = require('express');
var fs = require('fs');
var yolov3_dir = 'C:\\Users\\johnc\\Documents\\2019-1-CECD4-O-n--6\\yolov3'

exports.run_yolov3 = async function(res, file, outfile){
    // *******************WINDOWS VERSION********************//
    console.log( 'python '
        + yolov3_dir + '\\detect.py '
        + ' --data ' +yolov3_dir + '\\data\\coco.data '
        + ' --cfg ' +yolov3_dir +'\\cfg\\yolov3.cfg '
        + ' --weights ' +yolov3_dir +'\\weights\\yolov3.weights '
        + ' --output ' + outfile
        + ' --source ' + file
    );
    // TODO : Will run commands to run yolov3
    const{stdout, stderr} = await exec(
        'python '
        + yolov3_dir + '\\detect.py '
        + ' --data ' +yolov3_dir + '\\data\\coco.data '
        + ' --cfg ' +yolov3_dir +'\\cfg\\yolov3.cfg '
        + ' --weights ' +yolov3_dir +'\\weights\\yolov3.weights '
        + ' --output ' + outfile
        + ' --source ' + file
        );
    console.log(stdout);
    // ****************************************************//
    // res.json(JSON.stringify({"label":"hello"}));


    // Read Coordinate File(.txt)
    try{
        var json_data = {};
        var file_data = fs.readFileSync(outfile+'.txt','utf8');
        file_data = file_data.replace(/(\n)/gm, " ");
        file_data = file_data.replace(/(\r)/gm, "");
        var coor_string  = file_data.split(' ');//string[] data returned
        for(i=0;i<coor_string.length;i++){
            coor_string[i] = coor_string[i].replace('_',' ');
        }
        coor_string = coor_string.filter(function (el) {
        return el != "";
        });
        var i,j,temparray,chunk = 6;
        for (i=0,j=coor_string.length; i<j; i+=chunk) {
            temparray = coor_string.slice(i,i+chunk);
            json_data[temparray[0]+i/6] = temparray.slice(1,6);
        }
        console.log(json_data);
        res.json(JSON.stringify(json_data,null,1));
    }catch(e){
        console.log('Error',e.stack);
    }



   
    
    
    // Read File and Send Json Data Back
    


    // *******************LINUX VERSION**********************//
    // console.log( 'sudo python3 '
    // + yolov3_dir + '/detect.py '
    // + '--data ' +yolov3_dir + '/data/coco.data '
    // + '--cfg ' +yolov3_dir +'/cfg/yolov3.cfg '
    // + '--weights ' +yolov3_dir +'/weights/yolov3.weights '
    // //+ '--output ' + yolov3_dir +/////////dirdirdir
    // + ' --source ' + file);
    // // TODO : Will run commands to run yolov3
    // const{stdout, stderr} = await exec(
    //     'sudo python3 '
    //     + yolov3_dir + '/detect.py '
    //     + '--data ' +yolov3_dir + '/data/coco.data '
    //     + '--cfg ' +yolov3_dir +'/cfg/yolov3.cfg '
    //     + '--weights ' +yolov3_dir +'/weights/yolov3.weights '
    //     //+ '--img-size ' + dimensions.height //* dimensions.height
    //     + ' --source ' + file);
    // console.log(stdout)
    // ********************************************/
    // TODO : For Testing
    //const{stdout, stderr} = await exec("dir");
    //console.log(stdout);
    
    return;
}