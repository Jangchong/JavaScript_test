//获取元素
var con_img1 = document.getElementById("con_img1");
var con_img2 = document.getElementById("con_img2");

var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");

var xb1 = document.getElementById("xb1");
var xb2 = document.getElementById("xb2");

var lldj= document.getElementById("lldj");
var lrdj= document.getElementById("lrdj");
var rldj= document.getElementById("rldj");
var rrdj= document.getElementById("rrdj");

var btn1= document.getElementById("btn1");
var btn2= document.getElementById("btn2");

var leftArr =["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg"];
var rightArr =["img/01.jpg","img/02.jpg","img/03.jpg"];
var a = 0;
var b = 0;
lrdj.onclick = function(){
	a++;
	a %= leftArr.length;
	con_img1.src = leftArr[a];
	p1.innerHTML ="这是第一组的第"+(a+1)+"张";
	xb1.innerHTML = (a+1)+"/"+leftArr.length;
}

lldj.onclick = function(){
	a--;
	if(a<0){
		a = leftArr.length-1;
	}
	a %= leftArr.length;
	con_img1.src = leftArr[a];
	p1.innerHTML ="这是第一组的第"+(a+1)+"张";
	xb1.innerHTML = (a+1)+"/"+leftArr.length;
}


rrdj.onclick = function(){
	b++;
	b %= rightArr.length;
	con_img2.src = rightArr[b];
	p2.innerHTML ="这是第二组的第"+(b+1)+"张";
	xb2.innerHTML = (b+1)+"/"+rightArr.length;
}

rldj.onclick = function(){
	b--;
	if(b<0){
		b = rightArr.length-1;
	}
	b%= rightArr.length;
	con_img2.src = rightArr[b];
	p2.innerHTML ="这是第二组的第"+(b+1)+"张";
	xb2.innerHTML = (b+1)+"/"+rightArr.length;
}

btn1.onclick = function(){
	a--;
	if(a<0){
		a = leftArr.length-1;
	}
	a %= leftArr.length;
	con_img1.src = leftArr[a];
	p1.innerHTML ="这是第一组的第"+(a+1)+"张";
	xb1.innerHTML = (a+1)+"/"+leftArr.length;
	
	
	b--;
	if(b<0){
		b = rightArr.length-1;
	}
	b%= rightArr.length;
	con_img2.src = rightArr[b];
	p2.innerHTML ="这是第二组的第"+(b+1)+"张";
	xb2.innerHTML = (b+1)+"/"+rightArr.length;
	
}
btn2.onclick = function(){
	a++;
	a %= leftArr.length;
	con_img1.src = leftArr[a];
	p1.innerHTML ="这是第一组的第"+(a+1)+"张";
	xb1.innerHTML = (a+1)+"/"+leftArr.length; 
	
	
	b++;
	b %= rightArr.length;
	con_img2.src = rightArr[b];
	p2.innerHTML ="这是第二组的第"+(b+1)+"张";
	xb2.innerHTML = (b+1)+"/"+rightArr.length;
}