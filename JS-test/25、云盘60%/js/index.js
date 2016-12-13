(function(){//自执行
	//让content自适应
		var content = document.getElementsByClassName('content')[0];		
		var header = document.querySelector(".title");
		function resize(){
			var clientH = document.documentElement.clientHeight;
			content.style.height = clientH - header.offsetHeight + "px";
		}
		window.onresize = resize;
		resize();
		
//通过数据渲染出来 树形菜单、导航、和文本内容	
	var datas = data.files; //获取到数据	
//-------------------------------------------渲染区域--------------------------------------------------
	//1、渲染左边树形菜单
	
	var num = -1;
	function createTreeHtml(id){//封装一个函数  生成树结构
		var arrchilds = handle.getChildsById(datas,id); //获取子数据
			
		var str = '';
		if(arrchilds.length!=0){//判断是否有子数据
	//		num++; //等级之间的padding倍数
	//		var k = num;  //每个层等级k不变的
			
			str = "<ul>";
			arrchilds.forEach(function(value){//生成循环每一项	
				var arr = handle.getParentsById(datas,value.id);
				
				str += "<li><span data-id='"+ value.id +"' data-pid='"+ value.pid +"' style='padding-left:"+ arr.length*20 +"px'>";
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
	
	//2、渲染导航
	//生成指定id的导航的html结构
	var cLeft = content.querySelector(' .c_left ');
	var cRList = content.querySelector(' .ct_list ');
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
	cRList.innerHTML = createNavHtml(0);//渲染导航
	
	//3、渲染内容文档
	//生成指定id下的所有的子数据
	var fileItem = content.querySelector(' .file_item ');	
	function createFilesHtml(id){	
		var arrchilds = handle.getChildsById(datas,id); //获取子数据

	//	console.log(arrchilds.length);
		if(arrchilds.length){
			var filesHtml = '';
			arrchilds.forEach(function(value){
				filesHtml += "<li data-id=" + value.id + " class='fileLiName'><i></i><img src='../img/file1.png'><span>" + value.title + "</span><input type='text' class='liText'/></li>";
			});
			return filesHtml;
		}else{
			var filesHtml = "<span class='fileNo'><img src='../img/fileno.png'></span>";
			return filesHtml;
		}
		
	}		
	fileItem.innerHTML = createFilesHtml(0);//渲染文件区域
	
//-------------------------------------------公共渲染区域---------------------------------------------
	function gong(fileId){
		cRList.innerHTML = createNavHtml(fileId); //渲染导航		
		fileItem.innerHTML = createFilesHtml(fileId);//渲染文件区域
		
		cRList.lastElementChild.className = 'last';
		
		positionSpanById(currentId).className = '';  //清除上一个样式
		positionSpanById(fileId).className = 'clColor';
		currentId = fileId;//保存当前的，方便下次点击时，这个为上一个。
		//全选不被勾选
		t.removeClass(navCheckBox,"bgI");
	}
	
//-------------------------------------------交互区域----------------------------------------------------


	//添加树形菜单点击处理
	
	//找到所有的span
	var spans = cLeft.getElementsByTagName("span");	
	//给指定的菜单添加样式
	var currentId = 0;//声明一个变量，添加添加背景-初始背景为0
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
	
	var buttonSpan = cLeft.getElementsByTagName('span');//获取树形菜单的所有span
	for(var i = 0; i<spans.length;i++){
		if(!buttonSpan[i].nextElementSibling){
			buttonSpan[i].firstElementChild.style.background = "none";
		}	
		spans[i].onclick = function(){
			var fileId = this.dataset.id;			
			gong(fileId);//渲染
		}
	}
	
	//二、给导航点击处理
	cRList.onclick = function(ev){ //点击整个导航区域 
		var target = ev.target;	// 找触发源
		if( target.nodeName.toLowerCase() === "span" ){
			var fileId = target.dataset.id;
			gong(fileId);//渲染
		}
	};	
	cRList.lastElementChild.className = 'last'; //给导航最后一个添加样式
	
	//三、给文本区域添加点击处理
	var contentRight = content.querySelector(' .c_right ');
	var navCheckBox = document.querySelector('.button ');
	fileItem.onclick = function(ev){
		var target = ev.target;	// 找触发源	
	 // 1 、单选全选
		if( target.nodeName == "I" ){
//			alert(1);
			if(!t.hasClass(target,"bgI")){
				t.addClass(target,"bgI");
				t.addClass(target.parentNode,"bgLi");
			}else{
				t.removeClass(target,"bgI");
				t.removeClass(target.parentNode,"bgLi");
			}
			var fileIs = fileItem.getElementsByTagName('i');
			for(var i = 0; i<fileIs.length; i++){
				if(! t.hasClass(fileIs[i],"bgI")){//判断所有的li是否选中，有一个没选中执行里面的
					t.removeClass(navCheckBox,"bgI");
					return;
				}
			}
			t.addClass(navCheckBox,"bgI");//给总选框加选中；走到这一步说明上面所有的li都选中了
			return;			
		}
		//渲染内容文本
		if(target = t.parent(target,".fileLiName")){
			var fileId = target.dataset.id;			
			gong(fileId);//渲染
		}
	}

//全选框
	
	navCheckBox.onclick = function(){
		var childs = handle.getChildsById(datas,currentId);
		if(!childs.length) return ;
		var fileIs = fileItem.getElementsByTagName('i');
		if(!t.hasClass(navCheckBox,"bgI")){
			t.addClass(navCheckBox,"bgI");
			for(var i = 0; i<fileIs.length; i++){
				t.addClass(fileIs[i],"bgI");
				t.addClass(fileIs[i].parentNode,"bgLi");
				
			}
		}else{
			t.removeClass(navCheckBox,"bgI");
			for(var i = 0; i<fileIs.length; i++){
				t.removeClass(fileIs[i],"bgI");
				t.removeClass(fileIs[i].parentNode,"bgLi");
			}
		}	
	}

//点击新建文件
	var navTitle =  document.getElementsByClassName('nav_right')[0];
	var navAs = navTitle.getElementsByTagName('a');
		
	navAs[5].onmouseup = function(){
		var a = 0;
		var filesHtml = "";
		filesHtml += "<li data-id='9999' class='fileLiName'><i></i><img src='../img/file1.png'><span style = 'display:none' >" + a + "</span><input type='text' class='liText' style = 'display:block;'/></li>";
		fileItem.innerHTML = filesHtml + fileItem.innerHTML;		
		var inp = fileItem.getElementsByTagName('input')[0];
		var spanText = fileItem.getElementsByTagName('span')[0];
		inp.focus();
		inp.onclick = function(e){
			e.cancelBubble = true;
		}
		inp.onblur = function(){
			if(inp.value.length){
				spanText.innerHTML= inp.value;
				inp.style.display= "none";
				spanText.style.display ='block';
			}else{
				var lis = fileItem.getElementsByTagName("li")[0];	
				fileItem.removeChild(lis);
			}	
		}
	}

//点击删除
	navAs[4].onmouseup = function(){
		var fileIs = fileItem.getElementsByTagName('i');
		var lis = fileItem.getElementsByTagName("li");
			for(var i = fileIs.length-1; i>=0; i--){
				if(t.hasClass(fileIs[i],"bgI")){//判断所有的li是否选中，有一个没选中执行里面的
					fileItem.removeChild(lis[i]);
				}
			}
	}

	
})();


	
	
	
	
	
	
	
	
	
	
	
	
	
	


//content右边区域  。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。


