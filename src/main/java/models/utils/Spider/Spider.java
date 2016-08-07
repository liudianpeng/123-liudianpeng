package models.utils.Spider;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.HashSet;
import java.util.Set;

import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;

import org.htmlparser.Node;
import org.htmlparser.NodeFilter;
import org.htmlparser.Parser;
import org.htmlparser.filters.NodeClassFilter;
import org.htmlparser.filters.OrFilter;
import org.htmlparser.tags.LinkTag;
import org.htmlparser.util.NodeList;



/**
 * Created by Peng on 2016/8/5.
 */
public class Spider {
    /**
     * 使用种子初始化url队列
     */
    String[] seeds;
    String line;
    String savepath;
    String encoding;
    public Spider(String[] seeds,String line,String savepath,String encoding){
        this.seeds=seeds;
        this.line=line;
        this.savepath=savepath;
        this.encoding=encoding;
    }
    public void init(){
        Set<String> seedsSet=new HashSet<String>();
        for(int i=0;i<seeds.length;i++){
            seedsSet.add(seeds[i]);
        }
        UrlTables.addToUnvisitedUrlSet(seedsSet);
    }
    public void run() throws HttpException, IOException, org.htmlparser.util.ParserException {
        init();
        for(int i=0;i<20;i++){
            if(UrlTables.getUnvisitedUrl().size()!=0){
                String url=UrlTables.getFirstFromVisitedUrSet();
                catchPages(url);
                UrlTables.addToVisitedUrlSet(url);
                UrlTables.addToUnvisitedUrlSet(getUrls(url));
            }
        }
    }

    public void catchPages(String url){
        String filename=null;
        HttpClient httpClient=new HttpClient();
        httpClient.getHttpConnectionManager().getParams().setConnectionTimeout(5000);
        GetMethod getMethod=new GetMethod(url);
        //生成getmthod对象并设置参数
        //设置get请求超时5s
        getMethod.getParams().setParameter(HttpMethodParams.SO_TIMEOUT, 5000);
        //设置请求重试处理
        getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER,
                new DefaultHttpMethodRetryHandler());
        //设置encoding
        getMethod.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET,encoding);
        getMethod.addRequestHeader("Content-Type", "text/html; charset=gb2312");
        //执行http get请求
        int statusCode;
        try {
            statusCode = httpClient.executeMethod(getMethod);
            System.out.print(statusCode);
            if(statusCode==200){
                InputStream responseBody=null;
                responseBody=getMethod.getResponseBodyAsStream();
                filename=getFileNameByUrl(url, getMethod.getResponseHeader("Content-Type").getValue());
                if(responseBody!=null)
                    saveToLocal(responseBody,filename);
                System.out.println("getsuccess");

                String body="";
                body=responseBody.toString();
                System.out.println(body);
            }else{
                System.out.print("getfalse");
            }
        } catch (HttpException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }
    /*
     * 将catchPages得到的网页的比特流存到本地
     */
    public void saveToLocal(InputStream responseBody,String filename) throws IOException{
        BufferedReader reader = new BufferedReader(new InputStreamReader(responseBody,encoding));
        File file=new File(savepath,filename);
        FileOutputStream fileOutputStream=new FileOutputStream(file);
        OutputStreamWriter writer=new OutputStreamWriter(fileOutputStream);
        String line;
        while((line=reader.readLine())!=null){
            System.out.println(line);
            writer.write(line);
        }
        writer.flush();
        writer.close();

    }
    /*
     * 解析页面的url
     */
    public Set<String> getUrls(String url) throws org.htmlparser.util.ParserException {
        Set<String> links=new HashSet<String>();
        Parser parser=new Parser(url);
        parser.setEncoding(encoding);
        NodeFilter frameFilter= new NodeFilter() {
            @Override
            public boolean accept(Node node) {
                // TODO Auto-generated method stub
                if(node.getText().startsWith("frame src=")){
                    return true;
                }else{
                    return false;
                }
            }
        };
        OrFilter linkFilter=new OrFilter(new NodeClassFilter(LinkTag.class),frameFilter);
        NodeList list=parser.extractAllNodesThatMatch(linkFilter);
        for(int i=0;i<list.size();i++){
            Node tag=list.elementAt(i);
            if(tag instanceof LinkTag){
                LinkTag link=(LinkTag)tag;
                String linkUrl=link.getLink();
                if(frameFilter.accept(tag)){
                    //处理<frame>
                    String frameTxt=tag.getText();
                    int start=frameTxt.indexOf("src=");
                    frameTxt=frameTxt.substring(start);
                    int end=frameTxt.indexOf(" ");
                    if(end==-1){
                        end=frameTxt.indexOf(">");
                    }
                    String frameUrl=frameTxt.substring(5,end-1);
                    if(LinkFilter(frameUrl))
                        links.add(frameUrl);
                }else{
                    //处理<a>
                    if(LinkFilter(linkUrl)){
                        links.add(linkUrl);
                    }
                }
            }
        }
        return links;
    }
    //爬虫遵循的线索
    public boolean LinkFilter(String url){
        if(url.startsWith(line)){
            return true;
        }else{
            return false;
        }
    }

    //网页名filter，不然会出现存储错误
    public String getFileNameByUrl(String url,String contentType){
        //移除http;
        url=url.substring(7);
        //text/html类型
        if(contentType.indexOf("html")!=-1){
            url=url.replaceAll("[\\?/:*|<>\"]", "_")+".html";
            return url;
        }else{
            return url.replaceAll("[\\?/:*|<>\"]","_")+"."+
                    contentType.substring(contentType.lastIndexOf("/")+1);
        }
    }

}
