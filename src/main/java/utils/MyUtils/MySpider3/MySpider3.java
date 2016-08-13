package utils.MyUtils.MySpider3;


import com.google.common.collect.Lists;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;


/**
 * Created by Peng on 2016/8/13.
 * 抓取js动态生成数据的网站
 这个时候我们需要用到一个工具：HTTP Analyzer，这个工具可以截获Http的交互内容，我们通过这个工具来达到我们的目的。
 其中抓取过程中参考了资料http://blog.csdn.net/aa4790139/article/details/8587208/进行json和ArryyLiat之间的转化;
 抓取网站为:http://www.guangyewuliu.com/help/stationQuery
 */
public class MySpider3 {

    //第一布首先获取网页内容,写一个方法：
     static String getHtmlData(String url){
         // 定义一个字符串用来存储网页内容
         String result = "";

         // 定义一个缓冲字符输入流
         BufferedReader in = null;
         try {
             //URL 从URL连接中读取数据
             URL realUrl = new URL(url);
             // 初始化一个链接到那个url的连接
             URLConnection connection = realUrl.openConnection();
             // 开始实际的连接
             connection.connect();
             InputStreamReader inputStreamReader = new InputStreamReader(connection.getInputStream(),"utf-8");
             in = new BufferedReader(inputStreamReader);
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
         return result;
     }


    //此方法有异常,原因可能出现在List<String> results 中 数组有空格
    static List<Wuliu> wuliuList(){

        String url =null;
        String result = null;
        //保存所有字符串数组
        List<String> results =Lists.newArrayList();
        Gson gson = new Gson();
        for (int i = 1; i < 18; i++) {
            if (i < 10) {
                url = "http://www.guangyewuliu.com/help/station!getStations?distId=370" + i;
            } else {
                url = "http://www.guangyewuliu.com/help/station!getStations?distId=37" + i;
            }
//            url = "http://www.guangyewuliu.com/help/station!getStations?distId=3701";
//            System.out.println(getHtmlData(url));
            //截取一下字符串,最笨的方法了/////////////////////////
            String gethtml = getHtmlData(url);
//            System.out.println(gethtml);
            int beginIx = gethtml.indexOf("{\"address\"");
            int endIx = gethtml.indexOf("],\"total\"");
            result = gethtml.substring(beginIx, endIx);
            Wuliu wuliu = gson.fromJson(result, Wuliu.class);
            System.out.println("========"+wuliu);
            results.add(result);
//            System.out.println(results);
            ///////////////////////////////////////////////////////

        }
//        System.out.println(results);
        List<Wuliu> wuliusList = Lists.newArrayList();

        results.forEach(l -> {
            Wuliu wuliu = gson.fromJson(l, Wuliu.class);
            wuliusList.add(wuliu);
        });

        return wuliusList;
    }

    /**
     * 通过Gson进行解析,实体类进行
     * @param
     */
    static List<Wuliu> getWuliuList(){

        String url =null;
        String result = null;
        Gson gson = new Gson();
        //所有地区结果放在一个list里面，
        List<Wuliu> wuliuList = Lists.newArrayList();

        for (int i = 1; i < 18; i++) {
            if (i < 10) {
                url = "http://www.guangyewuliu.com/help/station!getStations?distId=370" + i;
            } else {
                url = "http://www.guangyewuliu.com/help/station!getStations?distId=37" + i;
            }
            //截取一下字符串,最笨的方法了/////////////////////////
            String gethtml = getHtmlData(url);
//                System.out.println(gethtml);
            /////////截取每一个城市的[]///////////////////////////
            int beginIx = gethtml.indexOf("[");
            int endIx = gethtml.indexOf(",\"total\"");
            /////////////////////////////////////////
            result = gethtml.substring(beginIx, endIx);
//                results.add(result);
            ////////////////////////////////////////////////////////////////////////////////////
            List<Wuliu> lists=gson.fromJson(result,new TypeToken<List<Wuliu>>(){}.getType());
            for(Wuliu wuliu:lists){
                Wuliu w = new Wuliu();
                w.setOrgName(wuliu.getOrgName());
                w.setDistFullName(wuliu.getDistFullName());
                w.setDistName(wuliu.getDistName());
                w.setMobile(wuliu.getMobile());
                w.setAddress(wuliu.getAddress());
                //这个字段表示实际remark
                w.setProvName(wuliu.getContact()+","+wuliu.getMobile());
                /** 无意义的注释,实际业务中的字段
                 "name="+wuliu.getOrgName()+
                 "fullname="+wuliu.getDistFullName()+
                 "quxian="+wuliu.getDistName()+
                 "phone="+wuliu.getMobile()+
                 "address="+wuliu.getAddress()+
                 "remark="+wuliu.getContact()+","+wuliu.getMobile());
                **/


                wuliuList.add(w);
            }

        }
//        System.out.println("====11===="+wuliuList.get(1).getAddress());
        return wuliuList;

    }



    public static void main(String[] args) {

        System.out.println(getWuliuList());
//            String url =null;
//            String result = null;
//            Gson gson = new Gson();
//            //所有地区结果放在一个list里面，
//            List<Wuliu> wuliuList = Lists.newArrayList();
//
//            for (int i = 1; i < 18; i++) {
//                if (i < 10) {
//                    url = "http://www.guangyewuliu.com/help/station!getStations?distId=370" + i;
//                } else {
//                    url = "http://www.guangyewuliu.com/help/station!getStations?distId=37" + i;
//                }
////            url = "http://www.guangyewuliu.com/help/station!getStations?distId=3701";
////            System.out.println(getHtmlData(url));
//                //截取一下字符串,最笨的方法了/////////////////////////
//                String gethtml = getHtmlData(url);
////                System.out.println(gethtml);
//                /////////截取每一个城市的[]///////////////////////////
//                int beginIx = gethtml.indexOf("[");
//                int endIx = gethtml.indexOf(",\"total\"");
//                /////////////////////////////////////////
//                result = gethtml.substring(beginIx, endIx);
////                results.add(result);
//
//                ////////////////////////////////////////////////////////////////////////////////////
//                List<Wuliu> lists=gson.fromJson(result,new TypeToken<List<Wuliu>>(){}.getType());
//                for(Wuliu wuliu:lists){
//                    Wuliu w = new Wuliu();
//                    w.setOrgName(wuliu.getOrgName());
//                    w.setDistFullName(wuliu.getDistFullName());
//                    w.setDistName(wuliu.getDistName());
//                    w.setMobile(wuliu.getMobile());
//                    w.setAddress(wuliu.getAddress());
//                    //这个字段表示实际remark
//                    w.setProvName(wuliu.getContact()+","+wuliu.getMobile());
//                    wuliuList.add(w);
//                    ////////////////////////////////////////map/////////////
////                    Map<String,Object> map = Maps.newHashMap();
////                    map.put("name",wuliu.getOrgName());
////                    map.put("fullname",wuliu.getDistFullName());
////                    map.put("quxian",wuliu.getDistName());
////                    map.put("phone",wuliu.getMobile());
////                    map.put("address",wuliu.getAddress());
////                    map.put("remark",wuliu.getContact()+","+wuliu.getMobile());
////                    wuliuList.add(map);
//                    ///////////////////////////////////////////////////////////
////                    System.out.println(//根据实际业务需求返回的字段
////                            "name="+wuliu.getOrgName()+
////                            "fullname="+wuliu.getDistFullName()+
////                            "quxian="+wuliu.getDistName()+
////                            "phone="+wuliu.getMobile()+
////                            "address="+wuliu.getAddress()+
////                            "remark="+wuliu.getContact()+","+wuliu.getMobile());
//                }
//                ////////////////////////////////////////////////////////////////////////////////////
//
//                ///////////////////////////////////////////////////////
//            }
//        System.out.println("====11===="+wuliuList.get(1).getAddress());



    }

}
