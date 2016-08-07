package models.utils.Spider4.xiangguanClass_demo;

import java.io.*;

/**
 * Created by Peng on 2016/8/7.
 *
 * InputStreamReader 将字节流转换为字符流。是字节流通向字符流的桥梁。如果不指定字符集编码，该解码过程将使用平台默认的字符编码，如：GBK。
 构造方法 ：
 InputStreamReader isr = new InputStreamReader(InputStream in);//构造一个默认编码集的InputStreamReader类
 InputStreamReader isr = new InputStreamReader(InputStream in,String charsetName);//构造一个指定编码集的InputStreamReader类。

 参数 in对象通过 InputStream in = System.in;获得。//读取键盘上的数据。
 或者 InputStream in = new FileInputStream(String fileName);//读取文件中的数据。可以看出 FileInputStream 为InputStream的子类。
 主要方法 ：int read();//读取单个字符。
 int read(char []cbuf);//将读取到的字符存到数组中。返回读取的字符数。

 . Demo ：
 */
public class InputStreamReaderDemo {

    public static void transReadNoBuf() throws IOException {
        /**
         * 没有缓冲区，只能使用read()方法。
         */
        //读取字节流
        //InputStream in = System.in;//读取键盘的输入。
        InputStream in = new FileInputStream("D:\\demo.txt");//读取文件的数据。
        //将字节流向字符流的转换。要启用从字节到字符的有效转换，
        //可以提前从底层流读取更多的字节.
        InputStreamReader isr = new InputStreamReader(in);//读取
        //综合到一句。
        //InputStreamReader isr = new InputStreamReader(
        //new FileInputStream("D:\\demo.txt"));

        char []cha = new char[1024];
        int len = isr.read(cha);
        System.out.println(new String(cha,0,len));
        isr.close();

    }
    public static void transReadByBuf() throws IOException {
        /**
         * 使用缓冲区 可以使用缓冲区对象的 read() 和  readLine()方法。
         */
        //读取字节流
        //InputStream in = System.in;//读取键盘上的数据
        InputStream in = new FileInputStream("D:\\demo.txt");//读取文件上的数据。
        //将字节流向字符流的转换。
        InputStreamReader isr = new InputStreamReader(in);//读取
        //创建字符流缓冲区
        BufferedReader bufr = new BufferedReader(isr);//缓冲
        //BufferedReader bufr = new BufferedReader(
        //new InputStreamReader(new FileInputStream("D:\\demo.txt")));可以综合到一句。
      /*int ch =0;
    ch = bufr.read();
    System.out.println((char)ch);
    */
        String line;
        while((line = bufr.readLine())!=null){
            System.out.println(line);
        }
        isr.close();
    }

}
