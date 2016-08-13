package utils.Office;

import com.artofsolving.jodconverter.DocumentConverter;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.connection.SocketOpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.converter.OpenOfficeDocumentConverter;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.pdf.PdfWriter;

import org.artofsolving.jodconverter.OfficeDocumentConverter;
import org.artofsolving.jodconverter.office.DefaultOfficeManagerConfiguration;
import org.artofsolving.jodconverter.office.OfficeManager;

import java.io.*;
import java.util.Date;
import java.util.regex.Pattern;

/**
 * Created by Peng on 2016/8/12.
 */
public class Offile_pdf_swf {

    private static final int environment = 1;// 环境 1：windows 2:linux
    private String fileString;// (只涉及pdf2swf路径问题)
    private String outputPath = "";// 如果不设置就输出在默认的位置
    private String fileName;
    private File pdfFile;
    private File swfFile;
    private File docFile;
    private File jpgFile;
    /////////////////////////
    private File docxFile;
    private File pptFile;
    private File pptxFile;
    private File xlsFile;
    private File xlsxFile;
    ////////////////////////

    public Offile_pdf_swf(String fileString,String dabh) {
        ini(fileString,dabh);
    }

    /**
     * 重新设置file
     *  
     * @param fileString
     */
    public void setFile(String fileString ,String dabh) {
        ini(fileString,dabh);
    }
    /**
     * 初始化
     *
     * @param fileString
     */
    private void ini(String fileString ,String dabh) {
        this.fileString = fileString;
        fileName = fileString.substring(0, fileString.lastIndexOf("."));
        docFile = new File(fileString);
        jpgFile = new File(fileString);
        docxFile = new File(fileString);
        pptFile = new File(fileString);
        pptxFile= new File(fileString);
        xlsFile= new File(fileString);
        xlsxFile= new File(fileString);
        pdfFile = new File(fileName +dabh+ ".pdf");
        swfFile = new File(fileName +dabh+ ".swf");
    }


    public static void main(String[] args)throws Exception
    {
        Offile_pdf_swf Offile_pdf_swf = new Offile_pdf_swf("d:\\222.doc","123");//文件路径
//        Offile_pdf_swf Offile_pdf_swf = new Offile_pdf_swf("d:\\ddd.jpg","123");//文件路径
//        Offile_pdf_swf Offile_pdf_swf = new Offile_pdf_swf("d:\\111.xlsx");//文件路径
        System.out.println("=1=========="+Offile_pdf_swf.fileName);
        System.out.println("==2========="+Offile_pdf_swf.jpgFile);
        System.out.println("===3========"+Offile_pdf_swf.pdfFile);
        System.out.println("====4======="+Offile_pdf_swf.fileString);

        System.out.println("=====5======"+Offile_pdf_swf.getOutputFilePath(Offile_pdf_swf.fileString,"123"));

        System.out.print("===6="+Offile_pdf_swf.getswfPath());
//        Offile_pdf_swf.doc2pdf();//转换pdf
//        Offile_pdf_swf.pdf2swf();
//        Offile_pdf_swf.imgtopdf();
//        Offile_pdf_swf.pdf2swf();
//        Offile_pdf_swf.office2pdf();
        Offile_pdf_swf.conver("123");

//        Offile_pdf_swf.getswfPath();
//       Offile_pdf_swf.imgtopdf();
    }

