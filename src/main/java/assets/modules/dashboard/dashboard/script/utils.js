/**
 * 工具方法
 */
define(["avalon","mmRequest"], function(avalon,mmRequest){
    var utils = {
        /**
         * 获取哈希参数
         * @param href 获取源，不指定该值时从location.hash获取
         * @return 参数值
         */
        getHashValue: function(href) {
            href = href || location.hash;
            var code = null;
            avalon.ajax({
                type:"GET",
                url: "/menus/menu",
                async: false,
                data: {path:encodeURI(href)},
                success:function(res){
                    code = res;
                }
            });
            return code;
        },


        /**
         * 准备Menu，包括目录、当前状态、和Menu内容模板
         * @param pagesVM vmodels.pages
         * @param mainContent vmodels.menus
         * @param menus menus数据
         */
        prepareSubMenu: function(pagesVM, mainContent, menusJson){
            var currentIndex = 0;
            console.log("1111111111111111");
           console.log(pagesVM);
           console.log(mainContent);
           console.log(menusJson);
           console.log("2222222222222222222");

            pagesVM.activeNav = "";
            //左侧导航页面
            pagesVM.listSrc = "assets/modules/dashboard/dashboard/views/widgets/sidebar.html";
             var menus = avalon.mix(true, {}, menusJson);
             var firstSubMenu=0;


            function prepareFrameSrc(currentIndex){
                mainContent.mainSrc = menus[currentIndex].url;
                href= "#!" + menus[currentIndex].url;
                console.log("-------1-------------");
                console.log(href);//只显示/xinxiguanli/renyuanliebiao
                console.log("----------2------------");
                console.log(currentIndex);//currentIndex=0
                console.log(menus[currentIndex].url);//menus[currentIndex].url=/xinxiguanli/renyuanliebiao
            }

            if (typeof currentApi !== "undefined") {
                pagesVM.currentAnchor = currentApi;
            } else {
                pagesVM.currentAnchor = firstSubMenu;
                currentApi = firstSubMenu;
            }


            prepareFrameSrc(currentIndex);

            pagesVM.directorys = menus;
        }
    };

    return utils;
});
