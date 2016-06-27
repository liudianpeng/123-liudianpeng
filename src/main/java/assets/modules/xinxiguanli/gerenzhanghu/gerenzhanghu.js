
define(["avalon","domReady!","mmRequest",
"../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid","../../../vendor/avalon.oniui/switchdropdown/avalon.switchdropdown",
"weiutils"],
function(avalon, domReady,mmRequest,personalAccount,smartgrid,weiutils) {

        var personalAccountVm = avalon.define({
               $id: "personalAccount",
               xinxiguanli:"信息管理",
               zimulu:"个人账户",
               items: {},
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
                       personalAccountVm.getData(page.currentPage);
                       console.log(page.currentPage)
                    },
                    canChangePageSize : true,
                    pageable : true,
                    dropdown : {
                       onChange : function(newValue,oldValue,vmodel){
                       personalAccountVm.sg2Opt.pager.perPages=newValue
                       personalAccountVm.getData(1)
                    }
                 }
            },
                 columns : [   //smartgrid 表格列信息对象的集合
                    {
                      key : "djrq",
                      name : "单据日期",
                      sortable :true,
                      width: '10%',
                    },
                    {
                      key : "djzy",
                      name : "单据摘要",
                      sortable :true,
                      width: '10%',
                    },
                    {
                      key : "je",
                      name : "金额",
                      sortable :true,
                      width: '20%',
                      isLock : true
                    },
                    {
                      key : "cz",
                      name : "存/支款",
                      sortable :true,
                      width: '20%',
                    },
                    {
                      key : "payment",
                      name : "付款方式",
                      sortable :true,
                      width: '20%',
                    }
                    ]
              },
//        get_id:document.getElementById("get_id").value,//获取页面的id
           get_id : window.parent.document.getElementById("get_id").value,
       //帐户余额-使用的是超市购物里的帐户余额

        zhye : '',
           data : function(){
                var url = "/api/xinxi/chaoshigouwu/zhanghuyue/"+personalAccountVm.get_id;//默认第一个犯人的id
                avalon.get(url,function(data){
                personalAccountVm.zhye = data;
                });
           },

            //个人帐户数据
        getData : function(currentPage){
            var limit=personalAccountVm.sg2Opt.pager.perPages;
            avalon.ajax({
                 type : "GET",
                 url :  "/api/xinxi/gerenzhanghu/list/"+personalAccountVm.get_id+"/"+currentPage+"/"+limit,
                 success : function(res){
                      var AllRecords=res.allResults;
                      var shuju = [];
                      shuju = res.items;
                      var gerenzhanghu = [];
                      for (var i = 0;i<shuju.length;i++){
                           var obj = shuju[i];
                           gerenzhanghu.push({
                                djrq : weiutils.dateFormat(obj.djrq,0),//单据日期
                                djzy : weiutils.isNull(obj.djzy),//单据摘要
                                je : weiutils.kongzhi(obj.je),//金额
                                cz : weiutils.kongzhi(obj.cz),//支款
                                payment : weiutils.isNull(obj.payment)//付款方式
                           });
                      };
                 avalon.vmodels.sg.data = gerenzhanghu;
                         var pagerInterval = setInterval(function(){
                            if(avalon.vmodels.sg.pager.totalItems){
                                avalon.vmodels.sg.pager.totalItems = AllRecords;
                                clearInterval(pagerInterval)
                            }else{pagerInterval();}
                         });
                 avalon.vmodels.sg.render();
                 }
            });
       }
    });
        personalAccountVm.getData();
        personalAccountVm.data();
        avalon.scan();
        avalon.vmodels.personalAccount = "personalAccount";
});