package utils.Spider4_perfect.C_zhihu_Spider;

/**
 * Created by Peng on 2016/8/7.
 *资料来源：http://www.jb51.net/article/57203.htm：
 * 再新建一个Spider_2类来存放一些爬虫常用的函数。
 */
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Spider_2 {

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
                    connection.getInputStream(), "UTF-8"));
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
     * 我们给知乎的构造函数加上一个参数，用来设定url值，因为url确定了，这个问题的描述和答案也就都能抓到了。
     我们将Spider的获取知乎对象的方法改一下，只获取url即可：
     * @param content
     * @return
     */
    // 获取所有的编辑推荐的知乎内容
    static ArrayList<Zhihu> GetRecommendations(String content) {
        // 预定义一个ArrayList来存储结果
        ArrayList<Zhihu> results = new ArrayList<Zhihu>();
        // 用来匹配url，也就是问题的链接
        Pattern pattern = Pattern
                .compile("<h2>.+?question_link.+?href=\"(.+?)\".+?</h2>");
        Matcher matcher = pattern.matcher(content);
        // 是否存在匹配成功的对象
        Boolean isFind = matcher.find();
        while (isFind) {
            // 定义一个知乎对象来存储抓取到的信息
            Zhihu zhihuTemp = new Zhihu(matcher.group(1));
            // 添加成功匹配的结果
            results.add(zhihuTemp);
            // 继续查找下一个匹配对象
            isFind = matcher.find();
        }
        return results;
    }


    /**
     *接下来，就是在Zhihu的构造方法里面，通过url获取所有的详细数据。
     我们先要对url进行一个处理，因为有的针对回答的，它的url是：
     http://www.zhihu.com/question/22355264/answer/21102139
     有的针对问题的，它的url是：
     http://www.zhihu.com/question/22355264
     那么我们显然需要的是第二种，所以需要用正则把第一种链接裁切成第二种，这个在Zhihu中写个函数即可
     */

    /**
     * 接下来就是各个部分的获取工作了。
     先看下标题：

     正则把握住那个class即可，正则语句可以写成：zm-editable-content\">(.+?)<
     运行下看看结果：
     */

    /**
     *
    啊哈一样的原理，抓住class，因为它应该是这个的唯一标识。
    验证方法：右击查看页面源代码，ctrl+F看看页面中有没有其他的这个字符串。
    后来经过验证，还真出了问题
     */
    /**
     * 标题和描述内容前面的class是一样的。
     那只能通过修改正则的方式来重新抓取：
     * @param args
     */
    public static void main(String[] args) {

        // 定义即将访问的链接
        String url = "http://www.zhihu.com/explore/recommendations";
        // 访问链接并获取页面内容
        String content = Spider_2.SendGet(url);
        // 获取编辑推荐
        ArrayList<Zhihu> myZhihu = Spider_2.GetRecommendations(content);
        // 打印结果
        System.out.println(myZhihu);

        // 写入本地
        for (Zhihu zhihu : myZhihu) {
            FileReaderWriter.writeIntoFile(zhihu.writeString(),
                    "D:/知乎_编辑推荐.txt", true);
        }
    }

}


