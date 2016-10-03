/**
 * 各个页面的vmodel
 */
define(["./models", "./utils", "./../../../../assets/vendor/mmState", "domReady!"], function (models, utils) {
    var vmodels = {
        pages: avalon.define({
            $id: "pages",

            navs: {
                "主页": "#!/",
                "客户端": "#!/applications",
                "用户": "#!/members",
                "用户组": "#!/groups",
                "角色": "#!/roles",
                "授权": "#!/authorization",
                "系统配置": "#!/setting"
            },

            activeNav: utils.getActiveNav(),
            switchNavTo: function (key) {
                if (vmodels.pages.navs[key][0] !== "#") {
                    return;
                }
                vmodels.pages.activeNav = key;
            },

            // 目录模板和内容
            listSrc: "assets/modules/index/views/widgets/sidebar.html",
            directorys: {},
            scrollToTop: function(listItemData){
                if(typeof listItemData.intro !== "undefined"){
                    var listWrap = document.getElementById("listWrap")
                    listWrap.scrollTop = 0
                }
            },
            getListItemTitle: function(key, intro){
                if(typeof intro !== "undefined"){
                    return key + "-" + intro;
                } else{
                    return key;
                }
            },

            currentAnchor: undefined
        }),

        mainContent: avalon.define({
            $id: "mainController",

            // 内容页面
            mainSrc: ""

            // 获取“静态方法”页面数据
            //statics: models.statics
        })
    };

    return vmodels;
});
