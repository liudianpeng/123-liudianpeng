define([], function(){
    var weiutils = {

        //处理字典空值
        isNull : function(data){
            return (data == "" || data == undefined || data == null) ? "" : data.name;
        },
        //处理空值
        kongzhi : function(data){
            return(data == "" || data == undefined || data == null)? "" : data;
        },
        stringDate :function(data){
            var str_date=data.substr(0,4)+"-"+data.substr(4,2)+"-"+data.substr(6,2);
            return str_date;
        },
        dateFormat :function(date,flag){
        /**
        *flag =0 返回 yyyy-mm-dd
        *flag =1 返回 yyyy-mm-dd hh:mm:ss
        *flag =2 返回 yyyy-mm-dd hh:mm:ss.ms
        */
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
        },
        splitPage :function(data,page,pageSize){
            return 1;
        },
        testOk : function(){
            alert("ok");
        }
    };
    return weiutils;
});

