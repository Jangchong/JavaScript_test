/*
			需求
				点击分组显示
				
			思路
				获取元素
				为所有按钮添加点击事件处理函数
					如果点击的这个元素是已被选中的(display为block)
							改为none
						否则
							改为block



	*/		
//获取元素
var wrap = document.getElementsByClassName("wrap")[0];
var list =document.getElementsByClassName("list")[0];
var active =list.getElementsByClassName("active")[0];

var  spans = list.getElementsByTagName("span");
var  h2s = list.getElementsByTagName("h2");
var  uls = list.getElementsByTagName("ul");
var lis  = document.getElementsByTagName("li");
var last =0;
//console.log(h2s);

// 为所有按钮添加点击事件处理函数
for(var i = 0;i<h2s.length;i++){
//	console.log(h2s);
	h2s[i].a=true; 
	h2s[i].onoff=true;  //自定义开关
	h2s[i].index=i;			//自定义属性
//	num=this.index;
//	this.index=false;
//	var last =true;
	h2s[i].onclick = function(){
	// 如果点击的这个元素是已被选中的(display为none	


	if(this.a){
		if(this.onoff){			
//			把上一个显示的ul去掉
			uls[last].style.display="none";
//			给点击的按钮对应的添加ul
			uls[this.index].style.display="block";
			
			//给上一个清除背景
			h2s[last].className="";
			// 给点击的h2添加背景			
			this.className="active";
			
			//清除上一个按钮
			spans[last].className="";
			//span按钮转动
			spans[this.index].className="active";

			this.onoff=false;
			
			last = this.index;
					
	}else{
//			num=this.index;
			uls[this.index].style.display="none";
			this.className="";
			spans[this.index].className="";
			
			this.onoff=true;
			
	}	
	
			this.a=true;	
	}
			
			
			
		
		console.log( "h2s[0]身上的开关是"+h2s[0].onoff+"，h2s[1]身上的开关是"+h2s[1].onoff+"，h2s[2]身上的开关是"+h2s[2].onoff );
	}
}


