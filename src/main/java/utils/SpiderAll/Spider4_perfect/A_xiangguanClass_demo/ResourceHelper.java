package utils.SpiderAll.Spider4_perfect.A_xiangguanClass_demo;

/**
 * Created by Peng on 2016/8/7.
 */
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
class ResourceHelper {
    /**
     * @param resourceName
     * @return
     * @return
     */
    static BufferedInputStream getResourceInputStream(String resourceName) {
        try {
            return new BufferedInputStream(new FileInputStream(resourceName));
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }
}