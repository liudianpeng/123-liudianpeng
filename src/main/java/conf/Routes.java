
/**
 * Copyright (C) 2012 the original author or authors.
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

package conf;



import com.google.inject.Inject;
import controllers.DocConverterController;
import controllers.ZaixianliulanController;
import ninja.AssetsController;
import ninja.Results;
import ninja.Router;
import ninja.application.ApplicationRoutes;
import controllers.ApplicationController;
import ninja.utils.NinjaProperties;

public class Routes implements ApplicationRoutes {
    @Inject
    NinjaProperties ninjaProperties;


    @Override
    public void init(Router router) {
        if (!ninjaProperties.isProd()) {

        }

        router.GET().route("/").with(ApplicationController.class, "index");
        router.GET().route("/hello_world.json").with(ApplicationController.class, "helloWorldJson");
        router.GET().route("/hello_world_myfrist").with(ApplicationController.class,"myhelloWorld");
        router.GET().route("/nihao/nihao").with(ApplicationController.class,"index");

        router.GET().route("/wodemingzi/{name}").with(ApplicationController.class,"test1");
        router.GET().route("/wodemingzi/{w}/haha").with(ApplicationController.class,"test");
        router.GET().route("/ceshi/yemain").with(ApplicationController.class, "userDashboard");
        // a GET request to "/" will be redirect to "/dashboard"
//        router.GET().route("/").with(Results.redirect("/dashboard"));

        router.GET().route("/downLoadCriminalImage/swf").with(DocConverterController.class,"downLoadCriminalImage");
        router.GET().route("/wei/zaixianliulan").with(ZaixianliulanController.class,"index");
        router.GET().route("/contactForm").with(ApplicationController.class,"newContactForm");
        router.POST().route("/contactForm/post").with(ApplicationController.class,"postContactForm");
        router.GET().route("/postContactForm").with(ApplicationController.class,"getContactForm");

        // show a static page
        router.GET().route("/dashboard").with(Results.html().template("/dashboard.html"));
        ///////////////////////////////////////////////////////////////////////
        // Assets (pictures / javascript)
        ///////////////////////////////////////////////////////////////////////
        router.GET().route("/assets/webjars/{fileName: .*}").with(AssetsController.class, "serveWebJars");
        router.GET().route("/assets/{fileName: .*}").with(AssetsController.class, "serveStatic");

        ///////////////////////////////////////////////////////////////////////
        // Index / Catchall shows index page
        ///////////////////////////////////////////////////////////////////////
        router.GET().route("/.*").with(ApplicationController.class, "index");
    }

}
