/**Parses string formatted as YYYY-MM-DD to a Date object.
 * If the supplied string does not match the format, an
 * invalid Date (value NaN) is returned.
 * @param {string} dateStringInRange format YYYY-MM-DD, with year in
 * range of 0000-9999, inclusive.
 * @return {Date} Date object representing the string.
 */
//IE浏览器不支持NEW DATE()带参数的方法
function NewDate(str) {
    str = str.split('-');
    var date = new Date();
    date.setUTCFullYear(str[0], str[1] - 1, str[2]);
    date.setUTCHours(0, 0, 0, 0);
    return date;
}
//--end
/**
 *转换long值为日期字符串
 * @param l long值
 * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
 * @return 符合要求的日期字符串
 */
function getFormatDateByLong(time) {
    if(!time){
        return '';
    }
    var myDate = new Date(time);
    return  formatterDate(myDate);
}

function getFormatDateTimeByLong(time) {
    if(!time){
        return '';
    }
    var myDate = new Date(time);
    return  formatterDateTime(myDate);
}
/**
 *转换日期对象为日期字符串 yyyy-MM-dd
 * @param l long值
 * @param pattern 格式字符串,例如：yyyy-MM-dd
 * @return 符合要求的日期字符串
 */
function formatterDate(date) {
    var datetime = date.getFullYear()
            + "-"// "年"
            + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0"
            + (date.getMonth() + 1))
            + "-"// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate())
        ;
    return datetime;
}
/**
 *转换日期对象为日期字符串 yyyyMMdd
 * @param l long值
 * @param pattern 格式字符串,例如：yyyyMMdd
 * @return 符合要求的日期字符串
 */
function formatterDateNoMinus(date) {
    var datetime = date.getFullYear()
            + ""// "年"
            + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
            + (date.getMonth() + 1))
            + ""// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate())
        ;
    return datetime;
}
/**
 *转换日期对象为日期字符串
 * @param l long值
 * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
 * @return 符合要求的日期字符串
 */
function formatterDateTime(date) {
    var datetime = date.getFullYear()
        + "-"// "年"
        + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
        + (date.getMonth() + 1))
        + "-"// "月"
        + (date.getDate() < 10 ? "0" + date.getDate() : date
            .getDate())
        + " "
        + (date.getHours() < 10 ? "0" + date.getHours() : date
            .getHours())
        + ":"
        + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
            .getMinutes())
        + ":"
        + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
            .getSeconds());
    return datetime;
}

$(function(){

    ////////////////////////////////gird里面处理;
    // 处理日期格式
    $.ligerDefaults.Grid.formatters['date'] = function (num, column) {
        //num 当前的值//column 列信息
        if (num == "" || num == undefined || num == null){
            return ""
        }
        if(null==num){num=19000101;}
	    if(num.length==8){
	        var str_date=num.substr(0,4)+"-"+num.substr(4,2)+"-"+num.substr(6,2)
	        return str_date
	    }
	    var date = new Date(num);
        var myyear=date.getFullYear();
        var mymonth=date.getMonth()+1;
        var myday=date.getDate();
        if(mymonth >= 10){mymonth=mymonth;}else{mymonth="0" + mymonth;}
        if(myday >= 10){myday=myday;}else{myday="0" + myday;}
        return myyear+"-"+mymonth+"-"+myday;
    };
    $.ligerDefaults.Grid.formatters['rizhi_date'] = function (num, column) {
        //num 当前的值//column 列信息
	    var date = new Date(num);
	    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "
	            +date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    };

    // 处理空值(字典空值)
    $.ligerDefaults.Grid.formatters['data_zidian'] = function (num, column) {
	    //num 当前的值//column 列信息
        return (num == "" || num == undefined || num == null) ? "" : num.name;
    };
    // 处理空值(非字典空值)
    $.ligerDefaults.Grid.formatters['data_kongzhi'] = function (num, column) {
	    //num 当前的值//column 列信息
        return(num == "" || num == undefined || num == null)? "" : num;
    };

    //grid格式化
    $.ligerDefaults.Grid.formatters['currency'] = function (num, column) {
        //num 当前的值
        //column 列信息
        if (!num) return "0.00";
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0.00";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' +
                num.substring(num.length - (4 * i + 3));
        return "" + (((sign) ? '' : '-') + '' + num + '.' + cents);
    };

    //启用-禁用
    $.ligerDefaults.Grid.formatters['enabled'] = function (value, column) {
        if(value.toString()=='true'){
            return  '<font color=blue ><b>启用</b></font>';
        }else{
            return  '<font color=red ><b>禁用</b></font>';
        }
    };

 });


