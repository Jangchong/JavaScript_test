

var handle = {
	//通过id找到对应的数据
	getSelfById(data,id){
		return data.find(function(value){
			return value.id == id;
		})
	},
	//通过id找到子数据
	getChildsById(data,id){
		return data.filter(function(value){// 遍历files
			return value.pid == id;  //判断是否符合条件
		})
	},	
	//通过id找到所有的父数据，包括自己
	getParentsById(data,id){
		var arr = [];
		var self = handle.getSelfById(data,id);
		if(self){
			arr.push(self);
			arr = arr.concat(handle.getParentsById(data,self.pid));
		}
		return arr;
	},
	//在指定id的所有的子数据中，是否存在某一个title
	// 存在 true
	// 不存在 false
	isTitleExist(data,value,id){
		var childs = handle.getChildsById(data,id);  //先找到指定id的所有子级
		return childs.findIndex(function(item){
			return item.title === value;
		}) !== -1;
	},
	//通过指定的id找到所有的子数据，放到数组里
	getChildsIdAll(data,id){
		var arr= [];
		var self = handle.getSelfById(data,id);//找到自己		
		arr.push(self);		
		var childs = handle.getChildsById(data,self.id);//找到子数据
		
		childs.forEach(function(value){
			arr = arr.concat(handle.getChildsIdAll(data,value.id));
		})
		return arr;
	},
	//如果是找到多个id的子数据，就要循环去获取每个id的子数据，然后拼接成一个数组
	getChildsIdArrs(data,idArr){
		var arr = [];
		idArr.forEach(function(value){
			arr = arr.concat(handle.getChildsIdAll(data,value));
		})
		return arr;
	},
	//删除指定的子孙数据
	delectChildsAlls(data,id){
		var childsAll = handle.getChildsIdArrs(data,id);//获取所有的子孙数据
		for(var i = 0; i<data.length;i++){
			for(var j = 0; j<childsAll.length;j	++){
				if( data[i] == childsAll[j] ){
					data.splice(i,1);//从数据中删掉
					i--;
					break;
				}
			}
		}
		
	}
		
}
