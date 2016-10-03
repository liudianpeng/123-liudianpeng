define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid",
"../../../vendor/avalon.oniui/switchdropdown/avalon.switchdropdown","weiutils"],
    function(avalon, domReady,mmRequest,switchdropdown,smartgrid,weiutils) {
        var resumeVm = avalon.define({
        $id: "gerenjianli",
        xinxiguanli:"信息管理",
        zimulu:"个人简历",
//        get_id:document.getElementById("jianli_id").value,
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
                 resumeVm.getData(page.currentPage);
                 console.log(page.currentPage)
              },
              canChangePageSize : true,
              pageable : true,
              dropdown : {
                 onChange : function(newValue,oldValue,vmodel){
                     resumeVm.sg2Opt.pager.perPages=newValue
                     resumeVm.getData(1)
                   }
                 }
            },
        columns : [
            {
              key : "qrq",
              name : "起始年",
              sortable :true,
              width: '10%',
            },
            {
              key : "zrq",
              name : "终止年",
              sortable :true,
              width: '10%',
            },
            {
              key : "dwmx",
              name : "主要简历",
              sortable :true,
              width: '50%',
              isLock : true
            },
            {
              key : "position",
              name : "职业",
              sortable :true,
              width: '10%',
            },
            {
              key : "duty",
              name : "职务",
              sortable :true,
              width: '10%',
            },
            {
              key : "title",
              name : "职称",
              sortable :true,
              width: '15%',
            }
            ]
        },

            getData : function(currentPage){
                 var limit=resumeVm.sg2Opt.pager.perPages;
                 avalon.ajax({
                     type : "GET",
                     url :  "/api/xinxi/gerenjianli/list/"+resumeVm.get_id+"/"+currentPage+"/"+limit,
                     success : function(res){
                         var AllRecords=res.allResults;
                         var shuju = [];
                         shuju = res.items;
                         var grjl = [];
                         for (var i = 0;i<shuju.length;i++){
                             var obj = shuju[i];
                             grjl.push({
                                qrq : weiutils.kongzhi(obj.qrq),//起始日期
                                zrq : weiutils.kongzhi(obj.zrq),//终止年
                                dwmx : weiutils.kongzhi(obj.dwmx),//主要简历
                                position : weiutils.isNull(obj.position),//职业
                                duty : weiutils.isNull(obj.duty),//职务
                                title : weiutils.isNull(obj.title)//职称
                           });
                         };
                        avalon.vmodels.sg.data = grjl;
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
    resumeVm.getData();
    avalon.scan();
  });