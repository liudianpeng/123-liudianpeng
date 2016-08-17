package utils.A_xiangguanClass_demo;

/**
 * Created by Peng on 2016/8/7.
 */

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;

class UtilResource {
    private void initializeResource() {
        try {

            //读取文件，并且以utf-8的形式写出去
            BufferedReader bufread;
            String read;
            bufread = new BufferedReader(new InputStreamReader(ResourceHelper.getResourceInputStream("pinyin.txt")));
            while ((read = bufread.readLine()) != null) {
                System.out.println(read);
            }
            bufread.close();
        } catch (FileNotFoundException ex) {
            ex.printStackTrace();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}