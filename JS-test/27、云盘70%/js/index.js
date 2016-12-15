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
	var cLeft = content.querySelector(' .c_left ');
	cLeft.innerHTML = createTreeHtml(datas,-1);

	function getTreeById(id){//获取指定id对应的树形菜单的标题
		var treeSpans = cLeft.querySelectorAll("span");
		for( var i = 0; i < treeSpans.length; i++ ){
			if( treeSpans[i].dataset.id == id ){
				return treeSpans[i];
			}
		}
	}
	t.addClass(getTreeById(0),"clColor");//初始的时候给id为0的树形菜单标题添加class
	
	//2、渲染导航
	//生成指定id的导航的html结构
	var cLeft = content.querySelector(' .c_left ');
	var cRList = content.querySelector(' .ct_list ');
	cRList.innerHTML = createNavHtml(datas,0);//渲染导航
	
	
	//3、渲染内容文档
	//生成指定id下的所有的子数据
	var fileItem = content.querySelector(' .file_item ');		
	fileItem.innerHTML = createFilesHtml(datas,0);//渲染文件区域
	
//-------------------------------------------公共渲染区域---------------------------------------------
	function gong(fileId){
		cRList.innerHTML = createNavHtml(datas,fileId); //渲染导航	
		//渲染文件区域		
		var arrchilds = handle.getChildsById(datas,fileId); //获取子数据
		var fileNo = document.getElementsByClassName('fileNo')[0];
		//有子数据
		if( arrchilds.length ){
			fileNo.style.display = "none";
		}else{
			fileNo.style.display = "block";
		}
		fileItem.innerHTML = createFilesHtml(datas,fileId);//渲染文件区域
		
		cRList.lastElementChild.className = 'last';
		
		t.removeClass(getTreeById(currentId),"clColor")
		t.addClass(getTreeById(fileId),"clColor");
		
		currentId = fileId;//保存当前的，方便下次点击时，这个为上一个。
		
		//全选不被勾选
		t.removeClass(navCheckBox,"bgI");
	}
	
//-------------------------------------------交互区域----------------------------------------------------


	//添加树形菜单点击处理
	
	//找到树形菜单里所有的span
	var spans = cLeft.getElementsByTagName("span");	
	//给指定的菜单添加样式
	var currentId = 0;//声明一个变量，添加添加背景-初始背景为0
	t.on(cLeft,'click',function(ev){
		var target = ev.target;
		if( target = t.parent(target,".tree-title") ){
			var fileId = target.dataset.id;
			gong(fileId);
		}
	})

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
	t.on(fileItem,'click',function(ev){
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
		}
		//渲染内容文本
		
	});
//计入下一级
	t.on(fileItem,'click',function(ev){
			var target = ev.target;	// 找触发源	
			if( target.nodeName == "I"|| target.nodeName == "INPUT"){
				return;
			}
			if(target = t.parent(target,".fileLiName")){
				var fileId = target.dataset.id;			
				gong(fileId);//渲染
			}
	});

//阻止冒泡
	t.on(fileItem,"mousedown",function (ev){
		var target = ev.target;
		if(t.parent(target,'.inpText')){
			ev.stopPropagation();
		}
			
	})

	
//全选框
	t.on(navCheckBox,'click',function(){
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
	})
//---------------------------提示框--------------------------------------------------------
		var prompt = document.querySelector(".prompt");
		var ico = prompt.querySelector(".alert-ico");
	
		function promptTop(className,message){
			//先拉倒-32 在过渡到0
			prompt.style.transition = "none";
			prompt.style.top = "-42px";
			prompt.className = 'prompt';	
			setTimeout(function (){
				t.addClass(prompt,className);
				prompt.style.transition = "0.3s";
				prompt.style.top = "0";	
			},0)
	
			ico.innerHTML = message;
			clearTimeout(prompt.timer);
			prompt.timer = setTimeout(function (){
				prompt.style.top = "-42px";
			},2000)	
		}
//-------------------------------点击新建文件

	var navTitle =  document.getElementsByClassName('nav_right')[0];
