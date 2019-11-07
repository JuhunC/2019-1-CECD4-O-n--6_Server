import cv2
import numpy as np
import argparse
import pandas as pd

parser = argparse.ArgumentParser()
parser.add_argument('--imgfile', default='',type=str,
                    help = 'The file name of the orignial image file')
parser.add_argument('--txtfile', default='', type=str,
                    help ='The file name of the coordinate text file.')
if __name__ == "__main__":
    args, unknown = parser.parse_known_args()
    txt_file_dir = args.txtfile

    fd = pd.read_csv(txt_file_dir,sep=',',header=None)
    fd.columns = ["label", "w", "h", "width","height","accuracy"]
    print(fd)
    # get original image
    ori_img = cv2.imread(args.imgfile,0)
    height, width = ori_img.shape[:2]
    print(height)
    print(width)
    # Create Empty Black Image
    blank_image = np.zeros(shape=[height, width, 3], dtype=np.uint8)
    for index, row in fd.iterrows():
        for h in range(int(row['height'])):
            for w in range(int(row['width'])):
                blank_image[row['h']+h,row['w']+w,0] = 255
                blank_image[row['h']+h,row['w']+w,1] = 255
                blank_image[row['h']+h,row['w']+w,2] = 255
    # cv2.imshow("",blank_image)
    # cv2.waitKey()
    cv2.imwrite(args.imgfile+'_mask.png',blank_image)