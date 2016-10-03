var manager;
var manager2;
var manager3;
var manager_yx;
//余刑
var manager_yux;
//罪名
var manager_lx;
//分管等级
var manager_dj;
//人员分布
var manager_fb;
//新人员分布
var manager_yrfb;
//
function addNewTabForGerenxinxi(cid){
    window.parent.wei.selectedCriminal = cid;
    window.parent.wei.selectCriminal(cid);

    window.parent.f_addTab("menu-gerenxinxi", "个人信息", "/xinxiguanli/gerenxinxi/"+cid);
}
//选择监区
$(function () {
    manager2 = $("#txtJianqu").ligerComboBox({
        onBeforeOpen: f_selectContact,
        valueFieldID: 'id',
        width: 118,
        initText: '333',
        textField: 'name',
        value: '',
        text: '',
        selectedText: '',
        autocomplete: true,
        onSelected: function (value) {
        }
    });
    manager3 = $("#txtFenjianqu").ligerComboBox({
        onBeforeOpen: f_selectFenjianqu,
        valueFieldID: 'id',
        width: 118,
        initText: '',
        textField: 'name',
        value: '',
        text: '',
        selectedText: '',
        autocomplete: true,
        onSelected: function (newvalue) {
            //alert(newvalue);
        }
    });
    //初始化监区
    $.getJSON("/api/xinxiguanli/renyuanliebiao/getjianqulist",function(res){
        var tmp=res.items;
        if(!tmp||!tmp[0]){
            alert('您不属于任何一个监区，请重新分配监区后重新登录!');
            return false;
        }
        var tmpid=tmp[0].id;
        var tmpvalue=tmp[0].name;

        manager2.selectedValue =tmpid;
        manager2.selectedText = tmpvalue;
        manager2.element.value = tmpvalue;

        //初始化分监区
        $.ajaxSettings.async = false;
        $.getJSON("/api/xinxiguanli/renyuanliebiao/getfenjianqulist/"+tmpid,function(res){
            var tmp=res.items;
            if(!tmp||!tmp[0]){
                manager3.selectedText = '';
                manager3.element.value = '';
                manager3.selectedValue = '0';
            }else{
                var tmpid=tmp[0].id;
                var tmpvalue=tmp[0].name;

                manager3.selectedValue =tmpid;
                manager3.selectedText = tmpvalue;
                manager3.element.value = tmpvalue;
            }

            jianqu();
        });

    });
});
//选择监区页
function f_selectContact() {
    $.ligerDialog.open({
        title: '选择监区', name: 'name',
        width: 310,
        height: 400,
        top:90,
        left:0,
        url: '/jibenxinxi/jianqu/select', buttons: [
            {text: '确定', onclick: f_selectContactOK},
            {text: '取消', onclick: f_selectContactCancel}
        ],
        closeWhenEnter: true
    });
    return false;
}
//确定选择监区
function f_selectContactOK(item, dialog) {
    //确定选择监区
    var fn = dialog.jiframe[0].contentWindow.f_select;
    var data = fn();
    if (!data) {
        alert('请选择行!');
        return;
    }
    manager2.selectedText = data.name;
    manager2.element.value = data.name;
    manager2.selectedValue = data.id;
    //确定监区后自动清空分监区,需要用户重新选择分监区
    $.ajaxSettings.async = false;
    //重新初始化分监区

    var jianqu_id=manager2.selectedValue;

   $.getJSON("/api/xinxiguanli/renyuanliebiao/getfenjianqulist/" + jianqu_id+"?randID="+Math.random,function (res) {
        var tmp = res.items;

            if (!tmp || !tmp[0])
        {
            manager3.selectedText = '';
            manager3.element.value = '';
            manager3.selectedValue = '0';
        }
        else
        {
            var tmpid = tmp[0].id;
            var tmpvalue = tmp[0].name;

            manager3.selectedText = tmpvalue;
            manager3.element.value = tmpvalue;
            manager3.selectedValue = tmpid;

        }

      jianqu();
       dialog.close();
    });

}
function f_selectContactCancel() {
    $.ligerDialog.hide();
}
//选择分监区页
function f_selectFenjianqu() {
    $.ligerDialog.open({
        title: '选择分监区',
        width: 310,
        height: 400,
        top:90,
        left:0,
        url: '/jibenxinxi/fenjianqu/select',
        buttons: [
            {text: '确定', onclick: f_selectFenjianquOK},
            {text: '取消', onclick: f_selectFenjianquCancel}
        ]
    });
    return false;
}
//确定选择分监区
function f_selectFenjianquOK(item,dialog) {
    var fn = dialog.jiframe[0].contentWindow.f_select;
    var data = fn();
    if (!data) {
        alert('请选择行!');
        return;
    }
    manager3.selectedText = data.name;
    manager3.element.value = data.name;
    manager3.selectedValue = data.id;
    dialog.close();
    jianqu();

}
function f_selectFenjianquCancel(item, dialog) {
    dialog.close();
}
//列表
function jianqu(jianquId, fenjianquId) {
    jianquId = manager2.selectedValue;
    fenjianquId = manager3.selectedValue;
    var Api;
   // console.log("jianquId=="+jianquId);
   // console.log("fenjianquId=="+fenjianquId);

    if ((!fenjianquId)||fenjianquId == "") {
        fenjianquId="0";

    }
    if ((!jianquId)||jianquId == "") {
        jianquId="0";

    }
    Api = '/api/xinxiguanli/zonghechaxun/' + jianquId + '/' + fenjianquId;

    ////人员列表
    //window['g'] =
    //    manager = $("#maingrid").ligerGrid({
    //        columns: [
    //            {display: '档案编号', name: 'dabh',align: 'left', minWidth: 40, width: 100, type: 'int', frozen: true},
    //            {display: '姓名', name: 'xm',align: 'left', width: 110, type: 'text', frozen: true,
    //                render:function(rowdata,value){
    //                    var nname=rowdata.xm;
    //                    var ccid = rowdata.id;
    //                    return "<a style='font-weight: 600'  href=\"javascript:addNewTabForGerenxinxi('"+ccid+"')\">"+nname+"</a>";
    //                }
    //            },
    //            {display: '出生日期', name: 'csrq',align: 'left', width: 80, type: 'date'},
    //            {display: '年龄', name: 'age',align: 'left', width: 45, type: 'int',render:age},
    //            {display: '监区', name: 'jianqu',align: 'left', width: 120, type: 'text'
    //                ,render:jianqu_fenjianqu
    //            },
    //            {
    //                display: '罪名', name: 'syzm', align: 'left',width: 250, type: 'text',
    //                render: function (rowdata) {
    //                    var len = rowdata.syzm;
    //                    if (GetLength(len) > 10) {
    //                        return "<a title='" + rowdata.syzm + "'>" + rowdata.syzm + "</a>";
    //                    } else if (GetLength(len) <= 10) {
    //                        return "<a>" + rowdata.syzm + "</a>";
    //                    }
    //                }
    //            },
    //            {display: '现刑期', name: 'xq',align: 'left', width: 80, type: 'text',
    //                render:function(rowdata){
    //                    if (!!rowdata.xq){
    //                        return get_xq(rowdata.xq);
    //                    }
    //                }
    //            },
    //            {display: '起始刑期', name: 'qr',align: 'left', width: 80, type: 'date'},
    //            {display: '终止刑期', name: 'zr',align: 'left', width: 80, type: 'date'},
    //            {display: '逮捕日期', name: 'dbrq',align: 'left', width: 80, type: 'date'},
    //            {display: '羁押日期', name: 'jyrq', align: 'left',width: 80, type: 'date'},
    //            {display: '入监日期', name: 'rjrq',align: 'left', width: 80, type: 'date'},
    //            {display: '附加刑', name: 'bznx',align: 'left', width: 150, type: 'text',
    //                render:function(rowdata){
    //                    if (!!rowdata.bznx){
    //                        return get_bznx(rowdata.bznx);
    //                    }
    //                }
    //            },
    //            {display: '分押类型', name: 'fylx',align: 'left', width: 80, type: 'text'},
    //            {display: '分管等级', name: 'manageLevel',align: 'left', width: 80, type: 'text'},
    //            {display: '案犯类别', name: 'newCriminalType', align: 'left',width: 150, type: 'text'},
    //            {display: '是否惯累犯', name: 'lgf',align: 'left', width: 100, type: 'text'},
    //            //{display: '逮捕地点', name: 'dbmx', align: 'left',width: 150, type: 'text'},
    //            {display: '逮捕机关', name: 'dbmx', align: 'left',width: 250, type: 'text',
    //                render:function(rowdata){
    //                    if (!!rowdata.dbmx){
    //                        return rowdata.dbqh+rowdata.dbmx
    //                    }else {
    //                        return rowdata.dbqh;
    //                    }
    //                }
    //
    //            },
    //            {display: '判决地点', name: 'ysqh', align: 'left',width: 150, type: 'text'},
    //            {display: '判决机关', name: 'ysmx', align: 'left',width: 250, type: 'text',
    //                render : function(rowdata){
    //                    if (!!rowdata.ysmx ){
    //                        return rowdata.ysqh+rowdata.ysmx
    //                    }else {
    //                        return rowdata.ysqh
    //                    }
    //
    //                }
    //
    //            },
    //            //{display: '判决字号', name: 'yssm', align: 'left',width: 150, type: 'text'},//先不显示
    //            //{display: '犯罪事实', name: 'fzss', width: 160, type: 'text'},
    //            //{display: '三涉', name: 'sddj', align: 'left',width: 50, type: 'text'},
    //            //{display: '四史', name: 'ssdj', align: 'left',width: 50, type: 'text'},
    //            {display: '婚姻状况', name: 'marialStatus',align: 'left', width: 50, type: 'text'},
    //            {display: '学历', name: 'newEdu',align: 'left', width: 100, type: 'text'},
    //            {display: '籍贯', name: 'jgqh',align: 'left', width: 150, type: 'text'},
    //            {display: '家庭地址', name: 'jtmx',align: 'left', width: 200, type: 'text'}
    //        ],
    //        checkbox: true,
    //        isSingleCheck: true,
    //        colDraggable: true,
    //        alternatingRow:true,
    //        pageSizeOptions: [100,150,200],
    //        height: '69%',
    //        width: '100%',
    //        pageSize:100,
    //        fixedCellHeight: false,
    //        record: 'total',
    //        usePager: true,        //服务器分页
    //        scroll: true,
    //        frozen: true,
    //        scrollToPage: false,
    //        scrollToAppend: false,
    //        url: Api,
    //        //url: '/api/xinxi/xinxiguanli/getbyjianqu/6037',
    //        dataAction: 'server', //服务器处理
    //        root: 'items',
    //        headerRowHeight:25,
    //        method: 'post',
    //        async: true,
    //        pagesizeParmName: 'limit',
    //        switchPageSizeApplyComboBox: true,
    //        selectRowButtonOnly: false,
    //        whenRClickToSelect: true,
    //
    //
    //        onBeforeShowData: function () {
    //            jianquId = $("#hidJianquID").val();
    //            //console.log(jianquId + "---------1-------------");
    //        },
    //        onAfterShowdata: function () {
    //        },
    //        onSelectRow: function (rowdata) {
    //            window.parent.wei.selectedCriminal = rowdata.id;
    //            window.parent.wei.selectCriminal(rowdata.id);
    //            //  var w= window.parent.wei;
    //            //  $.ajaxSetup({ async: false});//设置成同步
    //            //这里获取的数据，如果wei.top.js中对应函数注释则人员信息显示错误
    //            $.getJSON("/api/xinxi/gerenxinxi/" + rowdata.id, null, function (res) {
    //                var html = "当前犯人：" + res.xm + " | 档案编号：" + res.dabh + "  | 监区：" + res.jianqu.name;
    //                if ("fenjianqu" in res && null !== res.fenjianqu) {
    //                    html = html + " | 分监区：" + res.fenjianqu.name;
    //                }
    //                $('#wei-info-bar').html(html);
    //
    //                // w.selectCriminalData(res);
    //
    //            });
    //        },
    //        onUnSelectRow: function () {
    //            window.parent.wei.selectedCriminal = null;
    //            window.parent.wei.deselectCriminal();
    //            $('#wei-info-bar').html("");
    //        },
    //        onDblClickRow: function (rowdata, rowindex, rowobj) {
    //            //新页签打开人员基本信息
    //            var name = rowdata.xm;
    //            var cid = rowdata.id;
    //            window.parent.wei.selectedCriminal = cid;
    //            window.parent.wei.selectCriminal(cid);
    //            //alert(name);
    //            //alert(cid);
    //            return window.parent.f_addTab("menu-gerenxinxi", "个人信息", "/xinxiguanli/gerenxinxi/"+cid)
    //        }
    //    });

    ////添加年龄一列
    //function age(rowdata){
    //    var csrq=rowdata.csrq;
    //    if(csrq.length==8){
    //        var str_date=csrq.substr(0,4)+"-"+csrq.substr(4,2)+"-"+csrq.substr(6,2)
    //        return str_date
    //    }
    //    var date = new Date(csrq);
    //    //console.log(date)
    //    var myyear=date.getFullYear();
    //    //console.log(myyear)
    //    var thisDate = new Date();
    //    //console.log(thisDate)
    //    var thisyear=thisDate.getFullYear();
    //    //console.log(thisyear)
    //    var age=thisyear-myyear;
    //    return age+"岁";
    //
    //}
    //获取监区
    function jianqu_fenjianqu(rowdata) {
        if(rowdata.jianqu==""||rowdata.jianqu==null||rowdata.jianqu==undefined){
            return ""
        }else if(rowdata.fenjianqu==""||rowdata.fenjianqu==null||rowdata.fenjianqu==undefined){
            return rowdata.jianqu;
        }else {
            return rowdata.jianqu+':'+rowdata.fenjianqu;
        }
        //return null === rowdata.jianqu||''===rowdata.jianqu||undefined ===rowdata.jianqu ?rowdata.fenjianqu:rowdata.jianqu;
            //var len = rowdata.jianqu+':'+rowdata.fenjianqu;
            //if (GetLength(len) > 14) {
            //    return "<a title='" + len + "'>" + len + "</a>";
            //} else if (GetLength(len) <= 14) {
            //    return "<a>" + len + "</a>";
            //}
        //var jianqu = null === rowdata.jianqu||''===rowdata.jianqu||undefined ===rowdata.jianqu ?"":rowdata.jianqu;
        //var fenjianqu = null === rowdata.fenjianqu||''===rowdata.fenjianqu||undefined ===rowdata.fenjianqu ?"":rowdata.fenjianqu;
        //return null === fenjianqu||''===fenjianqu||undefined ===fenjianqu ?jianqu:jianqu+":"+fenjianqu;

    }
    //人员分布统计注：人员分布未完善@TODO
    //新加人员分布
    window['new_renyuafenbu'] =
        manager_yrfb = $("#maingrid__newyrfb").ligerGrid({
                columns: [
                    {display: '狱内人员', name: 'f_GroupName', width: 110, align: 'left',frozen: true},
                    {display: '干警',  name: 'police_nei', width: 80},
                    {display: '工人', name: 'worker_nei', width: 95},
                    {display: '外工', name: 'out_nei', width: 55, align: 'center'},
                    {display: '犯人', columns: [
                        {display: '出工', name: 'zrs', width: 54},
                        {display: '监舍', name: 'shqldrs', width: 54},
                        {display: '其他', name: 'other', width: 54},
                        {display: '总数', name: 'shqhjrs', width: 64}
                    ]
                    }
                ],
                checkbox: false,
                isSingleCheck: true,
                alternatingRow:true,
                pageSizeOptions: [10, 20, 50, 100],
                width: '100%',
                height:177,
                pageSize: 20,
                fixedCellHeight: false,
                record: 'total',
                url: '/api/welcome/criminal_fenbu/total',
                //data: fu_data,
                headerRowHeight:23,
                //dataAction: 'server', //服务器处理
                root: 'items',
                usePager: false,       //服务器分页
                method: 'get',
                pagesizeParmName: 'limit',
                switchPageSizeApplyComboBox: true
        });
    window['g_ryfbtj'] =
        manager_fb = $('#maingrid_ryfbtj').ligerGrid({
            columns: [
                {display: '单位', name: 'f_GroupName', width: 110, align: 'left',frozen: true},
                {display: '干警', columns: [
                    {display: '内', name: 'police_nei', width: 40,
                        render: function (rowdata) {

                            var count = rowdata.police_nei;
                            var r=parseInt(count);
                            if(r>0){
                                var findBy=37;
                                var f_GroupID=rowdata.f_GroupID;
                                 return "<a href='javascript:ganjingnei("+f_GroupID+","+findBy+");' style='color:blue;font-weight: 600'>" + count + "</a>"

                            }else{
                                return "<b style='color:red;font-weight: 600'>" + count + "</b>"

                            }
                        }

                    },
                    {display: '总数', name: 'policeall', width: 40}
                    ]
                },
                {display: '工人', columns: [
                    {display: '内', name: 'worker_nei', width: 42,

                        render: function (rowdata) {
                            var count = rowdata.worker_nei;
                            var r=parseInt(count);
                            if(r>0){
                                var f_GroupID=rowdata.f_GroupID;
                                var findBy=44;
                                 return "<a href='javascript:gongrennei("+f_GroupID+","+findBy+");' style='color:blue;font-weight: 600'>" + count + "</a>"

                            }else{
                                return "<b  style='color:red;font-weight: 600'>" + count + "</b>"

                            }
                        }
                    },
                    {display: '总数', name: 'workerall', width: 55}]},
                {display: '外工', columns:[
                    {display:'内', name: 'out_nei', width: 55, align: 'center',
                    render: function (rowdata) {
                        var count = rowdata.out_nei;
                        var r=parseInt(count);
                        if(r>0){
                            var f_GroupID=rowdata.f_GroupID;
                            var findBy=55;
                            return "<a href='javascript:waigongnei("+f_GroupID+","+findBy+");' style='color:blue;font-weight: 600'>" + count + "</a>"

                        }else{
                            return "<b style='color:red;font-weight: 600'>" + count + "</b>"

                        }
                    }
                }]},
                {display: '犯人', columns: [
                            {display: '出工', name: 'zrs', width: 50,
                                render: function (rowdata) {
                                    var count = rowdata.zrs;
                                    if(!!count){
                                        var r=parseInt(count);
                                        if(r>0){
                                            return "<b style='color:#000000;font-weight: 600'>" + count + "</b>"
                                        }else{
                                            return "<b style='color:red;font-weight: 600'>" + count + "</b>"

                                        }
                                    }

                                }
                            },
                            {display: '监舍', name: 'shqldrs', width: 50,
                                render: function (rowdata) {
                                    var count = rowdata.shqldrs;
                                    if(!!count){
                                        var r=parseInt(count);
                                        if(r>0){
                                            return "<b style='color:#000000;font-weight: 600'>" + count + "</b>"
                                        }else{
                                            return "<b style='color:red;font-weight: 600'>" + count + "</b>"

                                        }
                                    }


                                }
                            },
                            {display: '其他', name: 'other', width: 50,
                                render: function (rowdata) {
                                    var count = rowdata.other;
                                    if(!!count){
                                        var r=parseInt(count);
                                        if(r>0){
                                            var f_GroupID=rowdata.bm;

                                            return "<a href='javascript:qita("+f_GroupID+");' style='color:blue;font-weight: 600'>" + count + "</a>"

                                        }else{
                                            return "<b style='font-weight: 600'>" + count + "</b>"

                                        }
                                    }

                                }
                            },
                    {display: '总数', name: 'shqhjrs', width: 60}
                    ]
                }
            ],
            checkbox: false,
            isSingleCheck: true,
            pageSizeOptions: [10, 20, 50, 100],
            width: '100%',
            //height:234,
            height:'104%',
            inWindow:true,
            pageSize: 20,
            fixedCellHeight: false,
            record: 'total',
            url: 'api/welcome/renyuanfenbu_total',
            //data: fu_data,
            headerRowHeight:23,
            //dataAction: 'server', //服务器处理
            root: 'items',
            usePager: false,       //服务器分页
            alternatingRow: true,
            method: 'get',
            pagesizeParmName: 'limit',
            switchPageSizeApplyComboBox: true
        });
    //余刑--api未套用@TODO
    var yuxingApi;
    var jianqu_parameter;
    var fenjianqu_parameter;
    if (fenjianquId == "") {
        fenjianqu_parameter="0";
    }else
        fenjianqu_parameter=fenjianquId;
    if(jianquId==""){
        jianqu_parameter="0";
    }else
        jianqu_parameter=jianquId;

    yuxingApi = '/api/xinxiguanli/welcome/statistics/yuxing/' + jianqu_parameter+"/"+fenjianqu_parameter;
    window['g_yx'] =
        manager_yux = $("#maingrid_yx").ligerGrid({
                columns: [
                    {display: '余刑', name: 'name', width:50,minWidth:40, align: 'left',
                        render: function (rowdata) {
                            var name = rowdata.name;
                            if(name=="0年")
                            return "今天";
                            else
                            return name;
                        }
                    },
                    {display: '人数', name: 'equal', width:40,minWidth:40, align: 'left',
                        render: function (rowdata) {
                            var count = rowdata.equal;
                            var findBy=rowdata.findBy;
                            if(findBy==="total")
                            {
                                return count;
                            } else  if(findBy==="expire"){
                                findBy=-2;
                            }
                            return "<a href='javascript:findByYuxingEqual("+jianqu_parameter+","+fenjianqu_parameter+","+findBy+");' style='color:blue;font-weight: 600'>" + count + "</a>"
                        }
                    },

                    {
                        display: '以内', name: 'counts', width: 58,minWidth:58, align: 'left',
                        render: function (rowdata) {
                            var count = rowdata.counts;
                            var findBy=rowdata.findBy;

                            if(findBy==="total")
                            {
                                return count;
                            } else  if(findBy==="expire"){
                                findBy=-2;
                            }

                            return "<a href='javascript:findByYuxing("+jianqu_parameter+","+fenjianqu_parameter+","+findBy+");' style='color:blue;font-weight: 600'>" + count + "</a>"
                        }
                    }
                ],
                checkbox: false,
                isSingleCheck: true,
                pageSizeOptions: [5, 10, 20, 50, 100],
                width: '99%',
                //height:470,
                height:'104%',
            inWindow:true,
            pageSize: 5,
                fixedCellHight: false,
                record: 'total',
                //data: yuxing_data,
                url: yuxingApi,
                 headerRowHeight:25,
                 dataAction: 'server', //服务器处理
                root: 'items',
                usePager: false,       //服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                switchPageSizeApplyComboBox: true,
                onBeforeShowData: function (data) {
                    data=data.items;
                    var pre=0;
                    $.each(data, function (idx, obj) {
                        var oldCounts=obj.counts;
                        var count=parseInt(obj.counts);
                        var findBy=obj.findBy;
                        if(findBy==="9995"||findBy==="9996"||findBy==="9997"||findBy==="total"||findBy==="expire"){
                            obj.equal=oldCounts;
                        }else{
                            obj.equal=(count-pre)+"";
                            pre=count;
                        }


                    });


                }
            }
        );

    var yuanxingApi;
    yuanxingApi = '/api/xinxiguanli/welcome/statistics/yuanxing/' + jianqu_parameter+"/"+fenjianqu_parameter;
    //原刑  排序由小到大@TODO
    window['g_yxq'] =
        manager_yx = $("#maingrid_yxq").ligerGrid({
                columns: [
                    {display: '原刑', name: 'name', width: 45, align: 'left'},
                    {display: '人数', name: 'equal', width:40,minWidth:40, align: 'left',
                        render: function (rowdata) {
                            var count = rowdata.equal;
                            var findBy=rowdata.findBy;
                            if(findBy==="total"){
                                return count;
                            }
                            return "<a href='javascript:findByYuanxingEqual("+jianqu_parameter+","+fenjianqu_parameter+","+findBy+");' style='color:blue;font-weight: 600'>" + count + "</a>"
                        }
                    },
                    {
                        display: '以内', name: 'counts', width: 60, align: 'left',
                        render: function (rowdata) {
                            var count = rowdata.counts;
                            var findBy=rowdata.findBy;
                            if(findBy==="total"){
                                return count;
                            }
                            return "<a href='javascript:findByYuanxing("+jianqu_parameter+","+fenjianqu_parameter+","+findBy+");' style='color:blue;font-weight: 600'>" + count + "</a>"
                        }
                    }
                ],
                checkbox: false,
                isSingleCheck: true,
                pageSizeOptions: [10, 20, 50, 100],
                width: '98%',
                //height:470,
            height:'104%',
            inWindow:true,
                pageSize: 5,
                fixedCellHeight: false,
                record: 'total',
                url: yuanxingApi,
                headerRowHeight:25,
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: false,       //服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                switchPageSizeApplyComboBox: true,
                onBeforeShowData: function (data) {
                        data=data.items;
                        var pre=0;
                        $.each(data, function (idx, obj) {
                            var oldCounts=obj.counts;
                            var count=parseInt(obj.counts);
                            var findBy=obj.findBy;
                            if(findBy==="9995"||findBy==="9996"||findBy==="9997"||findBy==="total"){
                                obj.equal=oldCounts;
                            }else{
                                obj.equal=(count-pre)+"";
                                pre=count;
                            }
                        });
                }
            }
        );
    var fenyaleixingApi;
    fenyaleixingApi = '/api/xinxiguanli/welcome/statistics/fenyaleixing/' + jianqu_parameter+"/"+fenjianqu_parameter;

    //分押类型  罪名  排序默认拼音首字母，由用户配置显示顺序@TODO
    window['g_lx'] =
        manager_lx = $("#maingrid_lx").ligerGrid({
                columns: [
                    {display: '类型', name: 'name', width: 77, align: 'left',
                        render:function(rowdata){
                            return "<a title='"+rowdata.name+"'>"+rowdata.name+"</a>"
                        }
                    },
                    //href=\"javascript:addNewTabForGerenxinxi('"+ccid+"')\"
                    {
                        display: '人数', name: 'counts', width: 70, align: 'left',
                        render: function (rowdata) {
                            var count = rowdata.counts;
                            var findBy=rowdata.findBy;

                            if(findBy=='-1')
                                return count;
                            else{
                                if(findBy=='')
                                {
                                    findBy='0';
                                }
                                return "<a href='javascript:findByFenyaleixing("+jianqu_parameter+","+fenjianqu_parameter+",\""+findBy+"\");' style='color:blue;font-weight: 600'>" + count + "</a>"

                            }


                        }
                    }
                ],
                checkbox: false,
                isSingleCheck: true,
                pageSizeOptions: [5, 10, 20, 50, 100],
                width: '98%',
                //height:470,
            height:'104%',
            inWindow:true,
                pageSize: 5,
                fixedCellHeight: true,
                record: 'total',
                url: fenyaleixingApi,
                dataAction: 'server', //服务器处理
                root: 'items',
                headerRowHeight:25,
                usePager: false,       //服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                switchPageSizeApplyComboBox: true
            }
        );

    var fenguandengjiApi;
    fenguandengjiApi = '/api/xinxiguanli/welcome/statistics/fenguandengji/' + jianqu_parameter+"/"+fenjianqu_parameter;

    //分管等级  排序由轻到重@TODO
    window['g_dj'] =
        manager_dj = $("#maingrid_dj").ligerGrid({
                columns: [
                    {display: '级别', name: 'name', width: 90, align: 'left'},
                    {
                        display: '人数', name: 'counts', width: 63, align: 'left',
                        render: function (rowdata) {
                            var count = rowdata.counts;
                            var findBy=rowdata.findBy;
                            if(findBy=='-1')
                                return count;
                            else
                                return "<a href='javascript:findByManagerevel("+jianqu_parameter+","+fenjianqu_parameter+","+findBy+");' style='color:blue;font-weight: 600'>" + count + "</a>"
                        }
                    }
                ],
                checkbox: false,
                isSingleCheck: true,
                pageSizeOptions: [5, 10, 20, 50, 100],
                width: '98%',
                //height:667,
            height:'104%',
            inWindow:true,
                headerRowHeight:25,
                pageSize: 5,
                fixedCellHeight: false,
                record: 'total',
                url: fenguandengjiApi,
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: false,       //服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                switchPageSizeApplyComboBox: true
            }
        );
}
//选择事件
function getSelected() {
    var manager = $("#maingrid").ligerGrid();
    var row = manager.getSelectedRow();
    if (!row) {
        alert('请选择行');
        return;
    }
    var str = "";
    $(row).each(function () {
        str = this.id;
    });
    alert('选择的是' + str);
}
//刷新
function reload() {
    manager.reload(1);
}
//人员干警分布
function ganjingnei(jianqu_parameter,position){
    $.ligerDialog.open({
        width: 550,
        height: 400,
        title: '监区内干警明细',
        url: '/welcome/renyuan/ganjing/nei',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false,
        data: {
            jianquId: jianqu_parameter,
            position: position
            //ganjingnei:,
        },
        buttons: [
            {text: '关闭', onclick: f_selectContactCancel}
        ]
    })
}
//
function gongrennei(jianqu_parameter,position){
    $.ligerDialog.open({
        width: 550,
        height: 400,
        title: '监区内工人明细',
        url: '/welcome/renyuan/gongrennei/nei',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false,
        data: {
            jianquId: jianqu_parameter,
            position: position
            //ganjingnei:,
        },
        buttons: [
            {text: '关闭', onclick: f_selectContactCancel}
        ]
    })
}
function waigongnei(jianqu_parameter,position){
    $.ligerDialog.open({
        width: 550,
        height: 400,
        title: '监区外工明细',
        url: '/welcome/renyuan/waigongnei/nei',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false,
        data: {
            jianquId: jianqu_parameter,
            position: position
            //ganjingnei:,
        },
        buttons: [
            {text: '关闭', onclick: f_selectContactCancel}
        ]
    })
}
function qita(jianqu_parameter){
    $.ligerDialog.open({
        width: 1150,
        height: 300,
        title: '监区内部犯人分布明细',
        url: '/welcome/renyuan/qita/nei',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false,
        data: {
            jianquId: jianqu_parameter
            //ganjingnei:,
        },
        buttons: [
            {text: '关闭', onclick: f_selectContactCancel}
        ]
    })
}
//余刑人员明细 按照年数比较，不是按照以内的年数
function findByYuxingEqual(jianqu_parameter,fenjianqu_parameter,yuxingYear){

    $.ligerDialog.open({
        width: 660,
        height: 400,
        title: '余刑人员明细',
        url: '/welcome/yuxing',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false,
        data: {
            jianquId: jianqu_parameter,
            fenjianquId: fenjianqu_parameter,
            yuxingYear: yuxingYear,
            operator:'equal'
        },
        buttons: [

            {text: '关闭', onclick: f_selectContactCancel}
        ]
    })

}
//余刑人员明细
function findByYuxing(jianqu_parameter,fenjianqu_parameter,yuxingYear){

    $.ligerDialog.open({
        width: 660,
        height: 400,
        title: '余刑人员明细',
        url: '/welcome/yuxing',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false,
        data: {
            jianquId: jianqu_parameter,
            fenjianquId: fenjianqu_parameter,
            yuxingYear: yuxingYear
        },
        buttons: [

            {text: '关闭', onclick: f_selectContactCancel}
        ]
    })

}
//原刑人员明细 按照年数比较，不是按照以内的年数
function findByYuanxingEqual(jianqu_parameter,fenjianqu_parameter,yuanxingYear){
    $.ligerDialog.open({
        width: 660,
        height: 400,
        title: '原刑人员明细',
        url: '/welcome/yuanxing',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false,
        data: {
            jianquId: jianqu_parameter,
            fenjianquId: fenjianqu_parameter,
            yuanxingYear: yuanxingYear,
            operator:'equal'
        },
        buttons: [

            {text: '关闭', onclick: f_selectContactCancel}
        ]
    })
}
//原刑人员明细
function findByYuanxing(jianqu_parameter,fenjianqu_parameter,yuanxingYear){
    $.ligerDialog.open({
        width: 660,
        height: 400,
        title: '原刑人员明细',
        url: '/welcome/yuanxing',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false,
        data: {
            jianquId: jianqu_parameter,
            fenjianquId: fenjianqu_parameter,
            yuanxingYear: yuanxingYear
        },
        buttons: [

            {text: '关闭', onclick: f_selectContactCancel}
        ]
    })
}
//分押类型
function findByFenyaleixing(jianqu_parameter,fenjianqu_parameter,fenyaleixing){

    $.ligerDialog.open({
        width: 660,
        height: 400,
        title: '分押类型人员明细',
        url: '/welcome/fenyaleixing',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false,
        data: {
            jianquId: jianqu_parameter,
            fenjianquId: fenjianqu_parameter,
            fenyaleixing: fenyaleixing
        },
        buttons: [

            {text: '关闭', onclick: f_selectContactCancel}
        ]
    })


}
//分管等级类型
function findByManagerevel(jianqu_parameter,fenjianqu_parameter,managerevel){

    $.ligerDialog.open({
        width: 660,
        height: 400,
        title: '分管等级人员明细',
        url: '/welcome/fenguandengji',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false,
        data: {
            jianquId: jianqu_parameter,
            fenjianquId: fenjianqu_parameter,
            managerevel: managerevel
        },
        buttons: [
            
            {text: '关闭', onclick: f_selectContactCancel}
        ]
    })
}
function f_search()
{
    manager.options.data = $.extend(true, {},manager.options.data);
    manager.loadData(f_getWhere());
}
function f_getWhere()
{
    if (!manager) return null;
    var clause = function (rowdata, rowindex)
    {
        var key = $("#txtKey").val();
        return rowdata.xm.indexOf(key) > -1;
    };
    return clause;
}
function itemclick()
{
    manager.options.data = $.extend(true,{}, manager.options.data);
    manager.showFilter();
}
//隐藏
//$(function(){
//  $("#welcome_toggle").click(function(){
//     $("#welcom_img_href").toggle(1000);
//  })
//});
//搜索
function submitForm(){
    var jianquId = manager2.selectedValue;
    //alert(jianquId+"1")
    var fenjianquId = manager3.selectedValue;
    //alert(fenjianquId+"2")
    var name=$("#seaName").val();
    //alert(name+"3");
    var jm=$("#seaJm").val();
    //alert(jm+"4");
    var jg=$("#seaJg").val();
    //alert(jg+"5")
    var api = '/api/xinxiguanli/zonghechaxun/' + jianquId + '/' + fenjianquId;
    manager.setParm("xm",name);
    manager.setParm("jm",jm);
    manager.setParm("jg",jg);
    manager.set("url",api);
}
//高级查询
function gaojichaxun(){
    $.ligerDialog.open({
        height: 360,
        width: 700,
        title: '高级查询',
        url: '/api/xinxiguanli/gaojichaxun',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false
    })
};
//减刑报表
function jianxingbaobiao(){
    var jianquId = manager2.selectedValue;
    var fenjianquId = manager3.selectedValue;
    if ((!fenjianquId)||fenjianquId == "") {
        fenjianquId="0";

    }
    if ((!jianquId)||jianquId == "") {
        jianquId="0";

    }
    $.ligerDialog.open({
        //width: 1150,
        width: 900,
        height: 400,
        title: '减刑报表',
        url: '/api/xinxiguanli/jianxingbaobiao',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false,
        data: {
            jianquId: jianquId,
            fenjianquId: fenjianquId
        },
        buttons: [

            {text: '关闭', onclick: f_selectContactCancel}
        ]
    })

}
//utils部分
//回车事件
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==27){ // 按 Esc
        //要做的事情
    }
    if(e && e.keyCode==113){ // 按 F2
        //要做的事情
    }
    if(e && e.keyCode==13){ // enter 键
        //要做的事情
        //alert("2222")
        submitForm();
    }
};
//
var GetLength = function (str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};
////placeholder在IE8中兼容性问题解决
//注意：添加此段会影响查询
//$(function(){
//    if( !('placeholder' in document.createElement('input')) ){
//
//        $('input[placeholder],textarea[placeholder]').each(function(){
//            var that = $(this),
//                text= that.attr('placeholder');
//            if(that.val()===""){
//                that.val(text).addClass('placeholder');
//            }
//            that.focus(function(){
//                    if(that.val()===text){
//                        that.val("").removeClass('placeholder');
//                    }
//                })
//                .blur(function(){
//                    if(that.val()===""){
//                        that.val(text).addClass('placeholder');
//                    }
//                })
//                .closest('form').submit(function(){
//                if(that.val() === text){
//                    that.val('');
//                }
//            });
//        });
//    }
//})






