define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/textbox/avalon.textbox",
        "../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid","weiutils"],
    function(avalon,domReady,mmRequest,textbox,smartgrid,weiutils){
        var tablestructVm = avalon.define({
            $id: "systemTS",
            system:"系统管理",
            TS:"数据库表结构",
            sg2Opt : {
                isAffix:true,
                noResult:"正在加载数据......",
                $skipArray :["pager"],
                pager : {
                    totalItems :200,
                    perPages :50,
                    options : [50,100,200],
                    currentPage:1,
                    onJump : function(e,data){
                        location.href = "#page=" + data.currentPage;
                        tablestructVm.getData(data.currentPage,textboxVm.inputValue);
                    },
                    canChangePageSize : true,
                    showJumper: true,
                    pageable : true,
                    //打印页面结果信息
                    dropdown : {
                    onChange : function(newValue,oldValue,vmodel){
                        avalon.log("pager dropdown")
                        avalon.log("pageSize is:" + newValue)
                        avalon.log("arguments is:")
                        avalon.log(arguments)
                        tablestructVm.sg2Opt.pager.perPages=newValue
                        tablestructVm.getData(1,textboxVm.inputValue)
                    }
                    }
                },
                columns : [
                    {
                        key : "id",
                        name : "编号",
                        width: '5.5%',
                        toggle:true,
                        resizable: true,
                        isLock : true
                    },
                    {
                        key : "table_name",
                        name : "表名称",
                        width: '15.5%',
                        isLock : true,
                        align : "left"
                    },
                    {
                        key : "fields_key_name",
                        name : "表主键名称",
                        width : '18.5%',
                        isLock : true,
                        align : "left",
                        default :""
                    },
                    {
                        key : "fields_name",
                        name : "字段名称",
                        width : '12.5%',
                        isLock : true,
                        align : "left",
                        default :""
                    },
                    {
                        key : "fields_type",
                        name : "字段类型",
                        width : '8.5%',
                        isLock : true,
                        align : "left",
                        default :""
                    },
                    {
                        key : "fields_length",
                        name : "字段长度",
                        width : '8.5%',
                        isLock : true,
                        align : "left",
                        default :""
                    },

                    {
                        key : "fields_not_null",
                        name : "是否允许空",
                        width : '8.5%',
                        format:'switchdropdown'
                    },
                    {
                        key : "fields_default",
                        name : "默认值",
                        width : '8.5%',
                        isLock : true,
                        align : "left",
                        default :""
                    },
                    {
                        key : "fields_comment",
                        name : "字段说明",
                        width : '12.5%',
                        isLock : true,
                        align : "left",
                        default :""
                    }
                ]
            },
            getData : function(page,value){
                avalon.ajax({
                    //async : false,
                    type:"GET",
                    //url:"/api/xitongguanli/tablestruct/list?limit=1",
                    url:"/api/xitongguanli/tablestruct/table/"+value+"?limit=1",
                    //根据页码显示分页数据
                    success:function(data){
                        var res=[];
                        pageSize=tablestructVm.sg2Opt.pager.perPages
                        var MinPage=1;
                        var AllRecords=data.length;
                        var MaxPage=parseInt(AllRecords/pageSize)+MinPage;
                        if(page>=MinPage&&page<=MaxPage){
                            var pps=page*pageSize;
                            if(pps>AllRecords){pps=AllRecords;}else{pps=pps;}
                            //for(var i=0;i<AllRecords;i++){ /*全部页码处理*/
                            for(var i=(page-1)*pageSize;i<pps;i++){ /*指定页码处理*/
                                var obj=data[i];
                                var pageZ=parseInt(i/pageSize)+1;
                                if(page=pageZ){
                                    res.push({
                                        id :obj.id,
                                        page :page,
                                        table_name:weiutils.kongzhi(obj.table_name),
                                        fields_key_name:weiutils.kongzhi(obj.fields_key_name),
                                        fields_name:weiutils.kongzhi(obj.fields_name),
                                        fields_type:weiutils.kongzhi(obj.fields_type),
                                        fields_length:weiutils.kongzhi(obj.fields_length),
                                        fields_not_null:weiutils.kongzhi(obj.fields_not_null),
                                        fields_default:weiutils.kongzhi(obj.fields_default),
                                        fields_comment:weiutils.kongzhi(obj.fields_comment)
                                    })
                                }
                            }
                        }else{
                            res.push({
                                id:0,
                                page:page,
                                table_name:"页码有误"
                            })
                        }
                        avalon.vmodels.sg2.data = res.slice(0,10);
                        var pagerInterval = setInterval(function(){
                            if (avalon.vmodels.sg2.pager.totalItems) {
                                avalon.vmodels.sg2.pager.totalItems = AllRecords;
                                avalon.vmodels.sg2.pager.perPages = pageSize;
                               clearInterval(pagerInterval);
                           }else{pagerInterval();}
                        },10);
                        avalon.vmodels.sg2.data = res;
                        avalon.vmodels.sg2.render();
                    }
                })
            }
        });
        var textboxVm = avalon.define({
            $id:"textbox",
            struct:"自动补全",
            inputValue:"",
            $aOpts:{
                width: 240,
                tabIndex: 1,
                adaptiveHeight: {
                    minHeight: 25,
                    maxHeight: 30
                },
                stateClass:"fontsize"
            },
            $textboxOpts:{
                adaptiveHeight: {
                    minHeight: 25,
                    maxHeight: 30
                }
            },
            suggest:true,
            suggestDisableLetter:true,
            autoTrim:true,
            autoFocus:true,
            suggestFocus:true,
            changedCallback:function(value) {
                //选择确定回车事件
                //textboxVm.inputValue = value;
                //textboxVm.getSelect(value);
                tablestructVm.getData(tablestructVm.sg2Opt.pager.currentPage,value);
            },
            getSelect:function(value){
                avalon.ajax({
                    async : false,
                    type:"GET",
                    url:"/api/xitongguanli/tablestruct/tables/"+value,
                    success:function(data){
                        listArray=[];
                        listArray=data;
                    }
                })
            }
        });
        avalon.ui["suggest"].strategies["key"] = function(value,done){
            setTimeout(function(){
                textboxVm.getSelect(value)
                var arr = value ? listArray : []
                done(arr)
            },100)
        };
        tablestructVm.getData(tablestructVm.sg2Opt.pager.currentPage,textboxVm.inputValue);
        textboxVm.getSelect(textboxVm.inputValue);
        avalon.scan();
    });