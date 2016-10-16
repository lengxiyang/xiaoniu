// JavaScript Document
function my_tools(){
	var tools_json={
	//getClassName兼容
	getClassName:function(parent,cls){
		var arr=[];
		if(parent.getElementsByClassName){
			return parent.getElementsByClassName(cls);
		}else{
			var aElm=parent.getElementsByTagName('*');
			for(var i=0; i<aElm.length;i++){
				if(aElm[i].className.indexOf(cls)!=-1){
					arr.push(aElm[i]);
				}
			}
			return arr;
		};
	},
	//checkAll全选、全不选
	checkAll:function(checkAllBtn,checkbox_arr){
		//点击全选让所有的checkbox被选中
		checkAllBtn.onclick=function(){
			for(var i=0;i<checkbox_arr.length;i++){
				if(checkAllBtn.checked){
					checkbox_arr[i].checked=true;
				}else{
					checkbox_arr[i].checked=false;
				};
			};
			//点击子项的checkbox每次点击时，判断是否所有的checkbox都被选中
			for(var i=0;i<checkbox_arr.length;i++){
				checkbox_arr[i].onclick=function(){
					var n=0;
					for(j=0;j<checkbox_arr.length;j++){
						if(checkbox_arr[j].checked==true){
							n++;
						};
					};
					if(n==checkbox_arr.length){
						checkAllBtn.checked=true;
					}else{
						checkAllBtn.checked=false;
					};
				};
			};
		};
	},
	//input判断非数字提示
	checkInput:function(input){
		input.onkeyup=function(){
			if(isNaN(input.value)){//isNaN不是数字返回true，否则返回flase
				alert('请输入数字');
				this.value="";
			};
		};
	},
	//placeholder
	placeholder:function(input,text){
		//当鼠标获取焦点时初始值为空
		input.value=text;
		input.onfocus=function(){
		if(this.value==text){
			this.value="";
			this.className='';
			};
		};
		//当鼠标失去焦点值为空时显示初始值
		input.onblur=function(){
			if(this.value==""){
				this.value=text;
				this.className='placeholder';
			};
		};
	},
	//居中显示
	show_center:function(elm){
		elm.style.display='block';//隐藏元素在计算时不算高度，要先转换成块元素
		var l=(document.documentElement.clientWidth-elm.offsetWidth)/2;
		var t=(document.documentElement.clientHeight-elm.offsetHeight)/2;
		elm.style.left=l+'px';
		elm.style.top=t+'px';
	},
	//拖拽
	drag:function(elm,title){
		var handle=title || elm;
		handle.onmousedown=function(ev){
			var oEv=ev || window.event;
			var disX=oEv.clientX-elm.offsetLeft;
			var disY=oEv.clientY-elm.offsetTop;
			
			document.onmousemove=function(ev){
				var oEv=ev || window.event;
			//console.log('X轴：'+oEv.clientX,'Y轴：'+oEv.clientY);
				var l=oEv.clientX-disX;
				var t=oEv.clientY-disY;
				if(l<=0){
					l=0
				};
				if(l>=document.documentElement.clientWidth-elm.offsetWidth){
					l=document.documentElement.clientWidth-elm.offsetWidth
				};
	
				if(t<=0){
					t=0
				};
				if(t>=document.documentElement.clientWidth-elm.offsetHeight){
					t=document.documentElement.clientWidth-elm.offsetHeight
				};
				elm.style.left=l+'px';
				elm.style.top=t+'px';
			};
			document.onmouseup=function(){
			document.onmousemove=null;	
			};
			return false;
		};
	},
	//判断是否为父级
	isParent:function(oParent,obj){//oParent：父级，obj：子级
		while(obj){
			if(obj==oParent)return true;
			obj=obj.parentNode;	
		}
		return false;
	},
	//添加class样式
	addClass:function(elm,className){
		if(elm.length){
			for(var i=0;i<elm.length;i++){
				elm[i].className+=' '+className;	
			}	
		}else{
			elm.className+=' '+className;	
		}
	},
	//删除class样式
	removeClass:function(elm,className){
		if(elm.length){
			for(var i=0;i<elm.length;i++){
				elm[i].className=elm[i].className.replace(new RegExp(className,'g'),'');	
			};
		}else{
			elm.className=elm.className.replace(new RegExp(className,'g'),'');	
		}
	},
	//累计所有offsetTop
	offsetTop:function(elements){
		var top = elements.offsetTop;
		var parent =elements.offsetParent;
		while(parent != null){
			top += parent.offsetTop;
			parent = parent.offsetParent;	
		}
		return top;
	},
	//累计所有offsetLeft
	offsetLeft:function(elements){
		var left = elements.offsetLeft;
		var parent = elements.offsetParent;
		while(parent != null){
			left += parent.offsetLeft;
			parent = parent.offsetParent;	
		}
		return left;
	},
	//读取样式
	getStyle:function(obj,styleName){
		var value=obj.currentStyle ? obj.currentStyle[styleName] : getComputedStyle(obj,false)[styleName] ;
		return styleName=='opacity' ? value=Math.round(parseFloat(value)*100) : value=parseInt(value);
	},
	//运动动画
	move:function(elm,moveJson,speed,fn){
		//预定义速度
		var pr_speed={
			"veryfast":300,
			"fast":500,
			"normal":800,
			"slow":1000,
			"veryslow":2000	
		}
		//有没有传speed参数
		if(speed){//是否传入了速度值
			if(typeof speed=='string'){//如果传入的速度值为文本
				speed=pr_speed[speed];//speed就为pr_speed的value值
			}
		}else{
			speed=pr_speed.normal;//默认speed
		}
		//---------------------------
		//时间分段
		var count=parseInt(speed/30);
		//距离分段
		var start={};
		var dis={};
		for(var key in moveJson){
			//this代表tools_json
			start[key]=this.getStyle(elm,key);
			dis[key]=moveJson[key]-start[key];
		};
		//var start=getStyle(elm,moveMode);
		//var dis=end-start;//移动的距离
		var n=0;//计数器
		//清定时器
		clearInterval(elm.timer);
		elm.timer=setInterval(function(){
			n++;
			//缓动公式
			for(var key in moveJson){
				var a=1-n/count;
				//步进长度
				var step_dis=start[key]+dis[key]*(1-a*a*a);
				//var step_dis=start+dis/count*n;
				//判断透明度
				if(key=='opacity'){
					elm.style.filter='alpha(opacity:'+step_dis+')';//ie8以下
					elm.style.opacity=step_dis/100;	
				}else{
					elm.style[key]=step_dis+'px';	
				};
			};
			//运动结束
			if(n==count){
				clearInterval(elm.timer);
				//判断有没有fn，如果有就执行；if的简便写法	
				fn && fn();
			}	
		},30);
	},

};
return tools_json;

};
