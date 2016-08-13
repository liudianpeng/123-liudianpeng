package utils.gson_test;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Peng on 2016/8/13.
 * 资料来源:http://blog.csdn.net/yejin191258966/article/details/23497461
 */
public class UseGson {

    static Gson g=new Gson();
    /**
     *
     * 由集合类型的实体类
     * 转换成Json类型
     *
     * **/
    public static void testToJSON(){

        List<Person> list=new ArrayList<>();
        for(int i=0;i<2;i++){
            Person p=new Person(i, "散仙"+i, "北京市"+i, "54152541@qq.com", 500.0);
            list.add(p);
        }
        String json=g.toJson(list);
        System.out.println("this is 实体转化后的json"+json);

    }


    /**
     * 由json转换为实体类
     *
     * */
    public static void testOneBeanFromJSON(){


        /**
         * 转换一个Java Bean的时候
         * 记住不能使用[],只有在使用集合的时候才可以使用
         * 如上图贴的那个异常就是由此原因造成的，另外
         * 格式要规范，中间不能出现空格字符
         *
         * **/
        String jsonBean="[{\"id\":0,\"name\":\"散仙0\",\"address\":\"北京市0\",\"email\":\"54152541@qq.com\",\"money\":500.0}]";
        Person p=g.fromJson(jsonBean, Person.class);
        System.out.println("this is json转化成实体:"+p);

    }

    /**
     * 由json转换为实体类集合
     *
     * */
    public static void testListBeanFromJSON(){

        /**
         * 转换一个集合 的实体Bean
         * 注意前面加上[]方括号，代表一个数组
         * **/

        String  jsonBeanList="[{\"id\":0,\"name\":\"散仙0\",\"address\":\"北京市0\",\"email\":\"54152541@qq.com\",\"money\":500.0},{\"id\":1,\"name\":\"散仙1\",\"address\":\"北京市1\",\"email\":\"54152541@qq.com\",\"money\":500.0}]";

        List<Person> lists=g.fromJson(jsonBeanList,new   TypeToken<List<Person>>(){}.getType());
        System.out.println("反序列之后");
        for(Person pp:lists){
            System.out.println(pp);
        }
    }


    public static void main(String[] args) {

        testListBeanFromJSON();//测试集合反序列化
//        testOneBeanFromJSON();//测试单个实体类反序列化
        //testToJSON();//测试序列化

    }


}
