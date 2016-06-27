var manager;
$(function () {
    var id = window.parent.wei.selectedCriminal;

    $.getJSON("/api/xinxi/gerenxinxi/"+id,null,function(res){
        var html = "个人奖惩　　"+"当前犯人："+res.xm+" | 档案编号："+res.dabh+"  | 监区："+res.jianqu.name ;
        //alert(res.dabh)
        if ("fenjianqu" in res&&null!==res.fenjianqu){
            html = html + " | 分监区："+res.fenjianqu.name;
        }
        $('#title').html(html);
    });
    //奖惩明细
    $.getJSON("/api/xinxi/gerenjiangcheng/getxingqimingxi/" + id+"?sortname=jcrq&sortorder=desc", function (res) {
        //处理个人奖惩明细，不分组，按照时间排序
        if ((!res)||res.length == 0) {
            $("#jiangcheng_table_tbody_mingxi").append("<tr style='height:30px;text-align: center'><td colspan='5'  style='text-align: center'>无相关数据</td></tr>")
        } else {
            tbody = "";
            $.each(res, function (n, value) {
                var id = value.id;
                var mc = value.lb_mc;
                var jcrq = value.jcrq;
                var df = value.df;
                var trs = "";
                if (df == null) {
                    df = "";
                }

                if (n % 2 == 1) {
                    trs += "<tr class='odd'>" + "<td>" + mc + "</td>" + "<td>" + getFormatDateByLong(jcrq) + "</td>" + "<td>" + df + "</td><td></td><td></td>" + "</tr>"

                } else {
                    trs += "<tr class='even'>" + "<td>" + mc + "</td>" + "<td>" + getFormatDateByLong(jcrq) + "</td>" + "<td>" + df + "</td><td></td><td></td>" + "</tr>"

                }

                tbody += trs;
            });

            $("#jiangcheng_table_tbody_mingxi").append(tbody);
        }
    });


    $.getJSON('/api/xinxi/gerenjiangcheng/getmixishengyu/'+id,function(data){
        //console.log(data);
        if ((!data)||data.length == 0) {
            //console.log(data.length)
        } else {
            var jg = _int(data[0].ljjy_jg);
            var by = _int(data[0].ljjy_by);
            var slj = _int(data[0].slj);
            var jylj = _int(data[0].jylj);
        }
    $.getJSON("/api/xinxi/gerenjiangcheng/getxingqimingxi/" + id, function (res) {
        if ((!res)||res.length == 0) {
            $("#jiangcheng_table_tbody").append("<tr style='height:30px;text-align: center'><td colspan='5' style='text-align: center'>无相关数据</td></tr>")
        } else {
            var tbody = "";
            $.each(res,function(n,value) {
                var id=value.id;
                var mc=value.lb_mc;
                var jcrq=value.jcrq;
                var df=value.df;
                var trs = "";
                if (df==null){
                    df="";
                }

                //alert(jg);

                /**
                 if(n%2==1){
                trs += "<tr class='odd'>"+"<td>"+mc+"</td>"+"<td>"+n+"</td>"+"<td>"+getFormatDateByLong(jcrq)+"</td>"+"<td>"+df+"</td>"+"</tr>"

            }else{
                trs += "<tr class='even'>"+"<td>"+mc+"</td>"+"<td>"+n+"</td>"+"<td>"+getFormatDateByLong(jcrq)+"</td>"+"<td>"+df+"</td>"+"</tr>"

            }
                 */
                //console.log("mc"+mc+"n"+n+"jcrq"+jcrq+"df"+df)
                if(mc=="记功"){
                    trs += "<tr>"+"<td>"+mc+"</td>"+"<td>"+n+"</td>"+"<td>"+jg+"<td>"+getFormatDateByLong(jcrq)+"</td>"+"<td>"+df+"</td><td></td>"+"</tr>"
                }else
                if (mc=="表扬"){
                    trs += "<tr>"+"<td>"+mc+"</td>"+"<td>"+n+"</td>"+"<td>"+by+"<td>"+getFormatDateByLong(jcrq)+"</td>"+"<td>"+df+"</td><td></td>"+"</tr>"
                }else
                if (mc=="省级劳积"){
                    trs += "<tr>"+"<td>"+mc+"</td>"+"<td>"+n+"</td>"+"<td>"+slj+"<td>"+getFormatDateByLong(jcrq)+"</td>"+"<td>"+df+"</td><td></td>"+"</tr>"
                }else
                if (mc=="监狱劳积"){
                    trs += "<tr>"+"<td>"+mc+"</td>"+"<td>"+n+"</td>"+"<td>"+jylj+"<td>"+getFormatDateByLong(jcrq)+"</td>"+"<td>"+df+"</td><td></td>"+"</tr>"
                }
                else
                trs += "<tr>"+"<td>"+mc+"</td>"+"<td>"+n+"</td>"+"<td>"+""+"<td>"+getFormatDateByLong(jcrq)+"</td>"+"<td>"+df+"</td><td></td>"+"</tr>"

                tbody += trs;
            });

            $("#jiangcheng_table_tbody").append(tbody);

            _w_table_rowspan("#jiangcheng_table",1);
            _w_table_rowspan_geshu_depend_on_parent("#jiangcheng_table",1,2);

            _w_table_rowspan_depend_on_parent("#jiangcheng_table",2,3);


        }
    });
    });
    $.getJSON("/api/xinxiguanli/xingqibiandong/getXqbdList/"+id,function(res) {

        if ((!res.items)||res.items.length == 0) {
            $("#jiangcheng_table_tbody_xingqibiandong").append("<tr style='height:30px;text-align: center'><td colspan='5' style='text-align: center'>无相关数据</td></tr>")
        } else {
           // var str = JSON.stringify(res);
            //  console.log("nowdate:" + str);
            var nowdate = res.nowdate;
            res = res.items;

            var xingqibiandongArray = new Array();
            for (var i = 0; i < res.length; i++) {

                var xq = res[i].xq;
                var bdfd = res[i].bdfd;
                var rq = date(res[i].pcrq);

                //起始日期
                var qr = res[i].qr;
                //终止日期
                var zr = res[i].zr;


                var setenceChangementType = res[i].setenceChangementType.name;
                var xingqi = new Object();


                xingqi.rq = rq;


                if (!!bdfd) {
                    if (bdfd == '9990') {
                        xingqi.xq = setenceChangementType + ":" + get_xq(bdfd) + get_xq(xq);
                    } else {
                        xingqi.xq = setenceChangementType + ":" + get_xq(bdfd);
                    }

                    xingqibiandongArray.push(xingqi);
                }
                var str = JSON.stringify(xingqibiandongArray);

            }

            var l = xingqibiandongArray.length - 1;
            var xingqibiandong="";
            for (; l >= 0; l--) {

                var x = xingqibiandongArray[l];

                xingqibiandong=xingqibiandong+"<tr><td ><span>" + x.rq +

                "</span></td><td ><span>" + x.xq + "</span></td></tr>";

            }
            $("#jiangcheng_table_xingqibiandong").append(xingqibiandong);
        }
    });
});







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

