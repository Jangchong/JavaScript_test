//生成一个数据

var data = [
	{
		title:"微云",
		childs:[
			{
				title:"JS课程",
				childs:[
					{
						title:"123"	
					},
					{
						title:"333"
					},
					{
						title:"CSS课程",
						childs:[
							{
								title:"CSS课程"
							},
							{
								title:"123"
							},
							{
								title:"JS基础课程"
							}
						]
					},
					{
						title:"11111"
					},
					{
						title:"11111"
					}
				]
			}		
		]
	}
]

var content = document.getElementsByClassName('content')[0];
crearteHtml(data);
var num = -1;
function crearteHtml(deta){
	num++;//调用一次加一次，相当于每层级
	var k = num;//把num赋值给一个新的变量，
	var str = '<ul>';
	for(var i = 0; i<deta.length; i++){//判断每级的个数进行循环生成
//		if(i == deta.length-1){
//			num++;
//		}

		str += "<li><span style='padding-left:"+ (k+1)*20 +"px'>";
		str +="<i class='down'></i>";
		str +="<i class='file'></i>";
		str += deta[i].title+"</span>";		
		if(deta[i].childs){		//判断有没有下一级	
			str += crearteHtml(deta[i].childs);    //递归
//			num--;
		}
		str += "</li>";
	}
	
	str += "</ul>";
	return str   //返回值str
}
content.innerHTML = crearteHtml(data);

var list = content.getElementsByTagName('ul')[0];
console.log(list);
list.className = 'c_left';




