define(["avalon","domReady!","mmRequest"], function(avalon) {

    var loginCheckUrl = "/login";

    var loginVm = avalon.define({
        $id: "loginPage",
        username: "",
        password: "",
        notice: "",
        loginCheck: function(e){
            e.preventDefault();
            var model = JSON.parse(JSON.stringify(loginVm.$model));
            avalon.ajax({
                type: "POST",
                data: model,
                url: loginCheckUrl,
                success: function(res){
                    if(res.notice=="failure"){
                        loginVm.password="";
                        loginVm.notice = "登录失败，请检查用户名及密码是否正确";
                    }else{
                        window.location="/home#!xinxiguanli";

                    }
                }
            })
        }
    });

    avalon.scan();
})
