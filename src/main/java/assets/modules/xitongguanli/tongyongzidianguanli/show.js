/**
 * Created by hanxuemin on 2015/9/25.
 */
define(["avalon","domReady!","mmRequest"],
    function(avalon){
    var id=document.getElementById("postId").value;
        console.log(id);
        var showVm = avalon.define({
            $id: "showDict",
            namespace : "",
            name: "",
            value: "",
            uid : "",
            getData:function(){
              var model=JSON.parse(JSON.stringify(showVm.$model));
              avalon.ajax({
                 type:"GET",
                 data:model,
                 url:"/api/xitongguanli/dict/show/"+id,
                 success:function(res){
                     showVm.namespace=res.namespace;
                     showVm.name=res.name;
                     showVm.value=res.value;
                     showVm.uid=res.uid;
                 }
              })
            }
        });
        showVm.getData();
        avalon.scan();
    });





































