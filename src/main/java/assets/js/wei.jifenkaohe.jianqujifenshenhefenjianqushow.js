var manager;
var circleId = window.parent.document.getElementById("fenjianquId").value;
//console.log(circleId);
var showId = window.parent.getSelectedId();
//console.log(showId);
var showObject = window.parent.manager.getSelectedRow();
var showText=showObject.fenjianqu;
//console.log(showText);


$(function () {
    if(showText.indexOf("分") >= 0 ){
        //alert("分监区");
        jianquApi= '/api/jifenkaohe/fenjianqu/data/get/' + circleId + '/' + showId
    }else {
        //alert("监区");
        jianquApi= '/api/jifenkaohe/fenjianqu/jianqufenjianquData1/get/'+ circleId + '/' + showId
    }
    var data = [];
    var columnsArray = [];
    $.ajax({
        type: 'GET',
        url: '/api/jifenkaohe/common/kaohexiang/getfenjianqu',//分监区考核项
        async: true,
        timeout: 50000,
        success: function (res) {

            //拼接固定cid和name两列
            var columns = [];
            var bianhao = {};
            bianhao["display"] = "编号";
            bianhao["name"] = "cid";
            bianhao["width"] = 150;
            bianhao["height"] = 450;
            bianhao['frozen'] = false;
            columns.push(bianhao);
            var xingming = {};
            xingming["display"] = "姓名";
            xingming["name"] = "name";
            xingming["width"] = 150;
            xingming["height"] = 450;
            xingming['frozen'] = false;
            columns.push(xingming);
            $.each(res, function (idx, obj) {
                //var str=JSON.stringify(obj);
                // console.log("iterate resource list:"+str);
                //console.log("zhehisceshi++++"+  res[0].name);
                var kaohexiang = {};
                kaohexiang['display'] = obj['name'];//考核项的名称
                kaohexiang['name'] = obj['id'].toString();//也是考核项的名称/考核项字段
                kaohexiang['height'] = 200;
                kaohexiang['type'] = 'currency';
                kaohexiang['totalSummary'] = {//求和
                    align: 'left',
                    type: 'sum',
                    render: function (e) {
                        return "<div>合计:" + e.sum + "</div>";
                    }
                };
                columns.push(kaohexiang);
            });

            $.each(columns, function (idx2, obj2) {//??????没有起作用

            });
            columnsArray = columns;
            $.ajax({
                type: 'GET',
                url: jianquApi,//获取考核犯人的Api
                async: false,
                timeout: 5000,
                success: function (data) {
                    //获取考核犯人列表
                    var obj = data.items;
                    //console.log("-----"+data.items[0].name);
                    var gridRowData = [];//表格数据
                    $.each(obj, function (idx2, value) {
                        var fanrenData = {};
                        var cid = value['cid'];
                        var name = value['name'];
                        fanrenData['cid'] = cid;
                        fanrenData['name'] = name;
                        var kaohexiang = {};
                        kaohexiang = value.kaohefen;
                        //console.log(fanrenData);
                        //console.log(kaohexiang);
                        var newSrc = $.extend({}, fanrenData, kaohexiang);
                        //console.log(newSrc);
                        gridRowData.push(newSrc);
                        //console.log(gridData);
                    });
                    var gridData = {items: gridRowData};//创建带有数据源items的gridData
                    window['g'] =
                        manager = $("#maingrid").ligerGrid({
                                columns: columnsArray,
                                record: 'total',
                                data: gridData,
                                root: 'items',
                                alternatingRow: true,
                                method: 'get',
                                pagesizeParmName: 'limit',
                                isScroll: false,
                                checkbox: false,
                                isSingleCheck: false,//是否单选
                                usePager: false,
                                switchPageSizeApplyComboBox: true,
                                width: '100%',
                                height: '97%',
                                onBeforeShowData: function () {
                                },
                                onAfterShowdata: function () {
                                }
                                //toolbar: {
                                //    items: [
                                //        {text: '提交 ', click: putItem, icon: 'save'},
                                //        {line: true}
                                //    ]
                                //}
                            }
                        );
                    var columns = manager.getColumns();
                    var ct = 0;
                    $.each(columns, function (idx2, value) {
                        ct = ct + value['width'];
                        //console.log('value='+JSON.stringify(value));
                    });
                }
            });
        }
    });
    /**
     * 刷新数据
     */
    function reload() {
        manager.reload(1);
    }
    function putItem(){
        var data = manager.getData();
        var valueStr='';
        //
        $.each(data,function(index,value){
            var cidValue=value['cid'];
            var str1 = cidValue;
            for(var item in value){
                if(item!='cid'&&item!='name'){
                    str1=str1+"_"+item+"_"+value[item];
                    //   console.log(str1);
                }
                //   console.log("person中"+item+"的值="+value[item]);
            }
            valueStr=valueStr+str1+'|';
        });
        //console.log(valueStr);

        $.ajax({
            type: 'POST',
            url: '/api/jifenkaohe/fenjianqu/fenjianqukaohe/create/'+showId,
            data:{"dt":valueStr},
            success: function(){

            }
        });
    }
   $("#pass").click(function(){
       if(showText.indexOf("分") >= 0 ){
           //alert("分监区");
           var fenjianquApi= '/api/jifenkaohe/jianqushenhe/shenhetongguo/' + showId
       }else {
           //alert("监区");
           fenjianquApi= '/api/jifenkaohe/jianqushenhe/jianqushenhejianqutongguo/' + showId
       }
       $.ajax({
           type: 'GET',
           url: fenjianquApi,
           success: function(res){

               if (res.notice == "审核通过"){
                   $.ligerDialog.alert('该分监区已审核通过,请不要重复审核!', '提示');
               }else if (res.notice == "审核未通过"){
                   $.ligerDialog.alert('该分监区数据已驳回,请等待提交!', '提示');
               }else {
                   window.parent.manager.reload();
                   $(".notice").html('审核通过');
               }
           }
       });
   });
    $("#nopass").click(function(){
        if(showText.indexOf("分") >= 0 ){
            //alert("分监区");
          var  bohuifenjianquApi= '/api/jifenkaohe/jianqushenhe/bohuifenjianqu/' + showId
        }else {
            //alert("监区");
            bohuifenjianquApi= '/api/jifenkaohe/jianqushenhe/jianqubohuijianqu/' + showId
        }
        $.ajax({
            type: 'GET',
            url: bohuifenjianquApi,
            success: function(res){
                if (res.notice == "审核通过"){
                    $.ligerDialog.alert('该分监区已审核通过,请不要重复审核!', '提示');
                }else if (res.notice == "审核未通过"){
                    $.ligerDialog.alert('该分监区数据已驳回,请等待提交!', '提示');
                }else {
                    window.parent.manager.reload();
                    $(".notice").html('驳回成功');
                }
            }
        });
    });
});










