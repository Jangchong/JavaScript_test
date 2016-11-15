	var tab1 = document.getElementById("tab1").tBodies[0];
	var form1 = document.getElementById("form1");
	
	var num = data.length;
//	creatTr(data[0]);
	
	for (var i = 0; i < data.length; i++) {
		creatTr( data[i] );
	}
	
	form1.go.onclick = function(){
//		判断信息是否完整
		if( form1.username.value == ""|| form1.sex.value == "" || form1.age.value == ""){
			alert( "请输入完整信息~" );
			return;
		}
		//说明信息是完整的
		num++;//改变最大的编号值
		creatTr( {
			"id": num,
            "name" : form1.username.value,
            "sex" : form1.sex.value,
            "age" : form1.age.value
		} )
	}
	
	function creatTr(obj){//根据obj生成一行tr
		var tr = document.createElement("tr");
		var td0 = document.createElement("td");
		var inp = document.createElement("input");
		inp.type = "checkbox";
		td0.appendChild( inp );
		tr.appendChild( td0 );
		
		var td1 = document.createElement("td");
		td1.innerHTML = obj.id;
		tr.appendChild( td1 );
		
		var td2 = document.createElement("td");
		td2.innerHTML = obj.name;
		tr.appendChild( td2 );
		
		var td3 = document.createElement("td");
		td3.innerHTML = obj.sex;
		tr.appendChild( td3 );
		
		var td4 = document.createElement("td");
		td4.innerHTML = obj.age;
		tr.appendChild( td4 );
		
		var td5 = document.createElement("td");
		
		var inp1 =document.createElement("input");
		inp1.type = "button";
		inp1.value = "上移";
		td5.appendChild( inp1 );
		
		var inp2 =document.createElement("input");
		inp2.type = "button";
		inp2.value = "下移";
		td5.appendChild( inp2 );
		
		var inp3 =document.createElement("input");
		inp3.type = "button";
		inp3.value = "删除";
		td5.appendChild( inp3 );
		
		tr.appendChild( td5 );
		
		tab1.appendChild( tr );
	}