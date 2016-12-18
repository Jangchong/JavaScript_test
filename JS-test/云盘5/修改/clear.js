//	var fileLis = fileItem.getElementsByTagName('li');
	
//	fileItem.onclick = function(ev){ //点击整个文本区域 
//		var target = ev.target;	// 找触发源
//		alert("点击文件边缘")
//		console.log(target.nodeName.toLowerCase())
//		if( target.nodeName.toLowerCase() === "li" ||  target.nodeName.toLowerCase() === "img"){
//			
//			var fileId = target.dataset.id;
//			//渲染导航
//			cRList.innerHTML = createNavHtml(fileId);
//			//渲染文件区域
//			fileItem.innerHTML = createFilesHtml(fileId);
//			
//			positionSpanById(currentId).className = '';
//			positionSpanById(fileId).className = 'clColor';
//			currentId = fileId;	
//		}
//	};	




//内容左边  目录导航收放导航

			
			for(var i=0;i<spans.length;i++){//给所有h2添加点击事件
				spans[i].index=i;//索引
				spans[i].onoff=true;
				spans[i].onclick=function(){
					if(this.nextElementSibling){//判断兄弟级下一个有没有
						if(this.onoff){	//判断是否展开					
							var uls=this.parentNode.parentNode.children;
							for(var i=0;i<uls.length;i++){
								uls[i].children[0].onoff=true;
								if(uls[i].children[1]){
									uls[i].children[1].style.display='none';
								uls[i].children[1].previousElementSibling.innerHTML=uls[i].children[1].previousElementSibling.innerHTML.split('-').join('+');
								
								}
							}
							
							
							spans[this.index].nextElementSibling.style.display='block';
//							var str =h2s[this.index].innerHTML.charAt(0);
//							spans[this.index].innerHTML=spans[this.index].innerHTML.split('+').join('-');
							
						}else{
							var huls =spans[this.index].nextElementSibling.getElementsByTagName('ul');
							for(var i=0;i<huls.length;i++){								
								huls[i].style.display='none';
								huls[i].previousElementSibling.onoff=true;
//								console.log(hs);
								var hs=huls[i].previousElementSibling;
//								var str =hs.innerHTML.charAt(0);
//								hs.innerHTML=hs.innerHTML.split(str).join('+');
								hs.innerHTML=hs.innerHTML.split('-').join('+');	
							}
							spans[this.index].nextElementSibling.style.display='none';
//							spans[this.index].innerHTML=spans[this.index].innerHTML.split('-').join('+');
//							var str =h2s[this.index].innerHTML.charAt(0);
//							h2s[this.index].innerHTML=h2s[this.index].innerHTML.split(str).join('+');
						}
						this.onoff=!this.onoff;					
					}					
				}
			}
			




