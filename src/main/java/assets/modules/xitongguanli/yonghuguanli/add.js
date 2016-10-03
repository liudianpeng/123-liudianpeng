define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/validation/avalon.validation"],
    function(avalon,domReady,mmRequest,add){
        avalon.templateCache.add = add;
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
                    while (next) {
                        if (next.className === "error-tip") {
                            el.parentNode.removeChild(next)
                            break
                        }
                         next = next.nextSibling
                    }
                }

            var addVm = avalon.define({
                $id: "add",
                 //用户名验证
                username:"",
                //邮箱验证
                email: "",
                //密码验证
                plainPassword: "",
                e:"",
                //姓名验证
                nickname:"",
                $skipArray: ["validation"],
                    checkAll: function() {
                        validationVM && validationVM.validateAll();
                    },
                validation: {
                        validateInBlur: false,
                        onInit: function(v) {
                            validationVM = v
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
            addCheck:function(e){
               e.preventDefault();
               var model = JSON.parse(JSON.stringify(addVm.$model));
               avalon.ajax({
                   type: "POST",
                   data: model,
                   url: "/api/xitongguanli/member/create",
                   success: function(res){
                      res=model;
                   window.location="/xitongguanli/yonghuguanli";
                   }
                })
            }
        });
            avalon.scan();
            avalon.vmodels.add = "add";
        });