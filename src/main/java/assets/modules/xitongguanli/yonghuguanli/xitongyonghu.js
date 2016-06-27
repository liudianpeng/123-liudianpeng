define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid","../../../vendor/avalon.oniui/switchdropdown/avalon.switchdropdown",
"weiutils"],
    function(avalon,domReady,mmRequest,smartgrid,switchdropdown,weiutils){
            var xitongyonghuVm = avalon.define({
                $id: "systemUser",
                system:"系统管理",
                systemUser:"系统用户",
                addUser:"添加用户",
                forbidUser:"禁用选中项",
                fixMiMa:"修改密码",
                txt : "请输入用户名",
                username:"",
                disableUser : function(){
                    avalon.vmodels.sg.enable = false
                },
                enableUser : function(){
                    avalon.vmodels.sg.enable = true
                },
                disable : true,
                changeDis : function(){
                    disable = !disable;
                },
                sg2Opt : {
                    $skipArray : [ "dropdown" ,"switchdropdown","pager"],
                    isAffix : true,
                    noResult:"正在加载数据......",//数据为空时表格的提示信息
                    pager : {
                        totalItems :200,
                        perPages :5,
                        options : [5,10,20,50,100],
                        currentPage:1,
                        onJump : function(e,page){
                            location.href = "#page=" + page.currentPage;
                            xitongyonghuVm.getData(page.currentPage);
                        },
                        canChangePageSize : true,
//                        showJumper:true,
                        pageable : true,
                        dropdown : {
                            onChange : function(newValue,oldValue,vmodel){
                                avalon.log("pager dropdown")
                                avalon.log("pageSize is:" + newValue)
                                avalon.log("arguments is:")
                                avalon.log(arguments)
                                xitongyonghuVm.sg2Opt.pager.perPages=newValue
                                xitongyonghuVm.getData(1)
                            }
                        }
                    },
                    htmlHelper : {
                        switchdropdown:function(vmId,field,index,cellValue,rowData){
                            var openOption = cellValue == 0 ?'<option value =" 0 "selected >启用</option>' : '<option value = "0"> 启用</option>'
                                pauseOption = cellValue == 1 ?'<option value =" 0 "selected>禁用</option>' : '<option value = "1"> 禁用</option>'
                                return ['<select ms-widget="switchdropdown" rowindex="'+index+'" field="'+field+'"  vmId="'+vmId+'">',openOption, pauseOption, '</select>'].join('')
                        },

                        edit : function(vmId, field, index, cellValue, rowData){
                            return "<b><a href='/xitongguanli/yonghuguanli/edit/"+rowData.id +"'>编辑</a></b>&nbsp; &nbsp;<b><a href='/xitongguanli/yonghuguanli/password/"+rowData.id+"'>修改密码</a></b>&nbsp;&nbsp;<b><a href='/xitongguanli/yonghuguanli/setgroup/"+rowData.id+"'>设定用户组</a></b>"
                        }
                    },
                    columns : [   //smartgrid 表格列信息对象的集合
                        {
                             key : "id",
                             name : "编号",
                             sortable : true,
                             align: "center", //列的对象方式
                             toggle:false,
                              width: 105,
                             isLock : true
                            },
                        {
                             key : "username",
                             name : "用户名",
                             sortable : true,
                             width: 105,
                             align: "center", //列的对象方式
                             isLock: true,//锁死列
                             toggle:false
                             },
                        {
                             key : "email",
                             name: "Email",
                             sortable: true,
                             width: 135
                        },
                        {
                             key : "nickname",
                             name: "姓名",
                             sortable: true,
                              width: 105
                              },
                        {
                             key : "groups",
                             name : "用户组",
                             sortable : true,
                              width: 135
                             },
                        {
                             key : "status",
                             name: "状态",
                             sortable: true,
                             width: 125,
                             format:'switchdropdown'
                              },
                        {
                             key : "created",
                             name : "注册时间",
                             sortable : true,
                              width: 180
                             },
                        {
                            key : "operation",
                            name : "操作",
                            width:180,
                            format: 'edit'
                            }
                        ]
                    },
                SearchResult:function(){
                   xitongyonghuVm.Search(xitongyonghuVm.username);
                },
                getData : function(currentPage,username){
                 var limit=xitongyonghuVm.sg2Opt.pager.perPages;
                   avalon.ajax({
                      type:"GET",
                      url:"/api/xitongguanli/member/list/"+currentPage+"/"+limit,
                      success:function(data){
                         var ss = [];
                         ss = data.items;
                         var res=[];
                         var AllRecords=data.allResults;
                         for(var i=0;i<ss.length;i++){
                             var obj=ss[i];
                             var sj="";
                               for (var j = 0; j < obj.groups.length; j++) {
                                       sj += obj.groups[j].name+',';
                               }
                              res.push({
                                    id :obj.id,
                                    username : obj.username,
                                    email : obj.email,
                                    //姓名
                                    nickname : obj.nickname,
                                    //用户组
                                    groups:sj,
                                    created:weiutils.dateFormat(obj.created,1)
                                })
                             }
                             avalon.vmodels.sg.data = res.slice(0,10);
                             var pagerInterval=setInterval(function(){
                                if(avalon.vmodels.sg.pager.totalItems){
                                    avalon.vmodels.sg.pager.totalItems=AllRecords;
                                    clearInterval(pagerInterval);
                                }else{pagerInterval();}
                             },10);
                             avalon.vmodels.sg.data = res;
                             avalon.vmodels.sg.render();
                           }
                        })
                  },
                Search:function(){
                   var username=xitongyonghuVm.username;
                   avalon.ajax({
                      type:"GET",
                     //获取搜索用户名的api
                     url:"/api/xitongguanli/member/find/"+username,
                      success:function(data){
                             var res=[];
                              res.push({
                                    id :data.id,
                                    username : data.username,
                                    email : data.email,
                                    //姓名
                                    nickname : data.nickname
                                    //用户组
//                                    groups:sj,
//                                    created:weiutils.dateFormat(obj.created,1)
                                })
                             avalon.vmodels.sg.data = res.slice(0,10);
                             avalon.vmodels.sg.data = res;
                             avalon.vmodels.sg.render(res)
                      }
                   })
                }
            });
        xitongyonghuVm.getData(xitongyonghuVm.sg2Opt.pager.currentPage,xitongyonghuVm.username);
        avalon.scan();
    });





































