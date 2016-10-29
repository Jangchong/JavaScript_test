//获取元素
var spans = document.querySelectorAll(".starts span");
var info = document.querySelectorAll(".info")[0];
var textArr = ["很差","凑合","一般","推荐","力荐"];

var num=-1; //获取一个变量

for(var i  =0;i<spans.length;i++){ //为所有的星星添加事件处理函数
	spans[i].index=i;//自定义属性（为了获取移入或点击时是哪个）
	spans[i].onmouseover= function(){//移入处理函数
		tab(this.index); //获取当前的移入的位置，把移入的位置传递给形参
	}
	spans[i].onmouseout=function(){
		tab(num);
	}
	spans[i].onclick =function(){
		num=this.index;
	}
}
function tab(n){
	for(var i=0;i<spans.length;i++){
		if(i <= n){
			spans[i].innerHTML = "★";
			spans[i].style.color = n<2? "pink" : "red";
		}else{
			spans[i].innerHTML = "☆";
			spans[i].style.color = "grey";
		}
	}
	if(n == -1){
			info.style.display = "none";
		}else{
			info.style.display = "block";
			info.innerHTML = textArr[n];
		}

}
