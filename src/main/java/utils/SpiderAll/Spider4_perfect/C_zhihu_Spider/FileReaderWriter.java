package utils.SpiderAll.Spider4_perfect.C_zhihu_Spider;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

/**
 * Created by Peng on 2016/8/7.
 * 我们把这两个函数封装到一个FileReaderWriter.java文件中以便后续使用。
 接着我们回到知乎爬虫中。
 */
//上一回我们说到了如何把知乎的某些内容爬取出来，那么这一回我们就说说怎么把这些内容存储到本地吧。
/**
 * 说到Java的本地存储，肯定使用IO流进行操作。
 首先，我们需要一个创建文件的函数createNewFile：
 */
public class FileReaderWriter {
    public static boolean createNewFile(String filePath) {
        boolean isSuccess = true;
        // 如有则将"\\"转为"/",没有则不产生任何变化
        String filePathTurn = filePath.replaceAll("\\\\", "/");
        // 先过滤掉文件名
        int index = filePathTurn.lastIndexOf("/");
        String dir = filePathTurn.substring(0, index);
        // 再创建文件夹
        File fileDir = new File(dir);
        isSuccess = fileDir.mkdirs();
        // 创建文件
        File file = new File(filePathTurn);
        try {
            isSuccess = file.createNewFile();
        } catch (IOException e) {
            isSuccess = false;
            e.printStackTrace();
        }
        return isSuccess;
    }
    //然后，我们需要一个写入文件的函数：

    public static boolean writeIntoFile(String content, String filePath,
                                        boolean isAppend) {
        boolean isSuccess = true;
        // 先过滤掉文件名
        int index = filePath.lastIndexOf("/");
        String dir = filePath.substring(0, index);
        // 创建除文件的路径
        File fileDir = new File(dir);
        fileDir.mkdirs();
        // 再创建路径下的文件
        File file = null;
        try {
            file = new File(filePath);
            file.createNewFile();
        } catch (IOException e) {
            isSuccess = false;
            e.printStackTrace();
        }
        // 写入文件
        FileWriter fileWriter = null;
        try {
            fileWriter = new FileWriter(file, isAppend);
            fileWriter.write(content);
            fileWriter.flush();
        } catch (IOException e) {
            isSuccess = false;
            e.printStackTrace();
        } finally {
            try {
                if (fileWriter != null)
                    fileWriter.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return isSuccess;
    }

}
