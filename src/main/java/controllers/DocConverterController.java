
package controllers;
import com.google.common.base.Optional;
import com.google.common.io.ByteStreams;
import com.google.inject.Inject;
import com.google.inject.Singleton;

import ninja.Context;
import ninja.Renderable;
import ninja.Result;
import ninja.Results;
import ninja.utils.HttpCacheToolkit;
import ninja.utils.MimeTypes;
import ninja.utils.NinjaProperties;
import ninja.utils.ResponseStreams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

@Singleton
public class DocConverterController{
    public final static String ASSETS_DIR = "data";
    public final static String PHOTO_NO_EXSIT_FILENAME= "crimal_image_no_exsit.swf";
    public final static String criminal_image_location="d:\\";

    private final static Logger logger = LoggerFactory
            .getLogger(DocConverterController.class);

    private final MimeTypes mimeTypes;

    private final HttpCacheToolkit httpCacheToolkit;

    @Inject
    private NinjaProperties ninjaProperties;

    @Inject
    public DocConverterController(HttpCacheToolkit httpCacheToolkit,
                                MimeTypes mimeTypes) {
        this.httpCacheToolkit = httpCacheToolkit;
        this.mimeTypes = mimeTypes;
    }


    public static void main(String[] args){

    }

    public Result downLoadCriminalImage(Context context) {

        String photoRootPath = ninjaProperties.get("application.criminal.swf.root.path");

        // 获取当前目录的图片路径
        String dabh=context.getParameter("dabh");
        String sequence=context.getParameter("sequence");
        String[] ss=getChar("2");//
        final String  filePath=criminal_image_location+File.separator+
                org.apache.commons.lang.StringUtils.join(ss, File.separator)+".swf";
        System.out.println(filePath);
        // 获取文件名
        final String fileName=dabh+"_"+sequence+".swf";


        Object renderable = new Renderable() {
            @Override
            public void render(Context context, Result result) {

                File f=new File(filePath);

                URL url = getStaticFileFromAssetsDir(context,f);

                streamOutUrlEntity(url, context, result);
            }
        };
        return Results.ok().render(renderable);
    }

    /////////////////////////////////////////////////////////////////////////////////////
    private void streamOutUrlEntity(URL url, Context context, Result result) {

        // check if stream exists. if not print a notfound exception
        if (url == null) {

            context.finalizeHeadersWithoutFlashAndSessionCookie(Results.notFound());

        } else {

            try {

                URLConnection urlConnection = url.openConnection();
                Long lastModified = urlConnection.getLastModified();
                httpCacheToolkit.addEtag(context, result, lastModified);

                if (result.getStatusCode() == Result.SC_304_NOT_MODIFIED) {
                    // Do not stream anything out. Simply return 304
                    context.finalizeHeadersWithoutFlashAndSessionCookie(result);

                } else {

                    result.status(200);

                    // Try to set the mimetype:
                    String mimeType = mimeTypes.getContentType(context,
                            url.getFile());

                    if (mimeType != null
                            && !mimeType.isEmpty()) {
                        result.contentType(mimeType);
                    }

                    // finalize headers:
                    ResponseStreams responseStreams = context
                            .finalizeHeadersWithoutFlashAndSessionCookie(result);

                    try (
                            InputStream inputStream = urlConnection.getInputStream();
                            OutputStream outputStream = responseStreams.getOutputStream()) {

                        ByteStreams.copy(inputStream, outputStream);
                    }


                }

            } catch (FileNotFoundException e) {
                logger.error("error streaming file", e);
            } catch (IOException e) {
                logger.error("error streaming file", e);
            }

        }


    }
    private URL getStaticFileFromAssetsDir(Context context, File possibleFile ) {

        Optional<URL> url = Optional.absent();
        if (possibleFile.exists()) {
            url = getUrlForFile(possibleFile);
        }
        else{

            String criminal_image_no=criminal_image_location+File.separator+PHOTO_NO_EXSIT_FILENAME;
            File criminal_image_no_file=new File(criminal_image_no);

            if (criminal_image_no_file.exists()) {
                url = getUrlForFile(criminal_image_no_file);
            }else{
                url = Optional.fromNullable(this.getClass().getClassLoader()
                        .getResource(
                                ASSETS_DIR
                                        + "/"
                                        + PHOTO_NO_EXSIT_FILENAME));
            }


            logger.info("the crimal photo no exsit,so use the url is : "+url.toString());
        }


        return url.orNull();

    }
    private Optional<URL> getUrlForFile(File possibleFileInSrc) {
        try {
            return Optional.fromNullable(possibleFileInSrc.toURI().toURL());

        } catch (MalformedURLException malformedURLException) {

            logger.error("Error in dev mode while streaming files from src dir. ", malformedURLException);
        }
        return Optional.absent();
    }
    private String[] getChar(String target) {
        char[] s=target.toCharArray();
        String[] flag = new String[s.length];
        for (int nI = 0; nI < target.length(); nI++)
        {
            flag[nI] =   String.valueOf(s[nI]);
        }
        return flag;
    }
}
