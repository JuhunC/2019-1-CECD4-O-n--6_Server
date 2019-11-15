var util = require('util');
var sizeOf = require('image-size');
var fs = require('fs');
const exec = util.promisify(require('child_process').exec);

//var yolov3_dir = '/home/johnc/Desktop/2019-1-CECD4-O-n--6/yolov3';
var gen_inpaint_dir = 'C:\\Users\\johnc\\Documents\\2019-1-CECD4-O-n--6\\generative_inpainting'

exports.run_gen_inpaint = async function(req, res, json_data){
    
    var ori_file_dir ='';
    for (var key in json_data) {
        var item = json_data[key];
        if(key=='image_file_dir'){
            ori_file_dir = item[0];
        }
        console.log(item);
    }
    var stream = fs.WriteStream(ori_file_dir+'.txt');
    stream.once('open', function(fd) {
        for(var key in json_data){
            var item = json_data[key];
            str = key+',';
            if(key!= 'image_file_dir'){
                for(i=0;i<5;i++){
                    str = str + item[i];
                    if(i!=4)
                        str+=',';
                }
                stream.write(str+'\n');
            }
        }
        console.log("The file was saved!");
    });
    
    // run mask
    const {stdout, stderr} = await exec(
        'python '
        + './models/mask.py '
        + '--txtfile ' + ori_file_dir+'.txt '
        + '--imgfile ' + ori_file_dir+ ' '
    );
    console.log(stdout);

    const{stdout1,stderr1} = await exec(
        'python '
        +gen_inpaint_dir+'/test.py '
        +'--image '+ori_file_dir
        +' --mask '+ori_file_dir+'_mask.png '
        +' --output '+ori_file_dir+'_out.png'
        +' --checkpoint_dir ' +gen_inpaint_dir+'/model_logs/release_places2_256'
    )
    console.log(stdout1);
    console.log(stderr1);

    // var s = fs.createReadStream(ori_file_dir+'_out.png');
    // s.on('open',function(){
    //     res.set('Content-Type','image/png');
    //     s.pipe(res);
    // });
    // s.on('error',function(){
    //     res.set('Content-Type','text/plain');
    //     res.status(404).end('Not found');
    // });

    // var image = fs.createWriteStream(ori_file_dir+'_out.png');
    // res.writeHead(200, {'Content-Type': 'image/png' });
    // res.send(image,'binary');
    // res.send();

    var file = fs.createReadStream(ori_file_dir+'_out.png');
    file.on('open', function(){
        res.set('Content-Type','image/png');
        file.pipe(res);
    })

    console.log('Finished Generative Inpainting')
    return;
}