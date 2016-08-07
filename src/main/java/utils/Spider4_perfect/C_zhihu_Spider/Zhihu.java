package utils.Spider4_perfect.C_zhihu_Spider;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Peng on 2016/8/7.
 * 前期我们抓取标题是在该链接下：
 http://www.zhihu.com/explore/recommendations
 但是显然这个页面是无法获取答案的。
 一个完整问题的页面应该是这样的链接：
 http://www.zhihu.com/question/22355264
 仔细一看，啊哈我们的封装类还需要进一步包装下，至少需要个questionDescription来存储问题描述：
 */
public class Zhihu {
    public String question;// 问题
    public String questionDescription;// 问题描述
    public String zhihuUrl;// 网页链接
    public ArrayList<String> answers;// 存储所有回答的数组
    // 构造方法初始化数据
    public Zhihu(String url) {
        // 初始化属性
        question = "";
        questionDescription = "";
        zhihuUrl = "";
        answers = new ArrayList<String>();
        // 判断url是否合法
        if (getRealUrl(url)) {
            System.out.println("正在抓取" + zhihuUrl);
            // 根据url获取该问答的细节
            String content = Spider_2.SendGet(zhihuUrl);
            Pattern pattern;
            Matcher matcher;
            // 匹配标题
            pattern = Pattern.compile("zh-question-title.+?<h2.+?>(.+?)</h2>");
            matcher = pattern.matcher(content);
            if (matcher.find()) {
                question = matcher.group(1);
            }
            // 匹配描述
            pattern = Pattern
                    .compile("zh-question-detail.+?<div.+?>(.*?)</div>");
            matcher = pattern.matcher(content);
            if (matcher.find()) {
                questionDescription = matcher.group(1);
            }
            // 匹配答案
            pattern = Pattern.compile("/answer/content.+?<div.+?>(.*?)</div>");
            matcher = pattern.matcher(content);
            boolean isFind = matcher.find();
            while (isFind) {
                answers.add(matcher.group(1));
                isFind = matcher.find();
            }
        }
    }
    // 根据自己的url抓取自己的问题和描述和答案
    public boolean getAll() {
        return true;
    }

    /**
     * 接下来，就是在Zhihu的构造方法里面，通过url获取所有的详细数据。
     我们先要对url进行一个处理，因为有的针对回答的，它的url是：
     http://www.zhihu.com/question/22355264/answer/21102139
     有的针对问题的，它的url是：
     http://www.zhihu.com/question/22355264
     那么我们显然需要的是第二种，所以需要用正则把第一种链接裁切成第二种，这个在Zhihu中写个函数即可
     * @param url
     * @return
     */
    // 处理url
    boolean getRealUrl(String url) {
        // 将http://www.zhihu.com/question/22355264/answer/21102139
        // 转化成http://www.zhihu.com/question/22355264
        // 否则不变
        Pattern pattern = Pattern.compile("question/(.*?)/");
        Matcher matcher = pattern.matcher(url);
        if (matcher.find()) {
            zhihuUrl = "http://www.zhihu.com/question/" + matcher.group(1);
        } else {
            return false;
        }
        return true;
    }
    @Override
    public String toString() {
        return "问题：" + question + "\n" + "描述：" + questionDescription + "\n"
                + "链接：" + zhihuUrl + "\n回答：" + answers.size() + "\n";
    }

    //上一回我们说到了如何把知乎的某些内容爬取出来，那么这一回我们就说说怎么把这些内容存储到本地吧。
    /**
     * 说到Java的本地存储，肯定使用IO流进行操作。
     首先，我们需要一个创建文件的函数createNewFile：
     */
//    public static boolean createNewFile(String filePath) {
//        boolean isSuccess = true;
//        // 如有则将"\\"转为"/",没有则不产生任何变化
//        String filePathTurn = filePath.replaceAll("\\\\", "/");
//        // 先过滤掉文件名
//        int index = filePathTurn.lastIndexOf("/");
//        String dir = filePathTurn.substring(0, index);
//        // 再创建文件夹
//        File fileDir = new File(dir);
//        isSuccess = fileDir.mkdirs();
//        // 创建文件
//        File file = new File(filePathTurn);
//        try {
//            isSuccess = file.createNewFile();
//        } catch (IOException e) {
//            isSuccess = false;
//            e.printStackTrace();
//        }
//        return isSuccess;
//    }
//    //然后，我们需要一个写入文件的函数：
//
//    public static boolean writeIntoFile(String content, String filePath,
//                                        boolean isAppend) {
//        boolean isSuccess = true;
//        // 先过滤掉文件名
//        int index = filePath.lastIndexOf("/");
//        String dir = filePath.substring(0, index);
//        // 创建除文件的路径
//        File fileDir = new File(dir);
//        fileDir.mkdirs();
//        // 再创建路径下的文件
//        File file = null;
//        try {
//            file = new File(filePath);
//            file.createNewFile();
//        } catch (IOException e) {
//            isSuccess = false;
//            e.printStackTrace();
//        }
//        // 写入文件
//        FileWriter fileWriter = null;
//        try {
//            fileWriter = new FileWriter(file, isAppend);
//            fileWriter.write(content);
//            fileWriter.flush();
//        } catch (IOException e) {
//            isSuccess = false;
//            e.printStackTrace();
//        } finally {
//            try {
//                if (fileWriter != null)
//                    fileWriter.close();
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//
//        return isSuccess;
//    }
    /**我们把这两个函数封装到一个FileReaderWriter.java文件中以便后续使用。
    接着我们回到知乎爬虫中。
    我们需要给知乎的Zhihu封装类加个函数，用来格式化写入到本地时的排版。**/

    public String writeString() {
        String result = "";
        result += "问题：" + question + "\r\n";
        result += "描述：" + questionDescription + "\r\n";
        result += "链接：" + zhihuUrl + "\r\n";
        for (int i = 0; i < answers.size(); i++) {
            result += "回答" + i + "：" + answers.get(i) + "\r\n";
        }
        result += "\r\n\r\n";
        // 将其中的html标签进行筛选
        result = result.replaceAll("<br>", "\r\n");
        result = result.replaceAll("<.*?>", "");
        return result;
    }
    /**
     * OK，这样就差不多了，接下来吧mian方法中的System.out.println改成
     * 大体一看没什么问题，仔细看看发现问题：存在太多的html标签，主要是<b>和<br>。
     我们可以在输出的时候对这些标记进行处理。
     先把<br>换成io流里面的\r\n，再把所有的html标签都删除，这样看起来便会清晰很多。
     */

}






