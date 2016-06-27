/**
 * Created by hanxuemin on 2015/9/24.
 */
define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid",
"../../../vendor/avalon.oniui/switchdropdown/avalon.switchdropdown","weiutils"],
    function(avalon,domReady,mmRequest,smartgrid,switchdropdown,weiutils){
        var quyuVm= avalon.define({
            $id: "systemQuyu",
            disableUser : function(){
                avalon.vmodels.a.enable = false
            },
            enableUser : function(){
                avalon.vmodels.a.enable = true
            },
            sg2Opt : {
                $skipArray : ["pager","dropdown" ,"switchdropdown"],
                isAffix : true,
                noResult:"正在加载数据......",
                pager : {
                    totalItems:1000,
                    perPages:5,
                    options : [5,10,20,50,100],
                    currentPage: 1,
                    onJump : function(e,page){
                        location.href = "#page=" + page.currentPage
                        quyuVm.getData(page.currentPage);
                        console.log(page.currentPage)
                    },
                    canChangePageSize : true,
                    pageable : true,
                    dropdown : {
                        onChange : function(newValue,oldValue,vmodel){
                            quyuVm.sg2Opt.pager.perPages=newValue
                            quyuVm.getData(1)
                        }
                    }
                },
                htmlHelper : {
                    switchdropdown: function(vmId, field, index, enabled, rowData) {
                        var openOption = enabled == true ? '<option value="0" selected>启用</option>' : '<option value="0">启用</option>',
                            pauseOption = enabled == false ? '<option value="1" selected>禁用</option>' : '<option value="1">禁用</option>'

                        return ['<select ms-widget="switchdropdown" rowindex="'+index+'" field="'+field+'"  vmId="'+vmId+'">', openOption, pauseOption, '</select>'].join('')
                    },
                    edit : function(vmId, field, index, cellValue, rowData){
                        return "<b><a href='/xitongguanli/quyuzidianguanli/edit/"+rowData.id+"'>编辑</a></b>";
                    }
                },
                columns : [
                    {
                        key : "id",
                        name : "编号",
                        sortable :true,
                        width: '20%',
                        isLock : true
                    },
                    {
                        key : "name",
                        name : "区域名称",
                        sortable : true,
                        width: '20%',
                        isLock : true//锁死列
                    },
                    {
                        key : "created",
                        name : "创建时间",
                        sortable : true,
                        width: '20%',
                        isLock : true//锁死列
                    },
                    {
                        key : "status",
                        name : "状态",
                        sortable : true,
                        format:'switchdropdown',
                        width: '20%'
                    },
                    {
                        key : "operation",
                        name : "操作",
                        width: '20%',
                        format: 'edit'
                    }
                ]
            },
             getData : function(currentPage){
                var limit=quyuVm.sg2Opt.pager.perPages;
               avalon.ajax({
                  type:"GET",
                  url:"/api/xitongguanli/quyu/list/"+currentPage+"/"+limit,
                  success:function(data){
                     var AllRecords=data.allResults;
                     var ss=[];
                     ss=data.items;
                     var res=[];
                     for(var i=0;i<ss.length;i++){
                        var obj=ss[i];
                        res.push({
                           id :obj.id,
                           name:obj.name,
                           created:weiutils.dateFormat(obj.created,1)
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
        quyuVm.getData();
        avalon.scan();
    });





































