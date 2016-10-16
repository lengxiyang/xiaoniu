/**
 * Created by hxsd on 2016/9/8.
 */
var timer=null;
$(function () {
    function autoplay2() {
    var a =0;
    timer=setInterval(function () {
        a -= 2000;
        if(a<-2000)
        { a=0; }
        $(".products").css({"left":a+"px"},1500);
    },2000);
};
    $(".products").on("mouseover",function(){
        clearInterval(timer);
    });
    $(".products").on("mouseout",function(){
        autoplay2();
    });
autoplay2();
})
