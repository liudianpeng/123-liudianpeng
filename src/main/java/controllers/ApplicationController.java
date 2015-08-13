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

import ninja.Context;
import ninja.Result;
import ninja.Results;

import com.google.inject.Singleton;
import ninja.params.Param;
import ninja.params.PathParam;


@Singleton
public class ApplicationController {

    public Result index() {

        return Results.notFound().render("/system/404notFound.ftl.html");

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
