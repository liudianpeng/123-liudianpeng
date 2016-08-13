package utils.MyUtils.MySpider3;

import utils.MyUtils.MySpider2.MySpider;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Peng on 2016/8/13.
 */
public class MySpidrSave {

    public static void main(String[] args){

        List<Wuliu> myWuliu = MySpider3.getWuliuList();

        PreparedStatement ps = null;
        Connection ct= null;
        ResultSet rs = null;
        try{

            //加载驱动
            Class.forName("org.postgresql.Driver");
            //得到连接
            ct = DriverManager.getConnection("jdbc:postgresql://localhost:5432/test","postgres","postgres");
            ps = ct.prepareStatement(
                    "INSERT INTO wuliu_detail VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

            for (Wuliu wuliu:myWuliu){

                ps.setInt(1, 1);
                ps.setInt(2, 1);
                ps.setString(3,wuliu.getOrgName());//name obj[1].toString());//name
                ps.setString(4, wuliu.getDistFullName());
                ps.setString(5, "");//quyu obj[1].toString()
                ps.setString(6, "");
                ps.setString(7, "");
                ps.setString(8, "");
                ps.setString(9, wuliu.getDistName());//quxian obj[0].toString()
                ps.setString(10,wuliu.getMobile());//phone obj[3].toString()
                ps.setString(11,wuliu.getAddress());//address obj[2].toString()
                ps.setString(12,"");
                ps.setString(13,"");
                ps.setString(14, wuliu.getProvName());//remarke=xingming+shouji
//                ps.setDate(15,new Date(1970-01-01));
//                ps.setDate(16,new Date(1970-01-01));
                ps.setBoolean(15, true);
                ps.setBoolean(16, true);
                int a = ps.executeUpdate();
//                if (a == 90) {
//                    System.out.print("ok");
//                } else {
//                    System.out.print("error");
//                }

                System.out.println(wuliu.getProvName());
            }

            rs.close();
            ps.close();
            ct.close();

        }catch (Exception ex){
            System.out.print(ex);
        }finally {

        }

    }

}
