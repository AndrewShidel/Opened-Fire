
var canvas1;
var ctx1;

function highscores(){
	
	canvas1 = document.getElementById("highscores");
	canvas1.width = w;
	canvas1.height = h;
	
	ctx1=canvas1.getContext("2d");
	
	ctx1.font="60px Arial";
	ctx1.fillText("Highscore Board",w/3,h/2);
	
	
}
