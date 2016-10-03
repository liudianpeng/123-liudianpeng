define(["avalon","domReady!","mmRequest","./script/models","./script/utils","./script/vmodels","mmState"],
       function(avalon, domReady,mmRequest,models,utils,vms) {

           avalon.config({
               debug: true
           });

           var initData = function(){

               var topMenus = null;

               avalon.ajax({
                   type: "GET",
                   url: "/menus/top",
                   success: function(res){
                       topMenus = res;
                   }
               });

               var interval = setInterval(function(){
                   if(topMenus===null){
                       interval;
                   }else{
                       clearInterval(interval);
                       for(var i = 0;i<topMenus.length;i++){
                           var tm = topMenus[i];
                           avalon.state(tm.code,{
                               url: tm.url.slice(2),
                               views:{
                                   "": {
                                       templateUrl: "assets/modules/dashboard/dashboard/views/widgets/iframe.html"
                                   }
                               },
                               onBeforeEnter: function(){
                                   var cur = location.hash.slice(3);
                                   avalon.log(cur);
                                   //var currentMenuCode = utils.getHashValue(cur);
                                   utils.prepareSubMenu(vms.pages, vms.mainContent, models(cur));

                                   vms.pages.activeNav = location.hash;
                               },
                           });
                       }
                   }
               },10);
           };

           initData();
/*
           avalon.state("xinxiguanli", {
               url: "/xinxiguanli",
               views: {
                   "": {
                       templateUrl: "assets/modules/dashboard/dashboard/views/widgets/iframe.html"
                   }
               },
               onBeforeEnter: function () {
                   var current = utils.getHashValue("xinxiguanli");
                   utils.prepareSubMenu("xinxiguanli",current, vms.pages, vms.mainContent, models.xinxiguanli);
                   vms.pages.activeNav = "信息管理";//
               }
           });

           avalon.state("jifenkaohe", {
               url: "/jifenkaohe",
               views: {
                   "": {
                       templateUrl: "assets/modules/dashboard/dashboard/views/widgets/iframe.html"
                   }
               },
               onBeforeEnter: function () {
                   var current = utils.getHashValue("jifenkaohe");
                   utils.prepareSubMenu("jifenkaohe",current, vms.pages, vms.mainContent, models.jifenkaohe);
                   vms.pages.activeNav = "积分考核";//客户端
               }
           });

           avalon.state("quyuguanli", {
               url: "/quyuguanli",
               views: {
                   "": {
                       templateUrl: "assets/modules/dashboard/dashboard/views/widgets/iframe.html"
                   }
               },
               onBeforeEnter: function () {

                   var current = utils.getHashValue("quyuguanli");
                   utils.prepareSubMenu("quyuguanli",current, vms.pages, vms.mainContent, models.quyuguanli);

                   vms.pages.activeNav = "区域管理";//
               }
           });


           avalon.state("xitongguanli", {
               url: "/xitongguanli",
               views: {
                   "": {
                       templateUrl: "assets/modules/dashboard/dashboard/views/widgets/iframe.html"
                   }
               },
               onBeforeEnter: function () {
                   var current = utils.getHashValue("xitongguanli");
                   utils.prepareSubMenu("xitongguanli",current, vms.pages, vms.mainContent, models.xitongguanli);

                   vms.pages.activeNav = "系统管理";//用户组
               }
           });
*/

           avalon.history.start({
               basepath: "/mmRouter"
           });

           avalon.scan(document.body);
       });
