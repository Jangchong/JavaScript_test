

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
	}
	
}
