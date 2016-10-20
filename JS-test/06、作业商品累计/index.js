var list = document.getElementById("list");
var lis =list.getElementsByTagName("li");
var p =document.getElementsByTagName("p")[0];
var span1 =p.getElementsByTagName("span");
var strongs=list.getElementsByTagName("strong");
var ems =list.getElementsByTagName("em");
var a=0;
var b = 0;
var n1=0;
var c=0;
var shu = 0;
function fn1(n){

	var inpus =lis[n].getElementsByTagName("input");
	var strong =lis[n].getElementsByTagName("strong")[0];
	var em =lis[n].getElementsByTagName("em")[0];
	var span = lis[n].getElementsByTagName("span")[0];
	var num=0;
	
//	var money = [12.5,10.5,8.5,8,14.5];
	
	//console.log(inpus);
		inpus[0].onclick = function(){
			if(num>0){
				num--;
				a--;
				b-=parseFloat(em.innerHTML);
			}
			strong.innerHTML = num;
			span.innerHTML = (parseFloat(em.innerHTML)*num)+'元';
			shu=0;
			for(var i =0;i<lis.length;i++){
					
					if(strongs[i].innerHTML>0){
						c=i;
						if(parseFloat(ems[c].innerHTML)>shu){
							shu=parseFloat(ems[c].innerHTML);
						}
					}
	
			}
			p.innerHTML='商品合计共：'+ a +'件，共花费了：'+b+'<br />'+
'其中最贵的商品单价是：'+ shu +'元';
		}
		
		inpus[1].onclick = function(){
			num++;
			a++;
			b+=parseFloat(em.innerHTML);
			strong.innerHTML =num;
	//		alert(em)
//			console.log(this.index);
			span.innerHTML = (parseFloat(em.innerHTML)*num)+'元';
			for(var i =0;i<lis.length;i++){
					
					if(strongs[i].innerHTML>0){
						c=i;
						
						if(parseFloat(ems[c].innerHTML)>shu){
							shu=parseFloat(ems[c].innerHTML);
						}
					}
					
			}
//			console.log(c);
			p.innerHTML='商品合计共：'+ a +'件，共花费了：'+b+'<br />'+
'其中最贵的商品单价是：'+shu+'元';
		}
		
		
		
		
		
}
for (var i = 0; i < lis.length; i++) {
				fn1( i );
				
			}



