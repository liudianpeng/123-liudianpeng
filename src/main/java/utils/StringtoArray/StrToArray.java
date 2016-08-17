package utils.StringtoArray;

import java.util.StringTokenizer;

/**
 * Created by Peng on 2016/8/17.
 * //如何把一段逗号分割的字符串转换成一个数组
 *  Java将一段逗号分割的字符串转换成一个数组
 */
public class StrToArray{


    //使用String的split 方法
    public static String[] convertStrToArray(String str){
        String[] strArray = null;
        strArray = str.split(","); //拆分字符为"," ,然后把结果交给数组strArray
        return strArray;
    }

    //使用StringTokenizer实现
    //api说明：StringTokenizer 是出于兼容性的原因而被保留的遗留类
    //（虽然在新代码中并不鼓励使用它）。建议所有寻求此功能的人使用
    //String 的 split 方法或 java.util.regex 包
    public static String[] convertStrToArray2(String str){
        StringTokenizer st = new StringTokenizer(str,",");//把","作为分割标志，然后把分割好的字符赋予StringTokenizer对象。
        //通过StringTokenizer 类的countTokens方法计算在生成异常之前可以调用此 tokenizer 的 nextToken 方法的次数。
        String[] strArray = new String[st.countTokens()];
        int i=0;
        while(st.hasMoreTokens()){//看看此 tokenizer 的字符串中是否还有更多的可用标记。
            strArray[i++] = st.nextToken();//返回此 string tokenizer 的下一个标记。
        }
        return strArray;
    }
    //输出数组
    public static void printArray(String[] array){
        for(int i=0;i<array.length;i++){
            System.out.print(array[i]);
            if(i==array.length-1){
                System.out.print("\n");
            }else{
                System.out.print(",");
            }
        }
    }

    public static void main(String[] args) {
        String str="a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
        String[] strArray=null;
        System.out.println("调用convertStrToArray结果：");
        strArray = convertStrToArray(str);
        printArray(strArray);

        System.out.println("调用convertStrToArray2结果：");
        strArray = convertStrToArray2(str);
        printArray(strArray);
    }

}