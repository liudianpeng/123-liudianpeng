package models.utils.Spider4_perfect.xiangguanClass_demo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Created by Peng on 2016/8/7.
 * 基本概念 ：

 public class BufferedReader    extends Reader

 从字符输入流中读取文本，缓冲各个字符，从而实现字符、数组和行的高效读取。 可以指定缓冲区的大小，或者可使用默认的大小。大多数情况下，默认值足够大。

 通常， Reader 所作的每个读取请求都会导致对底层字符或字节流进行相应的读取请求。因此，建议用 BufferedReader 包装所有其 read() 操作可能开销很高的 Reader （如 FileReader 和 InputStreamReader ）。

 BufferedReader 流能够读取文本行 , 通过向 BufferedReader 传递一个 Reader 对象 , 来创建一个 BufferedReader 对象 , 之所以这样做是因为 FileReader 没有提供读取文本行的功能 .

 . Demo ：

 通过 Bufferedreader 捕获所输入的语句 ：
 */
public class BufferedReaderDemo {
    public static void main(String[] args)throws IOException {

        BufferedReader bufferedReader =new BufferedReader(
                new InputStreamReader(System.in));

        System.out.print("请输入一系列文字，可包括空格：");
        String text =bufferedReader.readLine();
        System.out.println("请输入文字："+text);
    }

}
/**
 *
 * 注解：
 throws IOException   抛出异常

 InputStreamReader 是字节流通向字符流的桥梁
 */