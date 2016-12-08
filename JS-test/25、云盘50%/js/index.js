

var content = document.getElementsByClassName('content')[0];


//通过数据渲染出来 树形菜单、导航、和文本内容
var datas = data.files; //获取到数据

//1、渲染左边树形菜单

var num = -1;
function createTreeHtml(id){//封装一个函数  生成树结构
	var arrchilds = handle.getChildsById(datas,id); //获取子数据
	
	num++; //等级之间的padding倍数
	var k = num;  //每个层等级k不变的
	var str = '';
	if(arrchilds.length!=0){//判断是否有子数据
		str = "<ul>";
		arrchilds.forEach(function(value){//生成循环每一项
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


//2、渲染导航
//生成指定id的导航的html结构
function createNavHtml(id){
	//找到id的所有父级
	//指定一个id，找到这个id对应的数据的所有的父数据
	var parents =handle.getParentsById(datas,id).reverse();
	var navHtml = '';
	parents.forEach(function(item){
		navHtml +=	"<img src='../img/rdown.png'/>";
		navHtml +=	"<span data-id=" + item.id + ">"+ item.title +"</span>";
	})
	
	return navHtml;
}


//3、渲染内容文档
//生成指定id下的所有的子数据
	
function createFilesHtml(id){	
	var arrchilds = handle.getChildsById(datas,id); //获取子数据
//	console.log(arrchilds.length);
	if(arrchilds.length){
		var filesHtml = '';
		arrchilds.forEach(function(value){
			filesHtml += "<li data-id=" + value.id + "><i></i><img src='../img/file1.png'><span>" + value.title + "</span></li>";
		});
		return filesHtml;
	}else{
		var filesHtml = "<span class='fileNo'><img src='../img/fileno.png'></span>";
		return filesHtml;
	}
	
}


(function(){//自执行
	
	content.innerHTML = createTreeHtml(-1) + content.innerHTML;//把生成的结构渲染到页面
	
	var list = content.getElementsByTagName('ul')[0]; 
	list.className = 'c_left'; //给最外层的ul加个class样式
	
	var contentRight = content.querySelector(' .c_right ');
	var cLeft = content.querySelector(' .c_left ');
	var cRList = content.querySelector(' .ct_list ');
	
	var fileItem = content.querySelector(' .file_item ');
	
	//添加树形菜单点击处理
	//找到所有的span
	var spans = cLeft.getElementsByTagName("span");	
	//给指定的菜单添加样式
	var currentId = 0;
	
	function positionSpanById(id){//给树形菜单目录添加点击处理背景样式
		//给点击的span添加
		for(var i = 0; i<spans.length;i++){
			var fileId = spans[i].dataset.id;
			if(fileId == id ){
//				spans[i].style.background = 'red';
				return spans[i];
			}
		}
	}
	positionSpanById(currentId).className = 'clColor';
	
	
//	var cRListHtml = cRList.innerHTML; //声明一个变量，保存原来的样式 //这里出现小发现
	//给所有的span添加点击处理
	for(var i = 0; i<spans.length;i++){
		spans[i].onclick = function(){
			var fileId = this.dataset.id;
//			cRList.innerHTML = cRListHtml;   //这里出现小发现

			cRList.innerHTML = createNavHtml(fileId); //渲染导航		
			fileItem.innerHTML = createFilesHtml(fileId);//渲染文件区域
			
			positionSpanById(currentId).className = '';  //清除上一个样式
			positionSpanById(fileId).className = 'clColor';
			currentId = fileId;//保存当前的，方便下次点击时，这个为上一个。
		}
	}

	
	//给导航点击处理
	cRList.onclick = function(ev){ //点击整个导航区域 
		var target = ev.target;	// 找触发源
		if( target.nodeName.toLowerCase() === "span" ){
			var fileId = target.dataset.id;
			//渲染导航
			cRList.innerHTML = createNavHtml(fileId);
			//渲染文件区域
			fileItem.innerHTML = createFilesHtml(fileId);
			
			positionSpanById(currentId).className = '';
			positionSpanById(fileId).className = 'clColor';
			currentId = fileId;	
		}
	};	
	
//	var fileLis = fileItem.getElementsByTagName('li');
	
	fileItem.onclick = function(ev){ //点击整个导航区域 
		var target = ev.target;	// 找触发源
		alert("点击文件边缘")
		console.log(target.nodeName.toLowerCase())
		if( target.nodeName.toLowerCase() === "li" ||  target.nodeName.toLowerCase() === "img"){
			
			var fileId = target.dataset.id;
			//渲染导航
			cRList.innerHTML = createNavHtml(fileId);
			//渲染文件区域
			fileItem.innerHTML = createFilesHtml(fileId);
			
			positionSpanById(currentId).className = '';
			positionSpanById(fileId).className = 'clColor';
			currentId = fileId;	
		}
	};	

})();







//content右边区域  。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。


