package utils.Spider4_perfect.D_zhihui_title_Spider;

/**
 * Created by Peng on 2016/8/7.
 * 我们需要设计一个Zhihu封装类，来存储所有抓取到的对象。
 * 再新建一个Spider_2类来存放一些爬虫常用的函数。
 */
import java.util.ArrayList;

public class Zhihu {
    public String question;// 问题
    public String zhihuUrl;// 网页链接
    public ArrayList<String> answers;// 存储所有回答的数组
    // 构造方法初始化数据
    public Zhihu() {
        question = "";
        zhihuUrl = "";
        answers = new ArrayList<String>();
    }

    @Override
    public String toString() {
        return "问题：" + question + "\n链接：" + zhihuUrl + "\n回答：" + answers + "\n";
    }
}

