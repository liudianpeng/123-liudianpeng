package utils.MySpider;

import com.google.common.collect.Lists;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import static br.com.starcode.jerichoselector.jerQuery.$;
/**
 * Created by Peng on 2016/8/7.
 * 抓取"宇佳物流"网站中的配送站点并存入数据库中;
 * 链接:http://www.yujiawl.com/zjyj/lxwm.aspx?types=0001
 */
public class MySpider {
    List<String> matchList = new ArrayList<String>();

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
            in = new BufferedReader(new InputStreamReader(connection.getInputStream(),"gb2312"));
            // 用来临时存储抓取到的每一行的数据
            String line;
            while ((line = in.readLine()) != null) {
                // 遍历抓取到的每一行并将其存储到result里面
                result += line+ "\n";;
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



    static List<ArrayList> wuliuSave(){
        // 定义即将访问的链接
        String url = "http://www.yujiawl.com/zjyj/lxwm.aspx?types=000";
        //保存每个地区的每组信息(每个url中tr的所有td分组信息)
        List<ArrayList> tableTd = Lists.newArrayList();
        Wuliu wuliu =new Wuliu();
        for (int i = 1; i < 6; i++) {
            //////////////////////////////////////////////////////////////////////////////////////////////////
            // 访问链接并获取页面内容
            String result = SendGet(url+String.valueOf(i));
            // 使用正则匹配内容 取出span里的table数据
            ArrayList<String> spanTable = RegexString(result, "<span.*? id=\"ctl00_ContentPlaceHolder2_Labcontent\">([\\s\\S]*)</span>");
            //不会一次性匹配成功，所以分了三次匹配
            ArrayList<String> tableTr = RegexString(spanTable.get(0), "<tr.*?>([\\s\\S]*?)</tr>");
//                    System.out.println(tableTr);

            // 打印结果
            /*************************取出每个tr里面的td也就是每个字段信息************************************/
            for (String s : tableTr) {
                if (!s.equals (tableTr.get(0))) {//因为第一项是标题,需要排除
                    //每一组tr里面的td
                    ArrayList<String> _tableTd = RegexString(s, "<td.*?>([\\s\\S]*?)</td>");

                    //需要保存到数据库中:把_table保存成一个对象
                    //////////////
                    if (null !=_tableTd) {
                        //只管保存每个tr中所有td就好

//                        wuliu.setId(1l);
//                        wuliu.setQuxian(_tableTd.get(0));
//                        wuliu.setQuyu(_tableTd.get(1));
//                        wuliu.setAddress(_tableTd.get(2));
//                        wuliu.setPhone(_tableTd.get(3));
//                        wuliu.setName(_tableTd.get(4));
//                        wuliu.setShouji(_tableTd.get(5));
//                        System.out.println("this is wuliu="+wuliu.getName()+
//                                wuliu.getQuxian() +
//                                wuliu.getQuyu()+
//                                wuliu.getShouji()+
//                                wuliu.getPhone());//每组信息里面的每条信息
                        //保存到数据库
                }
                    //////////////

                    //保存每个地区的每组信息(每个url中tr的所有td分组信息)
                    tableTd.add(_tableTd);//每个地区的所有组信息

                    //每个tr里面的td数据,可以把_table保存成一个对象
//                    System.out.println(_tableTd);

                }
            }
            /***********************************************************************************************/
        }
        return tableTd;
    }

    public static void main(String[] args) {

        List<ArrayList> mySpider = wuliuSave();
                System.out.println(mySpider);



        // 定义即将访问的链接
//        String url = "http://www.yujiawl.com/zjyj/lxwm.aspx?types=000";
//        for (int i = 1; i < 6; i++) {
//            //////////////////////////////////////////////////////////////////////////////////////////////////
//            // 访问链接并获取页面内容
//            String result = SendGet(url+String.valueOf(i));
//            // 使用正则匹配内容
//            ArrayList<String> spanTable = RegexString(result, "<span.*? id=\"ctl00_ContentPlaceHolder2_Labcontent\">([\\s\\S]*)</span>");
//            //不会一次性匹配成功，所以分了三次匹配
//            ArrayList<String> tableTr = RegexString(spanTable.get(0), "<tr.*?>([\\s\\S]*?)</tr>");
//            //        System.out.println(tableTr);
//            //保存每个地区的每组信息(每个url中tr的所有td分组信息)
//            List<ArrayList> tableTd = Lists.newArrayList();
//            // 打印结果
//            /*************************取出每个tr里面的td也就是每个字段信息************************************/
//            for (String s : tableTr) {
//                if (!s.equals (tableTr.get(0))) {//因为第一项是标题,需要排除
//                    //每一组tr里面的td
//                    ArrayList<String> _tableTd = RegexString(s, "<td.*?>([\\s\\S]*?)</td>");
//
//                    //保存每个地区的每组信息(每个url中tr的所有td分组信息)
//                    tableTd.add(_tableTd);//每个地区的所有组信息
//
//                    if (null !=_tableTd) {
//                        //只管保存每个tr中所有td就好
//                        Wuliu wuliu = new Wuliu();
//                        wuliu.setId(1l);
//                        wuliu.setQuxian(_tableTd.get(0));
//                        wuliu.setQuyu(_tableTd.get(1));
//                        wuliu.setAddress(_tableTd.get(2));
//                        wuliu.setPhone(_tableTd.get(3));
//                        wuliu.setName(_tableTd.get(4));
//                        wuliu.setShouji(_tableTd.get(5));
//                        System.out.println("this is wuliu="+wuliu.getName()+
//                                wuliu.getQuxian() +
//                                wuliu.getQuyu()+
//                                wuliu.getShouji()+
//                                wuliu.getPhone());//每组信息里面的每条信息
//                        //保存到数据库
//
//
//
//                        ///////////////////////////////////////////
//                        ////////////////////////////此处测试取出效果
////                        for (String wl : _tableTd) {
////                            if (null != wl) {
//////                                System.out.println(wl);//每组信息里面的每条信息
////                            }
////                        }
//                        /////////////////////////////
//                    }
//                    System.out.println("每一组tr中的td信息=="+_tableTd);//每一组信息
//                }
//            }
//            /*****************************************************************/
//            System.out.println("每个url地区的所有tr组信息"+tableTd);
//        }

    }




}
