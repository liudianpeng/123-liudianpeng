package utils.SpiderAll.Spider4_perfect.C_zhihui_title_Spider;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Peng on 2016/8/7.
 * 资料来源:http://www.jb51.net/article/57197.htm
 * 上篇文章我们拿百度首页做了个小测试，今天我们来个复杂的，直接抓取知乎编辑推荐的内容，小伙伴们可算松了口气，终于进入正题了，哈哈。
 *
 *
 * 首先，确定第一个目标：编辑推荐。

 网页链接：http://www.zhihu.com/explore/recommendations

 我们对上次的代码稍作修改，先实现能够获取该页面内容：
 */
public class Spider_1 {
    static String SendGet(String url) {
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
    //只有一个结果的RegexString

//    static String RegexString(String targetStr, String patternStr) {
//        // 定义一个样式模板，此中使用正则表达式，括号中是要抓的内容
//        // 相当于埋好了陷阱匹配的地方就会掉下去
//        Pattern pattern = Pattern.compile(patternStr);
//        // 定义一个matcher用来做匹配
//        Matcher matcher = pattern.matcher(targetStr);
//        // 如果找到了
//        if (matcher.find()) {
//            // 打印出结果
//            return matcher.group(1);
//        }
//        return "Nothing";
//    }
//
//    public static void main(String[] args) {
//        // 定义即将访问的链接
//        String url = "http://www.zhihu.com/explore/recommendations";
//        // 访问链接并获取页面内容
//        String result = SendGet(url);
//        // 使用正则匹配图片的src内容
//        String imgSrc = RegexString(result, "question_link.+?>(.+?)<");
//        // 打印结果
////        System.out.println(result);
//        System.out.println(imgSrc);
//    }
    /**
     * 运行一下木有问题，接下来就是一个正则匹配的问题了。

     首先我们先来获取该页面的所有的问题。

     右击标题，审查元素：
     */
    /*
啊哈，可以看到标题其实是一个a标签，也就是一个超链接，而其中能够和其他超链接区分开的，应该就是那个class了，也就是类选择器。
于是我们的正则语句就出来了：question_link.+?href=\"(.+?)\"
调用RegexString函数，并给它传参：

等一下啊如果出现一大堆的乱七八糟的乱码？！
别紧张=。=它只是字符乱码而已。
编码问题可以参见：HTML字符集
一般来说，对中文支持较好的主流编码是UTF-8，GB2312和GBK编码。
网页可以通过meta标签的charset来设置网页编码，譬如：
<meta charset="utf-8" />
我们右击，查看页面源代码：

可以看到，知乎采用的是UTF-8编码。
在这里和大家解释一下查看页面源代码和审查元素的区别。
查看页面源代码是显示整个页面的所有代码，没有按照HTML的标签进行排版，相当于是直接查看源码，这种方式对于查看整个网页的信息，比如meta比较有用。
审查元素，或者有的浏览器叫查看元素，是针对你右击的元素进行查看，比如一个div或者img，比较适用于单独查看某个对象的属性和标签。
好的，我们现在知道了问题出在了编码上，接下来就是对抓取到的内容进行编码转换了。
在java中实现很简单，只需要在InputStreamReader里面指定编码方式就行：
// 初始化 BufferedReader输入流来读取URL的响应
   in = new BufferedReader(new InputStreamReader(
     connection.getInputStream(),"UTF-8"));
此时再运行程序，便会发现可以正常显示标题了：

但是现在才只有一个标题，我们需要的是所有的标题。
我们将正则稍加修改，把搜索到的结果存储到一个ArrayList里面：

     */
    static ArrayList<String> RegexString(String targetStr, String patternStr) {
        // 预定义一个ArrayList来存储结果
        ArrayList<String> results = new ArrayList<String>();
        // 定义一个样式模板，此中使用正则表达式，括号中是要抓的内容
        Pattern pattern = Pattern.compile(patternStr);
        // 定义一个matcher用来做匹配
        Matcher matcher = pattern.matcher(targetStr);
        // 如果找到了
        boolean isFind = matcher.find();
        // 使用循环将句子里所有的kelvin找出并替换再将内容加到sb里
        while (isFind) {
            //添加成功匹配的结果
            results.add(matcher.group(1));
            // 继续查找下一个匹配对象
            isFind = matcher.find();
        }
        return results;
    }
    /**
     * OK，这样就算是完成了知乎爬虫的第一步。

     但是我们可以看出来，用这样的方式是没有办法抓到所有的问题和回答的。

     我们需要设计一个Zhihu封装类，来存储所有抓取到的对象。
     -->>>>>>>>>>>>>>>>>...如Spider_2中
     */

    public static void main(String[] args) {
        // 定义即将访问的链接
        String url = "http://www.zhihu.com/explore/recommendations";
        // 访问链接并获取页面内容
        String result = SendGet(url);
        // 使用正则匹配标题的src内容
//        这样就能匹配到所有的结果了（因为直接打印了ArrayList所以会有一些中括号和逗号）：
        ArrayList<String>  titleSrc = RegexString(result, "question_link.+?>(.+?)<");
        // 打印结果
//        System.out.println(result);
        System.out.println("全部标题："+titleSrc);
        for (String s:titleSrc){
            System.out.println(s);
        }
    }
}