//gird外面处理
function date_riqi(date,flag){
    /**
     *flag =0 返回 yyyy-mm-dd
     *flag =1 返回 yyyy-mm-dd hh:mm:ss
     *flag =2 返回 yyyy-mm-dd hh:mm:ss.ms
     */

    if(typeof(date) == "undefined"){
        return "";
    }
    var date = new Date(date);
    var str_date="";
    var month=(date.getMonth()+1);
    month=month<10?"0"+month:month;
    var day = date.getDate();
    day = day<10?"0"+day:day;
    var hour = date.getHours();
    hour = hour<10?"0"+hour:hour;
    var minutes = date.getMinutes();
    minutes = minutes<10?"0"+minutes:minutes;
    var seconds = date.getSeconds();
    seconds = seconds<10?"0"+seconds:seconds;
    var ms = date.getMilliseconds();
    ms = ms<10?"00"+ms:ms<100?"0"+ms:ms;
         if (flag==0){
              str_date=date.getFullYear()+"-"+month+"-"+day;
         }
         if (flag==1){
              str_date=date.getFullYear()+"-"+month+"-"+day+
                              " "+hour+":"+minutes+":"+seconds;
         }
         if (flag==2){date.getMinutes()
              str_date=date.getFullYear()+"-"+month+"-"+day+
                   " "+hour+":"+minutes+":"+seconds+"."+ms;
         }
    return str_date;
};


   //处理日期
function date(a){
    if(!a){
        return '';
    }
   if(a.length==8){
       var str_date=a.substr(0,4)+"-"+a.substr(4,2)+"-"+a.substr(6,2)
       return str_date
   }
       var a = new Date();
       return a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();
};
    //空值处理
function kongzhi(data){
      return(data == "" || data == undefined || data == null)? "" : data;
};
function kongzhi_zidain(data){
      return(data == "" || data == undefined || data == null)? "" : data.name;
};

//监区分监区计分录入编辑后事件
function f_onAfterEdit(e)
{
    var value= e.value;
    if (value !== null || value !== undefined || value !== '') {
        var floatValue=parseFloat(value)   ;
        var obj= e.column;

        var haveMax=false;

        //获取最大值
        var maxValue=obj['max_value'];
        if (maxValue !== null || maxValue !== undefined || maxValue !== '') {
            haveMax=true;
        }

        var haveMin=false;
        //获取最小值
        var minValue=obj['min_value'];
        if (minValue !== null || minValue !== undefined || minValue !== '') {
            haveMin=true;
        }

        if(haveMax){
            var maxFloatValue=parseFloat(maxValue)   ;
            if(floatValue>maxFloatValue){
                alert(floatValue+"超过了允许的最大值:"+maxFloatValue);
                //managern setCellEditing(rowdata, column, editing)
            }
        }
        if(haveMin){
            var minFloatValue=parseFloat(minValue)   ;
            if(floatValue<minFloatValue){
                alert(floatValue+"小于了允许的最小值:"+minFloatValue);
            }
        }
    }

}
//关闭按钮
function closDialog(){
    parent.$.ligerDialog.close();
    parent.$(".l-dialog,.l-window-mask").css("display","none");

}

//计算月份差
function getMonthNumber(date1,date2){
    //默认格式为"20030303",根据自己需要改格式和方法
    var year1 =  date1.substr(0,4);
    var year2 =  date2.substr(0,4);
    var month1 = date1.substr(4,2);
    var month2 = date2.substr(4,2);

    var len=(year2-year1)*12+(month2-month1);

    return len;

}
var DateDiff=function (sDate1, sDate2) {  //sDate1和sDate2是yyyy-MM-dd格式

    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[0] + '-' + aDate[1] + '-' + aDate[2]);  //转换为yyyy-MM-dd格式
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[0] + '-' + aDate[1] + '-' + aDate[2]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数

    return iDays;  //返回相差天数
};


