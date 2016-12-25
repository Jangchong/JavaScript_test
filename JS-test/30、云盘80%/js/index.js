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
		
		cRList.lastElementChild.className = 'last';//给后面的导航加样式
		
		t.removeClass(getTreeById(currentId),"clColor")
		t.addClass(getTreeById(fileId),"clColor");	
		currentId = fileId;//保存当前的，方便下次点击时，这个为上一个。		
		//全选不被勾选
		t.removeClass(navCheckBox,"bgI");
	}	
//-------------------------------------------交互区域----------------------------------------------------
	//一、给树形菜单点击处理
	
	//找到树形菜单里所有的span
	var spans = cLeft.getElementsByTagName("span");	
//给所有没有子级文件清除下拉按钮
//	for(var i= 0; i< spans.length; i++){	
//		if(!spans[i].nextElementSibling){
//			spans[i].firstElementChild.style.background = "none";
//		}	
//	}
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
	//  1 、单选全选
		if( target.nodeName == "I" ){
	//		alert(1);
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

//------阻止冒泡
	t.on(fileItem,"mousedown",function (ev){
		var target = ev.target;
		if(t.parent(target,'.inpText')){
			ev.stopPropagation();
		}		
	})
//-------全选框
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
//-------------------------提示框
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
//------------------------点击新建文件

	var navTitle =  document.getElementsByClassName('nav_right')[0];
	var newFile = document.getElementsByClassName('newFile')[0];	//获取新建文件按钮
	var fileNo = document.getElementsByClassName('fileNo')[0];	//获取无文件时的背景提示
	
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
		if( !newFile.isCreate ) return false; //判断是否新建状态
			
		var firstElement = fileItem.firstElementChild;//先要找到新建的第一个元素
		var fileText = firstElement.querySelector(".liText");	//文件的名字
		var inpText = firstElement.querySelector(".inpText");	//修改文件的名字
		
		var value = inpText.value.trim();//通过value值判断是否要新建		
		if( value ){  //新建
			var isExist = handle.isTitleExist(datas,value,currentId);//判断新建的文件的名字在同级是否存在
			if(isExist){
				fileItem.removeChild(firstElement);					
				promptTop('Al','命名重复');//不能有重名的项 提醒
				
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
				
				//下面的是新建成功后取消其他文件选中
				var selectAll = selectOK();
				selectAll.forEach(function(item){
					var fileIs = item.querySelector("i");
					t.removeClass(fileIs,"bgI");
					t.removeClass(item,"bgLi");
				})
				t.removeClass(navCheckBox,"bgI");
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
//-------------------------删除（delect）
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
			dialog({
				title:"删除文件",
				content:"确定要删除这个文件夹吗？已删除的文件可以在回收站找到",
				okFn:function(){
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
					handle.delectChildsAlls(datas,idArr);//删除数据里的所选子孙的数据
					cLeft.innerHTML = createTreeHtml(datas,-1);//重新渲染树形菜单
					gong(currentId);
					promptTop('Dl','删除完成');
				}
			})
			
		}else{
			promptTop('Al','请选删除文件');//提示
		}
	})	
	
	//---------------------重命名（rechristen）
	
	var rechristen = document.getElementsByClassName('rechristen')[0];
	//点击重命名判断是否有选中的文件夹
	t.on(rechristen,'mouseup',function(){
//		var fileLis =  fileItem.getElementsByClassName('.fileLiName');
		var liOK = selectOK();
		
		if(liOK.length > 1){
			promptTop('Al','不能选择多个');
			return;
		}
		
		if(!liOK.length){
			promptTop('Al','选择文件');
		}else{
			var fileName = liOK[0].getElementsByClassName("liText")[0];	//文件的名字
			var inpName = liOK[0].querySelector(".inpText");	//修改文件的名字	
			var okId = liOK[0].dataset.id;
			fileName.style.display = "none";
			inpName.style.display = 'block';			
			inpName.value = handle.getSelfById(datas,okId).title;
			inpName.select();
			inpName.onblur = function(){
				if(inpName.value.trim().length){
					if(fileName.innerHTML !== inpName.value){
						promptTop('Dl','命名成功');
					}
					fileName.style.display = "block";
					inpName.style.display = 'none';					
					fileName.innerHTML = inpName.value;
					t.removeClass(liOK[0].firstElementChild,'bgI');
					t.removeClass(liOK[0],'bgLi');
					handle.getSelfById(datas,okId).title = inpName.value;
					cLeft.innerHTML = createTreeHtml(datas,-1);//重新渲染树形菜单
					gong(currentId);
					
				}else{
					fileName.style.display = "block";
					inpName.style.display = 'none';
					t.removeClass(liOK[0].firstElementChild,'bgI');
					t.removeClass(liOK[0],'bgLi');
					promptTop('Al','命名不能为空');
				}
				
			}	
		}
		
		
	})
	
	
	//---------------------框选（createBox）
	
	
	t.on(document,'mousedown',function(ev){
		ev.preventDefault();
		if(ev.which !== 1) return;	//	右键
		
		var target = ev.target;	// 找触发源		
		if( !t.parent(target,'.file_item') ){//判断是否选择的是文件区域
			return;
			
		}	
		var iclass = false;//获取文件夹的CheckBox
		if( t.parent(target,".fileLiName") ){
				iclass = !!t.parent(target,".fileLiName").querySelector(".bgI");
		}
		
//		if(iclass){//判断是否选中
//			return;
//		}
		var div = null,
		sketchDiv = null, //剪影
		imposterDiv = null, //伪装者
		isHitElement = null;  //被碰撞的元素 
		
		var oriX = ev.clientX;//按下的X位置
		var oriY = ev.clientY;//按下的Y位置
			
		document.onmousemove = function(ev){	
			
			if(iclass){
				//如果是被选中的文件，则移动的时候（大于5像素的时候）就会生成剪影和伪装者
				if(Math.abs(ev.clientX - oriX ) < 15 && Math.abs( ev.clientY - oriY ) < 15 ){//如果移动距离没有超过5像素则执行里面，会return掉
					return;
				}
				var selectArr = selectOK();
				//生成一个剪影
				if(!sketchDiv){
					sketchDiv = document.createElement('div');
					sketchDiv.className = 'drag-img'
					sketchDiv.innerHTML = `<div class="drag-ico">
												<img src="../img/file1.png"/>
											</div>
											<span class= "drag-sum">${selectArr.length}</span>`;
											
					document.body.appendChild(sketchDiv);
					
					//生成一个div,为了让鼠标在同一个文件down和up的时候不会进入下一级
					imposterDiv = document.createElement("div")					
					imposterDiv.style.cssText = `
												width:10px;
												height:10px;
												background:red;
												position:absolute;
												left:0;
												top:0;
												opacity:0; `;
					document.body.appendChild(imposterDiv);
				}
					sketchDiv.style.left = ev.clientX+15 + "px";
			        sketchDiv.style.top = ev.clientY+15 + "px";

			        imposterDiv.style.left = ev.clientX-5 + "px";
			        imposterDiv.style.top = ev.clientY-5 + "px";
					
					//排除选中的文件
					isHitElement = null;
					var fileLis =  fileItem.getElementsByClassName('fileLiName');				
				
					for(var i= 0; i <fileLis.length;i++){
						var onoff = false;//默认是没有移入本身
						for(var j = 0; j<selectArr.length;j++){
							if(selectArr[j] == fileLis[i]){
								onoff = true;	
							}
						}
						if(onoff){//选中的则跳过碰撞检测
							continue;
						}
						if(peng(imposterDiv,fileLis[i])){
							t.addClass(fileLis[i],'bgLi');
							isHitElement = fileLis[i];
						}else{
							t.removeClass(fileLis[i],'bgLi');
						}
					}
//					if(onoff){
//						promptTop('Al','不能移至自身');
//					}
				return;	
			}
			
			
			
			if( Math.abs( ev.clientX - oriX ) > 15 || Math.abs( ev.clientY - oriY ) > 15 ){//判断是否执行框选	
				if(!div){
					div = document.createElement("div");
					div.className = "createBox";
					fileItem.appendChild(div);
				}
				div.style.left = oriX + "px";
				div.style.top = oriY + "px";
				var lis = fileItem.querySelectorAll('li');
				var is = fileItem.querySelectorAll('i');

				var fileLeft = fileItem.getBoundingClientRect().left;	//文件区域到左边可视区的距离
				var fileTop = fileItem.getBoundingClientRect().top		//文件区域到上边可视区的距离
//				if(ev.clientX < fileLeft || ev.clientY < fileTop){
//					return;
//				}
				var disX = ev.clientX
				var disY= ev.clientY
				//给框选的宽高做一个限制
				if(disX < fileLeft){
					disX = fileLeft;
				}
				if( disY < fileTop ){
					disY = fileTop;
				}
	    		div.style.width = Math.abs( disX - oriX ) + "px";
	    		div.style.height = Math.abs( disY - oriY ) + "px";
	    		div.style.left = Math.min( disX,oriX ) + "px";
	    		div.style.top = Math.min( disY,oriY )+ "px";
	    		
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
	   }
    	document.onmouseup = function(){
    		document.onmousemove = null;
    		document.onmouseup = null;
    		if(div){
    			fileItem.removeChild(div);
    			div = null;
    		}
    		if( sketchDiv ){
				document.body.removeChild(sketchDiv);
				document.body.removeChild(imposterDiv);
				sketchDiv = null;
				imposterDiv = null;
			}
    		if(isHitElement){//判断有没有移入的文件
    			var onoff = false;
    			var selectArr = selectOK();
				var selectIdArr = selectArr.map(function (item){//获取所有选中的文件id
					return item.dataset.id;
				})
				var fileId = isHitElement.dataset.id; //获取移动到文件夹的id
				
				for(var i = 0;i<selectIdArr.length;i++ ){
					//找到所选中的数据
					var selfDatas = handle.getSelfById(datas,selectIdArr[i]);
					//判断所选中的数据的名字是否存在
					var isExist = handle.isTitleExist(datas,selfDatas.title,fileId)   // Exist（存在）
					
					if( !isExist ){
						selfDatas.pid = fileId;
						fileItem.removeChild(selectArr[i]);
						promptTop('Dl','移动成功');
					}else{
						onoff = true; //onoff为true，说明有一个移动失败，因为重名了
					}
				}
				if(onoff){
					promptTop('Al','部分文件移动失败');//提示
				}	
				t.removeClass(isHitElement,'bgLi');
				cLeft.innerHTML = createTreeHtml(datas,-1);
				
				isHitElement = null;//释放一下变量，目的是移动之后，不要再up后再次出发移动的判断
    		}
    			    		
    	}	
	})
//---------封装一个检测碰撞的
	function peng(obj1,obj2){//返回结果为true //碰到
		var pos1 = obj1.getBoundingClientRect();
		var pos2 = obj2.getBoundingClientRect();
		return pos1.right > pos2.left && pos1.left < pos2.right && pos1.bottom > pos2.top && pos1.top < pos2.bottom;
	}
	

//--------------------移动到

var move = document.getElementsByClassName('move')[0];
t.on(move,'click',function(){
	//获取选中的文件
		//选中和没选中
		//选中 
	var selectArr = selectOK();
//	console.log(selectMove);
	var moveStatus =  true;//默认为true;
	var fileId = null;
	if(selectArr.length){
		//提示弹框
			dialog({
				title:"移动到",
				content:"<div class = 'c_left tree-move'>"+createTreeHtml(datas,-1)+"</div>",
				okFn:function(){
					//是否要关闭弹框
					if(moveStatus){
						return true;
					}else{
						//可以关闭弹框，说明可以移动了
						//fileId 移动的目标目录
						//移动的数据
						var onoff = false;
						for(var i = 0;i<selectIdArr.length;i++ ){
							//找到所选中的数据
							var selfDatas = handle.getSelfById(datas,selectIdArr[i]);
							//判断所选中的数据的名字是否存在
							var isExist = handle.isTitleExist(datas,selfDatas.title,fileId)   // Exist（存在）
							
							if( !isExist ){
								selfDatas.pid = fileId;
								fileItem.removeChild(selectArr[i]);
							}else{
								onoff = true; //onoff为true，说明有一个移动失败，因为重名了
							}
						}
						if(onoff){
							promptTop('Al','部分文件移动失败');//提示
						}	
						cLeft.innerHTML = createTreeHtml(datas,-1);
					}
				}
			}); 
			//给移动的树形菜单添加点击样式
			var treeMove = document.getElementsByClassName('tree-move')[0];
			//通过选中的文件，找到对应的数据			
			var selectIdArr = [];  //保存的是选中的id
			for(var i = 0;i<selectArr.length;i++){
				selectIdArr.push(selectArr[i].dataset.id);
			}
//			console.log(selectIdArr);
			var selectData = handle.getChildsIdArrs(datas,selectIdArr);//获取所有选中的子孙数据

			var error = document.querySelector(".error");//提醒错误的元素
			
			var treeone = treeMove.querySelectorAll('.tree-title')[0];//获取第一个元素微云
			t.addClass(treeone,"clColor");//先给微云加上背景
			
			var currentElement = treeone;//把当前的先存到一个变量里
			t.on(treeMove,'click',function(ev){
				var target = ev.target;
				if( target = t.parent(target,".tree-title") ){
					//添加class					
					t.removeClass(currentElement,"clColor");
					t.addClass(target,"clColor");
					currentElement = target;
					
					fileId = target.dataset.id;
					//通过fileId找到对应的数据
					var oneData = handle.getSelfById(datas,fileId);
					
					
					//通过选中的id，找到对应的数据，目的是找到pid
					var selfData = handle.getSelfById(datas,selectIdArr[0]);
					if( fileId == selfData.pid ){
						error.innerHTML = "该文件下已经存在";
						moveStatus = true;//不能关闭弹框
						return;
					}
					
					//判断oneData 是否存在所选择的数组中
					var onoff = false;//给个表示是否存在状态，false无
					
					for( var i = 0; i < selectData.length; i++ ){
						if( oneData.id == selectData[i].id ){
							onoff = true;//循环完成会得到onoff的状态
							break;
						}
					}
					
					if(onoff){
						error.innerHTML = "不能移动到自身或其子文件夹下";
						moveStatus = true; //不能关闭弹框
					}else{
						error.innerHTML = "";
						moveStatus = false;//可以关闭弹框
					}
					
				}
			})
			
	}else{
		promptTop('Al','请选择移动文件');//提示
	}
})


})();


	
	
	
	
	
	
	
	
	
	

