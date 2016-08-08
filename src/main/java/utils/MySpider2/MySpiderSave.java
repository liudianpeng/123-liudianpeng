package utils.MySpider2;

/**
 * Created by Peng on 2016/8/8.
 */


import utils.MySpider2.MySpider;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;


public class MySpiderSave {

    public static void main(String[] args){

        List<ArrayList> mySpider = MySpider.wuliuSave();

        PreparedStatement ps = null;
        Connection ct= null;
        ResultSet rs = null;
        try{

            //加载驱动
            Class.forName("org.postgresql.Driver");
            //得到连接
            ct = DriverManager.getConnection("jdbc:postgresql://localhost:5432/test","postgres","postgres");
            ps = ct.prepareStatement(
                    "INSERT INTO wuliu_detail VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
            for (int i=0;i<mySpider.size();i++) {
                for (int j = 0; j < mySpider.get(i).size(); j++) {
                    Object[] obj = new String[ mySpider.get(i).size()];
                    obj =  mySpider.get(i).toArray(obj);
//                    System.out.println("==="+obj[4]+i);

                    ps.setInt(1, i+1);
                    ps.setInt(2, i+1+i);
                    ps.setString(3, obj[4].toString());//name
                    ps.setString(4, "");
                    ps.setString(5, obj[1].toString());//quyu
                    ps.setString(6, "");
                    ps.setString(7, "");
                    ps.setString(8, "");
                    ps.setString(9,obj[0].toString());//quxian
                    ps.setString(10, obj[3].toString());//phone
                    ps.setString(11, obj[2].toString());//address
                    ps.setString(12, "");
                    ps.setString(13, "");
                    ps.setString(14, "");
//                ps.setDate(15,new Date(1970-01-01));
//                ps.setDate(16,new Date(1970-01-01));
                    ps.setBoolean(15, true);
                    ps.setBoolean(16, true);
                    ps.setString(17, obj[5].toString());//shouji
                }
                int a = ps.executeUpdate();
                if (a == 90) {
                    System.out.print("ok");
                } else {
                    System.out.print("error");
                }

                System.out.println();
            }
            System.out.println(mySpider);
            rs.close();
            ps.close();
            ct.close();

        }catch (Exception ex){
            System.out.print(ex);
        }finally {

        }

    }



}
