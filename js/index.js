/**
 * Created by hxsd on 2016/9/6.
 */
$(function () {
    /*导航区下拉显示隐藏*/
    function show(){
        var timer=null;
        $("#smallCart").hover(function () {
            timer=setTimeout(function(){
                $(".collapse").show();
            },0);
        },function () {
            timer=setTimeout(function(){
                $(".collapse").hide();
            },200);
            $(".collapse").on("mouseover",function(){
                clearTimeout(timer);
            });
        });
    };
    show();
    function service(){
        var timer=null;
        $("#services").hover(function () {
            timer=setTimeout(function(){
                $(".collapse2").show();
            },0);
        },function () {
            timer=setTimeout(function(){
                $(".collapse2").hide();
            },200);
            $(".collapse2").on("mouseover",function(){
                clearTimeout(timer);
            });
        });
    };
    service();
    /*轮播*/
    var timer=null;
    function autoplay() {
        var a =0;
        timer=setInterval(function () {
            a -= 2000;
            if(a<-6000)
            { a=0; }
            $(".teb").css({"left":a+"px"},1500);
        },2000);
    };
    $(".teb").on("mouseover",function(){
        clearInterval(timer);
    });
    $(".teb").on("mouseout",function(){
        autoplay();
    });
    autoplay();

});

window.onload=function(){
    function tab(id,hideNum,autoplay){
        var oBanner=document.getElementById(id);
        var oTabList=document.getElementsByClassName("teb")[0];
        var aLi=oTabList.getElementsByTagName("li");
        var n=0;
        var my_json=my_tools();
        var timer=null;
        //ul的宽度
        var li_w=aLi[0].offsetWidth;
        oTabList.style.width=li_w*aLi.length+"px";
        //编号
        var ol=document.createElement("ol");
        for(var i=0;i<aLi.length;i++){
            if(i==0){
                ol.innerHTML+='<li class="active">'+(hideNum ? '' : (i+1))+'</li>';
            }else{
                ol.innerHTML+='<li>'+(hideNum ? '' : (i+1))+'</li>';
            }
        }
        oBanner.appendChild(ol);
        //var aBtn=ol.children;
        function changeBtnClass(n){
            for(var j=0;j<aBtn.length;j++){
                aBtn[j].className="";
            }
            aBtn[n].className="active";

        }
        //点击编号按钮
        var aBtn=ol.children;
        for(var i=0;i<aBtn.length;i++){
            aBtn[i].index=i;
            aBtn[i].onclick=function(){
                n=this.index;
                changeBtnClass(n);
                my_json.move(oTabList,{'left':-(li_w*n)});
            }
        }
        //左右按钮
        var pBtn=oBanner.getElementsByClassName('prev')[0];
        var nBtn=oBanner.getElementsByClassName('next')[0];
        pBtn.onclick=function(){
            n--;
            if(n<0)n=0;
            my_json.move(oTabList,{'left':-(li_w*n)});
            changeBtnClass(n);
        };
        nBtn.onclick=function(){
            n++;
            if(n>aLi.length-1)n=aLi.length-1;
            my_json.move(oTabList,{'left':-(li_w*n)});
            changeBtnClass(n);
        };
        if(autoplay==1){
            function auto_run(){
                timer=setInterval(function(){
                    changeBtnClass(n);
                    my_json.move(oTabList,{'left':-(li_w*n)});
                    n++;
                    if(n==aLi.length){//
                        n=0;
                    }
                },3000);
            };
            auto_run();
            oBanner.onmouseover=function(){
                clearInterval(timer);
                pBtn.style.display=nBtn.style.display='block';
            }
            oBanner.onmouseout=function(){
                auto_run();
                pBtn.style.display=nBtn.style.display='none';
            }
        }
        

    };
    /*tab("ban",true,true);*/
}


