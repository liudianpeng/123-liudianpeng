/**
 * 各个页面的vmodel
 */
define(["./models", "./utils", "./../../../../vendor/mmState", "domReady!"], function (models, utils) {

    var initData = function(){
        var topMenus = null;
        avalon.ajax({
            type: "GET",
            url: "/menus/top",
            success: function(res){
                var menus = {};
                for(var r in res){
                    menus[res[r].name] = res[r].url;
                }
                topMenus = menus;
            }
        });

        var interval = setInterval(function(){
            if(topMenus===null){
                interval;
            }else{
                clearInterval(interval);
                vmodels.pages.navs = topMenus;
            }
        },10);
    };

    var vmodels = {
        pages: avalon.define({
            $id: "pages",
            navs: {},
            activeNav: location.hash,
            activeCriminal: "0",
            getId : "",
            switchNavTo: function (key) {
                if (vmodels.pages.navs[key][0] !== "#") {
                    return;
                }
                vmodels.pages.activeNav = key;
            },
            directorys:{},
            listSrc: "assets/modules/dashboard/dashboard/views/widgets/sidebar.html",

            scrollToTop: function(listItemData){
                vmodels.mainContent.mainSrc=listItemData;
                if (typeof listItemData.intro !== "undefined") {
                var listWrap = document.getElementById("listWrap")
                listWrap.scrollTop = 0
                }
            },
           //获取左侧导航的标题
           getListItemTitle: function (val, intro) {
                if (typeof intro !== "undefined") {
                    return val + "-" + intro;
                } else {
                    return val.name;
                }
            },
            currentAnchor: undefined
        }),

        mainContent: avalon.define({
            $id: "mainController",
            // 内容页面
            mainSrc: "",
            // 获取“静态方法”页面数据
            statics: models.statics
        }),
    };

    initData();

    return vmodels;
});
