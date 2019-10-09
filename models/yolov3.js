var util = require('util');
var sizeOf = require('image-size');
const exec = util.promisify(require('child_process').exec);

var yolov3_dir = 'C:\\Users\\johnc\\Documents\\2019-1-CECD4-O-n--6\\yolov3'

exports.run_yolov3 = async function(file, outfile){
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
    console.log(stdout)
    console.log('End')
    // ****************************************************//

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