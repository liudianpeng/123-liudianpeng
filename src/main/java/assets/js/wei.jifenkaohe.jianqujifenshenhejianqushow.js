var manager;
var circleId = window.parent.document.getElementById("jianquId").value;
//console.log(circleId);
var showId = window.parent.getSelectedId();
//console.log(showId);
$(function () {
    var data = [];
    var columnsArray = [];
    $.ajax({
        type: 'GET',
        url: '/api/jifenkaohe/common/kaohexiang/getjianqu',//分监区考核项
        async: true,
        timeout: 50000,
        success: function (res) {

            //拼接固定cid和name两列
            var columns = [];
            var bianhao = {};
            bianhao["display"] = "编号";
            bianhao["name"] = "cid";
            bianhao["width"] = 90;
            bianhao["height"] = 450;
            bianhao['frozen'] = false;
            columns.push(bianhao);
            var xingming = {};
            xingming["display"] = "姓名";
            xingming["name"] = "name";
            xingming["width"] = 100;
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
                kaohexiang['minWidth'] = 100;
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
                url: '/api/jifenkaohe/jianqu/data/get/'+ circleId + '/' + showId,//获取考核犯人的Api
                //url: '/api/jifenkaohe/fenjianqu/data/get/' + circleId + '/' + showId,//获取考核犯人的Api
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
});
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
        type: 'GET',
        url: '/api/jifenkaohe/jianqu/data/tijiao/'+showId,
        success: function(){

        }
    });
    window.parent.reload();
}









