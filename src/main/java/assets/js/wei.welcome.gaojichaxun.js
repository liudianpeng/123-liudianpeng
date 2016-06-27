

var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)

//文本框
var yuxing;
var yuxing1;

var yuanxing;
var yuanxing1;

$(function () {

     yuxing=$("#getstartYuxing").ligerTextBox({ disabled: false });
     yuxing1=$("#getstartYuxing1").ligerTextBox({ disabled: false });

    yuanxing = $("#getYuanxing").ligerTextBox({ disabled: false });
    yuanxing1 = $("#getYuanxing1").ligerTextBox({ disabled: false });

    $("#getfen").ligerTextBox({ disabled: false});
    $("#getfen1").ligerTextBox({ disabled: false });

    $("#getjigongshu").ligerTextBox({ disabled: false});
    $("#getjigongshu1").ligerTextBox({ disabled: false });

    $("#getyue").ligerTextBox({ disabled: false});
    $("#getyue1").ligerTextBox({ disabled: false });


//余刑-刑期radio
    $("#youqi").bind('click', function ()
    {
        yuxing.setEnabled();
        yuxing1.setEnabled();

    });
//选择无期死缓死刑,禁用and清空
    $("#wuqi").bind('click', function ()
    {
        yuxing.setDisabled();
        yuxing1.setDisabled();
        yuxing.setValue("");
        yuxing1.setValue("");
    });
    $("#sihuan").bind('click', function ()
    {
        yuxing.setDisabled();
        yuxing1.setDisabled();
        yuxing.setValue("");
        yuxing1.setValue("");
    });
    $("#sixing").bind('click', function ()
    {
        yuxing.setDisabled();
        yuxing1.setDisabled();
        yuxing.setValue("");
        yuxing1.setValue("");
    });

    //原型-刑期radio
    $("#yuan_youqi").bind('click', function ()
    {
        yuanxing.setEnabled();
        yuanxing1.setEnabled();

    });
//选择无期死缓死刑,禁用and清空
    $("#yuan_wuqi").bind('click', function ()
    {
        yuanxing.setDisabled();
        yuanxing1.setDisabled();
        yuanxing.setValue("");
        yuanxing1.setValue("");
    });
    $("#yuan_sihuan").bind('click', function ()
    {
        yuanxing.setDisabled();
        yuanxing1.setDisabled();
        yuanxing.setValue("");
        yuanxing1.setValue("");
    });
    $("#yuan_sixing").bind('click', function ()
    {
        yuanxing.setDisabled();
        yuanxing1.setDisabled();
        yuanxing.setValue("");
        yuanxing1.setValue("");
    });

});



function submitForm()
{
    var jianquId = window.parent. manager2.selectedValue;
    var fenjianquId =  window.parent.manager3.selectedValue;

    var getstartYuxing=$("#getstartYuxing").val();
    var getstartYuxing1=$("#getstartYuxing1").val();

    var getYuanxing=$("#getYuanxing").val();
    var getYuanxing1=$("#getYuanxing1").val();

    var getjigongshu=$("#getjigongshu").val();
    var getjigongshu1=$("#getjigongshu1").val();

    var getfen=$("#getfen").val();
    var getfen1=$("#getfen1").val();

    var getyue=$("#getyue").val();
    var getyue1=$("#getyue1").val();

    //获取radio
    var getyx_radio=$('input:radio[name="xingqi"]:checked').val();
    var getyuanx_radio=$('input:radio[name="yuan_xingqi"]:checked').val();
    //alert(getyuanx_radio);
    //alert(getstartYuxing+"-"+getstartYuxing1+"-"+getYuanxing+"-"+getYuanxing1
    //    +"-"+getjigongshu+"-"+getjigongshu1+"-"+getfen+"_"+getfen1+"-"+getyue+"-"+getyue1
    //);
    /**
     * 帐户余额,数据库中数据乘100后存储;
     * 获取余额输入值后需要ye*100
     */
    window.parent.manager.setParm("str",getyue*100);
    window.parent.manager.setParm("end",getyue1*100);
    window.parent.manager.setParm("ljjy_start",getfen);
    window.parent.manager.setParm("ljjy_end",getfen1);
    window.parent.manager.setParm("jgs_sta",getjigongshu);
    window.parent.manager.setParm("jgs_end",getjigongshu1);
    window.parent.manager.setParm("yx_sta",getstartYuxing);
    window.parent.manager.setParm("yx_end",getstartYuxing1);
    window.parent.manager.setParm("yuan_sta",getYuanxing);
    window.parent.manager.setParm("yuan_end",getYuanxing1);
    //设置余刑radio值
    window.parent.manager.setParm("radio_yx",getyx_radio);
    //设置原形radio值
    window.parent.manager.setParm("radio_yuanx",getyuanx_radio);

    window.parent.manager.set("url",'/api/chaxun/gaojichaxun/'+jianquId+'/'+fenjianquId);
    window.parent.reload();
    //dialog.close();
}

document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){ // enter 键
        //alert("2222")
        submitForm();
    }
};


//使用调整器的代码

//$("#getstartYuxing").ligerSpinner({width:50, height: 10, interval :1000, step:1,type: 'int'});
//$("#getstartYuxing1").ligerSpinner({width:50, height: 10,interval :1000, step:1,type: 'int' });


//$("#getyifuxing").ligerSpinner({width:50, height: 10,interval :100, step:1,type: 'int'});
//$("#getyifuxing1").ligerSpinner({width:50, height: 10,interval :100,step:1,type: 'int'});


//$("#getYuanxing").ligerSpinner({width:50, height: 10,interval :100, type: 'int' });
//$("#getYuanxing1").ligerSpinner({width:50, height: 10,interval :100,type: 'int' });


//$("#getfen").ligerSpinner({width:50, height: 10, interval :100,type: 'int' });
//$("#getfen1").ligerSpinner({width:50, height: 10,interval :100, type: 'int' });


//$("#getjigongshu1").ligerSpinner({ width:50,height: 10,interval :100, type: 'int' });
//$("#getjigongshu1").ligerSpinner({width:50, height: 10,interval :100,type: 'int' });


//$("#getyue").ligerSpinner({width:50, height: 10,interval :100, type: 'int' });
//$("#getyue1").ligerSpinner({width:50, height: 10,interval :100,type: 'int' });
