function Darg(ele){
	this.ele = ele;
	this.init();
}
Darg.prototype = {
	construsctor:Darg,/*原型被改写成一个新的对象，需要把construsctor添加上*/
	init:function(){ /*初始化*/
//					console .log(this)//this 指向实例
		//所以需要改变down函数里的this指向
		var that = this;  //that 指向实例
		this.ele.onmousedown=function(ev){
//						console .log(this)//this 指向element
			that.DownFn(ev);
		}
	},
	DownFn:function(ev){
		//这里的 this 指向是谁调用了这个函数（that）
		this.disX = ev.clientX - this.ele.offsetLeft;
		this.disY = ev.clientY - this.ele.offsetTop;
		var that = this;
		//mousemove里面的this指向document，所以需要改变使其指向实例
		document.onmousemove=function(ev){
			that.MoveFn(ev);
		};
//					document.onmouseup=function(){
//						that.UpFn();
//					}
		document.onmouseup=this.UpFn.bind(this);
//					console .log(this)
		ev.preventDefault();
	},
	//增加一个接口，可根据需求自行添加
	limit:function(){
		
	},
	decFn:function(){
		
	},
	MoveFn:function(ev){
		//这里的 this 指向是谁调用了这个函数（that）
		this.X = ev.clientX - this.disX;
		this.Y = ev.clientY - this.disY;
//					console .log(this.ele)
		this.limit();
		this.ele.style.left = this.X+"px";
		this.ele.style.top = this.Y +"px";
	},
	UpFn:function(){
		this.decFn();
		document.onmousemove = null;
		document.onmouseup = null;
	}
}