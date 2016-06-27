define(["avalon","domReady!","mmRequest","assets/modules/index/script/models","./../../modules/index/script/utils","./../../modules/index/script/vmodels","mmState"],
       function(avalon, domReady,mmRequest,models,utils,vms) {

           avalon.config({
               debug: true
           });

           avalon.state("index", {
               url: "/",
               views: {
                   "": {
                       templateUrl: "./../../assets/modules/index/views/widgets/index.html"
                   }
               },
               onBeforeEnter: function () {
                   vms.pages.activeNav = "主页";//
               }
           });

           avalon.state("applications", {
               url: "/applications",
               views: {
                   "": {
                       templateUrl: "./../../assets/modules/index/views/widgets/iframe.html"
                   }
               },
               onBeforeEnter: function () {
                   var current = utils.getHashValue("applications");
                   utils.prepareSubMenu("applications",current, vms.pages, vms.mainContent, models.applications);
                   vms.pages.activeNav = "客户端";//客户端
               }
           });

           avalon.state("members", {
               url: "/members",
               views: {
                   "": {
                       templateUrl: "./../../assets/modules/index/views/widgets/iframe.html"
                   }
               },
               onBeforeEnter: function () {

                   var current = utils.getHashValue("members");
                   utils.prepareSubMenu("members",current, vms.pages, vms.mainContent, models.members);

                   vms.pages.activeNav = "用户";//members
               }
           });


           avalon.state("groups", {
               url: "/groups",
               views: {
                   "": {
                       templateUrl: "./../../assets/modules/index/views/widgets/iframe.html"
                   }
               },
               onBeforeEnter: function () {
                   var current = utils.getHashValue("groups");
                   utils.prepareSubMenu("groups",current, vms.pages, vms.mainContent, models.groups);

                   vms.pages.activeNav = "用户组";//用户组
               }
           });

           avalon.state("roles", {
               url: "/roles",
               views: {
                   "": {
                       templateUrl: "./../../assets/modules/index/views/widgets/iframe.html"
                   }
               },
               onBeforeEnter: function () {
                   var current = utils.getHashValue("roles");
                   utils.prepareSubMenu("roles",current, vms.pages, vms.mainContent, models.roles);

                   vms.pages.activeNav = "角色";//角色
               }
           });

           avalon.state("authorization", {
               url: "/authorization",
               views: {
                   "": {
                       templateUrl: "./../../assets/modules/index/views/widgets/iframe.html"
                   }
               },
               onBeforeEnter: function () {
                   var current = utils.getHashValue("authorization");
                   utils.prepareSubMenu("authorization",current, vms.pages, vms.mainContent, models.authorization);

                   vms.pages.activeNav = "授权";//授权
               }
           });

           avalon.state("setting", {
               url: "/setting",
               views: {
                   "": {
                       templateUrl: "./../../assets/modules/index/views/widgets/iframe.html"
                   }
               },
               onBeforeEnter: function () {
                   var current = utils.getHashValue("setting");

                   utils.prepareSubMenu("setting",current, vms.pages, vms.mainContent, models.setting);

                   vms.pages.activeNav = "系统配置";//系统配置
               }
           });

           avalon.history.start({
               basepath: "/mmRouter"
           });

           avalon.scan(document.body);
       });