//	var navAs = navTitle.getElementsByTagName('a');	
	var newFile = document.getElementsByClassName('newFile')[0]; //获取新建文件按钮
	var fileNo = document.getElementsByClassName('fileNo')[0];
	
	t.on(newFile,'mouseup',function(){
		//直接添加结构
		var firstElement = fileItem.firstElementChild;
		var createNewFile = createFileElement();//新建文件
		if(firstElement){
			fileItem.insertBefore(createNewFile,firstElement);
		}else{
			fileItem.appendChild(createNewFile);
		}
		
		
		var fileText = createNewFile.querySelector(".liText");
		var inpText = createNewFile.querySelector(".inpText");

		fileText.style.display = "none";
		inpText.style.display = "block";
		fileNo.style.display = 'none';

		inpText.focus();

		newFile.isCreate = true;  //新建的状态

	})
	
	t.on(document,'mousedown',createFile);//鼠标事件
	t.on(document,'keyup',function(ev){//键盘事件
		if(ev.keyCode == 13){
			createFile();
		}
	});
	function createFile(){
		if( !newFile.isCreate ) return false;
		
		//先要找到新建的第一个元素
		var firstElement = fileItem.firstElementChild;
		var fileText = firstElement.querySelector(".liText");
		var inpText = firstElement.querySelector(".inpText");
		//通过value值判断是否要新建
		var value = inpText.value.trim();
		if( value ){  //新建
			//判断新建的文件的名字在同级是否存在
			var isExist = handle.isTitleExist(datas,value,currentId);
			if(isExist){
				fileItem.removeChild(firstElement);
				//不能有重名的项 提醒		
				promptTop('Al','命名重复');//提示
				
			}else{ //不存在，新建成功
				//添加信息				
				fileText.style.display = "block";
				inpText.style.display = "none";
				fileText.innerHTML = value;
				
				var id = Math.random();
				datas.unshift({
					id:id,
					pid:currentId,
					title:value,
					type:"file"
				});
				
				firstElement.setAttribute("data-id",id);//给新建的文件添加data-id
				
				var parentId = cRList.lastElementChild.dataset.id //获取导航的最后一个元素的id
				cLeft.innerHTML = createTreeHtml(datas,-1);	
				
				t.addClass(getTreeById(parentId),"clColor"); //给渲染后的树形菜单添加本有的背景
				promptTop('Dl','新建成功');//提示
			}
		}else{
			promptTop('Al','请输入名字');//提示
			var childs = handle.getChildsById(datas,currentId);

			if( !childs.length ){
				fileNo.style.display = "block";
			}
			fileItem.removeChild(firstElement);
		}
		newFile.isCreate = false;
	}
//----------------------------删除（delect）
	//找选中的文件
	var fileIs = fileItem.getElementsByTagName('i');
	function selectOK(){
		return Array.from(fileIs).filter(function (item){
			return t.hasClass(item,"bgI");	
		}).map(function (item){
			return t.parent(item,".fileLiName");
		})
	}
	var delect = document.getElementsByClassName('delect')[0];
	t.on(delect,'click',function(){//点击删除
		var selectAll = selectOK();
		if(selectAll.length){//判断有没有选中的元素
			var id = selectAll[0].dataset.id;
			var idArr = [];
			for( var i = 0; i < selectAll.length; i++ ){
				idArr.push(selectAll[i].dataset.id);
			}
//			console.log(idArr)//获取选中的id
//			console.log(handle.getChildsIdAll(datas,idArr));//单个选中的id的子数据
//			console.log(handle.getChildsIdArrs(datas,idArr));//多个选中的id下面的所有子数据
			//要删除拿到的数据
//			var arr = handle.getChildsIdArrs(datas,idArr)
			handle.delectChildsAlls(datas,idArr);
			cLeft.innerHTML = createTreeHtml(datas,-1);
			gong(currentId);
			promptTop('Dl','删除完成');
		}else{
			promptTop('Al','请选删除文件');//提示
		}
	})
	
	
	//----------------- -----重命名（rechristen）
	
	//-----------------------框选
	t.on(document,'mousedown',function(ev){
		
		var target = ev.target;	// 找触发源		 
		if(target.nodeName == 'UL'){
			var div = document.createElement("div");
			div.className = "createBox";
			fileItem.appendChild(div);
			
			var oriX = ev.clientX;
			var oriY = ev.clientY;
			
			div.style.left = oriX + "px";
			div.style.top = oriY + "px";
			var lis = fileItem.querySelectorAll('li');
			var is = fileItem.querySelectorAll('i');
			document.onmousemove = function(e){		
	    		div.style.width = Math.abs( e.clientX - oriX ) + "px";
	    		div.style.height = Math.abs( e.clientY - oriY ) + "px";
	    		div.style.left = Math.min( e.clientX,oriX ) + "px";
	    		div.style.top = Math.min( e.clientY,oriY ) + "px";
	    		
				for(var i = 0; i<is.length; i++){
					if(!t.hasClass(is[i],"bgI")){//判断所有的li是否选中，有一个没选中执行里面的
						t.removeClass(navCheckBox,"bgI");	
						break;
					}
					t.addClass(navCheckBox,"bgI");
				}
				
	    		for (var i = 0; i < lis.length; i++) {//让div和每一个li进行碰撞检测
	    			if( peng(div,lis[i]) ){//碰到
	    				is[i].className = 'bgI';
	    				t.addClass(lis[i],'bgLi');
	    			}else{
	    				is[i].className = 'none';
	    				t.removeClass(lis[i],'bgLi');
	    			}
	    		}
	    		
	    	}
	    	document.onmouseup = function(){
	    		document.onmousemove = null;
	    		document.onmouseup = null;
	    		fileItem.removeChild(div);
	    	}
	  	 }
		
    	return false;	
	})
	//封装一个检测碰撞的
	function peng(obj1,obj2){//返回结果为true //碰到
		var pos1 = obj1.getBoundingClientRect();
		var pos2 = obj2.getBoundingClientRect();
		return pos1.right > pos2.left && pos1.left < pos2.right && pos1.bottom > pos2.top && pos1.top < pos2.bottom;
	}
	
	
})();


	
	
	
	
	
	
	
	
	
	
	
	
	
	


//content右边区域  。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。


