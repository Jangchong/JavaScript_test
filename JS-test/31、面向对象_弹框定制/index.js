//给弹框添加一个点击处理，弹出提示框
dialogBtn.onclick = function(){
	
	new Dialog({//构造的函数，定制标题和内容
		title:"标题",
		content:"这是内容",
	});	
}

function Dialog(options){//构造函数
	options = options || {};
	//判断传入的参数是否符合
	if(options.constructor !== Object){//判断传入的是不是一个对象，不是对象默认给他赋值一个空对象
		options = {};
	}
	this.defaults = {
		title:"这是一个弹框",
		content:"这是内容",
	}
	for(var attr in options){
		if( options.hasOwnProperty(attr) ){
//			console.log( this.defaults[attr] );//这里表示默认自己定义的
//			console.log( options[attr] );	//这里表示自己传过来的属性
			this.defaults[attr] =  options[attr]; //把传过来的赋值给默认定义的
		}	
	}
	this.init();	
	
	this.titleH3 = document.getElementsByTagName('h3')[0];	//获取标题
	new Drag({	//构造的函数，可以定制弹框的初始位置和拖动	
		targetEle:this.titleH3,
		moveEle:this.divHtml,
//		left:100,
//		top:100
	})	
}
Dialog.prototype = {
	//改变prototype，把原型属性prototype重新改为另一个对象的时候要把指向重新用cons指构造函数
	constructor:Dialog,	
	init(){//初始化
		//弹框的结构放在body中
		this.divHtml = this.createHtml();//创建结构
		document.body.appendChild(this.divHtml);
		this.divHtml.style.zIndex = 100; //优先级
		
		this.mask = this.createMask(); //创建遮罩
		document.body.appendChild( this.mask );
		
		
	},
	createHtml(){//构造一个弹框结构
		this.diaDiv = document.createElement("div");//创建一个元素
		this.diaDiv.className = "tooltip";
		//下面是超级字符串拼接
		this.diaHtml = `
				<h3 class="clearfix">
					<p class ="text">${this.defaults.title}</p>
					<a href="" class ="close">X</a>
				</h3>
				<div class="content">${this.defaults.content}</div>
				<div class= "btn">
					<span class="error">123</span> 
					<a href="javaSscript:;" class = "confirm same">确定</a>
					<a href="javaSscript:;" class = "cancel	same">取消</a>
				</div>`
				
		this.diaDiv.innerHTML = this.diaHtml; 	//把创建的结构放入diaDiv内部
		
		return this.diaDiv 	//注意要记得return出去这个diaDiv;
	},
	createMask(){
		var mask = document.createElement("div");
//		document.body.appendChild(mask);
		mask.style.cssText = "width:100%;height:100%;background:rgba(0,0,0,0.2);position:fixed;left:0;top:0;z-index:99;"
		return mask;
	}
}
