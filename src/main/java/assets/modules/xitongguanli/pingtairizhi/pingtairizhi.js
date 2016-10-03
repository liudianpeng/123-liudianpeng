/**
 * Created by hanxuemin on 2015/9/24.
 */
define(["avalon","domReady!","mmRequest",
        "../../../vendor/avalon.oniui/datepicker/avalon.coupledatepicker","../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid","../../../vendor/avalon.oniui/switchdropdown/avalon.switchdropdown"],
    function(avalon,domReady,mmRequest,pingtairizhi,smartgrid){
        avalon.templateCache.pingtairizhi = pingtairizhi;
        var pingtairizhiVm = avalon.define({
            $id: "pingtairizhi",
            system:"系统管理",
            from:"2014-06-12",
            to:"2014-06-02",
            aOpts:{
                rules:'null,0D'
            },
            disableUser : function(){
                avalon.vmodels.a.enable = false
            },
            enableUser : function(){
                avalon.vmodels.a.enable = true
            },
            sg2Opt : {
                $skipArray : [ "dropdown"],

                isAffix : true,
                noResult:"正在加载数据......",
                pager : {
                    totalItems:1000,
                    perPages:5,
                    options:[5,10,20,50,100],
                    currentPage:1,
                    onJump : function(e,page){
                        location.href = "#page=" + page.currentPage;
                        pingtairizhiVm.getData(page.currentPage);
                    },
                    canChangePageSize : true,
                    pageable : true,
                    dropdown:{
                      onChange:function(newValue,oldValue,vmodels){
                        pingtairizhiVm.sg2Opt.pager.perPages=newValue
                        pingtairizhiVm.getData(1)
                      }
                    }
                },
                columns : [
                    {
                        key : "id",
                        name : "编号",
                        sortable :true,
                        width: 100,
                        isLock : true
                    },{
                        key : "username",
                        name : "用户名",
                        sortable : true,
                        width: 150,
                        isLock : true,//锁死列
                        toggle: true, //显隐藏
                        format: 'upperCaseName'
                    },
                    {
                        key : "name",
                        name : "name",
                        sortable : true,
                        width: 150,
                        isLock : true,//锁死列
                        toggle: true, //显隐藏
                        format: 'upperCaseName'
                    },
                    {
                        key : "detail",
                        name : "操作详情",
                        sortable : true,
                        width: 200,
                        isLock : true,//锁死列
                        toggle: true, //显隐藏
                        format: 'upperCaseName'
                    },
                    {
                        key : "ip",
                        name : "IP",
                        sortable : true,
                        width: 200,
                        isLock : true,//锁死列
                        toggle: true, //显隐藏
                        format: 'upperCaseName'
                    },
                    {
                        key : "created",
                        name : "操作时间",
                        sortable : true,
                        width: 300,
                        isLock : true,//锁死列
                        toggle: true//显隐藏

                    }
                ]
            },
            getData : function(currentPage){
               var limit=pingtairizhiVm.sg2Opt.pager.perPages;
                   avalon.ajax({
                      type:"GET",
                      url:"/api/xitongguanli/operationLog/list/"+currentPage+"/"+limit,
                      success:function(data){
                         var AllRecords=data.allResults;
                         var ss = [];
                         ss = data.items;
                         var res=[];
                         for(var i=0;i<ss.length;i++){
                              var obj=ss[i];
                              res.push({
                                    id :obj.id,
                                    username : obj.username,
                                    name:obj.memberId,
                                    detail:obj.content,
                                    ip:obj.ip,
                                    created:obj.created
                                })
                             }
                               avalon.vmodels.sg2.data = res.slice(0,10);
                               var pagerInterval = setInterval(function(){
                                  if (avalon.vmodels.sg2.pager.totalItems) {
                                     avalon.vmodels.sg2.pager.totalItems=AllRecords;
                                     clearInterval(pagerInterval);
                                  }else{pagerInterval();}
                               },10);
                             avalon.vmodels.sg2.data = res;
                             avalon.vmodels.sg2.render();
                            }
                        })
            }
        });
        pingtairizhiVm.getData();
        avalon.scan();
        avalon.vmodels.pingtairizhi = "pingtairizhi";
    });





































