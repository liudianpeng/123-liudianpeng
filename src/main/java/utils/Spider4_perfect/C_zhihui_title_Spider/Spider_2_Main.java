package utils.Spider4_perfect.C_zhihui_title_Spider;

import java.util.ArrayList;

/**
 * Created by Peng on 2016/8/7.
 * 最后一个main方法负责调用。
 */
public class Spider_2_Main {

    public static void main(String[] args) {
        // 定义即将访问的链接
        String url = "http://www.zhihu.com/explore/recommendations";
        // 访问链接并获取页面内容
        String content = Spider_2.SendGet(url);
        // 获取该页面的所有的知乎对象
        ArrayList<Zhihu> myZhihu = Spider_2.GetZhihu(content);
        // 打印结果
        System.out.println(myZhihu);
    }


}
