/**
1
    <>来源:http://www.jb51.net/article/57189.htm</>
 开篇我们还是和原来一样，讲一讲做爬虫的思路以及需要准备的知识吧，高手们请直接忽略。

 首先我们来缕一缕思绪，想想到底要做什么，列个简单的需求。

 需求如下：

 1.模拟访问知乎官网（http://www.zhihu.com/）

 2.下载指定的页面内容，包括：今日最热，本月最热，编辑推荐

 3.下载指定分类中的所有问答，比如：投资，编程，挂科

 4.下载指定回答者的所有回答

 5.最好有个一键点赞的变态功能（这样我就可以一下子给雷伦的所有回答都点赞了我真是太机智了！）

 那么需要解决的技术问题简单罗列如下：

 1.模拟浏览器访问网页

 2.抓取关键数据并保存到本地

 3.解决网页浏览中的动态加载问题

 4.使用树状结构海量抓取知乎的所有内容

 好的，目前就想了这些。

 接下来就是准备工作了。

 1.确定爬虫语言：由于以前写过一系列爬虫教程（点击这里），百度贴吧，糗事百科，山东大学的绩点查询等都是用python写的，所以这次决定使用Java来写（喂完全没有半毛钱联系好吗）。

 2.科普爬虫知识：网络爬虫，即Web Spider，是一个很形象的名字。把互联网比喻成一个蜘蛛网，那么Spider就是在网上爬来爬去的蜘蛛。网络蜘蛛通过网页的链接地址来寻找网页。具体的入门介绍请（点击这里）。

 3.准备爬虫环境：Jdk和Eclipse的安装和配置就不多说啦。这里啰嗦一句，一个好用的浏览器对于爬虫来说非常重要，因为首先你需要自己浏览网页知道你需要的东西在哪里，你才能告诉你的爬虫们去哪里怎么爬。个人推荐火狐浏览器，或者谷歌浏览器，它们的右键审查元素和查看源代码的功能都非常强大。

 下面我们开始正式的爬虫之旅！~具体讲些什么呢，恩，这是个问题，让我好好想想，别急^_^

 */
////////////////////////////////


/**2:
 * @Main_2
 * 上一集中我们说到需要用Java来制作一个知乎爬虫，那么这一次，我们就来研究一下如何使用代码获取到网页的内容。

 首先，没有HTML和CSS和JS和AJAX经验的建议先去W3C（点我点我）小小的了解一下。

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


/**2:接下来呢，我们开始制作知乎的爬虫。

 首先，确定第一个目标：编辑推荐。

 网页链接：http://www.zhihu.com/explore/recommendations

 我们对上次的代码稍作修改，先实现能够获取该页面内容：
 import java.io.*;
 import java.net.*;
 import java.util.regex.*;
 public class Main {
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
 return "Nothing";
 }
 public static void main(String[] args) {
 // 定义即将访问的链接
 String url = "http://www.zhihu.com/explore/recommendations";
 // 访问链接并获取页面内容
 String result = SendGet(url);
 // 使用正则匹配图片的src内容
 //String imgSrc = RegexString(result, "src=\"(.+?)\"");
 // 打印结果
 System.out.println(result);
 }
 }
 *
 */


/**
 *3
 */
package utils.SpiderAll.Spider4_perfect.C_zhihu_Spider;