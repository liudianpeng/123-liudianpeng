package models.utils.Spider4_perfect.baidu_index_Spider;

import java.io.*;
import java.net.*;

/**
 * 资料来源:http://www.jb51.net/article/57193.htm?_t=t
 *
 * Created by Peng on 2016/8/7.
 * 那么这一次，我们就来研究一下如何使用代码获取到网页的内容。
 *  首先，没有HTML和CSS和JS和AJAX经验的建议先去W3C（点我点我）小小的了解一下。

 说到HTML，这里就涉及到一个GET访问和POST访问的问题。

 如果对这个方面缺乏了解可以阅读W3C的这篇：《GET对比POST》。

 啊哈，在此不再赘述。

 然后咧，接下来我们需要用Java来爬取一个网页的内容。

 这时候，我们的百度就要派上用场了。

 没错，他不再是那个默默无闻的网速测试器了，他即将成为我们的爬虫小白鼠！~

 我们先来看看百度的首页
 相信大家都知道，现在这样的一个页面，是HTML和CSS共同工作的结果。

 我们在浏览器中右击页面，选择“查看页面源代码”：\
 没错，就是这一坨翔一样的东西。这就是百度页面的源代码。

 接下来我们的任务，就是使用我们的爬虫也获取到一样的东西。

 先来看一段简单的源码：
 *
 */
public class Main_1 {
    public static void main(String[] args) {
        // 定义即将访问的链接
        String url = "http://cn.bing.com/";
        // 定义一个字符串用来存储网页内容
        String result = "";
        // 定义一个缓冲字符输入流
        BufferedReader in = null;
        try {
            // 将string转成url对象
            URL realUrl = new URL(url);
            // 初始化一个链接到那个url的连接
            URLConnection connection = realUrl.openConnection();
            // 开始实际的连接
            connection.connect();
            // 初始化 BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            // 用来临时存储抓取到的每一行的数据
            String line;
//            System.out.println("这是=="+in.readLine());
            while ((line = in.readLine()) != null) {
//                result += line;
                //遍历抓取到的每一行并将其存储到result里面
                result += line + "\n";
            }
        } catch (Exception e) {
            System.out.println("发送GET请求出现异常！" + e);
            e.printStackTrace();
        }
        // 使用finally来关闭输入流
        finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        System.out.println("===="+result);
    }
}