package models;

/**
 * Created by Peng on 2016/5/25.
 */

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.beans.PropertyVetoException;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;



/**
 * 操作Excel表格的功能类
 */
public class ImportUserDepartment {


    public static void main(String[] args) throws IOException, PropertyVetoException, SQLException {
//        String path = "e:/inspur/";C:\Users\Peng\Desktop\
        String path = "C:\\Users\\Peng\\Desktop\\";
        String fileName = "user";
        String fileType = "xlsx";


        Map<String,String> map=new HashMap<String,String>();

        Map<String,String> mapName=new HashMap<String,String>();

        map=read(path, fileName, fileType,map,mapName);

//        System.out.print("====="+map);
//        updateDB(map,mapName);

    }

    public static void updateDB(Map<String, String> map,Map<String,String> mapName) throws PropertyVetoException, SQLException{
        ComboPooledDataSource cpds = new ComboPooledDataSource();
        cpds.setDriverClass( "org.postgresql.Driver"); // loads the jdbc
        // driver
        cpds.setJdbcUrl( "jdbc:postgresql://localhost/slackplatform3");
        cpds.setUser( "postgres");
        cpds.setPassword( "postgres");
        Connection conn=cpds.getConnection();
        int i=1;
        conn.setAutoCommit(false);
        for (Map.Entry<String, String> entry : map.entrySet()) {



            String key= entry.getKey();
            String value=entry.getValue();
            String[] params=new String[4];

            params[0]=value;

            String name=mapName.get(key);
            params[1]=name;
            params[2]="浪潮通软";
            params[3]=key;

            System.out.println("key:"+key+"|value="+value);
//            QueryRunner qRunner = new QueryRunner();

//            qRunner.update(conn, "update member set department=? ,nickname=? ,company=? where username=?",params);

            if(i/100>0){
                conn.commit();
                System.out.println(i);
            }
            i++;
        }



    }
    private static void writer(String path, String fileName,String fileType) throws IOException {
        //创建工作文档对象
        Workbook wb = null;
        if (fileType.equals("xls")) {
            wb = new HSSFWorkbook();
        }
        else if(fileType.equals("xlsx"))
        {
            wb = new XSSFWorkbook();
        }
        else
        {
            System.out.println("您的文档格式不正确！");
        }
        //创建sheet对象
        Sheet sheet1 = (Sheet) wb.createSheet("sheet1");
        //循环写入行数据
        for (int i = 0; i < 5; i++) {
            Row row = (Row) sheet1.createRow(i);
            //循环写入列数据
            for (int j = 0; j < 8; j++) {
                Cell cell = row.createCell(j);
                cell.setCellValue("测试"+j);
            }
        }
        //创建文件流
        OutputStream stream = new FileOutputStream(path+fileName+"."+fileType);
        //写入数据
        wb.write(stream);
        //关闭文件流
        stream.close();
    }
    public static  Map<String,String>   read(String path,String fileName,String fileType, Map<String,String> map,Map<String,String> mapName) throws IOException
    {
        InputStream stream = new FileInputStream(path+fileName+"."+fileType);
        Workbook wb = null;
        if (fileType.equals("xls")) {
            wb = new HSSFWorkbook(stream);
        }
        else if (fileType.equals("xlsx")) {
            wb = new XSSFWorkbook(stream);
        }
        else {
            System.out.println("您输入的excel格式不正确");
        }
        Sheet sheet1 = wb.getSheetAt(0);
        int rowNum = sheet1.getLastRowNum();
        Row row = sheet1.getRow(0);
        int colNum = row.getPhysicalNumberOfCells();

        for (int i = 1; i <= rowNum; i++) {
            Row row1 = sheet1.getRow(i);
            int j = 0;
            String key=null;
            String djdate=null;
            String djNum=null;
            String dj_type =null;
            String dj_status=null;
            String dj_home = null;
            String dj_goto = null;
            String dj_money = null;
            String dj_people= null;
            String dj_text= null;
            String dj_remark = null;

            while (j < colNum) {
                String cellValue=null;
                Cell c=row1.getCell((short) j);
                // String value = c.getRichStringCellValue().getString();
                switch (c.getCellType()) {
                    case XSSFCell.CELL_TYPE_NUMERIC:
                        BigDecimal big = new BigDecimal(c
                                .getNumericCellValue());
                        // cellValue =big.toEngineeringString();
                        cellValue = big.toString();
                        if(j==0){
                            key=cellValue;
                        }else if(j==1){
                            djdate=cellValue;
                        }else if(j==2){
                            djNum=cellValue;
                        }
                        else if (j==3){
                            dj_type =cellValue;
                        }
                        else if (j==4){
                            dj_status =cellValue;
                        }else if (j==5){
                            dj_home =cellValue;
                        }else if (j==6){
                            dj_goto =cellValue;
                        }else if (j==7){
                            dj_money =cellValue;
                        }else if (j==8){
                            dj_people =cellValue;
                        }else if (j==9){
                            dj_text =cellValue;
                        }else if (j==10){
                            dj_remark =cellValue;
                        }
                        break;

                    case XSSFCell.CELL_TYPE_STRING:
                        cellValue = c.getRichStringCellValue().getString();
                        if (((String)cellValue).trim().equals("")
                                || ((String)cellValue).trim().length() <= 0) {
                            cellValue = "";
                        }
                        cellValue =  ((String)cellValue);
                        if(j==0){
                            key=cellValue;
                        }else if(j==1){
                            djdate=cellValue;
                        }else if(j==2){
                            djNum=cellValue;
                        }
                        else if (j==3){
                            dj_type =cellValue;
                        }
                        else if (j==4){
                            dj_status =cellValue;
                        }else if (j==5){
                            dj_home =cellValue;
                        }else if (j==6){
                            dj_goto =cellValue;
                        }else if (j==7){
                            dj_money =cellValue;
                        }else if (j==8){
                            dj_people =cellValue;
                        }else if (j==9){
                            dj_text =cellValue;
                        }else if (j==10){
                            dj_remark =cellValue;
                        }
                        break;

                }

                //    System.out.println(getCellFormatValue((HSSFCell)c)+"  ");
                j++;
            }

            map.put(key, djdate);
            map.put(key,djNum);
            map.put(key,dj_type);
            map.put(key,dj_status);
            map.put(key,dj_home);
            map.put(key,dj_goto);
            map.put(key,dj_money);
            map.put(key,dj_text);
            map.put(key,dj_remark);
//            mapName.put(key, djNum);

            System.out.println("key:"+key+"|djdate="+djdate+"|djNum111="+mapName.get(key));
        }

        return map;
    }

