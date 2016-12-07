//生成一个数据

var data = {
	files:[
		{
			id:0,
			pid:-1,
			title:"微云",
			type:"file"
		},
		{
			id:1,
			pid:0,
			title:"JS课程",
			type:"file"
		},
		{
			id:100,
			pid:1,
			title:"123",
			type:"file"
		},
		{
			id:101,
			pid:1,
			title:"333",
			type:"file"
		},
		{
			id:2,
			pid:1,
			title:"CSS课程",
			type:"file"
		},
		{
			id:103,
			pid:1,
			title:"11111",
			type:"file"
		},
		{
			id:104,
			pid:1,
			title:"11111",
			type:"file"
		},
		{
			id:3,
			pid:2,
			title:"CSS课程",
			type:"file"
		},
		{
			id:201,
			pid:2,
			title:"123",
			type:"file"
		},
		{
			id:202,
			pid:2,
			title:"JS基础课程",
			type:"file"
		}
	]
		
}

var content = document.getElementsByClassName('content')[0];
//content左边区域  。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。


function getChildsById( id ){//封装一个函数  获取当前id下面的子数据
	var arr = [];
	data.files.forEach(function(value){//遍历files
		if(value.pid == id){//判断是否符合条件
			arr.push(value);
		}
	});
	return arr;
}

var num = -1;
function createTreeHtml(pid){//封装一个函数  生成结构
	var arr = getChildsById( pid );
	num++; //等级之间的padding倍数
	var k = num;  //每个层等级k不变的
	var str = '';
	if(arr.length!=0){//判断是否有子数据
		str = "<ul>";
		arr.forEach(function(value){//生成循环每一项
			str += "<li><span data-id='"+ value.id +"' data-pid='"+ value.pid +"' style='padding-left:"+ (k+1)*20 +"px'>";
			str +="<i class='down'></i>";
			str +="<i class='file'></i>";
			str += value.title+"</span>";	
			
			str += createTreeHtml(value.id); //递归
			str +="</li>";
		})
		str += "</ul>";
	}
	return str;
}		
content.innerHTML = createTreeHtml(-1) + content.innerHTML;//把生成的结构渲染到页面

var list = content.getElementsByTagName('ul')[0]; 
list.className = 'c_left'; //给最外层的ul加个class样式

//content右边区域  。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。

var contentRight = content.querySelector(' .c_right ');
var cLeft = content.querySelector(' .c_left ');
var cRList = content.querySelector(' .ct_list ');
var spans = cLeft.getElementsByTagName("span");

var cRListHtml = cRList.innerHTML; //声明一个变量，保存原来的样式

Array.from(spans).forEach(function(value){ //点击数组中的某一个 生成结构
	value.onclick = function(){//给每一个span添加点击事件
		//获取每一个span的id\
		cRList.innerHTML = cRListHtml; //每次点击把里面的值返回到原来的样子（然后在重新生成新的）
		var id1 = this.dataset.id;  //获取行间中已data开头的自定义属性（ data-XX 命名的 ） 元素.dataset.属性名
		var arr = getParentsAllById( id1 ).reverse(); 
		var str = "";
		arr.forEach(function(item){ //遍历数组arr里面的每一个 生成结构
			str +="<img src='../img/rdown.png'/>";
			str +="<span>"+ item.title +"</span>";
		})
		cRList.innerHTML += str;//渲染结构
	}
})

var datas = data.files; 
console.log(datas)
function getParentsAllById(id){//通过id获取到所有的父数据
	var arr = []; //声明一个数组；把所有的父数据放入里面
	var obj = datas.find(function (value){
			return value.id == id;
		})
	if( obj ){//判断是否存在
		arr.push( obj );
		arr = arr.concat( getParentsAllById(obj.pid) ); //递归 把得到的当前项融合一个数组 ，concat不会改变原数组  所以把得到的值赋值给arr
	}
	return arr;
}

