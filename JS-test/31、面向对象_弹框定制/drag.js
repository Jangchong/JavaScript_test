function Drag(options){
	//必填并且必须是一个对象
	if( typeof options === "undefined" || options.constructor !== Object ){

		//抛出错误
		throw new Error("传入的参数错误，必须是对象");
		return;
	}

	//不能直操作传进来的对象
	this.defaults = {
		targetEle:null,
		moveEle:null,
		left:null,
		top:null
	}

	for( var attr in options ){
		if(options.hasOwnProperty(attr)){
			this.defaults[attr] = options[attr];
		}
	}

	//拖拽的目标
	//this.element是移动的目标
	if( this.defaults.moveEle ){
		this.element = this.defaults.moveEle;
	}else{
		this.element = this.defaults.targetEle;
	}
	this.init();
}

Drag.prototype = {
	constructor: Drag,
	init(){
		//要把一个函数的this改变为指定的值，并且不调用函数
		this.defaults.targetEle.onmousedown = this.downFn.bind(this);
		this.position();		
	},
	downFn(ev){
		//this => 实例
		this.disX = ev.clientX - this.element.offsetLeft;//判断鼠标点到元素身上距离边缘处是多少；
		this.disY = ev.clientY - this.element.offsetTop;

		document.onmousemove = this.moveFn.bind(this);//移动
		document.onmouseup = this.upFn;	//抬起，没加bind(this);是函数upFn里没有用到实例里的属性变量

		ev.preventDefault();
	},
	position(){
		//判断能不能转成数字
		/*
			1. 没有传入left 和 top值 默认的为居中显示
			2. 传入了left 没有传入top，left为传入的值，top居中显示
			3. 没传left，传入了top,left居中，top按照传入的显示
			4. 同时传了left，和top，就在按照传入的left和top显示
		*/	
		var isLeft = this.defaults.left !== null && !isNaN(Number(this.defaults.left));
		var isTop = this.defaults.top !== null && !isNaN(Number(this.defaults.top));
		var top = (document.documentElement.clientHeight - this.defaults.moveEle.offsetHeight)/2;
		
		var left = (document.documentElement.clientWidth - this.defaults.moveEle.offsetWidth)/2;
		
		if(isLeft && isTop){
			this.defaults.moveEle.style.left = this.defaults.left + "px";
			this.defaults.moveEle.style.top = this.defaults.top + "px";
		}else if( isLeft ){
			this.defaults.moveEle.style.left = this.defaults.left + "px";
			this.defaults.moveEle.style.top = top + "px";
		}else if( isTop ){
			this.defaults.moveEle.style.left = left + "px";
			this.defaults.moveEle.style.top = this.defaults.top + "px";
		}else{
			this.defaults.moveEle.style.left = left+ "px";
			this.defaults.moveEle.style.top = top + "px";
		}
	},
	limit(){
		//根据left top值；来判断范围进行限制
		if( this.x < 0 ){
			this.x = 0;
		}
//		console.log(this.element)
		if( this.x > document.documentElement.clientWidth - this.element.offsetWidth ){
			this.x = document.documentElement.clientWidth - this.element.offsetWidth;
		}
		if( this.y < 0 ){
			this.y = 0;
		}
		if( this.y > document.documentElement.clientHeight - this.element.offsetHeight ){
			this.y = document.documentElement.clientHeight - this.element.offsetHeight;
		}
	},
	moveFn(ev){	//移动的时候调这个left、top;	
		//先声明一个变量把所得到的值挂在实例上，进行限制
		this.x = ev.clientX - this.disX;
		this.y = ev.clientY - this.disY;

		this.limit();

		this.element.style.left = this.x + "px";
		this.element.style.top = this.y + "px";
	},
	upFn(){//抬起的时候释放事件
		document.onmousemove = null;
		document.onmouseup = null;
	}
}