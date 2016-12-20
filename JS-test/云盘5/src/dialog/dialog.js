function dialog(option){
	option = option || {};
	var defaults = {
		title:"这是一个弹框",
		content:"我是弹框",
		okFn:function(){}
	};
	for(var attr in option){//遍历数组，赋值一份
		defaults[attr] = option[attr];
	}
	
//	封装弹框的结构
	var diaDiv = document.createElement('div');
	diaDiv.className = "fullbox";
	var diaHtml = `<h3>
				<p class= 'title1'>${defaults.title}</p>
				<a href="javaScript:;" class = 'close' title='关闭'>X</a>
			</h3>
			<div class='contentpop'>${defaults.content}</div>
			<div class='pop-btns'>
				<span class= 'error'></span>
				<a href="javaScript:;" class= 'confirm'>确定</a>
				<a href="javaScript:;" class= 'cancel'>取消</a>
			</div>`;
	
	diaDiv.innerHTML = diaHtml;
	document.body.appendChild(diaDiv);
	diaDiv.style.zIndex = 100;
	
	//居中显示
	diaDiv.style.left = (document.documentElement.clientWidth - diaDiv.offsetWidth)/2 + "px";
	diaDiv.style.top = (document.documentElement.clientHeight - diaDiv.offsetHeight)/2 + "px";		
	
	window.addEventListener("resize",function (){
		diaDiv.style.left = (document.documentElement.clientWidth - diaDiv.offsetWidth)/2 + "px";
		diaDiv.style.top = (document.documentElement.clientHeight - diaDiv.offsetHeight)/2 + "px";		
	},false);
	
	
	//遮罩
	var mask = document.createElement('div');
	mask.style.cssText = "width:100%;height:100%;background:#000;opacity: .3;position:fixed;left:0;top:0;z-index:99;"
	document.body.appendChild(mask);
	
	//确定和取消
	var confirm = diaDiv.getElementsByClassName('confirm')[0];
	var cancel = diaDiv.getElementsByClassName('cancel')[0];
	var close = diaDiv.getElementsByClassName('close')[0];
	close.onclick = function(){
		document.body.removeChild(mask);
		document.body.removeChild(diaDiv);
	}
	confirm.onclick = function(){
		var bl = defaults.okFn(); 
		console.log(!bl)
		if( !bl ){
			document.body.removeChild(diaDiv);
			document.body.removeChild(mask);
		}
		
		return false;
	}
	
	cancel.onclick = function(){
		document.body.removeChild(diaDiv);
		document.body.removeChild(mask);
	}
}
