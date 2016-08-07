package models.utils.Spider2;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;


/**
 * Created by Peng on 2016/8/6.
 */
public class Main {
    public static void main(String[] args) {
        //定义即将访问的连接
        String url = "http://www.yujiawl.com/zjyj/lxwm.aspx?types=000";
        //定义一个字符串来存储网页内容
        String result = "";
        //定义一个缓冲字符输入流
        BufferedReader in = null;

        for (int i=1;i<2;i++) {
            try {
                //将string转成url对象
                URL realUrl = new URL(url+String.valueOf(i));
                //初始化一个链接到那个url的连接;
                URLConnection connection = realUrl.openConnection();
                //开始实际的连接
                connection.connect();
                //////////////////////////////////////////////////////////////////////////
                //初始化BufferedReader输入流来读取URL的响应
//                in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
//                InputStream urlStream = new GZIPInputStream(connection.getInputStream());
                in = new BufferedReader(new InputStreamReader(connection.getInputStream(),"gb2312"));

                //用来临时存储抓取到的每一行的数据
                String line;
                while ((line = in.readLine()) != null) {
                    //遍历抓取到的每一行并将其存储到result里面
                    result += line + "\n";
                }
                System.out.println("这是==" + result);
            } catch (Exception e) {
                System.out.println("发送GET请求出现异常！" + e);
                e.printStackTrace();
            } finally {
                try {
                    if (in != null) {
                        in.close();
                    }
                } catch (Exception e2) {
                    e2.printStackTrace();
                }
            }
        }

    }
}
