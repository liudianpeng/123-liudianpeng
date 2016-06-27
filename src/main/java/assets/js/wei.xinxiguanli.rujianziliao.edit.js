var manager;
$(function ()
{
    var id = window.parent.wei.selectedCriminal;
    $("#backRujianziliao").attr("href","/xinxiguanli/rujianziliao/"+id);
    $("#rujianziliao-cid").attr("value",id);

    $.getJSON("/api/xinxi/rujianziliao/fenlei/"+id, function(res){
        //for (var i = 0; i < res.length; i++) {//这里使用freemarker
        //    $("#fenlei_option").append("<option>"+ res[i].name +"</option>");
        //};
        var select = $('#fenlei_option');
        var options = $('#fenlei_option>option');
        for (var i = 0; i < options.length; i++) {
            options[i].index = i;
            options[i].onclick = function () {//
                var j = this.index;
                var fenleiId = res[j].id;//入监资料分类id
                //此处写点击事件//////////这里存在兼容性问题(由于业务不需要进行其他操作,暂不处理,这里继续添加资料没有问题)
                //alert(fenleiId+"hahahahahhahah");

                var div = $("#rujianziliao_image");//清空图片div用
                var ziliaoSm_input = $("#rujianziliao_sm");//清空资料说明
                if (div.innerHTML == '') {
                    $.getJSON('/api/xinxi/rujianziliao/list/' + id + '/' + fenleiId, function (huijianData) {
                        for (var i = 0; i < huijianData.length; i++) {
                            $("#rujianziliao_image").append("<img src='"+huijianData[i].filePath+"' width=400 /></div>");
                        };
                    })
                } else {
                    $('rujianziliao_image').html("");
                    $.getJSON('/api/xinxi/rujianziliao/list/' + id + '/' + fenleiId, function (huijianData) {
                        for (var i = 0; i < huijianData.length; i++) {
                            $("#rujianziliao_image").append("<div><img src='"+huijianData[i].filePath+"' width=400 /></div>");
                        };
                        //点击图片
                        var image_div = $('#rujianziliao_image');
                        var image_div_list = $('#rujianziliao_image>div');
                        //alert(image_div_list.length+"dddd");
                        for (var n = 0;n<image_div_list.length;n++){
                            image_div_list[n].index = n;
                            image_div_list[n].onclick = function(){
                                var m = this.index;
                                //alert(huijianData[m].sm);
                                if (ziliaoSm_input == ''){
                                    //$("#ziliaoSm_input").append("111");
                                    $("#rujianziliao_sm").attr("value",huijianData[m].sm);
                                }else {
                                    $('rujianziliao_sm').html("");
                                    $("#rujianziliao_sm").attr("value",huijianData[m].sm);
                                }
                            }
                        };
                        //绑定事件结束
                        ////////////////////////////////////////////////////////////////////////////////////////
                    })
                }

            };//右侧事件处理结束
        }
    });

})