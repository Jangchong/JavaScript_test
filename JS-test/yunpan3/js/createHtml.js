
//生成树形菜单
function createTreeHtml(datas,id){//封装一个函数  生成树结构
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
				
				str += createTreeHtml(datas,value.id); //递归
				str +="</li>";
			})
			str += "</ul>";
		}
		return str;
	}	
	
//生成导航
	function createNavHtml(datas,id){	
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
//生成文本区域
	function createFilesHtml(datas,id){	
		var arrchilds = handle.getChildsById(datas,id); //获取子数据
		var fileNo = document.getElementsByClassName('fileNo')[0];
	//	console.log(arrchilds.length);
		if(arrchilds.length){
			fileNo.style.display = "none";
			var filesHtml = '';
			arrchilds.forEach(function(value){
				filesHtml += "<li data-id=" + value.id + " class='fileLiName'><i></i><img src='../img/file1.png'><span>" + value.title + "</span><input type='text' class='liText'/></li>";
			});
			return filesHtml;
		}else{
//			var filesHtml = "<span class='fileNo'><img src='../img/fileno.png'></span>";
//			return filesHtml;
			
			fileNo.style.display = "block";
		}
		
	}		












