/**
 * Created by hanxuemin on 2015/9/24.
 */
define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid","weiutils"],
        function(avalon,domReady,mmRequest,smartgrid,weiutils){
        var diquguanliVm = avalon.define({
            $id: "systemDiqu",
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
                    totalItems:200,
                    perPages:5,
                    options : [5,10,20,50,100],
                    currentPage: 1,
                    onJump : function(e,data){
                        location.href = "#page=" + data.currentPage;
                        diquguanliVm.getData(data.currentPage);
                    },
                    canChangePageSize : true,
                    pageable : true,
                    dropdown : {
                        onChange : function(newValue,oldValue,vmodel){
                            diquguanliVm.sg2Opt.pager.perPages=newValue
                            diquguanliVm.getData(1)
                        }
                    }
                },
                htmlHelper : {
                    edit : function(vmId, field, index, cellValue, rowData){
                        return "<b><a href='/xitongguanli/diquguanli/edit/"+rowData.id+"'>编辑</a></b>";
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
                        name : "地区名称",
                        sortable : true,
                        width: '20%',
                        isLock : true//锁死列
                    },
                    {
                        key : "code",
                        name : "code",
                        sortable : true,
                        width: '20%',
                        isLock : true//锁死列
                    },
                    {
                        key : "created",
                        name : "创建时间",
                        sortable : true,
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
             getData：function(currentPage){
                var limit=diquguanliVm.sg2Opt.pager.perPages;
               avalon.ajax({
                  type:"GET",
                  url:"/api/xitongguanli/area/list/"+currentPage+"/"+limit,
                  success:function(data){
                       var AllRecords=data.allResults;
                      var ss = [];
                      ss = data.items;
                      var res=[];
                      for(var i=0;i<ss.length;i++){
                         var obj=ss[i];
                         res.push({
                           id :obj.id,
                           name:obj.name,
                           code:obj.code,
                           created:weiutils.kongzhi(weiutils.dateFormat(obj.created,1))
                         })
                      }
                          avalon.vmodels.sg2.data = res.slice(0,10);
                          var pagerInterval = setInterval(function(){
                             if (avalon.vmodels.sg2.pager.totalItems) {
                                  avalon.vmodels.sg2.pager.totalItems = AllRecords;
                                  clearInterval(pagerInterval);
                              }else{pagerInterval();}
                          },10);
                         avalon.vmodels.sg2.data = res;
                         avalon.vmodels.sg2.render();
                  }
               })
             }
        });
        diquguanliVm.getData();
        avalon.scan();
    });





































