
var manager;



$(function ()
{
    var  jianquId  =null;
    $.getJSON("/api/jifenkaohe/common/memberjianqus",function(res) {
        var proData = [];
        $.each(res, function (value, name) {
            var obj = {"id": res[value].id, "text": res[value].name};
            proData.push(obj);
//监区
        });
        $("#txtPro").before("<label>请选择监区进行数据录入：</label>");
        $("#txtPro").ligerComboBox({
            data: proData,
            isMultiSelect: false,//是否多选
            initIsTriggerEvent: false,
            initText:res[0].jianquName,
            onSelected: function (newvalue) {
                //alert('选择的是' + newvalue);
                  jianquId  = newvalue;
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
                var data=[];
                var columnsArray=[];
                var gridWidth=0;
                var widthTotal=0;
                $.ajax({
                    type: 'GET',
                    url:'/api/jifenkaohe/common/kaohexiang/getjianqu',
                    async: true,
                    timeout : 50000,
                    success: function(res) {
                        if (res.notice == 'error') {
                            $('.notice').html(res.message);
                        } else {
                            $('.notice').html("");
                            var columns = [];
                            var khbh = {};
                            khbh["display"] = "编号";
                            khbh["name"] = "cid";
                            khbh["width"] = 150;
                            khbh["height"] = 450;
                            khbh['frozen'] = true;
                            columns.push(khbh);
                            var name = {};
                            name["display"] = "姓名";
                            name["name"] = "name";
                            name["width"] = 150;
                            name["height"] = 450;
                            name['frozen'] = true;
                            columns.push(name);
                            $.each(res, function (idx, obj) {
                              // var str=JSON.stringify(obj);
                                 //console.log("iterate resource list:"+str);
                                var resource = {};
                                resource['display'] = obj['name'];
                                resource['name'] = obj['id'].toString();
                                //resource['id'] = obj['id'].toString();
                                resource['height'] = 200;
                                resource['type'] = 'currency';
                                resource['editor'] = {type: 'currency'};
                                resource['totalSummary'] = {
                                    align: 'left',
                                    type: 'sum',
                                    render: function (e) {
                                        return "<div>合计:" + e.sum + "</div>";
                                    }
                                };
                                //获取最大值
                                var maxValue=obj['max_value'];
                                if (maxValue !== null || maxValue !== undefined || maxValue !== '') {
                                    resource['max_value']=maxValue;
                                }
                                //获取最小值
                                var minValue=obj['min_value'];
                                if (minValue !== null || minValue !== undefined || minValue !== '') {
                                    resource['min_value']=minValue;
                                }

                                //获取默认值
                                var defaultValue=obj['default_value'];
                                if (defaultValue !== null || defaultValue !== undefined || defaultValue !== '') {
                                    resource['default_value']=defaultValue;
                                }



                                columns.push(resource);
                            });
                            $.each(columns, function (idx2, obj2) {

                            });
                            columnsArray = columns;
                            columnDataGlobal=columns;

                            $.ajax({
                                type: 'GET',
                                url: '/api/jifenkaohe/jianqu/data/getluru/' + jianquId,
                                async: false,
                                timeout: 5000,
                                success: function (res) {
                                    if (res.notice == 'error') {
                                        $('.notice').html(res.message);
                                    } else {
                                        $('.notice').html("");
                                        var obj = res.items;
                                        var gridRowData = [];
                                        $.each(obj, function (idx2, obj2) {


                                            var data1 = {};
                                            var name = obj2['name'];
                                            var cid = obj2['cid'];
                                            data1['cid'] = cid;
                                            data1['name'] = name;
                                            var kaohexiang = {};
                                            kaohexiang = obj2.kaohefen;
                                            var newSrc = $.extend({}, data1, kaohexiang);
                                            gridRowData.push(newSrc);
                                            //gridRowData.push(data1);
                                            //console.log('data1='+JSON.stringify(data1));
                                        });


                                        $.each(columnsArray, function (idx1, obj1) {
                                        //    console.log('grid column Data='+JSON.stringify(obj1));
                                            var columnName=obj1['name'];
                                            //获取默认值
                                            var defaultValue=obj1['default_value'];
                                            if (defaultValue === null || defaultValue == undefined || defaultValue == '') {
                                                return ;
                                            }
                                        //赋默认值
                                            $.each(gridRowData, function (idx2, obj2) {
                                                var value=obj2[columnName];
                                                if (value === null || value == undefined || value == '') {
                                                    obj2[columnName]=defaultValue;
                                                }

                                            });
                                        });
                                        var gridData = {items: gridRowData};




                                    window['g'] =
                                            manager = $("#maingrid").ligerGrid({
                                                    columns: columnsArray,
                                                    record: 'total',
                                                    data: $.extend(true,{},gridData),
                                                    root: 'items',
                                                    alternatingRow: true,
                                                    method: 'get',
                                                    pagesizeParmName: 'limit',
                                                    isScroll: false,
                                                    checkbox: false,
                                                    isSingleCheck: false,//是否单选
                                                    usePager: false,
                                                    switchPageSizeApplyComboBox: true,//切换每页记录数的时候的下拉框是否使用
                                                    width: '100%',
                                                    toolbar: {
                                                        items: [
                                                            {text: '保存', click: saveItem, icon: 'save'},
                                                            {text: '提交', click: putItem, icon: 'save'}
                                                        ]
                                                    },
                                                    onBeforeShowData: function () {
                                                    },
                                                    onAfterShowdata: function () {
                                                    },

                                                    onAfterEdit: f_onAfterEdit
                                                }
                                            );

                                        //判断监区数据是否已经提交
                                        $.ajax({
                                            type: "GET",
                                            url: "/api/jifenkaohe/jianqu/data/tijiaopanduan/"+jianquId,
                                            success: function (res) {
                                                if (res.notice == "true") {
                                                    manager = $("#maingrid").ligerGrid({
                                                        enabledEdit: true,
                                                        clickToEdit: true
                                                    });
                                                } else {
                                                    $.ligerDialog.alert('监区数据已经提交', '提示');
                                                    manager = $("#maingrid").ligerGrid({
                                                        enabledEdit: false,
                                                        clickToEdit: false
                                                    });
                                                }
                                            }
                                        });
                                        var columns = manager.getColumns();
                                        var ct = 0;
                                        $.each(columns, function (idx2, obj2) {
                                            ct = ct + obj2['width'];
                                            //    console.log('obj2='+JSON.stringify(obj2));
                                        });
                                    }
                                }
                            });
                        }
                    }
                });

            }
        });
        /**
         *键盘回车进入下一项编辑
         */
        $(document).bind('keydown.grid', function (event)
        {
            if (event.keyCode == 13) //enter,也可以改成9:tab
            {
                g.endEditToNext();
            }
        });
    });

    /**
     * 保存数据-需要api
     */
    function saveItem()
    {
        var data = manager.getData();
        var valueStr='';
        //
        $.each(data,function(index,value){
            var cidValue=value['cid'];
            var str1=cidValue;
            for(var item in value){
                if(item!='cid'&&item!='name'){
                    str1=str1+"_"+item+"_"+'0'+value[item];
                    //   console.log(str1);
                }
                //   console.log("person中"+item+"的值="+value[item]);
            }
            valueStr=valueStr+str1+'|';
        });
        //console.log(valueStr);

        $.ajax({
            type: 'POST',
            url: '/api/jifenkaohe/jianqu/jianqukaohe/create/'+jianquId,
            data:{"dt":valueStr},
            success: function (res) {
                if (res == '操作成功') {
                    $(".notice").html('保存成功');
                }else if(res.notice){
                    $.ligerDialog.alert(res.notice, '提示');
                }
            }
        });
    }
    function putItem(pup){
        //判断是否提交
        $.ajax({
            type: "GET",
            //判断监区api
            url: "/api/jifenkaohe/jianqu/data/tijiaopanduan/"+jianquId,
            success: function (res) {
                if (res.notice == "true") {
                    $.ligerDialog.confirm('提交数据将不再修改?', function (e) {
                        if (e) {
                            $.ajax({
                                type: 'GET',
                                url: '/api/jifenkaohe/jianqu/data/tijiao/'+jianquId,
                                success: function (res) {
                                    if (res.tijiao == "error") {
                                        $.ligerDialog.alert('您还未保存,请先保存！', '提示');
                                    } else {
                                        $(".notice").html('您已提交数据，不可再更改');
                                        manager = $("#maingrid").ligerGrid({
                                            enabledEdit: false,
                                            clickToEdit: false
                                        });
                                    }
                                }
                            });
                        } else {
                            $.ligerDialog.alert('取消提交！', '提示');
                        }
                    });
                } else {
                    $.ligerDialog.alert('该监区数据已经提交', '提示');
                }
            }
        });
    }
});


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
        return rowdata.name.indexOf(key) > -1;
    };
    return clause;
}
/**
 * 刷新数据
 */

function reload()
{
    manager.reload(1);
}


function getSelected()
{
    var row = manager.getSelectedRow();
    if (!row) { alert('请选择行'); return; }
    alert(JSON.stringify(row));
}



