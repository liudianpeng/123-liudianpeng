var circleId = window.parent.document.getElementById("postId").value;
//console.log(circleId)
$(function ()
{
    var proData = [
        { id: 1, text: '2014113110914摘要：1411减假名单' },
        { id: 2, text: '2014114084705摘要：1411减假名单' },
        { id: 3, text: '2014114105220摘要：1411减假名单' },
        { id: 4, text: '2014114111303摘要：1411减假名单' },
        { id: 5, text: '2014114135202摘要：1411减假名单' },
        { id: 6, text: '2014114153925摘要：1411减假名单' },
        { id: 7, text: '2014114155107摘要：1411减假名单' }
    ];
    $("#txtPro").before("<label>单据号码：</label>");
    $("#txtPro").ligerComboBox({
        data: proData,
        isMultiSelect: false,//是否多选
        initIsTriggerEvent: false,
        onSelected: function (newvalue)
        {
            //alert('选择的是' + newvalue);
        }
    });
    //单位数据
    $.getJSON("/api/jifenkaohe/common/memberjianqus",function(res) {
        var danweiData = [];
        $.each(res, function (value, name) {
            var obj = {"id": res[value].id, "text": res[value].name};
            danweiData.push(obj);
        });
        $("input[name='dw']").before("<label>单位：</label>");
        $("input[name='dw']").ligerComboBox({
        data: danweiData,
        isMultiSelect: false,//是否多选
        initIsTriggerEvent: false,
        onSelected: function (newvalue)
        {
            //alert('选择的是' + newvalue);
        }
    });
    });
    //依据

    $.getJSON("/api/jifenkaohe/jiangkoufenyiju/list",function(res){
        var tmp0=res.items;
        var proData1=[];
        $.each(tmp0, function(value, name) {
            var id=tmp0[value].id;
            var text=tmp0[value].name;
            var obj={"id":tmp0[value].id,"text":tmp0[value].name};
            proData1.push(obj);
        });
        //console.log(checkFlowing);
        $("input[name='jkfyj']").ligerComboBox({
        data: proData1,
        isMultiSelect: false,//是否多选
        initIsTriggerEvent: false,
        onSelected: function (newvalue)
        {
            //alert('选择的是' + newvalue);
        }
    });
    });
    $("#danju").hide();
    $("#reCore").click(function(){
        $("#danju").show();
    });
    //$(".name").append("<b>"+name+"</b>"+"等"+fenshu+"人");
    //var $inputs = $(".mark");
    $(".mark").keyup(function() {
        $(".mark").val($(this).val());
    });
    $(".xiamgMu").keyup(function(){
        $('.xiangMu').val($(this).val());
    });
    $(".htime").keyup(function(){
        $('.htime').val($(this).val());
    });
    $(".hadress").keyup(function(){
        $('.hadress').val($(this).val());
    });
    $(".sqjg").keyup(function(){
        $('.sqjg').val($(this).val());
    });
    $(".advice").keyup(function(){
        $('.advice').val($(this).val());
    });
    $(".zhidanren").keyup(function(){
        $('.zhidanren').val($(this).val());
    });
    $(".bj").keyup(function(){
        $('.bj').val($(this).val());
    });
});