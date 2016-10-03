package utils.MyUtils.MySpider_taobao;

import com.google.common.collect.Lists;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Peng on 2016/8/16.
 * 我要抓取淘宝网!!!!!!!!!!!
 */
public class TaobaoSpider {


    /**
     * 还未登录时的url
     * https://shizhuang99.taobao.com/shop/view_shop.htm?spm=a1z0k.7385993.1997989141.d4915209.EyujfD&shop_id=72296457&qq-pf-to=pcqq.c2c
     * 登录后的url
     * https://shizhuang99.taobao.com/shop/view_shop.htm?spm=a1z0k.7385993.1997989141.d4915209.EyujfD&shop_id=72296457&qq-pf-to=pcqq.c2c
     */
    /**
     * 第一个商品:
     * https://item.taobao.com/item.htm?spm=a1z10.1-c.w4004-12115336653.3.cxRV4t&id=531153632114
     * 第二个商品:
     * https://item.taobao.com/item.htm?spm=a1z10.1-c.w4004-12115336653.5.cxRV4t&id=525958340211
     * 第三个商品:=======
     * https://item.taobao.com/item.htm?spm=a1z10.1-c.w4004-12115336653.7.cxRV4t&id=530230673689
     * 第四个商品:
     * https://item.taobao.com/item.htm?spm=a1z10.1-c.w4004-12115336653.9.cxRV4t&id=525961998103
     *
     * 操!!! 找不到规律!!!!
     */
    //得到网页

    //获取网页
    public static String getHtml(String url){

//
        // 定义一个字符串用来存储网页内容
        String result = "";
        BufferedReader in = null;
        try {
            //获取url
            URL resultUrl = new URL(url);
            //打开url
            URLConnection connection = resultUrl.openConnection();
            InputStreamReader inputStreamReader = new InputStreamReader(connection.getInputStream(),"gb2312");
            in =new BufferedReader(inputStreamReader);
            // 用来临时存储抓取到的每一行的数据
            String line;

            while ((line = in.readLine()) != null) {
                // 遍历抓取到的每一行并将其存储到result里面
                result += line+ "\n";
            }


        }catch (Exception e){
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
//        System.out.println(result);
        return result;
    }
    //正则匹配
    static ArrayList<String> regexString(String targetStr, String patternStr) {
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
    public static void main(String[] args){
        String url = "https://item.taobao.com/item.htm?spm=a1z10.1-c.w4004-12115336653.7.cxRV4t&id=530230673689";
        String result = getHtml(url);

        //分析url;
        int start = result.indexOf("[\"//");
        int end = result.indexOf("g\"]");
        /**
         * ["//gd4.alicdn.com/bao/uploaded/i4/901688854/TB22IEToFXXXXa_XXXXXXXXXXXX_!!901688854.jpg",
         * "//gd2.alicdn.com/imgextra/i2/901688854/TB22bIZoFXXXXapXXXXXXXXXXXX_!!901688854.jpg",
         * "//gd1.alicdn.com/imgextra/i1/901688854/TB2OrAkoFXXXXc9XpXXXXXXXXXX_!!901688854.jpg",
         * "//gd3.alicdn.com/imgextra/i3/901688854/TB2aTEHoFXXXXXcXpXXXXXXXXXX_!!901688854.jpg",
         * "//gd1.alicdn.com/imgextra/i1/901688854/TB2Sr3foFXXXXacXFXXXXXXXXXX_!!901688854.jpg"]
         */

        String data = result.substring(start,end+3);
        System.out.println(data);
        String data_rep1=data.replaceAll("\"/","\\{\"url\":\"/");
        System.out.println(data_rep1);
        String data_rep = data_rep1.replaceAll(",","\\},");
        System.out.println(data_rep);
        String data_rep2 = data_rep.replaceAll("\"]","\"}]");
        System.out.println(data_rep2);


        Gson gson = new Gson();
        List<ImgURL> lists=gson.fromJson(data_rep2,new TypeToken<List<ImgURL>>(){}.getType());
        for (ImgURL imgURL : lists) {
            System.out.println(imgURL.getUrl());
        }
    }

}
