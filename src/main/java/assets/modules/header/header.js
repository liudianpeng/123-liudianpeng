define(["avalon","domReady!","../../vendor/avalon.oniui/dialog/avalon.dialog","../../vendor/avalon.oniui/validation/avalon.validation"],
 function(avalon, domReady,dialog) {
   function showError(el,data){
      var next=el.nextSibling
      if(!(next&&next.className==="error-tip")){
        next=document.createElement("div")
        next.className="error-tip"
        el.parentNode.appendChild(next)
      }
      next.innerHTML=data.getMessage()
   };
   function removeError(el){
     var next=el.nextSibling
     while(next){
       if(next.className==="error-tip"){
          el.parentNode.removeChild(next)
          break
       }
       next=next.nextSibling
     }
   };
   var logoutVm=avalon.define({
       $id:"logout",
       username:"admin",
       oldPassword:"",
       newPassword1:"",
       newPassword2:"",
       toggle: false,
       logoutClick: function(e) {
         logoutVm.toggle = !logoutVm.toggle
       },
       $aaOpts:{
         title:"修改密码",
         showClose:false,
         modal:false,
         confirmName:"保存",
         cancelName:"退出",
         //确定后的回调函数
         onConfirm:function(){
           alert("提交");
         },
         onCancel:function(){
           alert("取消");
         }
       },
       show:function(){
          avalon.vmodels.aa.toggle=true;
       },
       $skipArray: ["validation"],
       validation:{
          onReset:function(){
            avalon(this).removeClass("error sucess")
            removeError(this)
          },
          onError:function(reasons){
            reasons.forEach(function(reason){
               avalon(this).removeClass("success").addClass("error")
               showError(this,reason)
            },this)
          },
          onSuccess:function(){
            avalon(this).removeClass("error").addClass("success")
            removeError(this)
          },
          onValidateAll:function(reasons){
            reasons.forEach(function(reason){
               avalon(reason.element).removeClass("success").addClass("error")
               showError(reason.element,reason)
            })
            if(reasons.length===0){
              avalon.log("全部验证成功！")
            }
          }
       },

       onCancel:function(){
         alert(2);
       }
   })


})
