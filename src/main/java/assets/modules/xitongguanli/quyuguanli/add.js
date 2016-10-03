/**
 * Created by hanxuemin on 2015/10/22.
 */
define(["avalon","domReady!","mmRequest"],
    function(avalon,domReady,mmRequest){
        var addVm = avalon.define({
            $id: "addArea",
            name:"",
            items:{},
            change: function (e) {
              console.log(e.target.value);
            },
            data: function(){
               var url = "/api/xitongguanli/quyu/list";
                 return avalon.get(url,[],function(data){
                 addVm.items = data;
               },"json");
            },
         checkAll:function(e){
              e.preventDefault();
              var model = JSON.parse(JSON.stringify(addVm.$model));
              avalon.ajax({
                  type: "POST",
                  data: model,
                  url: "/api/xitongguanli/quyu/create",
                  //此在判断是有问题
                  success: function(res){
                  if(res.name==""){
                     alert("d");
                      addVm.name="数据为空";
                  }else if(res.name=="true"){
                      addVm.name="数据已存在";
                  }else{
                   window.location="/xitongguanli/quyuzidianguanli";
                  }
                  }
              })
         }
        });
        addVm.data();
        avalon.scan();
    });

