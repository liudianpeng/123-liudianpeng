var manager;
        $(function ()
        {
            var id = window.parent.wei.selectedCriminal;

              $.getJSON("/api/xinxi/gerenxinxi/"+id,null,function(res){
                 var html ="执法表格　　"+ "当前犯人："+res.xm+" | 档案编号："+res.dabh+"  | 监区："+res.jianqu.name ;
                 //alert(res.dabh)
                 if ("fenjianqu" in res&&null!==res.fenjianqu){
                    html = html + " | 分监区："+res.fenjianqu.name;
                 }
                 $('#title').html(html);
              });


//             $(".tqjxspb").html("<a href='/api/xinxi/zhifabiaoge/zuifantiqingjianxingjiashishenhebiao/6555'>罪犯提请减刑（假释）审核表</a>");
//             $(".tqjxjys").html("<a href='/api/xinxi/zhifabiaoge/tiqingjianxingjianyishu/6555''>提请减刑建议书</a>");
//             $(".tqjsjys").html("<a href='/api/xinxi/zhifabiaoge/tiqingjiashijianyishu/6555'>提请假释建议书</a>");
           $("#1_tqjxspb").attr("href","/api/xinxi/zhifabiaoge/zuifantiqingjianxingjiashishenhebiao/"+id);
           $("#2_tqjxjys").attr("href","/api/xinxi/zhifabiaoge/tiqingjianxingjianyishu/"+id);
           $("#3_tqjsjys").attr("href","/api/xinxi/zhifabiaoge/tiqingjiashijianyishu/"+id);
           $("#4_zfgzjjfz").attr("href","/api/xinxi/zhifabiaoge/zuifangaizaojijifenzishenpibiao/"+id);
           $("#5_zffjglsp").attr("href","/api/xinxi/zhifabiaoge/zuifanfenjiguanlishenpibiao/"+id);
           $("#6_zfgrxib").attr("href","/api/xinxi/zhifabiaoge/gerenxinxi/"+id);
           $("#7_zfcfspb").attr("href","/api/xinxi/zhifabiaoge/chufashenpi/"+id);
           $("#8_zfjlsp").attr("href","/api/xinxi/zhifabiaoge/zuifanjianglishenpibiao/"+id);
           $("#9_zfbwjyspb").attr("href","/api/xinxi/zhifabiaoge/baowaijiuyishenpibiao/"+id);
           $("#10_zfbwjyqbs").attr("href","/api/xinxi/zhifabiaoge/baowaijiuyiqubaoshu/"+id);
           $("#11_zfbwjyzqyjs").attr("href","/api/xinxi/zhifabiaoge/baowaijiuyizhengqiuyijianshu/"+id);
           $("#12_bwjyzfkcb").attr("href","/api/xinxi/zhifabiaoge/baowaijiuyizuifankaochabiao/"+id);
           $("#13_zfbwjycbd").attr("href","/api/xinxi/zhifabiaoge/zuifanbaowaijiuyichengbandan/"+id);
           $("#14_zfbcjdb").attr("href","/api/xinxi/zhifabiaoge/zuifanbingcanjiandingbiao/"+id);
           $("#15_fdbpzcj").attr("href","/api/xinxi/zhifabiaoge/fadingbupizhunchujingrenyuantongbaobeiantongzhishu/"+id);
           $("#16_zfcjjdb").attr("href","/api/xinxi/zhifabiaoge/zuifanchujianjiandingbiao/"+id);
           $("#17_zfjxjshyjl").attr("href","/api/xinxi/zhifabiaoge/zuifanjianxingjiashihuiyijilu/"+id);
           $("#18_zfsyjds").attr("href","/api/xinxi/zhifabiaoge/zuifansiyinjiandingshu/"+id);
           $("#19_zyzfdjb").attr("href","/api/xinxi/zhifabiaoge/zhongyaozuifandengjibiao/"+id);
           $("#20_tqjxbcjdb").attr("href","/api/xinxi/zhifabiaoge/tiqingjianxingbingcanjiandingbiao/"+id);
           $("#21_cyzwzfjxcbb").attr("href","/api/xinxi/zhifabiaoge/congyanzhangwozuifanjianxingTable/"+id);
        });