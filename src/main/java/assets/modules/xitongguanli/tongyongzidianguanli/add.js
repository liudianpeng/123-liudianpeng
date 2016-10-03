/**
 * Created by hanxuemin on 2015/9/25.
 */
define(["avalon","domReady!","mmRequest"],
    function(avalon){
        var addVm = avalon.define({
            $id: "addDict",
            namespace:"",
            name:"",
            value:"",
            code:"",
            display:"",
            addCheck:function(e){
              e.preventDefault();
              var model=JSON.stringify(addVm.$model);
              console.log(model);
              avalon.ajax({
                type:"POST",
                data:model,
                url:"/api/xitongguanli/dict/create",
                headers:{
                        'Content-Type': 'application/json;charset=UTF-8'
                },
                success:function(res){
                   model=res;
                   console.log(res);
                   window.location="/xitongguanli/tongyongzidianguanli"
                }
              })
            }
        });
        avalon.scan();
    });





































