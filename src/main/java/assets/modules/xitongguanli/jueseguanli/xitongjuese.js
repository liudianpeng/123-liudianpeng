/**
 * Created by hanxuemin on 2015/9/24.
 */
define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid","weiutils"],
    function(avalon,domReady,mmRequest,smartgrid,weiutils){
        var xitongjueseVm = avalon.define({
            $id: "systemRole",
            system:"系统管理",
            systemRole:"系统角色",
            addRole:"添加角色",
            totalItems:"",
            name:"",
            sg2Opt : {
                $skipArray : ["pager"],
                isAffix : true,
                noResult:"正在加载数据......",
                pager : {
                    totalItems:200,
                    perPages:5,
                    options : [5,10,20,50,100],
                    currentPage: 1,
                    onJump : function(e,page){
                        location.href = "#page=" + page.currentPage
                        xitongjueseVm.getData(page.currentPage);
                        console.log(page.currentPage)
                    },
                    canChangePageSize : true,
                    pageable : true,
                    dropdown : {
                        onChange : function(newValue,oldValue,vmodel){
                            avalon.log("pager dropdown")
                            avalon.log("pageSize is:" + newValue)
                            avalon.log("arguments is:")
                            avalon.log(arguments)
                            xitongjueseVm.sg2Opt.pager.perPages=newValue
                            xitongjueseVm.getData(1)
                            console.log(xitongjueseVm.getData());
                        }
                    }
                },
                 htmlHelper : {
                    edit : function(vmId, field, index, cellValue, rowData){
                        return "<b><a href='/xitongguanli/jueseguanli/edit/"+rowData.id+"'>编辑</a></b>"
                    }
                },
                columns : [
                    {
                        key : "id",
                        name : "编号",
                        sortable :true,
                        width: "262",
                        isLock : true
                    },
                    {
                        key : "role",
                        name : "角色",
                        sortable : true,
                        width: "262",
                        isLock : true,//锁死列
                        toggle: true, //显隐藏
                        format: 'upperCaseName'
                    },
                    {
                        key : "created",
                        name: "创建时间",
                        sortable: true,
                        width: "263"

                    },
                    {
                        key : "operation",
                        name : "操作",
                        width: "293",
                        format: 'edit'
                    }
                ]
            },
            getData : function(currentPage){
                var limit=xitongjueseVm.sg2Opt.pager.perPages;
                avalon.ajax({
                      type:"GET",
                      url:"/api/xitongguanli/role/list/"+currentPage+"/"+limit,
                      success:function(data){
                          var AllRecords=data.allResults;
                          var ss = [];
                          ss = data.items;
                          var res=[];
                            for(var i=0;i<ss.length;i++){
                               var obj=ss[i];
                                res.push({
                                    id :obj.id,
                                    role:obj.name,
                                    created:weiutils.dateFormat(obj.created,1)
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
            },
          //搜索
            searchData:function(){
               avalon.ajax({
                  type:"GET",
                  url:"/api/xitongguanli/role/list",
                  success:function(data){
                     var ss = [];
                     ss = data.items;
                     var AllRecords=ss.length;
                     var res=[];
                     for(var i=0;i<ss.length;i++){
                        var obj=ss[i];
                        res.push({
                           id :obj.id,
                           role:obj.name,
                           created:weiutils.dateFormat(obj.created,1)
                        })
                        avalon.vmodels.sg2.data = res.slice(0,10);
                        var pagerInterval = setInterval(function(){
                             if (avalon.vmodels.sg2.pager.totalItems) {
                                 avalon.vmodels.sg2.pager.totalItems = AllRecords;
                                 clearInterval(pagerInterval);
                             }else{pagerInterval();}
                        },10);
                        avalon.vmodels.sg2.data=res;
                        avalon.vmodels.sg2.render();
                     }
                  }
               })
            }
        });
        xitongjueseVm.$watch("name",function(v){
           console.log(v);
        })
        xitongjueseVm.getData();
        avalon.scan();
    })





































