define(["avalon","domReady!","mmRequest",
        "../../../vendor/avalon.oniui/pager/avalon.pager","../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid",
        "../../../vendor/avalon.oniui/switchdropdown/avalon.switchdropdown","weiutils"],
    function(avalon, domReady,mmRequest,pager,smartgrid,switchdropdown,weiutils) {
        var xitongyonghuzuVm = avalon.define({
            $id: "systemGroup",
            system:"系统管理",
            systemGroup:"用户组管理",
            sgOpt:{
                $skipArray: ["pager"],
                isAffix: true,//是否吸顶
                noFooter:false,//是否显示表格头部
                pageable:true,//是否分页
                noResult:"正在加载数据......",//数据为空时表格的提示信息
                pager: {
                    totalItems:200,
                    perPages: 5,
                    options : [5,10,20,50,100],
                    currentPage:1,
                    onJump: function(e, page) {
                        location.href = "#page=" + page.currentPage;
                        xitongyonghuzuVm.getData(page.currentPage);
                    },
                    canChangePageSize : true,
                    pageable:true,
                    dropdown: {
                        onChange: function(newValue, oldValue, vmodel) {
                          xitongyonghuzuVm.sgOpt.pager.perPages=newValue
                          xitongyonghuzuVm.getData(1)
                        }
                    }
                },
                htmlHelper:{
                    edit : function(vmId, field, index, cellValue, rowData){
                           return "<b><a href='/xitongguanli/yonghuzuguanli/edit/"+rowData.id+"'>编辑</a></b>&nbsp; &nbsp<b><a href='/xitongguanli/yonghuzuguanli/show/"+rowData.id+"'>查看</a></b>&nbsp;<b><a href='/xitongguanli/yonghuzuguanli/setrole/"+rowData.id+"'>设定角色</a></b>"
                    },
                    switchdropdown:function(vmId,field,index,cellValue,rowData){
                        var openOption = cellValue == 0 ?'<option value =" 0 " enabled>启用</option>' : '<option value = "0"> 启用</option>'
                            pauseOption = cellValue == 1 ?'<option value =" 0 " disabled>禁用</option>' : '<option value = "1"> 禁用</option>'
                            return ['<select ms-widget="switchdropdown" ms-click="changeDis" rowindex="'+index+'" field="'+field+'"  vmId="'+vmId+'">',openOption, pauseOption, '</select>'].join('')
                        }
                },
                columns: [
                    {
                        key: "id",
                        name: "编号",
                        sortable : true,
                        align: "center", //列的对象方式
                        width :100

                    },
                    {
                        key: "groups",
                        name: "用户组",
                        sortable: true,
                        width :180
                    },
                    {
                        key: "roles",
                        name: "角色",
                        sortable: true,
                        width :200
                    },
                    {
                        key: "created",
                        name: "创建时间",
                        sortable : true,
                        width :200
                    },
                    {
                        key : "status",
                        name: "状态",
                        sortable: true,
                        format:'switchdropdown',
                        width: 200
                     },
                    {
                        key: "operation",
                        name : "操作",
                        format:"edit",
                        width : 200
                    }

                ]
            },
            getData : function(currentPage){
               var limit=xitongyonghuzuVm.sgOpt.pager.perPages;
                avalon.ajax({
                    type:"GET",
                    url:"/api/xitongguanli/group/list/"+currentPage+"/"+limit,
                    success:function(data){
                     var AllRecords=data.allResults;
                     var ss = [];
                       ss = data.items;
                       var res=[];
                       for(var i=0;i<ss.length;i++){
                       var obj=ss[i];
                             var sj="";
                               for (var j = 0; j < obj.roles.length; j++) {
                                       sj += obj.roles[j].name+',';
                               }
                           res.push({
                              id :obj.id,
                              groups:obj.name,
                              roles:sj,
                              created:weiutils.dateFormat(obj.created,1)
                           })
                       }
                     var pagerInterval=setInterval(function(){
                        if(avalon.vmodels.sg1.pager.totalItems){
                          avalon.vmodels.sg1.pager.totalItems=AllRecords;
                          clearInterval(pagerInterval);
                        }else{pagerInterval();}
                     },10);
                     avalon.vmodels.sg1.data = res;
                     avalon.vmodels.sg1.render();
                    }
                })
            }
        });
        xitongyonghuzuVm.getData();
        avalon.scan();
    });
