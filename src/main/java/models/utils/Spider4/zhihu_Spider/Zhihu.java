package models.utils.Spider4.zhihu_Spider;

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
}






