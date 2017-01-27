function Dialog(options){
	options = options || {};
	if(options.constructor!== Object){
		options= {};
	}
	this.defaults={
		title:"我是标题",
		content:"我是内容",
		top:null,
		left:null,
		OkFn:function(){}
	}
	for(var attr in options){
		if(options.hasOwnProperty(attr)){
			this.defaults[attr] = options[attr]
		}
	}
//			console .log(this)
	this.init();
	this.Position();
}
Dialog.prototype = {
	constructor:Dialog,
	//生成弹窗
	init:function(){
		mask = this.MaskHtml();
		mask.style.zIndex = 99;
		document.body.appendChild(mask);
		Diadiv = this.TanBoxHtml();
		Diadiv.style.zIndex = 100;
		document.body.appendChild(Diadiv);
		title = Diadiv.querySelector("h3");
		close = Diadiv.querySelector(".close");
		close.onclick=this.Colse;
		cancel = Diadiv.querySelector(".cancel");
		cancel.onclick = this.Colse;
		confirm = Diadiv.querySelector(".confirm");
		confirm.onclick = this.IsColse.bind(this);
	},
	//弹窗结构
	TanBoxHtml:function(){
		var Diadiv = document.createElement("div");
		Diadiv.id = "tanBox";
		//定义弹窗结构
		var tanHtml = "";	
		tanHtml+='<span class="close"></span><h3 class="title">'+this.defaults.title+'</h3><div class="content">'+this.defaults.content+
				'</div><span class="error"></span><div class="bntBox"><a class="confirm" href="javascript:;">确定</a ><a class="cancel" href="javascript:;">取消</a></div>';
		Diadiv.innerHTML=tanHtml;
		return Diadiv;
	},
	MaskHtml:function(){
		var mask = document.createElement("div");
		mask.id = "mask";
		return mask;
	},
	Position:function(){
		var L = (document.documentElement.clientWidth-Diadiv.offsetWidth)/2;
		var T = (document.documentElement.clientHeight-Diadiv.offsetHeight)/2;
		if(this.defaults.left){
			L = this.defaults.left;
		}
		if(this.defaults.top){
			T = this.defaults.top;
		}
//				console .log(L,T)
		Diadiv.style.left = L+"px";
		Diadiv.style.top = T+"px";
	},
	Colse:function(){
		document.body.removeChild(Diadiv);
		document.body.removeChild(mask);
	},
	IsColse:function(){
//				console .log(this.defaults.OkFn)
		var bl = this.defaults.OkFn();
		//defaults.okFn()不传时，bl 为underfind  为false   执行默认关闭
		//defaults.okFn()返回值为false   执行默认关闭
		//defaults.okFn()返回值为true   不关闭
		if(!bl){
			this.Colse();
		}
	}
}
	