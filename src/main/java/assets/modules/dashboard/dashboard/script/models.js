define(["avalon","mmRequest"], function(avalon,mmRequest){
    return function(code){
        var menus = null;
        avalon.ajax({
            type:"GET",
            url: "/menus/sub",
            async: false,
            data: {menu_code:code},
            success:function(res){
                menus = res ;
            }
        });
        return menus;
    };
   /*
    return {
        xinxiguanli:{
            "信息管理":{
                "列表": "assets/html/xinxiguanli/list.html",
                "添加": "assets/html/xinxiguanli/add.html"
            }
        },
        jifenkaohe: {
            "计分考核": {
                "列表": "assets/html/jifenkaohe/list.html",
                "添加": "assets/html/jifenkaohe/add.html"
            }
        },
        quyuguanli: {
            "区域管理": {
                "用户列表": "assets/html/quyuguanli/list.html",
                "添加用户": "assets/html/quyuguanli/add.html"
            }
        },
        xitongguanli: {
            "系统管理": {
                "用户组列表": "assets/html/xitongguanli/list.html",
                "添加用户组": "assets/html/xitongguanli/add.html"
            }
        }
    };
    */
});
