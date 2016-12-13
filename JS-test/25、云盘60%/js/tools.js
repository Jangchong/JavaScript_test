(function(){
	var methods = {
		//判断是否有class
		hasClass(element,className){
			var classArr = element.className.split(" ");
			for(var i = 0; i<classArr.length; i++){
				if(classArr[i] == className){
					return true
				}
			}
			return false
		},
		//给元素添加指定的class
		addClass(element,className){
			if(!methods.hasClass(element,className)){
				element.className += " "+ className;
			}
		},
		//删除指定的class
		removeClass(element,className){
			if(methods.hasClass(element,className)){
				var classArr = element.className.split(" ");
				for(var i = classArr.length-1;i >=0 ;i--){
					if(classArr[i] == className){
						classArr.splice(i,1);
					}
					element.className = classArr.join(" ");
				}
			}
		},
		//找所指定class的div
		parent(element,attr){
			var firstChar = attr.charAt(0);
			if(firstChar == '.'){
				while(element.nodeType != 9 && !methods.hasClass( element,attr.slice(1) )){
					//element没有指定的class，那么element就为父级，继续向上找
					element = element.parentNode;
				}
			}else if(firstChar == '#'){
				while(element.nodeType!= 9 && element.id !== attr.slice(1)){
					element = element.parentNode;
				}
			}
			
			return element.nodeType === 9 ? null : element;
		}
	}
	window.t = methods;
})();
