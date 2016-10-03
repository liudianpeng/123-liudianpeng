define(["avalon","domReady!","mmRequest",
  "../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid","../../../vendor/avalon.oniui/switchdropdown/avalon.switchdropdown","weiutils"],
  function(avalon, domReady,mmRequest,smartgrid,switchdropdown,weiutils) {
      var personalShoppingVm = avalon.define({
          $id: "personalShopping",
          xinxiguanli:"信息管理",
          zimulu:"超市购物",
          //获取页面的id
//          get_id:document.getElementById("get_id").value,
          get_id : window.parent.document.getElementById("get_id").value,
          sg2Opt : {
             $skipArray : ["pager"],
             isAffix : true,
             pager : {
              totalItems:200,
              perPages:5,
              options : [5,10,20,50,100],
              currentPage: 1,
              onJump : function(e,page){
                 location.href = "#page=" + page.currentPage
                 personalShoppingVm.getDataResult.getData(page.currentPage);
                 personalShoppingVm.getDataAllResult.getData2(page.currentPage);
                 console.log(page.currentPage)
              },
              canChangePageSize : true,
              pageable : true,
              dropdown : {
                 onChange : function(newValue,oldValue,vmodel){
                     personalShoppingVm.sg2Opt.pager.perPages=newValue
                     if(personalShoppingVm.getDataResult){
                        personalShoppingVm.getData()
                     }
                     else{
                        personalShoppingVm.getData2()
                     }
                   }
                 }
          },
             columns : [
                {
                  key : "gmrq",
                  name : "购买日期",
                  sortable :true,
                  width: 189,
                  format:"buytime"
          },
                {
                  key : "spmc",
                  name : "商品名称",
                  sortable :true,
                  width: 173.3
          },
                {
                  key : "specifications",
                  name : "规格型号",
                  sortable :true,
                  width: 173.3,
                  isLock : true
          },
                {
                  key : "price",
                  name : "单价",
                  sortable :true,
                  width: 173.3
          },
                {
                  key : "acout",
                  name : "数量",
                  sortable :true,
                  width: 173.3
          },
                {
                  key : "je",
                  name : "金额",
                  sortable :true,
                  width:200
          }
             ]
         },
         //金额计算//购物费用合计
         gwhj:'',
         data1: function(){
              var url = "/api/xinxi/chaoshigouwu/gouwuheji/"+personalShoppingVm.get_id;
              avalon.get(url,function(data){
              personalShoppingVm.gwhj= data;
          });
         },
         //犯人帐户余额
         zhye : "",
         data2 : function(){
            var url = "/api/xinxi/chaoshigouwu/zhanghuyue/"+personalShoppingVm.get_id;
            avalon.get(url,function(data){
                personalShoppingVm.zhye = data;
            });
         },
         getDataResult:function(a){
             personalShoppingVm.getData()
         },
         getDataAllResult:function(b){
             personalShoppingVm.getData2()
         },
         //本月购物记录
         getData : function(currentPage){
               var limit=personalShoppingVm.sg2Opt.pager.perPages;
                avalon.ajax({
                     type : "GET",
                     url :  "/api/xinxi/chaoshigouwu/currentlist/"+personalShoppingVm.get_id+"/"+currentPage+"/"+limit,
                     success : function(res){
                         var AllRecords=res.allResults;
                         var shuju = [];
                         shuju = res.items;
                         var benyue = [];
                         for (var i = 0;i<shuju.length;i++){
                             var obj = shuju[i];
                             benyue.push({
                                gmrq : weiutils.dateFormat(obj.gmrq,0),//购买日期
                                spmc : weiutils.kongzhi(obj.spmc),//商品名称
                                specifications : weiutils.isNull(obj.specifications),//规格型号
                                price : weiutils.kongzhi(obj.price),//单价
                                acout : weiutils.kongzhi(obj.acout),//数量
                                je : weiutils.kongzhi(obj.je)//金额
                           });
                         }
                         avalon.vmodels.sg.pager.totalItems = AllRecords;
                        avalon.vmodels.sg.data = benyue;
                        avalon.vmodels.sg.render();
                    }
                });
             },
         //全部购物记录
         getData2 : function(currentPage){
              var limit=personalShoppingVm.sg2Opt.pager.perPages;
                avalon.ajax({
                     type : "GET",
                     url :  "/api/xinxi/chaoshigouwu/list/"+personalShoppingVm.get_id+"/"+currentPage+"/"+limit,
                     success : function(res){
                         var AllRecords=res.allResults;
                         var shuju = [];
                         shuju = res.items;
                         var quanbu = [];
                         for (var i = 0;i<shuju.length;i++){
                             var obj = shuju[i];
                             quanbu.push({
                                gmrq : weiutils.dateFormat(obj.gmrq,0),//购买日期
                                spmc : weiutils.kongzhi(obj.spmc),//商品名称
                                specifications : weiutils.isNull(obj.specifications),//规格型号
                                price : weiutils.kongzhi(obj.price),//单价
                                acout : weiutils.kongzhi(obj.acout),//数量
                                je : weiutils.kongzhi(obj.je)//金额
                           });
                         };
                         avalon.vmodels.sg.pager.totalItems = AllRecords;
                        avalon.vmodels.sg.data = quanbu;
                        avalon.vmodels.sg.render();
                    }
                });
           }
      });
      personalShoppingVm.data1();
      personalShoppingVm.data2();
      personalShoppingVm.getData();
      personalShoppingVm.getData2();
      avalon.scan();
});