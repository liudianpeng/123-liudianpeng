package utils.jdbc.postgres;

import utils.StringtoArray.StrToArray;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

/**
 * Created by Peng on 2016/8/19.
 *
 */
public class Postgres {


    public static void getJDBC(){

    }

    public static void main(String[] args){

        StrToArray strToArray = new StrToArray();

        List<List<String>> lists = strToArray.getStrStr(StrToArray.getString(),"_","\\|");

        System.out.println(lists);

        PreparedStatement ps = null;
        Connection ct= null;
        ResultSet rs = null;
        try{
            //加载驱动
            Class.forName("org.postgresql.Driver");
            //得到连接
            ct = DriverManager.getConnection("jdbc:postgresql://localhost:5432/z_mytest","postgres","postgres");
            ps = ct.prepareStatement(
                    "INSERT INTO wuliu_detail VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

            for (int i=0;i<lists.size();i++) {
                for (int j = 0; j < lists.get(i).size(); j++) {
                    Object[] obj = new String[ lists.get(i).size()];
                    obj =  lists.get(i).toArray(obj);
//                    System.out.println("==="+obj[4]+i);

                    ps.setInt(1, i+1);
                    ps.setInt(2, i+1+i);
                    ps.setString(3, obj[0].toString().trim());//name obj[1].toString());//name
                    ps.setString(4, null);
                    ps.setString(5, null);//quyu obj[1].toString()
                    ps.setString(6, null);
                    ps.setString(7, null);
                    ps.setString(8, null);
                    ps.setString(9, null);//quxian obj[0].toString()
                    ps.setString(10,null);//phone obj[3].toString()
                    ps.setString(11,obj[1].toString().trim());//address obj[2].toString()
                    ps.setString(12,null);
                    ps.setString(13,null);
                    ps.setString(14, obj[2].toString().trim());//remarke=xingming+shouji
                    ps.setBoolean(15, true);
                    ps.setBoolean(16, true);
                }
                int a = ps.executeUpdate();
//                if (a == 90) {
//                    System.out.print("ok");
//                } else {
//                    System.out.print("error");
//                }

                System.out.println();
            }
            System.out.println(strToArray);
            rs.close();
            ps.close();
            ct.close();

        }catch (Exception ex){
            System.out.print(ex);
        }finally {

        }

    }



}
