
var canvas1;
var ctx1;

function settings(){
	document.getElementById("game1").style.visibility = "visible";
	canvas1 = document.getElementById("settings");
	canvas1.width = w;
	canvas1.height = h;
	
	ctx1=canvas1.getContext("2d");
	
	ctx1.font="60px Arial";
	ctx1.fillText("Settings Page",w/3,h/2);
	playerHealth += 1000;
	document.getElementById("settings").style.visibility = "hidden";
	
}


