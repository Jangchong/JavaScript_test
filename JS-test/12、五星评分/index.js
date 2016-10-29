/*
要求：
	移上去五角星从开始到移入的地方都显示变亮，移出恢复原样，点击则移出不会恢复

思路：
	获取元素
	给每个五角星添加点击处理函数，获取下标；
	

*/

//获取元素
var starts = document.getElementsByClassName("starts")[0];
var info = document.getElementsByClassName("info")[0];
var spans =starts.getElementsByTagName("span");

var a = 0;
//给每个五角星添加点击处理函数，获取下标；
for(var i =0;i<spans.length;i++){
	tab(i)
}
//var onoff=true;

function tab(n){	
//	spans[n].index = n;

	onoff=true;
//	this.n= true;
	var c =0;
	console.log(spans[n].onoff);
	spans[n].onclick = function(){
		for(var i =0;i<n+1;i++){
			spans[i].innerHTML="★";
			spans[i].style.color="red";
//			onoff=false;
			spans[i].onoff=false;
			c=n+1;
		}
	}
	
//	alert(c);
	spans[n].onmouseover = function(){
		for(var i =0;i<n+1;i++){
			spans[i].innerHTML="★";
			spans[i].style.color="red";
			info.style.display="block";
		}
	}
	
	spans[n].onmouseout = function(){
		for(var i =0;i<n+1;i++){
			alert(c);
			if(i<c){
				spans[i].innerHTML="★";
				spans[i].style.color="red";
			}else{
				spans[i].innerHTML="☆";
				spans[i].style.color="#ccc";	
				info.style.display="none";
			}	
		}
	}	
		
}
