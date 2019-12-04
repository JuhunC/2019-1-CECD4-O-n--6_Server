var util = require('util');
var sizeOf = require('image-size');
const exec = util.promisify(require('child_process').exec);
var http = require('http');
var express = require('express');
var fs = require('fs');
var mask_rcnn_dir = 'C:\\Users\\johnc\\Documents\\MASK_RCNN\\'

exports.run_mask_rcnn = async function(res, file, outfile){
    // *******************WINDOWS VERSION********************//
    console.log( 'ipython '
        + mask_rcnn_dir + '\\samples\\demo.py -- '
        + ' --root_dir='+mask_rcnn_dir+'\\samples\\'
        + ' --image ' +mask_rcnn_dir + '\\data\\coco.data '
        + ' --checkpoint_dir ' + mask_rcnn_dir +'\\mask_rcnn_coco.h5 '
        + ' --output ' + outfile
    );

    const{stdout, stderr} = await exec(
        'ipython '
        + mask_rcnn_dir + '\\samples\\demo.py -- '
        + ' --root_dir='+mask_rcnn_dir+'\\samples\\'
        + ' --image ' +mask_rcnn_dir + '\\data\\coco.data '
        + ' --checkpoint_dir ' + mask_rcnn_dir +'\\mask_rcnn_coco.h5 '
        + ' --output ' + outfile
        );
    console.log(stdout);
    // ****************************************************//



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
        json_data['image_file_dir'] = file;
        console.log(json_data);
        res.json(JSON.stringify(json_data,null,1));
    }catch(e){
        console.log('Error',e.stack);
    }
   
    return;
}