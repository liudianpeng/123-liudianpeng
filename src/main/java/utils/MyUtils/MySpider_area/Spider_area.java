package utils.MyUtils.MySpider_area;

import com.google.common.collect.Lists;
import com.mchange.v1.xml.StdErrErrorHandler;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.nio.Buffer;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Peng on 2016/8/16.
 */
public class Spider_area {

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

    //证则表达匹配

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

    static String regexStr(String targetStr, String patternStr) {
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
        int aaaa=0;//市个数
        int bbbb=0;//县
        int cccc=0;//镇
        int dddd=0;//村
        //省_url
        String url = "http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2015/";////////////////////////////////////////////
//        System.out.println(url);
        //获取包含所有省的页面
        ArrayList<String>results_tr = regexString(getHtml(url),"<tr.*? class='provincetr'>([\\s\\S]*?)</tr>");
        for (String s : results_tr){
            ArrayList<String>results_td1 = regexString(s,"<td.*?>([\\s\\S]*?)</td>");
            for (String a :results_td1){
                //省的名称截取
                int sta = a.indexOf(">");
                int end = a.indexOf("<br/>");
                //省的"代码"截取
                int stahref = a.indexOf("'");
                int endhref = a.indexOf(".html");
                //进入市的href截取
                int href = a.indexOf("'");
                int hrefend = a.indexOf(">");
                //省-------------------------------------------------------------------
               String province =  a.substring(sta+1,end);
//                System.out.println(province);
                //省代码----------------------------------------------------------------
               Long province_id =  Long.valueOf(a.substring(stahref+1,endhref));
//                System.out.println(province_id);
                //抓取市开始===========================================
                String province_url_sub =a.substring(href+1,hrefend-1);
//                System.out.println(province_url_sub);
                String city_url = url+province_url_sub;////////////////////////////////////////////////////////////////url
                System.out.println("/市/"+city_url);
                //获取包含所有市的页面内容
                ArrayList<String>results_city = regexString(getHtml(city_url),"<tr.*? class='citytr'>([\\s\\S]*?)</tr>");
//                System.out.println(results_city);
                //获取市的代码和名称
                for (String s1:results_city){
                    ArrayList<String>results_td2 = regexString(s1,"<a.*?>([\\s\\S]*?)</a>");
//                    System.out.println("_"+results_td2);
                    //市代码------------------------------------------------------------------
                    Long city_id = Long.valueOf(results_td2.get(0));
                    //市的名称------------------------------------------------------------------
                    String city = results_td2.get(1);
//                    System.out.println(city);
//                    System.out.println(city_id);
                    System.out.println("中国第"+aaaa+++"个市");
                    //抓取市结束,抓取县开始====================================================
                    //td><a href='11/1101.html'>110100000000</a></td><td><a href='11/1101.html'>市辖区</a></td>获取1101.html
                    ArrayList<String>results_td3 = regexString(s1,"<td.*?>([\\s\\S]*?)</td>");
//                    System.out.println(results_td3);
                    //得到各区县的url尾部
                    String city_url_sub =results_td3.get(0).substring(href+1,hrefend+4);
//                    System.out.println(city_url_sub);
                    //定义各区县的url
                    String conuty_url = url+city_url_sub;//////////////////////////////////////////////////////////////url
                    System.out.println("/县/"+conuty_url);
                    ////////////////////////////////////////////////////////////
                    //获取包含所有县区的页面内容
                    ArrayList<String>results_conuty = regexString(getHtml(conuty_url),"<tr.*? class='countytr'>([\\s\\S]*?)</tr>");
//                    System.out.println(results_conuty);
                    for (String s2 :results_conuty){
                        ArrayList<String>results_td4 = regexString(s2,"<a.*?>([\\s\\S]*?)</a>");
//                        System.out.println(results_td4);
                        //区县代码-----------------------------------------------------------
                        if (results_td4.size()>0) {
                            Long county_id = Long.valueOf(results_td4.get(0));
//                            System.out.println(county_id);
                            //区县名称-----------------------------------------------------
                            String conuty = results_td4.get(1);
                            System.out.println("中国第"+bbbb+++"个县");
//                            System.out.println(conuty);
                            /////////县获取完，乡镇开始：////////////////////////////==========================================
                            ArrayList<String>results_td5 = regexString(s2,"<td.*?>([\\s\\S]*?)</td>");
//                            System.out.println(results_td5);
//                            //得到乡镇的url尾部
                            //特殊处理一下截取
                            int href_ts = results_td5.get(0).indexOf("/");
                            String town_url_sub =results_td5.get(0).substring(href_ts+1,hrefend+6);
//                            System.out.println(town_url_sub);
                            //处理一下县区url重新组合.截取县区代码的前四位组合成：XX/XX/
                            String t1 = results_td4.get(0).substring(0,2);
                            String t2 = results_td4.get(0).substring(2,4);
//                            System.out.println(t1+"_"+t2);
                            //定义乡镇url
                            String town_url = url+t1+"/"+t2+"/"+town_url_sub;//////////////////////////////////////////////////////////////url
                            System.out.println("/镇/"+town_url);
                            /////////////url处理完毕///////////////////////////////////////////////////////////////////
                            //获取包含所有乡镇页面
                            ArrayList<String>results_town = regexString(getHtml(town_url),"<tr.*? class='towntr'>([\\s\\S]*?)</tr>");
                            for (String s3:results_town){
                                ArrayList<String>results_td6 = regexString(s3,"<a.*?>([\\s\\S]*?)</a>");

                                //乡镇代码
                                Long town_id = Long.valueOf(results_td6.get(0));//--------------------------
//                            System.out.println(town_id);
                                //乡镇名称-----------------------------------------------------------------
                                String town = results_td6.get(1);
                                System.out.println("中国第"+cccc+++"个镇");
//                                System.out.println(town);
                                /////////////////////////////获取村庄///////////////////////////////////////////////////
                                ArrayList<String>results_td7 = regexString(s3,"<td.*?>([\\s\\S]*?)</td>");
//                                System.out.println(results_td7);
////                            //得到村的url尾部
//                                //特殊处理一下截取
                                int href_ts1 = results_td7.get(0).indexOf("/");
                                String village_url_sub =results_td7.get(0).substring(href_ts1+1,hrefend+9);
//                                System.out.println(village_url_sub);
//                                //处理一下县区url重新组合.截取县区代码的前四位组合成：XX/XX/
                                String t3 = results_td6.get(0).substring(0,2);
                                String t4 = results_td6.get(0).substring(2,4);
                                String t5 = results_td6.get(0).substring(4,6);
//                                System.out.println(t3+"_"+t4+"_"+t5);
                                //定义村url
                                String village_url = url+t3+"/"+t4+"/"+t5+"/"+village_url_sub;//////////////////////////////////////////////////////////////url
                                System.out.println("/村/"+village_url);
//                                /////////////url处理完毕///////////////////////////////////////////////////////////////////
                                //获取包含所有乡镇页面
                                ArrayList<String>results_village = regexString(getHtml(village_url),"<tr.*? class='villagetr'>([\\s\\S]*?)</tr>");
//                                System.out.println(results_village);
                                for (String s4:results_village){
                                    ArrayList<String>results_td8 = regexString(s4,"<td.*?>([\\s\\S]*?)</td>");
//
                                    if (results_td8.size()>0) {
                                        //村代码
                                        Long village_id = Long.valueOf(results_td8.get(0));//--------------------------
//                                        System.out.println(village_id);
                                        //城乡分类--------------------------------------------------------------------
                                        String village_type = results_td8.get(1);
//                                        System.out.println(village_type);
                                        //村名
                                        String village = results_td8.get(2);//-----------------------------------------
//                                        System.out.println(village);
                                        System.out.println(province+"->"+city+"->"+conuty+"->"+town+"->"+village);
                                        System.out.println("中国第" + dddd++ + "个村");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        System.out.println("统计" + aaaa+"个市"+bbbb+"个县"+cccc+"个镇"+dddd + "个村");
    }

}
