$(function(){
    $.getJSON("/api/xinxiguanli/jianquhuafen/counts", function (res) {
        //console.log(res);
        var tbody = "";
        $.each(res,function(n,value) {
            //console.log(res);
            //console.log(n);
            //console.log(value);
            var jianqu=value.jianqu;
            var fenjianqu=value.fenjianqu;
             var count=value.counts;
            var trs = "";
            trs +="<tr>"+"<td>"+jianqu+"</td>"+"<td>"+count+"</td>"+
                "<td>"+fenjianqu+"</td>"+"<td>"+count+"</td>"+"</tr>";
            tbody += trs;
        });

        $("#jiangcheng_table_tbody").append(tbody);

        _w_table_rowspan("#jiangcheng_table",1);

        _w_table_rowspan_sum_depend_on_parent("#jiangcheng_table_tbody",1,2);
        //console.log(CountArray);
        //console.log(JSON.stringify(CountArray));
        //console.log(CountArray.length);
    });


});

function _w_table_rowspan_sum_depend_on_parent(_w_table_id,_w_table_parent_colnum,child){
    pre=null;
    currentRowSpan=1;
    _w_table_firsttd = "";
    _w_table_currenttd = "";
    _w_table_SpanNum = 0;
    _w_table_Obj = $(_w_table_id + " tr td:nth-child(" + _w_table_parent_colnum + ")");
    $.each(_w_table_Obj,function(i,value) {
        if (!!$(this).attr('rowSpan')) {
            var sum=0;
            currentRowSpan = $(this).attr('rowSpan');



            var needToSpanRow = $(_w_table_id + " tr:eq(" + (i) + ") td:eq(" + (child - 1) + ")");

            var j = i + 1;
            var j1 = i + parseInt(currentRowSpan);
            for (; j < j1;) {
                var needToHideRow = $(_w_table_id + " tr:eq(" + (j) + ") td:eq(" + (child - 1) + ")");

                j = j + 1;
              //  console.log(needToHideRow.html());
                sum=sum+parseInt(needToHideRow.html());
                needToHideRow.hide();
            }
            sum=sum+parseInt(needToSpanRow.html());
           needToSpanRow.html(sum);
           needToSpanRow.attr("rowSpan", currentRowSpan);

            console.log("currentRowSpan=="+currentRowSpan+" sum="+sum +" needToSpanRow="+needToSpanRow.html());

        }
    });

}




function _w_table_rowspan_depend_on_parent(_w_table_id,_w_table_parent_colnum,child){
    pre=null;
    currentRowSpan=1;
    _w_table_firsttd = "";
    _w_table_currenttd = "";
    _w_table_SpanNum = 0;
    _w_table_Obj = $(_w_table_id + " tr td:nth-child(" + _w_table_parent_colnum + ")");
    $.each(_w_table_Obj,function(i,value) {
        if (i > 0) {

            if (i == 1) {
                _w_table_firsttd = $(this);
                pre = _w_table_firsttd;
                _w_table_SpanNum = 1;
                if (!!$(this).attr('rowSpan')) {
                    currentRowSpan = $(this).attr('rowSpan');

                    var needToSpanRow = $(_w_table_id + " tr:eq(" + (i) + ") td:eq(" + (child - 1) + ")");

                    needToSpanRow.html(currentRowSpan);
                    needToSpanRow.attr("rowSpan", currentRowSpan);
                    //  console.log("needToSpanRow=="+needToSpanRow.text());

                    var j = i + 1;
                    var j1 = i + parseInt(currentRowSpan);

                    for (; j < j1;) {
                        var needToHideRow = $(_w_table_id + " tr:eq(" + (j) + ") td:eq(" + (child - 1) + ")");

                        j = j + 1;
                        needToHideRow.hide();
                    }

                } else {
                    var needToSpanRow = $(_w_table_id + " tr:eq(" + (i) + ") td:eq(" + (child - 1) + ")");

                    needToSpanRow.html("1");
                }

            } else {
                _w_table_currenttd = $(this);
                if (_w_table_currenttd.text() == pre.text()) {

                } else {

                    if (!!$(this).attr('rowSpan')) {
                        currentRowSpan = $(this).attr('rowSpan');

                        var needToSpanRow = $(_w_table_id + " tr:eq(" + (i) + ") td:eq(" + (child - 1) + ")");

                        needToSpanRow.html(currentRowSpan);
                        needToSpanRow.attr("rowSpan", currentRowSpan);
                        //  console.log("needToSpanRow=="+needToSpanRow.text());

                        var j = i + 1;
                        var j1 = i + parseInt(currentRowSpan);

                        for (; j < j1;) {
                            var needToHideRow = $(_w_table_id + " tr:eq(" + (j) + ") td:eq(" + (child - 1) + ")");

                            j = j + 1;
                            needToHideRow.hide();
                        }

                    } else {
                        var needToSpanRow = $(_w_table_id + " tr:eq(" + (i) + ") td:eq(" + (child - 1) + ")");

                        needToSpanRow.html("1");
                    }
                    pre = _w_table_firsttd;
                }
            }
        }
    });

}



//函数说明：合并指定表格（表格id为_w_table_id）指定列（列数为_w_table_colnum）的相同文本的相邻单元格
//参数说明：_w_table_id 为需要进行合并单元格的表格的id。如在HTMl中指定表格 id="data" ，此参数应为 #data
//参数说明：_w_table_colnum 为需要合并单元格的所在列。为数字，从最左边第一列为1开始算起。
function _w_table_rowspan(_w_table_id,_w_table_colnum){
    _w_table_firsttd = "";
    _w_table_currenttd = "";
    _w_table_SpanNum = 0;
    _w_table_Obj = $(_w_table_id + " tr td:nth-child(" + _w_table_colnum + ")");
    _w_table_Obj.each(function(i){
        if(i==0){
            _w_table_firsttd = $(this);
            _w_table_SpanNum = 1;
        }else{
            _w_table_currenttd = $(this);
            if(_w_table_firsttd.text()==_w_table_currenttd.text()&&_w_table_firsttd.text()!=""){
                _w_table_SpanNum++;
                _w_table_currenttd.hide(); //remove();
                _w_table_firsttd.attr("rowSpan",_w_table_SpanNum);
            }else{
                _w_table_firsttd = $(this);
                _w_table_SpanNum = 1;
            }
        }
    });
}