function getDateDiffDays(oDate1,oDate2){
    var iDays;
    iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数

    return iDays;  //返回相差天数
}
/*
 *   功能:实现VBScript的DateAdd功能.
 *   参数:interval,字符串表达式，表示要添加的时间间隔.
 *   参数:number,数值表达式，表示要添加的时间间隔的个数.
 *   参数:date,时间对象.
 *   返回:新的时间对象.
 *   var now = new Date();
 *   var newDate = DateAdd( "d", 5, now);
 *---------------   DateAdd(interval,number,date)   -----------------
 */
function DateAdd(interval, number, date1) {
    var date=   new Date();
    date.setTime(date1.getTime());

    switch (interval) {
        case "y": {
            date.setFullYear(date.getFullYear() + number);
            return date;
            break;
        }
        case "q": {
            date.setMonth(date.getMonth() + number * 3);
            return date;
            break;
        }
        case "m": {
            date.setMonth(date.getMonth() + number);
            return date;
            break;
        }
        case "w": {
            date.setDate(date.getDate() + number * 7);
            return date;
            break;
        }
        case "d": {
            date.setDate(date.getDate() + number);
            return date;
            break;
        }
        case "h": {
            date.setHours(date.getHours() + number);
            return date;
            break;
        }
        case "m": {
            date.setMinutes(date.getMinutes() + number);
            return date;
            break;
        }
        case "s": {
            date.setSeconds(date.getSeconds() + number);
            return date;
            break;
        }
        default: {
            date.setDate(d.getDate() + number);
            return date;
            break;
        }
    }
}
function get_bznx(nx){

    var na='';
    if(!nx){
        return na;
    }
    if(nx=='97'){
        na='剥夺政治权利终身';
    }else if(nx=='99'){
        na='驱逐出境';
    }else if(nx=='00'||nx=='0'||nx==0){
        na='';
    }
    else{
        na='剥夺政治权利'+get_xq(nx);
    }

    return na;
}
//xq是六位数字或四位数字，前两位是年，中间两位是月，后两位是天
function get_xq(  xq){
    if(!xq)
    return '';
    var na='';
    var y='';
    var m='';
    var d='';
    var tem='';
    if(xq=='9995'||xq=='9996'||xq=='9990'||xq=='9997'){
        if(xq=='9995'){
            na='无期徒刑';
        }
        if(xq=='9996'){
            na='死缓';
        }
        if(xq=='9990'){
            na='有期徒刑';
        }
        if(xq=='9997'){
            na='死刑';
        }

    }else{

     //   xq=xq.replace(/\s+/g, "");
        if (xq.length ==6){
            y = xq.substr(0, 2);
            m = xq.substr(2, 2);
            d = xq.substr(4, 2);

            if(parseInt(d)==0){
                if(parseInt(m)==0){
                    na=parseInt(y)+'年'
                }else{
                    na=parseInt(y)+'年'+parseInt(m)+'个月';
                }
            }
            else if(parseInt(m)==0){
                if(parseInt(y)==0){
                    na=parseInt(d)+'天'
                }else{
                    na=parseInt(y)+'年零'+parseInt(d)+'天';
                }
            } else if(parseInt(y)==0){
                na=parseInt(m)+'个月零'+parseInt(d)+'天';
            }
            else  {
                na=parseInt(y)+'年'+parseInt(m)+'个月零'+parseInt(d)+'天';
            }


        }
    }
    //na=na.replace("/0年/g", "");
    //na=na.replace("/0个月/g", "");
    //na=na.replace("/零0天/g", "");
    return na;
}
//做数字字符串补0  pad(100, 4);  // 输出：0100
function pad(num, n) {
    var len = num.toString().length;
    while(len < n) {
        num = "0" + num;
        len++;
    }
    return (""+num).toString();;
}
function getCopiedDate(date1){
    startDate= new Date

}