package models.utils.Spider4.baidu_index_Spider;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Peng on 2016/8/7.
 * 来源:http://www.jb51.net/article/57193.htm?_t=t
 *  以百度的大爪子Logo为例。
 临时需求：
 获取百度Logo的大爪子的图片链接。
 先说一下浏览器的查看方法。
 鼠标对图片右击，选择审查元素（火狐，谷歌，IE11，均有此功能，只是名字不太一样）：

 啊哈，可以看到在一大堆div的围攻下的可怜的img标签。
 这个src就是图像的链接了。
 那么在java中我们怎么搞呢？
 事先说明，为了方便演示代码，类Mian_1中所有代码均未作类封装
 我们先把前面的代码封装成一个sendGet函数：
 */
public class Main_2 {
    static String sendGet(String url) {
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
            in = new BufferedReader(new InputStreamReader(
                    connection.getInputStream()));
            // 用来临时存储抓取到的每一行的数据
            String line;
            while ((line = in.readLine()) != null) {
                // 遍历抓取到的每一行并将其存储到result里面
                result += line;
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
        return result;
    }


    /**
     *这样看起来稍微整洁了一点，请原谅我这个强迫症。

     接下来的任务，就是从获取到的一大堆东西里面找到那个图片的链接。

     我们首先可以想到的方法，是对页面源码的字符串result使用indexof函数进行String的子串搜索。

     没错这个方法是可以慢慢解决这个问题，比如直接indexOf("src")找到开始的序号，然后再稀里哗啦的搞到结束的序号。

     不过我们不能一直使用这种方法，毕竟草鞋只适合出门走走，后期还是需要切假腿来拿人头的。

     请原谅我的乱入，继续。

     那么我们用什么方式来寻找这张图片的src呢？

     没错，正如下面观众所说，正则匹配。

     比如三个胖子站在这里，分别穿着红衣服，蓝衣服，绿衣服。

     正则就是：抓住那个穿绿衣服的！

     然后把绿胖子单独抓了出来。

     就是这么简单。

     但是正则的语法却还是博大精深的，刚接触的时候难免有点摸不着头脑，

     向大家推荐一个正则的在线测试工具：正则表达式在线测试。

     有了正则这个神兵利器，那么怎么在java里面使用正则呢？

     先来看个简单的小李子吧。-->例子在main函数中
     */

    /**
     * 没错，这就是我们的第一个正则代码。

     这样应用的抓取图片的链接想必也是信手拈来了。

     我们将正则匹配封装成一个函数，然后将代码作如下修改：
     */
    static String RegexString(String targetStr, String patternStr) {
        // 定义一个样式模板，此中使用正则表达式，括号中是要抓的内容
        // 相当于埋好了陷阱匹配的地方就会掉下去
        Pattern pattern = Pattern.compile(patternStr);
        // 定义一个matcher用来做匹配
        Matcher matcher = pattern.matcher(targetStr);
        // 如果找到了
        if (matcher.find()) {
            // 打印出结果
            return matcher.group(1);
        }
        return "没有匹配结果";
    }
    /**
     * 好的，现在万事俱备，只差一个正则语法了！

     那么用什么正则语句比较合适呢？

     我们发现只要抓住了src="xxxxxx"这个字符串，就能抓出整个src链接，

     所以简单的正则语句：src=\"(.+?)\"
     在main函数中运行
     */
    public static void main(String[] args) {
        // 定义即将访问的链接
        String url = "http://www.baidu.com";
        // 访问链接并获取页面内容
        String result = sendGet(url);
        System.out.println(result);
/////////////////////////正则表达式////////////////////////////////////////////////////////
        // 定义一个样式模板，此中使用正则表达式，括号中是要抓的内容
        // 相当于埋好了陷阱匹配的地方就会掉下去
        Pattern pattern = Pattern.compile("href=\"(.+?)\"");
        // 定义一个matcher用来做匹配
        Matcher matcher = pattern.matcher("＜a href=\"index.html\"＞我的主页＜/a＞");
        // 如果找到了
        if (matcher.find()) {
            // 打印出结果
            System.out.println(matcher.group(1));
            //运行结果：index.html
        }
////////////////////////////////////////////////////////////////////////////////////////
        // 使用正则匹配图片的src内容
        String imgSrc = RegexString(result, "src=\"(.+?)\"");
        // 打印结果
        System.out.println(imgSrc);

    }




}
