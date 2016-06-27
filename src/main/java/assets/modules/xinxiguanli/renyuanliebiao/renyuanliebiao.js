define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid",
"weiutils"],
        function (avalon, domReady,mmRequest,smartgrid,weiutils) {
        var adminVm = avalon.define({
            $id: "homepage",
            person:"人员列表",
            $skipArray: ["pager"],
            ///////////////////////////测试代码
//            test : "",
//            testId : function(){
//                window.parent.avalon.vmodels.pages.getId = this.value;
//            },
            //////////////////////////
            sgOpt:{
                isAffix: true,
                pager : {
                    totalItems:1,
                    perPages:50,
                    options : [50,100,200],
                    currentPage: 1,
                    onJump : function(e,page){
                       location.href = "#page=" + page.currentPage
                       adminVm.getData(page.currentPage);
                       console.log(page.currentPage)
                    },
                    canChangePageSize : true,
                    pageable : true,//表格是否需要分页
                    dropdown:{
                       onChange:function(newValue,oldValue,vmodels){
                          adminVm.sgOpt.pager.perPages=newValue
                          adminVm.getData(1)
                       }
                    }
                },
                htmlHelper : {
                        shotoTop : function(vmId, field, index, cellValue, rowData){
                            //adminVm.test = rowData.id;//测试
//                            window.parent.avalon.vmodels.pages.getId = rowData.id;
                            return "<b><a href=/xinxiguanli/gerenxinxi/"+rowData.id+">"+cellValue+"</a></b>";

                        }
                },
                columns: [
                    {
                        key : "bh",
                        name : "档案编号",
                        sortable :true,
                        width: 80,
                        align: "left",
                        isLock : true
                    },
                    {
                        key : "xm",
                        name : "姓名",
                        sortable : true,
                        width: 100,
                        toggle:true,
                        isLock : true,
                        format: 'shotoTop'
                    },
                    {
                        key: "csrq",
                        name: "出生日期",
                        sortable : true,
                        width: 80,
                        isLock : true
                    },
                    {
                        key : "rjrq",
                        name : "入监日期",
                        sortable : true,
                        width: 80,
                        isLock : true
                    },
                    {
                        key : "newEdu",
                        name : "学历",
                        align: "left",
                        sortable : true,
                        width: 80
                    },
                    {
                        key : "jgqh",
                        name : "籍贯",
                        align: "left",
                        sortable : true,
                        width: 200
                    },
                    {
                        key : "jtqh",
                        name : "家庭地址",
                        align: "left",
                        sortable : true,
                        width: 200
                    },
                    {
                        key : "dbrq",
                        name : "逮捕日期",
                        sortable : true,
                        width: 80
                    },
                    {
                        key : "jyrq",
                        name : "羁押日期",
                        sortable : true,
                        width: 80
                    },
                    {
                        key : "syzm",
                        name : "罪名",
                        align: "left",
                        sortable : true,
                        width: 100
                    },
                    {
                        key : "dbmx",
                        name : "逮捕地方",
                        align: "left",
                        sortable : true,
                        width: 200
                    },
                    {
                        key : "dbqh",
                        name : "逮捕机构",
                        align: "left",
                        sortable : true,
                        width: 200
                    },
                    {
                        key : "ysmx",
                        name : "判决地方",
                        align: "left",
                        sortable : true,
                        width: 200
                    },
                    {
                        key : "ysqh",
                        name : "判决机构",
                        align: "left",
                        sortable : true,
                        width: 200
                    },
                    {
                        key : "yssm",
                        name : "判决字号",
                        align: "left",
                        sortable : true,
                        width: 80
                    },
                    {
                        key : "fzss",
                        name : "犯罪事实",
                        align: "left",
                        sortable : true,
                        width: 160
                    },
                    {
                        key : "newCriminalType",
                        name : "案犯类别",
                        align: "left",
                        sortable : true,
                        width: 80
                    },
                    {
                        key : "sddj",
                        name : "三涉",
                        align: "left",
                        sortable : true,
                        width: 80
                    },
                    {
                        key : "ssdj",
                        name : "四史",
                        align: "left",
                        sortable : true,
                        width: 80
                    },
                    {
                        key : "fylx",
                        name : "分押类别",
                        align: "left",
                        sortable : true,
                        width: 80
                    },
                    {
                        key : "marialStatus",
                        name : "婚姻状况",
                        align: "left",
                        sortable : true,
                        width: 80
                    },
                    {
                        key : "xq",
                        name : "现刑期",
                        sortable : true,
                        width: 80
                    },
                    {
                        key : "bznx",
                        name : "附加刑",
                        sortable : true,
                        align: "left",
                        width: 100
                    },
                    {
                        key : "qr",
                        name : "起始刑期",
                        sortable : true,
                        width: 80
                    },
                    {
                        key : "zr",
                        name : "终止刑期",
                        sortable : true,
                        width: 80
                    },
                    {
                        key : "lgf",
                        name : "是否惯累犯",
                        sortable : true,
                        width: 100
                    }
                ]
            },
             getData : function(currentPage){
                 var limit=adminVm.sgOpt.pager.perPages;
                 avalon.ajax({
                     type : "GET",
                     url :  "/api/xinxi/xinxiguanli/list/"+currentPage+"/"+limit,//获取数据
                     success : function(data){
                          var AllRecords=data.allResults;
                          var items = data.items;
                          var res = [];
                          for (var i = 0;i<items.length;i++){
                             var obj = items[i];
                             res.push({
                             id : obj.id, //cid
                             bh : weiutils.kongzhi(obj.bh),//编号
                             xm : weiutils.kongzhi(obj.xm),//姓名
                             csrq : weiutils.kongzhi(weiutils.dateFormat(obj.csrq,0)),//出生日期
                             rjrq : weiutils.dateFormat(obj.rjrq,0),//入监日期
                             newEdu : weiutils.isNull(obj.newEdu),//现文化程度
                             jgqh : weiutils.isNull(obj.jgqh),//籍贯
                             jtqh : weiutils.isNull(obj.jtqh),//家庭区域地址
                             dbrq :weiutils.dateFormat(obj.dbrq,0),//逮捕日期
                             jyrq : weiutils.dateFormat(obj.jyrq,0),//羁押日期
                             syzm : weiutils.kongzhi(obj.syzm),//罪名
                             dbmx : weiutils.kongzhi(obj.dbmx),//逮捕地点名称
                             dbqh : weiutils.isNull(obj.dbqh),//逮捕机构(逮捕地点)
                             ysmx : weiutils.kongzhi(obj.ysmx),//判决地点名称
                             ysqh : weiutils.isNull(obj.ysqh),//判决机构(判决地点)
                             yssm : weiutils.kongzhi(obj.yssm),//判决字号名称
                             fzss : weiutils.kongzhi(obj.fzss),//犯罪事实
                             newCriminalType : weiutils.isNull(obj.newCriminalType),//现犯案类别
                             sddj : weiutils.isNull(obj.sddj),//三涉
                             ssdj : weiutils.isNull(obj.ssdj),//四史
                             fylx : weiutils.kongzhi(obj.fylx),//分押类别
                             marialStatus : weiutils.isNull(obj.marialStatus),//婚姻状况
                             xq : weiutils.kongzhi(obj.xq),//现刑期(刑期)
                             bznx : weiutils.isNull(obj.bznx),//附加刑
                             qr : weiutils.stringDate(obj.qr),//起始刑期
                             zr : weiutils.stringDate(obj.zr),//终止刑期
                             lgf : weiutils.kongzhi(obj.lgf)//是否惯犯
                           })
                          }
                          avalon.vmodels.sg.data = res.slice(0,3);
                          var pagerInterval = setInterval(function(){
                             if (avalon.vmodels.sg.pager.totalItems){
                                 avalon.vmodels.sg.pager.totalItems=AllRecords;
                                 clearInterval(pagerInterval);
                             }else{pagerInterval();}
                          },10);
                        avalon.vmodels.sg.data = res;
                        avalon.vmodels.sg.render();
                     }
                 })
             }
         });
        adminVm.getData(1);
        avalon.scan();
    });

