var manager;
var manager2;
var manager3;
//选择监区
$(function () {
    manager2 = $("#txtJianqu").ligerComboBox({
        onBeforeOpen: f_selectContact,
        valueFieldID: 'id',
        width: 115,
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
        width: 115,
        initText: '',
        textField: 'name',
        value: '',
        text: '',
        selectedText: '',
        autocomplete: true,
        onSelected: function (newvalue) {
            alert(newvalue);
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
        //重新初始化分监区
        $.getJSON("/api/xinxiguanli/renyuanliebiao/getfenjianqulist/"+tmpid,{random:Math.random()},function(res) {
            var tmp = res.items;
            if (!tmp || !tmp[0]) {
                manager3.selectedText = '';
                manager3.element.value = '';
                manager3.selectedValue = '0';
            } else {
                var tmpid = tmp[0].id;
                var tmpvalue = tmp[0].name;

                manager3.selectedValue = tmpid;
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
        title: '请选择监区', name: 'name',
        width: 310,
        height: 400,
        top:35,
        left:0,
        url: '/jibenxinxi/jianqu/select', buttons: [
            {text: '确定', onclick: f_selectJianquOK},
            {text: '取消', onclick: f_selectJianquCancel}
        ],
        closeWhenEnter: true
    });
    return false;
}
//确定选择监区
function f_selectJianquOK(item, dialog) {
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
    //重新初始化分监区
    var jianqu_id=manager2.selectedValue;
    $.ajaxSettings.async = false;
    $.getJSON("/api/xinxiguanli/renyuanliebiao/getfenjianqulist/" + jianqu_id+"?randID="+Math.random(),function (res) {
        var tmp = res.items;

        if
        (!tmp || !tmp[0])
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
function f_selectJianquCancel(item, dialog) {
    dialog.close();
}
//选择分监区页
function f_selectFenjianqu() {
    $.ligerDialog.open({
        title: '请选择分监区',
        width: 310,
        height: 400,
        top:35,
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
function f_selectFenjianquOK(item, dialog) {
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
function f_selectContactCancel() {
    $.ligerDialog.hide();
}

//人员列表
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

    //人员列表
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                    columns: [
                        {display: '档案编号', name: 'dabh',align: 'left', minWidth: 60, width: 100, type: 'int', frozen: true},
                        {display: '姓名', name: 'xm',align: 'left', width: 110, type: 'text', frozen: true,
                            render:function(rowdata,value){
                                var nname=rowdata.xm;
                                var ccid = rowdata.id;
                                return "<a style='font-weight: 600'  href=\"javascript:addNewTabForGerenxinxi('"+ccid+"')\">"+nname+"</a>";
                            }
                        },
                        {display: '出生日期', name: 'csrq',align: 'left', width: 80, type: 'date'},
                        {display: '年龄', name: 'age',align: 'left', width: 45, type: 'int',render:age},
                        {display: '监区', name: 'jianqu',align: 'left', width: 150, type: 'text'
                            ,render:jianqu_fenjianqu
                        },
                        {
                            display: '罪名', name: 'syzm', align: 'left',width: 250, type: 'text',
                            render: function (rowdata) {
                                var len = rowdata.syzm;
                                if (GetLength(len) > 10) {
                                    return "<a title='" + rowdata.syzm + "'>" + rowdata.syzm + "</a>";
                                } else if (GetLength(len) <= 10) {
                                    return "<a>" + rowdata.syzm + "</a>";
                                }
                            }
                        },
                        {display: '现刑期', name: 'xq',align: 'left', width: 80, type: 'text',
                            render:function(rowdata){
                                if (!!rowdata.xq){
                                    return get_xq(rowdata.xq);
                                }
                            }
                        },
                        {display: '起始刑期', name: 'qr',align: 'left', width: 80, type: 'date'},
                        {display: '终止刑期', name: 'zr',align: 'left', width: 80, type: 'date'},
                        {display: '逮捕日期', name: 'dbrq',align: 'left', width: 80, type: 'date'},
                        {display: '羁押日期', name: 'jyrq', align: 'left',width: 80, type: 'date'},
                        {display: '入监日期', name: 'rjrq',align: 'left', width: 80, type: 'date'},
                        {display: '剥政年限', name: 'bznx',align: 'left', width: 150, type: 'text',
                            render:function(rowdata){
                                if (!!rowdata.bznx){
                                    return get_bznx(rowdata.bznx);
                                }
                            }
                        },
                        {display: '分押类型', name: 'fylx',align: 'left', width: 80, type: 'text'},
                        {display: '分管等级', name: 'manageLevel',align: 'left', width: 80, type: 'text'},
                        {display: '案犯类别', name: 'newCriminalType', align: 'left',width: 150, type: 'text'},
                        {display: '是否惯累犯', name: 'lgf',align: 'left', width: 100, type: 'text'},
                        //{display: '逮捕地点', name: 'dbmx', align: 'left',width: 150, type: 'text'},
                        {display: '逮捕机关', name: 'dbmx', align: 'left',width: 250, type: 'text',
                            render:function(rowdata){
                                if (!!rowdata.dbmx){
                                    return rowdata.dbqh+rowdata.dbmx
                                }else {
                                    return rowdata.dbqh;
                                }
                            }

                        },
                        {display: '判决地点', name: 'ysqh', align: 'left',width: 150, type: 'text'},
                        {display: '判决机关', name: 'ysmx', align: 'left',width: 250, type: 'text',
                            render : function(rowdata){
                                if (!!rowdata.ysmx ){
                                    return rowdata.ysqh+rowdata.ysmx
                                }else {
                                    return rowdata.ysqh
                                }

                            }

                        },
                        //{display: '判决字号', name: 'yssm', align: 'left',width: 150, type: 'text'},//先不显示
                        //{display: '犯罪事实', name: 'fzss', width: 160, type: 'text'},
                        //{display: '三涉', name: 'sddj', align: 'left',width: 50, type: 'text'},
                        //{display: '四史', name: 'ssdj', align: 'left',width: 50, type: 'text'},
                        {display: '婚姻状况', name: 'marialStatus',align: 'left', width: 50, type: 'text'},
                        {display: '学历', name: 'newEdu',align: 'left', width: 100, type: 'text'},
                        {display: '籍贯', name: 'jgqh',align: 'left', width: 150, type: 'text'},
                        {display: '家庭地址', name: 'jtmx',align: 'left', width: 230, type: 'text'}
                    ],
            checkbox: true,
            isSingleCheck: true,
            colDraggable: true,
            pageSizeOptions: [100,150,200],
            height: '97%',
            width: '100%',
            pageSize:100,
            fixedCellHeight: false,
            record: 'total',
            usePager: true,        //服务器分页
            scroll: true,
            frozen: true,
            scrollToPage: false,
            scrollToAppend: false,
            url: Api,
            //url: '/api/xinxi/xinxiguanli/getbyjianqu/6037',
            dataAction: 'server', //服务器处理
            root: 'items',
            headerRowHeight:25,
            alternatingRow: true,
            method: 'post',
            async: true,
            pagesizeParmName: 'limit',
            switchPageSizeApplyComboBox: true,
            selectRowButtonOnly: false,
            whenRClickToSelect: true,


            onBeforeShowData: function () {
                jianquId = $("#hidJianquID").val();
                //console.log(jianquId + "---------1-------------");
            },
            onAfterShowdata: function () {
            },
            onSelectRow: function (rowdata) {
                window.parent.wei.selectedCriminal = rowdata.id;
                window.parent.wei.selectCriminal(rowdata.id);
                //  var w= window.parent.wei;
                //  $.ajaxSetup({ async: false});//设置成同步
                //这里获取的数据，如果wei.top.js中对应函数注释则人员信息显示错误
                $.getJSON("/api/xinxi/gerenxinxi/" + rowdata.id, null, function (res) {
                    var html = "当前犯人：" + res.xm + " | 档案编号：" + res.dabh + "  | 监区：" + res.jianqu.name;
                    if ("fenjianqu" in res && null !== res.fenjianqu) {
                        html = html + " | 分监区：" + res.fenjianqu.name;
                    }
                    $('#wei-info-bar').html(html);

                    // w.selectCriminalData(res);

                });
            },
            onUnSelectRow: function () {
                window.parent.wei.selectedCriminal = null;
                window.parent.wei.deselectCriminal();
                $('#wei-info-bar').html("");
            },
            onDblClickRow: function (rowdata, rowindex, rowobj) {
                //新页签打开人员基本信息
                var name = rowdata.xm;
                var cid = rowdata.id;
                window.parent.wei.selectedCriminal = cid;
                window.parent.wei.selectCriminal(cid);
                //alert(name);
                //alert(cid);
                return window.parent.f_addTab("menu-gerenxinxi", "个人信息", "/xinxiguanli/gerenxinxi/"+cid)
            }
        });


};

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

    //减刑报表设定url
    //window.parent.wei.url = api
}

//高级查询页面
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

//减刑报表页面
function jianxingbaobiao(){
    var jianquId = manager2.selectedValue;
    var fenjianquId = manager3.selectedValue;

    //查询框内容
    var name=$("#seaName").val();
    //alert(name+"3");
    var jm=$("#seaJm").val();
    //alert(jm+"4");
    var jg=$("#seaJg").val();

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
            name:name,
            jg:jg,
            jm:jm,
            jianquId: jianquId,
            fenjianquId: fenjianquId
        },
        buttons: [

            {text: '关闭', onclick: f_selectContactCancel}
        ]
    })

}

//////////////////////////////////////////////////////////////
//utils部分代码
//进入个人信息
function addNewTabForGerenxinxi(cid){
    window.parent.wei.selectedCriminal = cid;
    window.parent.wei.selectCriminal(cid);

    window.parent.f_addTab("menu-gerenxinxi", "个人信息", "/xinxiguanli/gerenxinxi/"+cid);
}
//字符串
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
//添加年龄
function age(rowdata){
    var csrq=rowdata.csrq;
    if(csrq.length==8){
        var str_date=csrq.substr(0,4)+"-"+csrq.substr(4,2)+"-"+csrq.substr(6,2)
        return str_date
    }
    var date = new Date(csrq);
    //console.log(date)
    var myyear=date.getFullYear();
    //console.log(myyear)
    var thisDate = new Date();
    //console.log(thisDate)
    var thisyear=thisDate.getFullYear();
    //console.log(thisyear)
    var age=thisyear-myyear;
    return age+"岁";

}
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
}
//判决字号
function getpanjuelabel(panjuezihao_pcsm,panjuezihao_value){
    if((!!panjuezihao_value)&&(panjuezihao_value.length ==10)){
        panjuezihao_nian=parseInt(panjuezihao_value.substring(0,4));

        panjuezihao_num=parseInt(panjuezihao_value.substring(4));

        return '['+panjuezihao_nian+']'+panjuezihao_pcsm+"第"+panjuezihao_num+"号";
    }
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
//
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
//
function itemclick()
{
    manager.options.data = $.extend(true,{}, manager.options.data);
    manager.showFilter();
}























//$(function () {
//    var combo = $("#select").ligerComboBox({
//        width: 260,
//        slide: false,  //是否以动画的形式显示
//        selectBoxWidth: 300,
//        selectBoxHeight: 240,
////              ajaxType: 'GET',
////              url: '/api/xinxi/xinxiguanli/list',
//        valueField: 'CustomerID',
//        textField: 'CustomerID',
//        autocomplete: function (e) {
//            alert(e.key);
//            e.show();
//            //根据录入结果进行数据过滤。
//        },
//        keySupport: true,
//        delayLoadGrid: true,  //未生效
//        grid: {
//            columns: [
//                {display: '档案编号', name: 'CustomerID', align: 'left', width: 100, minWidth: 60},
//                {display: '姓名', name: 'Phone', width: 100},
//                {display: '学历', name: 'City', width: 100},
//                {display: '所在监区', name: 'Country', width: 100}
//            ],
//            switchPageSizeApplyComboBox: false,
//            hideOnLoseFocus: true, //失去焦点时隐藏
//            keySupport: true, //按键支持
////                    delayLoad:true,//是否延时加载
//            highLight: true,//自动完成是否匹配字符高亮显示
//            //data: $.extend({}, CustomersData),
//            pageSize: 30,
//            checkbox: true
//        }
//    });
//});