//函数说明：合并指定表格（表格id为_w_table_id）指定行（行数为_w_table_rownum）的相同文本的相邻单元格
//参数说明：_w_table_id 为需要进行合并单元格的表格id。如在HTMl中指定表格 id="data" ，此参数应为 #data
//参数说明：_w_table_rownum 为需要合并单元格的所在行。其参数形式请参考jQuery中nth-child的参数。
// 如果为数字，则从最左边第一行为1开始算起。
// "even" 表示偶数行
// "odd" 表示奇数行
// "3n+1" 表示的行数为1、4、7、10.
//参数说明：_w_table_maxcolnum 为指定行中单元格对应的最大列数，列数大于这个数值的单元格将不进行比较合并。
// 此参数可以为空，为空则指定行的所有单元格要进行比较合并。
function _w_table_colspan(_w_table_id,_w_table_rownum,_w_table_maxcolnum){
    if(_w_table_maxcolnum == void 0){_w_table_maxcolnum=0;}
    _w_table_firsttd = "";
    _w_table_currenttd = "";
    _w_table_SpanNum = 0;
    $(_w_table_id + " tr:nth-child(" + _w_table_rownum + ")").each(function(i){
        _w_table_Obj = $(this).children();
        _w_table_Obj.each(function(i){
            if(i==0){
                _w_table_firsttd = $(this);
                _w_table_SpanNum = 1;
            }else if((_w_table_maxcolnum>0)&&(i>_w_table_maxcolnum)){
                return "";
            }else{
                _w_table_currenttd = $(this);
                if(_w_table_firsttd.text()==_w_table_currenttd.text()){
                    _w_table_SpanNum++;
                    _w_table_currenttd.hide(); //remove();
                    _w_table_firsttd.attr("colSpan",_w_table_SpanNum);
                }else{
                    _w_table_firsttd = $(this);
                    _w_table_SpanNum = 1;
                }
            }
        });
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

                   // needToSpanRow.html("1");
                }

            } else {
                _w_table_currenttd = $(this);
                if (_w_table_currenttd.text() == pre.text()) {

                } else {

                    if (!!$(this).attr('rowSpan')) {
                        currentRowSpan = $(this).attr('rowSpan');

                        var needToSpanRow = $(_w_table_id + " tr:eq(" + (i) + ") td:eq(" + (child - 1) + ")");

                        needToSpanRow.html(needToSpanRow.html());
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

                       // needToSpanRow.html("1");
                    }
                    pre = _w_table_firsttd;
                }
            }
        }
    });

}
function _w_table_rowspan_geshu_depend_on_parent(_w_table_id,_w_table_parent_colnum,child){
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


 function _int(value) {

    var str_data = value;
    if (!!str_data) {
        if (str_data.length > 3 && str_data.substr(str_data.length - 3, 3) == '.00') {
            return str_data.substr(0, str_data.length - 3)
        } else if (str_data.length > 4){
            return str_data.substr(0,4)
        }else {
            return str_data;
        }
    } else {
        return '';
    }
};
