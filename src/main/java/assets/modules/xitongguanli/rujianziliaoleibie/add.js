/**
 * Created by hanxuemin on 2015/10/22.
 */
define(["avalon","domReady!","mmRequest"],
    function(avalon,domReady,mmRequest,add){
//        avalon.templateCache.add = add;
        var addVm = avalon.define({
            $id: "addJail",
            tjlx:"添加类型",
            name:"",
         checkAll:function(e){
              e.preventDefault();
              var model = JSON.parse(JSON.stringify(addVm.$model));
              avalon.ajax({
                  type: "POST",
                  data: model,
                  url: "/api/xitongguanli/dict/rujianziliaofenlei/create",
                  //此在判断是有问题
                  success: function(res){
                  if(res.name==""){
                     alert("d");
                      addVm.name="数据为空";
                  }else if(res.name=="true"){
                      addVm.name="数据已存在";
                  }else{
                   window.location="/xitongguanli/rujianziliaoleibie";
                  }
                  }
              })
         }
        });
//        addVm.getData();
        avalon.scan();
//        avalon.vmodels.add = "add";
    });

