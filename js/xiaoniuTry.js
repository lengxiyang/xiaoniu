/**
 * Created by hxsd on 2016/9/10.
 */
$(function(){
    /*$("#sss").on("click",function(){
        alert(1111);
    });*/
    var a=0;
    $(".rightBtn").click(function(){
        a-=500;
        if(a<-1200){
            a=0;
        }
        $(".tab").css({"left":a+"px"});
    });
    $(".leftBtn").click(function(){
        a+=500;
        if(a>=0)
        {
           a=0;
        }
        $(".tab").css({"left":a+"px"});
    })

});