    private static String getCellFormatValue(HSSFCell cell) {
        String cellvalue = "";
        if (cell != null) {
            // 判断当前Cell的Type
            switch (cell.getCellType()) {
                // 如果当前Cell的Type为NUMERIC
                case HSSFCell.CELL_TYPE_NUMERIC:
                case HSSFCell.CELL_TYPE_FORMULA: {
                    // 判断当前的cell是否为Date
                    if (HSSFDateUtil.isCellDateFormatted(cell)) {
                        // 如果是Date类型则，转化为Data格式

                        //方法1：这样子的data格式是带时分秒的：2011-10-12 0:00:00
                        //cellvalue = cell.getDateCellValue().toLocaleString();

                        //方法2：这样子的data格式是不带带时分秒的：2011-10-12
                        Date date = cell.getDateCellValue();
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                        cellvalue = sdf.format(date);

                    }
                    // 如果是纯数字
                    else {
                        // 取得当前Cell的数值
                        cellvalue = String.valueOf(cell.getNumericCellValue());
                    }
                    break;
                }
                // 如果当前Cell的Type为STRIN
                case HSSFCell.CELL_TYPE_STRING:
                    // 取得当前的Cell字符串
                    cellvalue = cell.getRichStringCellValue().getString();
                    break;
                // 默认的Cell值
                default:
                    cellvalue = " ";
            }
        } else {
            cellvalue = "";
        }
        return cellvalue;

    }
}