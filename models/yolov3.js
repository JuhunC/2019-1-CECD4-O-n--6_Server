var util = require('util');
const exec = util.promisify(require('child_process').exec);

var yolov3_dir = '/home/johnc/Desktop/2019-1-CECD4-O-n--6/tf-faster-rcnn';


exports.run_yolov3 = async function(file){
    // TODO : Will run commands to run tf-faster-rcnn
    const{stdout, stderr} = await exec(
        'sudo python '+ yolov3_dir 
        +'/tools/demo.py --net res101 --dataset pascal_voc_0712 --input '
        +file+' --output ' + file+'_out');
    // console.log('sudo '+ tf_faster_rcnn_dir 
    //     +'/tools/demo.py --net res101 --dataset pascal_voc_0712 --input '
    //     +file+' --output ' + file +'_out);
    
    // TODO : For Testing
    //const{stdout, stderr} = await exec("dir");
    //console.log(stdout);
    console.log('sudo python '+ yolov3_dir 
    +'/tools/demo.py --net res101 --dataset pascal_voc_0712 --input '
    +file+' --output ' + file+'_out');
    return;
}