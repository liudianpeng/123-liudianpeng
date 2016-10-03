define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/validation/avalon.validation"],
    function(avalon,domReady,mmRequest,password,smartgrid){
        avalon.templateCache.password = password;

            function showError(el, data) {
                    var next = el.nextSibling
                    if (!(next && next.className === "error-tip")) {
                        next = document.createElement("div")
                        next.className = "error-tip"
                        el.parentNode.appendChild(next)
                    }
                    next.innerHTML = data.getMessage()
                };
                function removeError(el) {
                   var next = el.nextSibling
                    while (next) {
                        if (next.className === "error-tip") {
                            el.parentNode.removeChild(next)
                            break
                        }
                         next = next.nextSibling
                    }
                };
                var id=document.getElementById("passId").value;
                console.log(id);
            var passwordVm = avalon.define({
                    $id: "password",
                    username:"",
                    plainPassword:"",
                    f:"",
                    data:function(e){
                        var model = JSON.parse(JSON.stringify(passwordVm.$model));
                        var dataURl="/api/xitongguanli/member/show/"+id;
                        avalon.ajax({
                            type: "GET",
                            url:dataURl,
                            success: function(res){
                                passwordVm.username=res.username;
                            }
                        })
                    },
                    modPass:function(e){
                        e.preventDefault();
                        var model = JSON.parse(JSON.stringify(passwordVm.$model));
                        avalon.ajax({
                            type: "PUT",
                            data: model,
                            url: "/api/xitongguanli/member/modpass/"+id,
                            success: function(res){
                               res=model;
                               //console.log("提交成功");
                               window.location="/xitongguanli/yonghuguanli";
                            }
                        })
                    }
                 });
            passwordVm.data();
            avalon.scan();
            avalon.vmodels.password = "password";
        });