    /**
     * jodconverter 3.0方法
     */
//////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 使Office2003-2007全部格式的文档(.doc|.docx|.xls|.xlsx|.ppt|.pptx) 转化为pdf文件<br>
     *
     */
    public boolean office2pdf(String dabh) {
        boolean flag = false;
        OfficeManager officeManager = getOfficeManager();
        // 连接OpenOffice
        OfficeDocumentConverter converter = new OfficeDocumentConverter(officeManager);
        long begin_time = new Date().getTime();
        if (null != fileString) {
            File inputFile = new File(fileString);
            // 判断目标文件路径是否为空
            // 转换后的文件路径
            if (inputFile.exists()) {// 找不到源文件, 则返回
                String outputFilePath_end = getOutputFilePath(fileString,dabh);
                converterFile(inputFile, outputFilePath_end, fileString, converter);
                flag = true;
            }
            officeManager.stop();
        } else {
            System.out.println("con't find the resource");
        }
        long end_time = new Date().getTime();
        System.out.println("文件转换耗时：[" + (end_time - begin_time) + "]ms");
        return flag;
    }
    /**
     * 转换文件
     *
     * @param inputFile
     * @param outputFilePath_end
     * @param inputFilePath
     * @param converter
     */
    public void converterFile(File inputFile, String outputFilePath_end, String inputFilePath,
                              OfficeDocumentConverter converter) {
        File outputFile = new File(outputFilePath_end);
        // 假如目标路径不存在,则新建该路径
        if (!outputFile.getParentFile().exists()) {
            outputFile.getParentFile().mkdirs();
        }
        System.out.println("还在转换中.................");
        converter.convert(inputFile, outputFile);
        System.out.println("文件：" + inputFilePath + "\n转换为\n目标文件：" + outputFile + "\n成功！");
    }
    /**
     * 根据操作系统的名称，获取OpenOffice.org 3的安装目录<br>
     * 如我的OpenOffice.org 3安装在：C:/Program Files (x86)/OpenOffice.org 3<br>
     *
     * @return OpenOffice.org 3的安装目录
     */
    public String getOfficeHome() {
        String osName = System.getProperty("os.name");
        if (Pattern.matches("Linux.*", osName)) {
            return "/opt/openoffice.org3";
        } else if (Pattern.matches("Windows.*", osName)) {
            return "C:/Program Files (x86)/OpenOffice 4";
        } else if (Pattern.matches("Mac.*", osName)) {
            return "/Application/OpenOffice.org.app/Contents";
        }
        return null;
    }
    /**
     * 连接OpenOffice.org 并且启动OpenOffice.org
     *
     * @return
     */
    public OfficeManager getOfficeManager() {
        DefaultOfficeManagerConfiguration config = new DefaultOfficeManagerConfiguration();
        // 获取OpenOffice.org 3的安装目录
        String officeHome = getOfficeHome();
        config.setOfficeHome(officeHome);
        // 启动OpenOffice的服务
        OfficeManager officeManager = config.buildOfficeManager();
        officeManager.start();
        return officeManager;
    }
    /**
     * 获取输出文件
     *
     * @param inputFilePath
     * @return
     */
    public String getOutputFilePath(String inputFilePath,String dabh) {
        String outputFilePath = inputFilePath.substring(0,inputFilePath.lastIndexOf("."))+dabh+".pdf";
        System.out.println("这是文件的输出路径===="+outputFilePath);
        return outputFilePath;
    }
    /**
     * 获取inputFilePath的后缀名，如："e:/test.pptx"的后缀名为："pptx"<br>
     *
     * @param inputFilePath
     * @return
     */
    public String getPostfix(String inputFilePath) {
        return inputFilePath.substring(inputFilePath.lastIndexOf(".") + 1);
    }
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
    /**
     *  img->pdf转为PDF;
     *
     * @param
     */
    private void imgtopdf(String dabh)
    {
        //创建一个文档对象
        Document doc = new Document();
        try {
            //定义输出文件的位置
            PdfWriter.getInstance(doc, new FileOutputStream(getOutputFilePath(fileString,dabh)));//这里需要设置输出路径
            //开启文档
            doc.open();
            //向文档中加入图片
            //取得图片~~~图片格式：
            Image jpg1 = Image.getInstance(fileString); //原来的图片的路径
            //获得图片的高度
            float heigth=jpg1.getPlainHeight();
            float width=jpg1.getScaledWidth();
            System.out.println("heigth----"+heigth);
            System.out.println("width-----"+width);
            //合理压缩，h>w，按w压缩，否则按w压缩
            //int percent=getPercent(heigth, width);
            //统一按照宽度压缩
            int percent=getPercent2(heigth, width);
            //设置图片居中显示
            jpg1.setAlignment(Image.MIDDLE);
            //直接设置图片的大小~~~~~~~第三种解决方案，按固定比例压缩
            //jpg1.scaleAbsolute(210.0f, 297.0f);
            //按百分比显示图片的比例
            jpg1.scalePercent(percent);//表示是原来图像的比例;
            //可设置图像高和宽的比例
            //jpg1.scalePercent(50, 100);
            doc.add(jpg1);


            //关闭文档并释放资源
            doc.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (DocumentException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    /**
     * 统一按照宽度压缩
     * 这样来的效果是，所有图片的宽度是相等的，自我认为给客户的效果是最好的
     * @param
     */
    public int getPercent2(float h,float w)
    {
        int p=0;
        float p2=0.0f;
        p2=530/w*100;
        p=Math.round(p2);
        return p;
    }

    /**
     * jodconverter 2.0方法 doc转为PDF;
     *
     * @param
     */
    private  void doc2pdf() throws Exception {
        if (docFile.exists()) {
            if (!pdfFile.exists()) {
                OpenOfficeConnection connection = new SocketOpenOfficeConnection(8100);
                try {
                    connection.connect();
                    DocumentConverter converter = new OpenOfficeDocumentConverter(connection);
                    converter.convert(docFile, pdfFile);
                    // close the connection
                    connection.disconnect();
                    System.out.println("****pdf转换成功，PDF输出：" + pdfFile.getPath()+ "****");
                } catch (java.net.ConnectException e) {
                    e.printStackTrace();
                    System.out.println("****swf转换器异常，openoffice服务未启动！****");
                    throw e;
                } catch (com.artofsolving.jodconverter.openoffice.connection.OpenOfficeException e) {
                    e.printStackTrace();
                    System.out.println("****swf转换器异常，读取转换文件失败****");
                    throw e;
                } catch (Exception e) {
                    e.printStackTrace();
                    throw e;
                }
            } else {
                System.out.println("****已经转换为pdf，不需要再进行转化****");
            }
        } else {
            System.out.println("****swf转换器异常，需要转换的文档不存在，无法转换****");
        }
    }
    /**
     * pdf 文件转换成 swf
     */
    @SuppressWarnings("unused")
    private void pdf2swf() throws Exception {
        Runtime r = Runtime.getRuntime();
        if (!swfFile.exists()) {
            if (pdfFile.exists()) {
                if (environment == 1) {// windows环境处理
                    try {
                        Process p = r.exec("D:\\SWFTools\\pdf2swf.exe "+ pdfFile.getPath() + " -o "+ swfFile.getPath() + " -T 9");
                        System.out.print(loadStream(p.getInputStream()));
                        System.err.print(loadStream(p.getErrorStream()));
                        System.out.print(loadStream(p.getInputStream()));
                        System.err.println("****swf转换成功，文件输出："
                                + swfFile.getPath() + "****");
                        if (pdfFile.exists()) {
                            pdfFile.delete();
                        }

                    } catch (IOException e) {
                        e.printStackTrace();
                        throw e;
                    }
                } else if (environment == 2) {// linux环境处理
                    try {
                        Process p = r.exec("pdf2swf " + pdfFile.getPath()
                                + " -o " + swfFile.getPath() + " -T 9");
                        System.out.print(loadStream(p.getInputStream()));
                        System.err.print(loadStream(p.getErrorStream()));
                        System.err.println("****swf转换成功，文件输出："
                                + swfFile.getPath() + "****");
                        if (pdfFile.exists()) {
                            pdfFile.delete();
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                        throw e;
                    }
                }
            } else {
                System.out.println("****pdf不存在,无法转换****");
            }
        } else {
            System.out.println("****swf已经存在不需要转换****");
        }
    }

    static String loadStream(InputStream in) throws IOException {

        int ptr = 0;
        in = new BufferedInputStream(in);
        StringBuffer buffer = new StringBuffer();

        while ((ptr = in.read()) != -1) {
            buffer.append((char) ptr);
        }

        return buffer.toString();
    }
    /**
     * pdf-swf转换主方法
     */
    @SuppressWarnings("unused")
    public boolean conver(String dabh) {

        if (pdfFile.exists()) {
            System.out.println("****pdf转换器开始工作，该文件已经转换为pdf****");
            return true;
        }

        if (environment == 1) {
            System.out.println("****pdf转换器开始工作，当前设置运行环境windows****");
        } else {
            System.out.println("****pdf转换器开始工作，当前设置运行环境linux****");
        }
        try {

            String prefix=fileString.substring(fileString.lastIndexOf("."));
            if (prefix.equals(".jpg")) {
                imgtopdf(dabh);
                //注释pdg->swf
//                pdf2swf();
            }else {
                office2pdf(dabh);
                //注释pdf->swf
//                pdf2swf();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        if (pdfFile.exists()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 返回文件路径
     *
     * @param
     */
    public String getswfPath() {
        if (pdfFile.exists()) {
            String tempString = pdfFile.getPath();
            tempString = tempString.replaceAll("\\\\", "/");
            return tempString;
        } else {
            return "";
        }

    }


}
