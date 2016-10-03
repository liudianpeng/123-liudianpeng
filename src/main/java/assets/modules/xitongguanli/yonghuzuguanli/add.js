define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/validation/avalon.validation"],
    function(avalon){
                var validationVM
                function showError(el, data) {
                    var next = el.nextSibling
                    if (!(next && next.className === "error-tip")) {
                        next = document.createElement("div")
                        next.className = "error-tip"
                        el.parentNode.appendChild(next)
                    }
                    next.innerHTML = data.getMessage()
                }
                function removeError(el) {
                    var next = el.nextSibling
                    if (next && next.className === "error-tip") {
                        el.parentNode.removeChild(next)
                    }
                }
            var addVm = avalon.define({
                $id : "add",
                name:"",
                    reset: function() {
                        validationVM && validationVM.resetAll()
                    },
                $skipArray: ["validation"],
                validation: {
                    onInit: function(v) {
                        validationVM = v
                    },
                    onReset: function(e, data) {
                            data.valueResetor && data.valueResetor()
                            avalon(this).removeClass("error success")
                            removeError(this)
                        },
                    onError: function(reasons) {
                            reasons.forEach(function(reason) {
                                avalon(this).removeClass("success").addClass("error")
                                showError(this, reason)
                            }, this)
                        },
                    onSuccess: function() {
                            avalon(this).removeClass("error").addClass("success")
                            removeError(this)
                        },
                    onValidateAll: function(reasons) {
                            reasons.forEach(function(reason) {
                                avalon(reason.element).removeClass("success").addClass("error")
                                showError(reason.element, reason)
                            })
                            if (reasons.length === 0) {
                                avalon.log("全部验证成功！")
                            }
                        }
                    },
               //提交
               addCheck:function(e){
                     e.preventDefault();
                     var model = JSON.parse(JSON.stringify(addVm.$model));
                     avalon.ajax({
                       type: "POST",
                       data: model,
                       url: "/api/xitongguanli/group/create",
                       success: function(res){
                           if(model.name==""){
                             alert("请输入用户名");
                           }else{
                               window.location="/xitongguanli/yonghuzuguanli";
                           }
                       }
                    })
               }
        });
            avalon.scan();
    });