$(function () {
    $.getJSON("/api/jifenkaohe/common/memberjianqus", function (res) {
        var fdata = [];
        $.each(res, function (index, value) {
            var obj = {"id": res[index].id, "name":value.name};
            fdata.push(obj);
        });
        var form = $('#form').ligerForm({
            inputWidth: 140, labelWidth: 90, space: 40,
            fields: [
                {
                    display: '选择监区',
                    name: 'id',
                    type: 'select',
                    comboboxName: "id",
                    options: {data: fdata, valueField: 'id', textField: 'name'}
                },
                {display: '姓名', name: 'name', newline: false, type: 'text', cssClass: "field"},
                {display: '姓名简码', name: 'jm', newline: false, type: 'text'},
                {display: '档案编号', name: 'dabh', newline: false, type: 'text'},
                {display: '包括离监人员', name: 'console', newline: false, type: 'checkbox'}
            ]
        });

        //$("input[name='console']").ligerGetCheckBoxManager().setValue(true);

    });
});
//搜索
function submitForm() {
    var form = liger.get('form');
    var data = form.getData();
    //console.log(data);
    var jianquId = data.id;
    //console.log(jianquId);
    var xm = data.name;
    var dabh = data.dabh;
    var jm = data.jm;
    if(jm==undefined){
        var jmm="";
    }
    var zyry=data.console;
    //console.log(zyry);
    if (zyry==true){
      var sf=1
    }else {
        sf=0
    }
    //var console=data.console;
    //alert("jianquId="+jianquId+" xm="+xm+" dabh"+dabh+" jm"+jm);

    var api = '/api/xinxiguanli/zonghechaxun/' + jianquId + '/' + xm + '/' + dabh + '/' + sf+'/'+jm;
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '监区', name: 'jianqu', width: 100, type: 'int'},
                    {display: '分监区', name: 'fenjianqu', width: 100, type: 'int'},
                    {display: '档案编号', name: 'dabh', minWidth: 40, width: 100, type: 'int'},
                    {display: '姓名', name: 'xm', width: 100, type: 'text'},
                    {display: '羁押日期', name: 'jyrq', width: 150, type: 'date'},
                    {display: '罪名', name: 'syzm', width: 100, type: 'text'},
                    //{display: '身份证号', name: 'state', minWidth: 100, align: 'center'},
                    {display: '是否在押', name: 'zyry', minWidth: 100, align: 'center'}
                ],
                checkbox: false,
                fixedCellHeight: false,
                pageSizeOptions: [10, 20, 50, 100],
                pageSize: 10,
                height: '97%',
                width: '100%',
                record: 'total',
                url: api,
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: true,       //支持服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                switchPageSizeApplyComboBox: true,
                onBeforeShowData: function () {
                },
                onAfterShowdata: function () {
                },
                rowAttrRender: function (rowdata, rowid) {
                    if (rowdata.zyry == "离监") {
                        return "style='color:red;font-weight:bold'";
                    }
                },
                onDblClickRow: function (rowdata, rowindex, rowobj) {
                    //新页签打开人员基本信息
                    var name = rowdata.xm;
                    var cid = rowdata.id;
                    window.parent.wei.selectedCriminal = cid;
                    window.parent.wei.selectCriminal(cid);
                    //alert(name);
                    //alert(cid);
                    return window.parent.f_addTab("menu-gerenxinxi", "个人信息", "/xinxiguanli/gerenxinxi/" + cid)
                }
            }
        );
}

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

        var form = liger.get('form');
        var data = form.getData();
        //console.log(data);
        var jianquId = data.id;
        //console.log(jianquId);
        var xm = data.name;
        var dabh = data.dabh;
        var jm = data.jm;
        var zyry=data.console;
        //console.log(zyry);
        if (zyry==true){
            var sf=1
        }else {
            sf=0
        }
        //var console=data.console;
        //alert("jianquId="+jianquId+" xm="+xm+" dabh"+dabh+" jm"+jm);

        var api = '/api/xinxiguanli/zonghechaxun/' + jianquId + '/' + xm + '/' + dabh +'/'+ sf+'/'+jm;
        window['g'] =
            manager = $("#maingrid").ligerGrid({
                    columns: [
                        {display: '监区', name: 'jianqu', width: 100, type: 'int'},
                        {display: '分监区', name: 'fenjianqu', width: 100, type: 'int'},
                        {display: '档案编号', name: 'dabh', minWidth: 40, width: 100, type: 'int'},
                        {display: '姓名', name: 'xm', width: 100, type: 'text'},
                        {display: '羁押日期', name: 'jyrq', width: 150, type: 'date'},
                        {display: '罪名', name: 'syzm', width: 100, type: 'text'},
                        //{display: '身份证号', name: 'state', minWidth: 100, align: 'center'},
                        {display: '是否在押', name: 'zyry', minWidth: 100, align: 'center'}
                    ],
                    checkbox: false,
                    fixedCellHeight: false,
                    pageSizeOptions: [10, 20, 50, 100],
                    pageSize: 10,
                    height: '97%',
                    width: '100%',
                    record: 'total',
                    url: api,
                    dataAction: 'server', //服务器处理
                    root: 'items',
                    usePager: true,       //支持服务器分页
                    alternatingRow: true,
                    method: 'get',
                    pagesizeParmName: 'limit',
                    switchPageSizeApplyComboBox: true,
                    onBeforeShowData: function () {
                    },
                    onAfterShowdata: function () {
                    },
                    rowAttrRender: function (rowdata, rowid) {
                        if (rowdata.zyry == "离监") {
                            return "style='color:red;font-weight:bold'";
                        }
                    },
                    onDblClickRow: function (rowdata, rowindex, rowobj) {
                        //新页签打开人员基本信息
                        var name = rowdata.xm;
                        var cid = rowdata.id;
                        window.parent.wei.selectedCriminal = cid;
                        window.parent.wei.selectCriminal(cid);
                        //alert(name);
                        //alert(cid);
                        return window.parent.f_addTab("menu-gerenxinxi", "个人信息", "/xinxiguanli/gerenxinxi/" + cid)
                    }
                }
            );


    }
};

//重置
function resetForm() {
    $.getJSON("/api/jifenkaohe/common/memberjianqus", function (res) {
        var fdata = [];
        $.each(res, function (index, value) {
            var obj = {"id": res[index].id, "name": value.name};
            fdata.push(obj);
        });
        var form = $('#form').ligerForm({
            inputWidth: 140, labelWidth: 90, space: 40,
            fields: [
                {
                    display: '选择监区',
                    name: 'id',
                    type: 'select',
                    comboboxName: "id",
                    options: {data: fdata, valueField: 'id', textField: 'name'}
                },
                {display: '姓名', name: 'name', newline: false, type: 'text', cssClass: "field"},
                {display: '姓名简码', name: 'jm', newline: false, type: 'text'},
                {display: '档案编号', name: 'dabh', newline: false, type: 'text'},
                {display: '包括释放人员', name: 'console', newline: false, type: 'checkbox'}
            ]
        });


    });
    $("input[name='name']").val("");
    $("input[name='dabh']").val("");
    $("input[name='jm']").val("");
    //重置复选框
    $("input[name='console']").ligerGetCheckBoxManager().setValue(false);

}
//回车键

