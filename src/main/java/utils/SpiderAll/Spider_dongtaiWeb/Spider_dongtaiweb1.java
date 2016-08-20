package utils.SpiderAll.Spider_dongtaiWeb;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Peng on 2016/8/10.
 * 资料来源:http://blog.csdn.net/zgyulongfei/article/details/7909006
 * 演示如何抓取网站的数据：（1）抓取原网页数据；（2）抓取网页JavaScript返回的数据。
 */
public class Spider_dongtaiweb1 {

    /**
     * 我们准备从http://ip.chinaz.com上抓取ip查询的结果：
     */
    //第一步：打开这个网页，然后输入IP：111.142.55.73，点击查询按钮，就可以看到网页显示的结果：

    //第二步：查看网页源码

    /**
     <p class="WhwtdWrap bor-b1s col-gray03">
     <span class="Whwtdhalf w15-0">111.142.55.73</span>
     <span class="Whwtdhalf w15-0">111.142.55.73</span>
     <span class="Whwtdhalf w15-0">1871591241</span>
     <span class="Whwtdhalf w50-0">北京市 北京北方星辰信息技术有限责任公司铁通数据中心</span>
     </p>
     */

    //再看看查询之后的地址栏中的网页地址：http://ip.chinaz.com/?ip=111.142.55.73

    //也就是说，我们只要访问形如这样的网址，就可以得到ip查询的结果

     static String getHtml(String ip) {

         // 定义一个字符串用来存储网页内容
         String result = "";
         // 定义一个缓冲字符输入流
         BufferedReader in = null;
         String strurl = "http://ip.chinaz.com/?IP=" + ip;
         try {
             // 将string转成url对象
             URL url = new URL(strurl);
             System.out.println("url="+url);

             // 初始化一个链接到那个url的连接
             HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
             System.out.println("httpURLConnection=="+httpURLConnection);

             //初始化 BufferedReader输入流来读取URL的响应
             InputStreamReader inputStreamReader = new InputStreamReader(
                     httpURLConnection.getInputStream(), "utf-8");
             //初始化 BufferedReader输入流来读取URL的响应
//             System.out.println("inputStreamReader=="+inputStreamReader);

             in = new BufferedReader(inputStreamReader);
//             System.out.println("BufferedReader :=="+in);
             ////////////测试StringBuilder////////////////

             StringBuilder contentBuf = new StringBuilder();

             /////////////////////////////////////////////
             // 用来临时存储抓取到的每一行的数据
             String line;
             while ((line = in.readLine()) != null) {
                 // 遍历抓取到的每一行并将其存储到result里面
                 result += line+ "\n";
//                 contentBuf.append(line);
             }
             ////////////////测试StringBuilder////////////
//             System.out.println("看一下："+contentBuf);
//             String buf = contentBuf.toString();
//             System.out.println("StringBuilder.toString()后："+buf);
//             //字符串开始位置
//             int beginIx = buf.indexOf("Whwtdhalf w15-0\">");
//             //字符串结束位置
//             int endIx = buf.indexOf("clearfix plr10");
//             System.out.println("beginIx="+beginIx+"endIx="+endIx);
//             //按照字符串开始位置和结束位置开始截取
//             String indexOf_result = buf.substring(beginIx, endIx);
//             System.out.println("indexOf_result的结果：\n" + indexOf_result);
             ////////////////测试StringBuilder结束///////
//             System.out.println("最后抓取的网页结果:"+result);
         } catch (Exception e) {
             System.out.println("发送GET请求出现异常;原因可能是没有找到该网页！" + e);
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

    //正则抓取
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

    public static void main(String[] args) {
        String ip = "111.142.55.73";//121.142.55.73
        ArrayList<String> results = new ArrayList<>();//存储获取的结果

        String text = "";
        //执行方法
//        captureHtml(ip);
        //输入//////////////////////////////////////////////////////////////////////////////////////
        while (results.size() == 0) {
            BufferedReader in = new BufferedReader(new InputStreamReader(System.in));//输入流＝System.in
//            String text = "";
            try {
                System.out.println("请输入一系列文字，可包括空格：");
                text = in.readLine();
            } catch (Exception e) {
                System.out.println("发送GET请求出现异常！" + e);
                e.printStackTrace();
            }

            /////////////////////////////////////////////////////////////////////////////////////////////
            //获取html内容:
            String result = getHtml(text);
//        System.out.println("result:"+result);
            ///////////////////////////////////////////////////////////////////////////////////////////////
            //正则匹配([\s\S]+?)和([\s\S]*)是有区别的
            Pattern pattern = Pattern.compile("<p.*? class=\"WhwtdWrap bor-b1s col-gray03\">([\\s\\S]+?)</p>");
            //在获取的网页中匹配结果：
            Matcher matcher = pattern.matcher(result);

            // 如果找到了
            boolean isFind = matcher.find();
            // 使用循环将句子里所有的kelvin找出并替换再将内容加到sb里
            while (isFind) {
                //添加成功匹配的结果
                results.add(matcher.group(1));
                // 继续查找下一个匹配对象
                isFind = matcher.find();
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////
            System.out.print(results);
        }
    }
}
