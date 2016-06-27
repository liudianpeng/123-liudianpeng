/**
 * 工具方法
 */
define([], function(){
    var utils = {
        /**
         * 获取哈希参数
         * @param key 参数键
         * @param href 获取源，不指定该值时从location.hash获取
         * @return 参数值
         */
        getHashValue: function(key, href) {
            href = href || location.hash;

            var matches = href.match(new RegExp(key+'=([^&]*)'));

            var mch;

            if(matches){
                mch = decodeURI(matches[1]);
                return mch;
            }
        },

        /**
         * 从locaiton.hash获取当前导航的名字
         * @return 导航名字
         */
        getActiveNav: function(){
            var activeNav = location.hash.slice(3);
            if(activeNav === "index"){
                return "主页";
            }else if(activeNav === "applications"){
                return "客户端";
            } else if(activeNav === "members"){
                return "用户";
            } else if(activeNav === "groups"){
                return "用户组";
            } else if(activeNav === "roles"){
                return "角色";
            } else if(activeNav === "authorization"){
                return "授权";
            }else{
                return "系统配置";
            }
        },

        /**
         * 准备Menu，包括目录、当前状态、和Menu内容模板
         * @param topmenu topmenu name
         * @param currentApi hash param中的menu id
         * @param pagesVM vmodels.pages
         * @param apisVm vmodels.menus
         * @param apis menus数据
         */
        prepareSubMenu: function(topmenu,currentApi, pagesVM, apisVm, apis){
            var firstApi, currentApiSrc;

            for (var i in apis) {
                for (var j in apis[i]) {
                    firstApi = apis[i][j];
                    break;
                }
                break;
            }

            // 找crrentAPI对应的链接
            for (var i in apis) {
                for (var j in apis[i]) {
                    if (j === currentApi) {
                        currentApiSrc = apis[i][j]
                        break
                    }
                }
            }

            pagesVM.activeNav = "";
            pagesVM.listSrc = "assets/modules/index/views/widgets/sidebar.html";


            /**
            if (typeof currentApi !== "undefined") {
                apisVm.apiSrc = "pages/index/views/apis/" + currentApiSrc;
            } else {
                apisVm.apiSrc = "pages/index/views/apis/" + firstApi;
            }
                */

            // 添加href
            var apisObj = avalon.mix(true, {}, apis);

            var firstSubMenu = 0;

            for (var groupIndex in apisObj) {
                var apiGroup = apisObj[groupIndex];

                for (var apiIndex in apiGroup) {
                    if(firstSubMenu===0){
                        firstSubMenu = apiIndex;
                    }
                    apiGroup[apiIndex] = {
                        content: apiGroup[apiIndex],
                        href: "#!/"+topmenu+"/?"+topmenu+"=" + apiIndex
                    }
                }
            }


            if (typeof currentApi !== "undefined") {
                pagesVM.currentAnchor = currentApi;
            } else {
                pagesVM.currentAnchor = firstSubMenu;
                currentApi = firstSubMenu;
            }

            function prepareFrameSrc(apiGroup){
                avalon.log(currentApi);
                avalon.log(apiGroup);
                avalon.log(apiGroup[currentApi]['content']);
                apisVm.mainSrc = apiGroup[currentApi]['content'];
            }
            prepareFrameSrc(apiGroup);

            pagesVM.directorys = apisObj;
        }
    };

    return utils;
});
