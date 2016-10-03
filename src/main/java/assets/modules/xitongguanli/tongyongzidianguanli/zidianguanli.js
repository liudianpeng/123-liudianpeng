/**
 * Created by hanxuemin on 2015/9/24.
 */
define(["avalon","domReady!","mmRequest",
        "../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid","../../../vendor/avalon.oniui/switchdropdown/avalon.switchdropdown"],
    function(avalon,domReady,mmRequest,zidianguanli,smartgrid){
        avalon.templateCache.zidianguanli = zidianguanli;
        var zidianguanliVm = avalon.define({
            $id: "systemDict",
            system:"系统管理",
            systemDict:"字典管理",
            addDict:"添加字典",

            disableUser : function(){
                avalon.vmodels.a.enable = false
            },
            enableUser : function(){
                avalon.vmodels.a.enable = true
            },
            sg2Opt : {
                $skipArray : ["pager", "dropdown" ,"switchdropdown"],
                isAffix : true,
                noResult:"正在加载数据......",
                pager : {
                   totalItems:1000,
                   perPages:5,
                   options : [5,10,20,50,100],
                   currentPage:1,
                    onJump : function(e,page){
                        location.href = "#page=" + page.currentPage;
                        zidianguanliVm.getData(page.currentPage);
                    },
                    canChangePageSize : true,
                    pageable : true,
                    dropdown : {
                        onChange : function(newValue,oldValue,vmodel){
                           zidianguanliVm.sg2Opt.pager.perPages=newValue
                           zidianguanliVm.getData(1)
                        }
                    }
                },
                htmlHelper : {
                    // operate列包装成switchdropdown组件
                    switchdropdown: function(vmId, field, index, cellValue, rowData) {
                        var openOption = cellValue == 0 ? '<option value="0" selected>启用</option>' : '<option value="0">启用</option>',
                            pauseOption = cellValue == 1 ? '<option value="1" selected>禁用</option>' : '<option value="1">禁用</option>'

                        return ['<select ms-widget="switchdropdown" rowindex="'+index+'" field="'+field+'"  vmId="'+vmId+'">', openOption, pauseOption, '</select>'].join('')
                    },
                    upperCaseName: function(vmId, field, index, cellValue, rowData) {
                        cellValue = cellValue.toUpperCase()
                        return "<b>"+cellValue +"</b>"
                    },
                    edit : function(vmId, field, index, cellValue, rowData){
                        return "<b><a href='/xitongguanli/tongyongzidianguanli/edit/"+rowData.id+"'>编辑</a></b>"
                    }
                },
                columns : [
                    {
                        key : "id",
                        name : "编号",
                        sortable :true,
                        width: '12.5%',
                        isLock : true
                    },
                    {
                        key : "namespace",
                        name : "namespace",
                        sortable : true,
                        width: '12.5%',
                        isLock : true//锁死列
                    },
                    {
                        key : "name",
                        name : "名称",
                        sortable : true,
                        width: '12.5%',
                        isLock : true//锁死列
                    },
                    {
                        key : "value",
                        name : "数值",
                        sortable : true,
                        width: '12.5%',
                        isLock : true//锁死列
                    },
                    {
                        key : "code",
                        name : "code",
                        sortable : true,
                        width: '12.5%',
                        isLock : true//锁死列
                    },
                    {
                        key : "display",
                        name : "显示名称",
                        sortable : true,
                        width: '12.5%',
                        isLock : true//锁死列
                    },

                    {
                        key : "status",
                        name : "状态",
                        sortable : true,
                        width: '12.5%',
                        format:'switchdropdown'
                    },
                    {
                        key : "operation",
                        name : "操作",
                        width: '12.5%',
                        format: 'edit'
                    }
                ]
            },
              getData : function(currentPage){
                  var limit=zidianguanliVm.sg2Opt.pager.perPages;
                 avalon.ajax({
                   type:"GET",
                   url:"/api/xitongguanli/dict/list/"+currentPage+"/"+limit,
                   success:function(data){
                        var AllRecords=data.allResults;
                        var ss = [];
                        ss = data.items;
                        var res=[];
                        for(var i=0;i<ss.length;i++){
                        var obj=ss[i];
                        res.push({
                        id :obj.id,
                        namespace:obj.namespace,
                        name:obj.name,
                        value:obj.value,
                        code:obj.code,
                        display:obj.display,
                        status:obj.status
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
        zidianguanliVm.getData();
        avalon.scan();
        avalon.vmodels.zidianguanli = "zidianguanli";
    });





































