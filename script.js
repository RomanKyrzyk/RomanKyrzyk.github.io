function registerLink(){
    $("#registerLink").submit();
}
let second=0, thecolor,r1,r2,r3;
setInterval(function(){
	
	r1=Math.floor(Math.random() * 256);
	r2=Math.floor(Math.random() * 256);
	r3=Math.floor(Math.random() * 256);
	thecolor="rgb("+r1+","+r2+","+r3+")";
	
	$('.h1').css('color',thecolor);
	
},100);
