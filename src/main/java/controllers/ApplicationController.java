/**
 * Copyright (C) 2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package controllers;

import utils.SpiderAll.Spider.UrlTables;
import ninja.Context;
import ninja.Result;
import ninja.Results;

import com.google.inject.Singleton;
import ninja.params.Param;
import ninja.params.PathParam;
import ninja.session.FlashScope;


@Singleton
public class ApplicationController {

    public Result index() {

        return Results.notFound().render("/system/404notFound.ftl.html");

    }

//    测试html页面显示内容；失败
    public Result userDashboard(
            @PathParam("email") String email,
//            @PathParam("id") Integer id,
            Context context){
        Result result=Results.html();
//        result.render("id",Integer.toString(id));
        result.render("email",email);

        return result;
    }
    
    public Result helloWorldJson() {
        
        SimplePojo simplePojo = new SimplePojo();
        simplePojo.content = "这是我的第一行Hello World! Hello Json! Hello Amos <~~(||)~~>";
        simplePojo.heihei="=哈哈,下班回家吃饭aaaa";

        return Results.json().render(simplePojo);//json()方法研究一下

    }
    public Result myhelloWorld() {
        MyFrist myFrist=new MyFrist();
        myFrist.frist ="世界,你好[-Y-]握手成功-哈哈哈哈哈(-_-)||(>_<)";

        return Results.json().render(myFrist);

    }

    //测试不成功：测试一下route路径里为何不显示值
    public Result test1  (
            @Param("niado") String  w,
            @PathParam("w") String ww,
            @PathParam("id") String id,
            @PathParam("email") String email){
            MyFrist myFrist=new MyFrist();
            myFrist.frist="nihaoaaaaa";
            w="123";

        return Results.json().render("niaho",myFrist).render("nameeee", myFrist).render("hah",w);

    }
//测试不成功：测试render是如何返回值的
    public Result test ( Context context){
        MyFrist myFrist=new MyFrist();
        myFrist.frist="我在哪里,要去哪里?";
        return Results.html().render("haha",myFrist.frist);
    }

//    设置messageKeySuccess
    public Result flashSuccess(FlashScope flashScope){
        flashScope.success("messageKeySuccess");
        return Results.html();
    }

//    测试一个表单的提交,重点是测试一下在相应的view里面能不能显示出来
    public Result newContactForm(Context context,
                                  UrlTables.Contact contact){
        return Results.html().render(contact);
    }

    public Result postContactForm(Context context,
                                 UrlTables.Contact contact){
        return Results.html().render(contact);
    }


    public Result getContactForm(Context context,
                                  UrlTables.Contact contact){
        contact.getName();
        contact.getEmail();
        contact.description="niha";
        contact.id=1;
        return Results.html().render(contact);
    }
/////////////////////////////////////////////////////////////////




    //定义一个静态class
    public static class SimplePojo {
        //一个字符串类型的 content;
        public String content;
        public String heihei;
        
    }
    public static class MyFrist {
        public String frist;
    }
}
