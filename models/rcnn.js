var util = require('util');
const exec = util.promisify(require('child_process').exec);

var tf_faster_rcnn_dir = 'C:/Users/JohnC/Documents/2019-1-CECD4-O-n--6/tf-faster-rcnn/';


exports.run_rcnn = async function(file){
    // TODO : Will run commands to run tf-faster-rcnn
    // const{stdout, stderr} = await exec(
    //     'sudo '+ tf_faster_rcnn_dir 
    //     +'/tools/demo.py --net res101 --dataset pascal_voc_0712 --input '
    //     +file+' --output ' + 'out_' + file);
    console.log('sudo '+ tf_faster_rcnn_dir 
        +'/tools/demo.py --net res101 --dataset pascal_voc_0712 --input '
        +file+' --output ' + 'out_' + file);
    
    // TODO : For Testing
    const{stdout, stderr} = await exec("dir");
    console.log(stdout);
    return;
}