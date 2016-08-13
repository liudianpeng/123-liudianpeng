package utils.SpiderAll.Spider4_perfect.A_xiangguanClass_demo;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

/**
 * Created by Peng on 2016/8/7.
 *
 * JAVA中三种URL连接方法

 Java的网络类可以让你通过网络或者远程连接来实现应用。而且，这个平台现在已经可以对国际互联网以及URL资源进行访问了。
 Java的URL类可以让访问网络资源就像是访问你本地的文件夹一样方便快捷。
 我们通过使用Java的URL类就可以经由URL完成读取和修改数据的操作。

 通过一个URL连接，我们就可以确定资源的位置，比如网络文件、网络页面以及网络应用程序等。其中包含了许多的语法元素。
 从URL得到的数据可以是多种多样的，这些都需要一种统一的机制来完成对URL的读取与修改操作。
 Java语言在它的java.net软件包里就提供了这么一种机制。

 URL class是从URL标示符中提取出来的。它允许Java程序设计人员打开某个特定URL连接，
 并对里边的数据进行读写操作以及对首部信息进行读写操作。
 而且，它还允许程序员完成其它的一些有关URL的操作。

 构造

 在创建java.net URL的实例的时候，你能够利用许多公共构造器，从而让其变得更具灵活性。
 举个例子来说，这个class提供了一种使用完整URL信息串的构造器，一种使用把URL信息串分解成为协议、
 主机名以及文件和资源的构造器，
 还有一种把URL信息串分解成为协议、主机名、端口号以及文件的构造器。我们首先使用完整的URL来创建一个URL class的例子：

 URL aURL = new URL(“http://www.mycompany.com:8080/index.html”);

 在这个例子中，我们创建了一个使用完整URL的URL class，
 其中明确指出了使用的协议是http，主机名称是www.mycompany.com，端口号码为8080，文件/资源为index.html。
 如果组成URL的语法发生了错误，
 那么构造器就会发出MalformedURLException。

 连接
 一旦你成功的创建了一个URL class的实例，你就可以对其进行操作了。但是在你能够访问这个URL上的资源和内容之前，
 你必须要打开到这些资源与内容上的连接。你可以通过使用openConnection来完成这一操作。

 使用openConnection并不需要参数，并且在操作成功之后，它会返回一个URLConnection class的实例。在Listing A中，
 向我们演示了打开一个到URL连接的过程。一旦你的连接成功，你就可以开始对这个URLConnection的输入以及输出流进行读和写的操作了。

 从URL连接中读取数据

 使用java.io stream class来从URL中读取数据是一个非常简单的过程。一旦你建立了一个成功的连接，
 那么你就可以获得针对这个连接的输入流并且开始进行写的操作了。
 很幸运的是，java.io classes可以以与对文件流或者socket流进行操作的同样方式进行对从URLConnection流返回的数据进行操作。
 　　对URL进行写的操作

 使用java.io stream classes对URL进行写的操作同样也是非常简单的。一旦你建立了一个成功的连接之后，
 你就可以得到来自此连接的输出流并且开始进行写的操作。当然，只有对于客户所希望的数据进行写的操作才是有意义的。
 同样的，在获得并对URLConnection流进行写的操作之前，你还需要使用setDoOutput(boolean)方式把输出（Output）
 属性设置为真（true）来指定可以进行写操作的那些连接。Java.io classes允许你把数据写到URLConnection流，
 这个操作也和你对文件流和socket流进行的写操作一样。

 　　其它的操作

 你可以从URL以及URLConnection对象连接中得到其它类型的信息，比如说主机名、端口、内容长度、内容编码以及内容的类型。
 把这些方法连同stream I/O classes一起使用可以让你建立复杂而有效的网络客户应用程序和服务。
 　　对网络的便捷访问

 由Java平台所提供的URL class让我们可以方便而有效的访问网络上的资源，而且可以让我们象访问本地文件一样的感到轻松愉快。
 我们不用为网络通讯的细节问题操心，只需要把注意力集中到制作有用的应用程序和服务上去。
 *
 *           // 方法一
 URL url = new URL("http://www.sina.com.cn");
 URLConnection urlcon = url.openConnection();
 InputStream is = urlcon.getInputStream();

 // 方法二
 URL url = new URL("http://www.yhfund.com.cn");
 HttpURLConnection urlcon = (HttpURLConnection)url.openConnection();
 InputStream is = urlcon.getInputStream();

 //方法三
 URL url = new URL("http://www.yhfund.com.cn");
 InputStream is = url.openStream();
 */
public class URL_Demo {

    public static void main(String[] args) throws Exception {

        /**
         * 1,2,3需要分别运行
         */
        ///////////1////////////////////////////////////////////////
        URL baidu = new URL("http://www.baidu.com/");
        URLConnection bc = baidu.openConnection();
        BufferedReader in = new BufferedReader(new InputStreamReader(bc.getInputStream()));
        String inputLine;
        while ((inputLine = in.readLine())!= null){
            System.out.println(inputLine);
        }
        //////////2/////////////////////////////////////////////////
        URL url = new URL("http://www.baidu.com/");
        HttpURLConnection urlcon = (HttpURLConnection) url.openConnection();
        urlcon.connect();         //获取连接
        InputStream is = urlcon.getInputStream();
        BufferedReader buffer = new BufferedReader(new InputStreamReader(is));
        StringBuffer bs = new StringBuffer();
        String l = null;
        while ((l = buffer.readLine()) != null) {
            bs.append(l).append("/n");
        }
        System.out.println(bs.toString());
        in.close();
        //////////3/////////////////




    }

    //////////3//////////////////////////////////////////////

    /**
     * 见 类 Spider5
     */


}





