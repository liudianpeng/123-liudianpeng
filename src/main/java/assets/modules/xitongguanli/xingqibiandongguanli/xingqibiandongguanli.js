/**
 * Created by hanxuemin on 2015/10/22.
 */
define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid","../../../vendor/avalon.oniui/switchdropdown/avalon.switchdropdown"],
    function(avalon,domReady,mmRequest,xingqibiandongguanli,smartgrid){
        avalon.templateCache.xingqibiandongguanli = xingqibiandongguanli;
        var rujianziliaoguanliVm = avalon.define({
            $id: "sentence",
            system:"系统管理",
            sentence:"刑期变动管理",
            addDict:"添加",

            disableUser : function(){
                avalon.vmodels.a.enable = false
            },
            enableUser : function(){
                avalon.vmodels.a.enable = true
            },
            sg2Opt : {
                $skipArray : ["pager", "dropdown" ,"switchdropdown"],
                isAffix : true,
                pager : {
                    onJump : function(e,data){
                        location.href = "#page=" + data.currentPage;
                        rujianziliaoguanliVm.getData(data.currentPage);
                    },
                    canChangePageSize : true,
                    pageable : true,
                    options : [10,20,50,100],
                    dropdown : {
                        onChange : function(newValue,oldValue,vmodel){
                            avalon.log("pager dropdown")
                            avalon.log("pageSize is:" + newValue)
                            avalon.log("arguments is:")
                            avalon.log(arguments)
                        }
                    }
                },
                htmlHelper : {
                    // operate列包装成switchdropdown组件
                    switchdropdown: function(vmId, field, index, enabled, rowData) {
                        var openOption = enabled == true ? '<option value="0" selected>启用</option>' : '<option value="0">启用</option>',
                            pauseOption = enabled == false ? '<option value="1" selected>禁用</option>' : '<option value="1">禁用</option>'

                        return ['<select ms-widget="switchdropdown" rowindex="'+index+'" field="'+field+'"  vmId="'+vmId+'">', openOption, pauseOption, '</select>'].join('')
                    },

                    upperCaseName: function(vmId, field, index, cellValue, rowData) {
                        cellValue = cellValue.toUpperCase()
                        return "<b>"+cellValue +"</b>"
                    },
                    edit : function(vmId, field, index, cellValue, rowData){
                        return "<b><a href='/xitongguanli/xingqibiandongguanli/edit/"+rowData.id+"'>编辑</a></b>&nbsp;&nbsp;&nbsp;<b><a href='/xitongguanli/xingqibiandongguanli/show/"+rowData.id+"'>查看</a></b>";
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
                        name : "类型",
                        sortable : true,
                        width: '20%',
                        isLock : true//锁死列
                    },
                    {
                        key : "cjsj",
                        name : "创建时间",
                        sortable : true,
                        width: '20%',
                        isLock : true//锁死列
                    },
                    {
                        key : "status",
                        name : "状态",
                        sortable : true,
                        width: '20%',
                        format:'switchdropdown'
                    },
                    {
                        key : "operation",
                        name : "操作",
                        width: '20%',
                        format: 'edit'
                    }
                ]
            },
             getData : function(){
                             avalon.ajax({
                               type:"GET",
                               url:"/api/xitongguanli/dict/rujianziliaofenlei/list",
                               success:function(data){
                                    var ss = [];
                                    ss = data.items;
                                    var res=[];
                                    for(var i=0;i<ss.length;i++){
                                    var obj=ss[i];
                                    res.push({
                                    id :obj.id,
                                    name:obj.name,
//                                    服务器端无创建时间数据
                                    cjsj:obj.data,
                                    status:obj.enabled,
                               })
                             }
                                avalon.vmodels.sg2.data = res;
                                avalon.vmodels.sg2.render();
                             }
                            })
                             }
        });
        rujianziliaoguanliVm.getData();
        avalon.scan();
        avalon.vmodels.xingqibiandongguanli = "xingqibiandongguanli";
    });





































