define(["avalon","domReady!","mmRequest",
"../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid","weiutils"],
    function(avalon,domReady,mmRequest,smartgrid,weiutils){
            var xitongyonghuVm = avalon.define({
                $id: "systemUser",
                system:"系统管理",
                systemUser:"系统用户组",
                addUser:"添加用户",
                forbidUser:"禁用选中项",
                fixMiMa:"修改密码",
                txt : "请输入用户名",
                noResult:"正在加载数据......",//数据为空时表格的提示信息
                disable : true,
                changeDis : function(){
                    disable = !disable;
                },

                ////////////////////////////////////
                sgPt : {
                    $skipArray : ["pager"],
                    isAffix : true,
                    pager : {
                        onJump : function(e,data){
                            location.href = "#page=" + data.currentPage;
                            xitongyonghuVm.getData(data.currentPage);
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
                        edit : function(vmId, field, index, cellValue, rowData){
                            return "<b><a href=editUser.html>编辑</a></b>&nbsp &nbsp<b><a href=xiugaimima.html>修改密码</a></b>"
                        }
                    },
                    columns : [   //smartgrid 表格列信息对象的集合
                        {
                             key : "id",
                             name : "编号",
                             sortable :true,
                             width: '16%',
                             isLock : true
                            },
                        {
                             key : "username",
                             name : "用户名",
                             sortable : true,
                             width: '16%',
                             isLock : true,//锁死列
                             toggle: true, //显隐藏
                             format: 'upperCaseName'
                             },
                        {
                             key : "email",
                             name: "Email",
                             sortable: true,
                             width: '16%'
                              },
                        {
                             key : "realname",
                             name: "姓名",
                             sortable: true,
                             width: '16%'
                              },
                        {
                             key : "created",
                             name : "注册时间",
                             sortable : true,
                             width: '16%'
                             },
                        {
                             key : "last_login",
                             name : "最后登录时间",
                             sortable : true,
                             width: '21%'
                             }
                        ]
                    },
                    getData : function(){
                       avalon.ajax({
                       type:"GET",
                       url:"/api/xitongguanli/member/list",
                       success:function(data){
                            var ss=[];
                            ss=data.items;
                            var res=[];
                            for(var i=0;i<ss.length;i++){
                               var obj=ss[i];
                               res.push({
                                    selected:false,
                                    id:obj.id,
                                    username:obj.username,
                                    email:obj.email,
                                    realname:obj.nickname,
                                    created:weiutils.dateFormat(obj.created,1),
                                    last_login:weiutils.dateFormat(obj.modified,1)
                               })
                            }
                            avalon.vmodels.sg2.data=res;
                            avalon.vmodels.sg2.render();
                       }
                       })
                    }
            });
            xitongyonghuVm.getData();
            avalon.scan();
    });





































