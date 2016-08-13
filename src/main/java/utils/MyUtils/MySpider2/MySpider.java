package utils.MyUtils.MySpider2;

import com.google.common.collect.Lists;
import utils.MyUtils.MySpider.Wuliu;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

    public static void main(String[] args) {
        MySpider.wuliuSave();

    }

    static List<ArrayList> wuliuSave(){
        String url = "http://www.yujiawl.com/zjyj/lxwm.aspx?types=0001";
        //保存所有信息
        List<ArrayList> all_result = Lists.newArrayList();
        //访问链接并获取首个页面内容
        String results = SendGet(url);
        //获取所有要访问的链接
        ArrayList<String> ul_li = RegexString(results, "<ul class=\"u7\">([\\s\\S]+?)</ul>");
        //System.out.println(ul_li);
        //取出[济南内埠, 济南外埠, 临沂内埠, 临沂外埠]
        ArrayList<String>li_a= RegexString(ul_li.get(0),"<a[^>]*>([^<]*)</a>");
        //需要取出a标签中的herf
        ArrayList<String>a_area_href= RegexString(ul_li.get(0),"href=\"(.+?)\"");
        //定义area_url;抓取网页从这里开始:
        String parent_area_url=null;
        for ( String list : a_area_href){
            //第i个地区(如:济南内埠)的url
            parent_area_url = "http://www.yujiawl.com"+list.substring(2);
            System.out.println(parent_area_url);
            //第i个地区(济南内埠)的页面
            String result = SendGet(parent_area_url);
            //第i个地区的所有子地区
            ArrayList<String> span_a = RegexString(result, "<span.*? id=\"ctl00_ContentPlaceHolder2_lblbt\">([\\s\\S]+?)</span>");
//            System.out.println("1=="+span_a);
            /////////////////////////////////////////////////////

            //////////////////////////////////////////////////
            if (span_a.size()>0){//没有子地区的就使用当前的url获取数据

                //第i个地区的所有子地区名称
                ArrayList<String>area_= RegexString(span_a.get(0),"<a[^>]*>([^<]*)</a>");
                System.out.println("所有子地区=="+area_);
                //第i个地区的所有子地区的url,需要获取一个子地区
                ArrayList<String> span_a_area_href = RegexString(span_a.get(0), "<a\\s*href=\"?([\\w\\W]*?)\"?[\\s]*?[^>]>([\\s\\S]*?)(?=</a>)");
//                System.out.println("2=="+span_a_area_href);
                for (String area_href : span_a_area_href){
                    //定义子地区的url
                    String area_url ="http://www.yujiawl.com/zjyj/"+area_href.substring(1);
                    System.out.println(area_url);
                    //通过地区的url获取页面内容
                    String result_end = SendGet(area_url);
                    //最终得页面已经取得,分析页面,存储数据
                    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    // 使用正则匹配最中页面内容 取出span里的table数据
                    ArrayList<String> spanTable = RegexString(result_end, "<span.*? id=\"ctl00_ContentPlaceHolder2_Labcontent\">([\\s\\S]*)</span>");

                    ArrayList<String> tableTr = RegexString(spanTable.get(0), "<tr.*?>([\\s\\S]*?)</tr>");
//                    System.out.println(tableTr);
                    /*************************取出每个tr里面的td也就是每个字段信息************************************/
                    for (String s : tableTr) {
                        if (!s.equals (tableTr.get(0))) {//因为第一项是标题,需要排除
                            ArrayList<String> _tableTd = RegexString(s, "<td.*?>([\\s\\S]*?)</td>");
                            System.out.println(_tableTd);
                            //保存每个地区的每组信息(每个url中tr的所有td分组信息)
                            all_result.add(_tableTd);//每个地区的所有组信息
                        }

                    }
                    /*************************取出每个tr里面的td也就是每个字段信息结束************************************/
                }
            }else {
                //parent_area_url来获取最终页面内容
                System.out.println("parent_area_url==="+parent_area_url);
                //通过地区的url获取页面内容
                String result_end2 = SendGet(parent_area_url);
                //最终得页面已经取得,分析页面,存储数据
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // 使用正则匹配最中页面内容 取出span里的table数据
                ArrayList<String> spanTable2 = RegexString(result_end2, "<span.*? id=\"ctl00_ContentPlaceHolder2_Labcontent\">([\\s\\S]*)</span>");
                ArrayList<String> tableTr2 = RegexString(spanTable2.get(0), "<tr.*?>([\\s\\S]*?)</tr>");
                /*************************取出每个tr里面的td也就是每个字段信息************************************/
                for (String ss : tableTr2) {
                    if (!ss.equals (tableTr2.get(0))) {//因为第一项是标题,需要排除
                        ArrayList<String> _tableTd2 = RegexString(ss, "<td.*?>([\\s\\S]*?)</td>");
                        System.out.println(_tableTd2);
                        //保存每个地区的每组信息(每个url中tr的所有td分组信息)
                        all_result.add(_tableTd2);//每个地区的所有组信息
                    }
                }
                /*************************取出每个tr里面的td也就是每个字段信息结束************************************/
            }
        }
        return all_result;
    }

     static List<ArrayList> end_result(String url){
         List<ArrayList> arrayLists = Lists.newArrayList();
         //通过地区的url获取页面内容
         String result_end2 = SendGet(url);
         //最终得页面已经取得,分析页面,存储数据
         ////////////////////////////////////////////////////////////////////////////////////////////////////////////
         // 使用正则匹配最中页面内容 取出span里的table数据
         ArrayList<String> spanTable2 = RegexString(result_end2, "<span.*? id=\"ctl00_ContentPlaceHolder2_Labcontent\">([\\s\\S]*)</span>");
         ArrayList<String> tableTr2 = RegexString(spanTable2.get(0), "<tr.*?>([\\s\\S]*?)</tr>");
         /*************************取出每个tr里面的td也就是每个字段信息************************************/
         for (String ss : tableTr2) {
             if (!ss.equals (tableTr2.get(0))) {//因为第一项是标题,需要排除
                 ArrayList<String> _tableTd2 = RegexString(ss, "<td.*?>([\\s\\S]*?)</td>");
                 System.out.println(_tableTd2);
                 //保存每个地区的每组信息(每个url中tr的所有td分组信息)
                 arrayLists.add(_tableTd2);//每个地区的所有组信息
             }
         }
         /*************************取出每个tr里面的td也就是每个字段信息结束************************************/
         return arrayLists;
     }

}
