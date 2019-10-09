var util = require('util');
var sizeOf = require('image-size');
const exec = util.promisify(require('child_process').exec);

//var yolov3_dir = '/home/johnc/Desktop/2019-1-CECD4-O-n--6/yolov3';
var gen_inpaint_dir = 'C:\\Users\\johnc\\Documents\\2019-1-CECD4-O-n--6\\generative_inpainting'

exports.run_gen_inpaint = async function(file, maskfile, outfile){
    // *******************WINDOWS VERSION********************//
    console.log( 'python '
        + gen_inpaint_dir + '\\test.py '
        + ' --image ' + file
        + ' --mask ' + maskfile
        + ' --output ' + outfile
        + ' --checkpoint_dir  ' + gen_inpaint_dir +'\\model_logs\\release_places2_256'
    );
    // TODO : Will run commands to run yolov3
    const{stdout, stderr} = await exec(
        'python '
        + gen_inpaint_dir + '\\test.py '
        + ' --image ' + file
        + ' --mask ' + maskfile
        + ' --output ' +gen_inpaint_dir +'\\result\\'
        + ' --checkpoint_dir  ' + gen_inpaint_dir +'\\model_logs\\release_places2_256'
        );
    console.log(stdout)
    // ****************************************************//

    // *******************LINUX VERSION**********************//
    
    // ****************************************************//
    return;
}