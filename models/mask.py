import cv2
import numpy as np
import argparse
import pandas as pd
edge_rate = 0.05
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
    ori_img = cv2.imread(args.imgfile,1)
    height, width = ori_img.shape[:2]
    print(height)
    print(width)
    # Create Empty Black Image
    blank_image = np.zeros(shape=[height, width, 3], dtype=np.uint8)
    for index, row in fd.iterrows():
        edge_h = int(row['height'])*edge_rate+10
        edge_w = int(row['width'])*edge_rate+10
        h = int(row['h']-edge_h)
        w = int(row['w']-edge_w)
        for dh in range(int(row['height'])+int(edge_h*2)):
            for dw in range(int(row['width'])+int(edge_w*2)):
                if h+dh >= 0 and w + dw >= 0 and h+dh < height and w+dw < width:
                    blank_image[h+dh,w+dw,0] = 255
                    blank_image[h+dh,w+dw,1] = 255
                    blank_image[h+dh,w+dw,2] = 255
                    ori_img[h+dh,w+dw] = (255,255,255)
    cv2.imwrite(args.imgfile,ori_img)
    cv2.imwrite(args.imgfile+'_mask.png',blank_image)
    # cv2.imwrite(args.imgfile, ori_img)