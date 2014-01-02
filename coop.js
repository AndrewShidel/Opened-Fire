
//The canvas DOM for the game
var canvas1;

//The context to draw all elements
var ctx1;

//Co-ords of the player
var x,y;

//Number of pixels to move per frame
var step = 2;

//Position of the bricks
var sidesx, sidesy;

//Size of the bricks
var blocksize = 50;

var upkey = 'w'
var downkey = 's'
var rightkey = 'd'
var leftkey = 'a'

//Press state of each key
var kup = false; var kdown = false; var kleft = false; var kright = false;

//Image of the crosshairs
var crosshairs;
var play1 = true;

//Image of the bricks
var pattern;

//Arrays of the x/y co-ords of each zombie
var zx;
var zy;

//The number of zombies
var numZombies = 0;

//The speed of each zombie
var zspeed;

//The maximum speed of the xombies (minimum is equil to 0)
var zspeedmax = 1.5;

//Number above 1
var difficulty = 10;

//Number of zombies killed
var zombiesKilled = 0;

var player = 0;

var players = 0;

var playerIDs;

var user2x;

var user2y;

//Player Health Variable
var playerHealth = 100;

//The sprite image for the player
var playerImage;


//Image of rock
var rock;

//Rock x
var rx;

//Rock y
var ry;

//Rock type
var rt;

var frameOffset = 26;

var imgWidth = 227;

var imgHeight = 287;

var img2Width = 238;

var img2Height = 289;

//The with of each image frame
var frameHeight = 54;

var frameWidth = 48;

var frame2Height = img2Height / 6;

var frame2Width = 47.6

//The initial offset, in pixels, for the charactor's animation
var fx = 120;
var fy = 0;

var fx2;

var fy2;

var zd;

var opponent = new Array(); 

var zimg;



//Ititiates the game board and everything that goes with it.
function coop(){
	alert("started!!!");
	run();
	//Array of the zombies'
	zx = new Array();
	zy = new Array();
	
	user2x = new Array();
	user2y = new Array();
	
	playerIDs = new Array();
	
	fx2 = new Array();
	fy2 = new Array();
	
	//rx = new Array();
	//ry = new Array();
	//rt = new Array();
	
	fx2[0] = frame2Width * 2;
	fy2[0] = frame2Height * 3;
	
	//The speed of each zombie
	zspeed = new Array();
	
	zd = new Array();
	
	frameHeight = imgHeight/6;
	frameWidth = imgWidth/5;
	
	fx = frameWidth * 2;
	fy = frameHeight * 3;
	
	//Set the height/width of the background image
	document.getElementById("img").height = h;
	document.getElementById("img").width = w;
	zombies = new Array();
	sidesx = new Array();
	sidesy = new Array();
	
	//newRocks(100);
	
	//Initialize all of the images
	
	crosshairs = new Image();
	crosshairs.src = "http://www.gamesdiner.com/sites/gamesdiner.com/files/images/Crosshairs[1].png";
	
	pattern = new Image();
	pattern.src = "http://www.openedfire.com/img/pattern.png";
	
	zimg = new Image();
	zimg.src = "http://www.openedfire.com/img/Zombie/Zombie.png";
	
	playerImage = new Image();
	playerImage.src =  "http://www.openedfire.com/img/Human808/808.png";
	
	rock = new Image();
	
	rock.src = "http://www.openedfire.com/img/Decals/Decals.png"
	//Creates the walls sourounding the scene
	initializeWalls();
	
	//Gets the canvas element and adjusts it's size to the size of the browser window
	canvas1 = document.getElementById("coop");
	canvas1.width = w;
	canvas1.height = h;
	x = w/2;
	y=h/2;
	
	difficulty /= 10000;
	
	
	
	//Start playing the music
	var myAudio = new Audio('sounds/beats.wav'); 
	myAudio.addEventListener('ended', function() {
	    this.currentTime = 0;
	    this.play();
	}, false);
	myAudio.play();
	
	
	//Initiates the movement
	canvas1.onmousedown=function(e){down2(e);};
	canvas1.onmousemove=function(e){move2(e);};
	canvas1.onmouseup=function(e){up2(e);};
	
	canvas1.ontouchstart=function(e){e.preventDefault();down2(e);};
	canvas1.ontouchmove=function(e){e.preventDefault();move2(e);};
	canvas1.ontouchend=function(e){e.preventDefault();up2(e);};
	
	
	//Called when any key is pressed
	document.onkeypress=function(e){
 		var e=window.event || e
 		var char = String.fromCharCode(e.charCode);
 		
 		//Up
 		if (char == upkey){
 			if (y>blocksize){
 				if (!kup){
 				 kup = true;
				 fx = frameWidth*2;
				 fy = 0;
 				}
 			}else{
 				//kup = false;	
 			}
 		}
 		
 		//Down
 		if (char == downkey){
 			if (y<h-100 - blocksize){
 				if (!kdown){
 				 kdown = true;	
 				 fx = frameWidth*2;
 				 fy = frameHeight*4;
 				}
 			}else{
 				//kdown = false;
 			}
 		}
 		
 		//Left
 		if (char == leftkey){
 			if (x>blocksize){
 				if (!kleft){
 				 kleft = true;
 				 fx = 0;
 				 fy = frameHeight*3;
 				}
 			}else{
 				//kleft = false;
 			}
 		}
 		
 		//Right
 		if (char == rightkey){
 		
			if (x<w-100 - blocksize){
				if (!kright){
				kright = true;
				fx = frameWidth*3;
				fy = frameHeight*3;
				}
			}else{
			//	kright = false;
			}
			
 		}
 		
 		//Initiating Multiplayer
 		if (char == '1'){
 			player = 1;
 			multi();
 			send();
 		}
 		
 		if (char == '2'){
 			player = 2;
 			multi();
 			send();
 		}
 	
 		
	}
	
	//If any key is raised, then stop all movement
	document.onkeyup=function(e){
		
		kup = false;
		kdown = false;
		kleft = false;
		kright = false;		
	}
	
	//Gets a context used to draw everything
	ctx1=canvas1.getContext("2d");
	
	//Draw the charactor for the firs time
	ctx1.fillRect(x, y, 100, 100);
	
	//Re-Draw the game every specified number of miliseconds
	interval = setInterval(function(){postdraw();},10);
	
	//Re-Draw the charactors' animation every specified number of miliseconds
	setInterval(function(){reload();},500);
	
	setInterval(function(){send();},5);
}



//Used to calculate the next frame of the charactors' animation
function reload(){

	if (kup){
		//Update the frame of the sprite
		if (fy < frameHeight){
			 fy += frameHeight;
		}else{
			 fy = 0;
		}
	}else if(kdown){
		fy += frameHeight;
		if (fy > frameHeight*5) fy = frameHeight*4;
	}else if(kright){
		if (fx == frameWidth * 3){
			fx += frameWidth;
		}else{
			fx -= frameWidth;
		}
	}else if(kleft){
		if (fx == 0){
			fx += frameWidth;
		}else{
			fx -= frameWidth;
		}
	}else{
		
	}
	
	for (var i = 0; i < zx.length; i++){
		
		if (zd[i] == "up"){
			//Update the frame of the sprite
			if (fy2[i] < frame2Height){
				 fy2[i] += frame2Height;
			}else{
				 fy2[i] = 0;
			}
		}else if(zd[i] == "down"){
			fy2[i] += frame2Height;
			if (fy2[i] > frame2Height*5) fy2[i] = frame2Height*4;
		}else if(zd[i] == "right"){
			if (fx2[i] == frame2Width * 3){
				fx2[i] += frame2Width;
			}else{
				fx2[i] -= frame2Width;
			}
		}else if(zd[i] == "left"){
			if (fx2[i] <= 0){
				fx2[i] += frame2Width * .8;
			}else{
				fx2[i] -= frame2Width * .8;
			}
		}else{
			console.log("else")
		}
	
	}
	
	
	

}

//Updates the position of the game elements every time the game is rendered
function update(){
		
	//Keeps player from running off the screen
 	if (y<blocksize){
 		kup = false;	
 	}
 	
 	if (!(y<h-100 - blocksize)){
 				
 		kdown = false;
 	}
 		
 	if (x<blocksize){
 				 
 		kleft = false;
 	}
 		
	if (!(x<w-100 - blocksize)){
		
		kright = false;
	}
	
	
	// Updates the position of all current zombies
	if(zx.length > 0){
		for (var i = 0; i<zx.length; i++)
		{
			var dx, dy;
			dx = zx[i] - x;
			dy = zy[i] - y;
			var dydx = dy/dx;
			var speedx, speedy;
			/*if (Math.abs(dydx) > Math.PI/2){
				dydx -= Math.PI/2;	
			}*/
			if (dx != 0){
				var theta = Math.atan(dydx);
				if (theta > 0) theta *= -1;
				if (dx < 0){
					speedx =  zspeed[i] * Math.cos(theta);
					zx[i]+= speedx
				}else{
					speedx =  zspeed[i] * Math.cos(theta);	
					zx[i]-= speedx	
					speedx *= -1
				}
				if (dy <0){
					speedy = zspeed[i] * Math.sin(theta)
					zy[i]-= speedy ;
					speedy *= -1
				}else{
					speedy = zspeed[i] * Math.sin(theta)
					zy[i]+= speedy ;
					
				}
			
				//document.getElementById("m").innerHTML = "<h1>" + theta + "</h1>";
			
			}
			var speedxa = Math.abs(speedx);
			var speedya = Math.abs(speedy);
			if (speedxa <= speedya && speedy >= 0){
				if (zd[i] != "down"){
				 fx2[i] = frame2Width*2;
 				 fy2[i] = frame2Height*4;
				}
				 zd[i] = "down"; 
				 
			}else if (speedxa < speedya && speedy < 0){ 
				if (zd[i] != "up"){
				fx2[i] = frame2Width*2;
				fy2[i] = 0;
				}
				zd[i] = "up";
				
				
			}else if (speedxa >= speedya && speedx >= 0){ 
				if (zd[i] != "right"){
				fx2[i] = frame2Width*3;
				fy2[i] = frame2Height*3;
				}
				zd[i] = "right";
				
			}else if (speedxa > speedya && speedx < 0){
				if (zd[i] != "left"){
				 fx2[i] = 0;
 				 fy2[i] = frame2Height*3;
				}
				 zd[i] = "left";
			}
			}
	}
 	
	//Updates the movement of the player
	if (kup) y -= step;
	if (kdown) y += step;
	if (kleft) x -= step;
	if (kright) x += step;
	
	}

//Draws everything
function postdraw(){
	
	//updates all of the positions.
	update();
	
	//clears canvas
	ctx1.clearRect ( 0 , 0 , w , h );
	
 	//Draw player
 	ctx1.drawImage(playerImage, fx, fy, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
 	//ctx1.fillRect(x, y, 50, 50);
 	
 	for (var i = 0; i < user2x.length; i++){
 	ctx1.fillRect(user2x[i], user2y[i], 50, 50);
 	}
 	
 	
 	
 	//Create all brick
 	for (var i = 0; i<sidesy.length; i++){
 		//ctx1.fillRect(sidesx[i], sidesy[i], blocksize *.9, blocksize * .9);
 		ctx1.font="20px Arial";
		ctx1.fillText(opponent[i],user2x[i],user2y[i]);
 		ctx1.drawImage(pattern, sidesx[i], sidesy[i],blocksize *.9,blocksize * .9); 
 	}
 	
 	/*for (var i = 0; i < rx.length; i++){
 		if (rt[i] <= 1) ctx1.drawImage(rock, 0, 0, 90, 80, rx[i], ry[i], frameWidth, frameHeight); 
 	}*/
 	
 	//Draws zombies
 	for (var i = 0; i<zx.length; i++){
 		//ctx1.drawImage(pattern, zx[i], zy[i],blocksize *.9,blocksize * .9);
 		if (fx2[i] > img2Width || fy2[i] > imgHeight || fx2[i] < 0 || fy2[i] < 0) console.log(fx2[i] + ", " + fy2[i] + ": " + zd[i] );
 		ctx1.drawImage(zimg, fx2[i], fy2[i], frame2Width, frame2Height, zx[i], zy[i], frame2Width, frame2Height);
 		
 	}
	
	//Draws crosshairs
	ctx1.drawImage(crosshairs, cx - c1R*2.5, cy - c1R*2.1,c1R*4,c1R*4); 

}

//Draws the wall which sorround the scene
function initializeWalls(){
	
	var count = h/blocksize;
	var num = 0;
	for (var i = 0; i<=count; i++){
		 sidesy[i] = i*blocksize;
		 sidesx[i] = 0;
		 num++;
	}
	count = w/blocksize;
	for (var i = 0; i<=count; i++){
		sidesx[num] = i*blocksize;
		sidesy[num] = 0;
		num++;
	}
	
	count = w/blocksize;
	for (var i = 0; i<=count; i++){
		sidesx[num] = blocksize + i*blocksize;
		sidesy[num] = h - blocksize;
		num++;
	}
	
	count = h/blocksize;
	for (var i = 0; i<=count; i++){
		sidesx[num] = w - blocksize;
		sidesy[num] = i*blocksize;
		num++;
	}
	
}


	//Called when the mouse is pressed.
	function down2(e){
		
	
		
		for(var i = 0; i<opponent.length; i++){
			if (dst(user2x[i],user2y[i], tx(e), ty(e)) < blocksize){
				 alert("Player clicked");
			}
		}
	
	}
	//Get x co-ords of mouse
	function tx(e){
		var x;
		
			
			x = e.pageX;	
		
			
			if (x==0 || x==null)x = e.targetTouches[0].pageX;
		
		return x;
	}
	//Get y co-ords of mouse
	function ty(e){
		var y;
	
		y = e.pageY;	
	
		if (y==0 || y==null)y = e.targetTouches[0].pageY;
	
		return y;
	}
	
	
	function isValidCode(code){
    	return ($.inArray(code, codes) > -1);
	}

	//Called every time that the mouse position changes and updates the position of the crosshairs
	function move2(e){
			
		cx = x2(e);
		cy = y2(e);
				
	}
	
	function up2(e){
		
	}
	
	//Gets the x co-ordinate of an event
	function x2(e){
		var x;
		
			
		x = e.pageX;	
		
			
		if (x==0 || x==null)x = e.targetTouches[0].pageX;
		
		return x;
	}
	
	//Gets the y co-ordinate of an event
	function y2(e){
		var y;
	
		y = e.pageY;	
	
		if (y==0 || y==null)y = e.targetTouches[0].pageY;
	
		return y;
	}
	
	//Creates a new zombie in position (x,y)
	function newZombie(x,y){
		zspeed[numZombies] = Math.random() * zspeedmax;
		zx[numZombies] = x
		zy[numZombies] = y
		numZombies++
	}
	
	function newRocks(number){
		for (var i = 0; i < number; i++){
			rx[i] = Math.random() * w;
			ry[i] = Math.random() * h;
			rt[i] = Math.ceil(Math.random() * 2);
		}
	}
	
	//Implements the distance formula to determine the distance between two points
	function dst(x1,y1,x2,y2)
	{
 		var xs = 0;
  		var ys = 0;
  		xs = x1 - x2;
  		xs = xs * xs;
  		ys = y1 - y2;
  		ys = ys * ys;
  		return Math.sqrt( xs + ys );
	}
	


function multi(){
	
}

function send(){
	sendMessage (userName + "," + x + "," + y)
}


//------------------------------------------------------------------
//---Bellow is the code to connect to the multiplayer server--------
//------------------------------------------------------------------


	var ws;
	var userName = "";

	var sendMessage = function ( msg ) {
		ws.send (msg);	
	}
	
	var safe_tags = function(str) {
    	return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
	}
	
	var getUsername = function ( ) {
		var default_ = "guest" + Math.floor(Math.random()*9999+500);
		var name=prompt("Please enter a name",default_);
		if ( name == null ) {
			return default_;
		}
		return name;
	}
	
	/*$(document).keypress ( function ( event ) {
		 if ( event.which == 13 ) { 
		 	displayOnTextArea ( 'You: ' + safe_tags($('#input_').val()) );
			sendMessage ( safe_tags($('#input_').val()) );
			$('#input_'). val ( "" );
		 }
	} );*/
	
	function run (){
			userName = getUsername ( );
			console.log ( "Attempting to connect to server" );
			
			ws = new WebSocket ( "ws://198.58.104.249:1035/multi542773" ); 
			
			
			ws.onopen = function ( ) {
				console.log ( "Connected" );					
			}
			
			ws.onmessage = function ( evt ) {
				
				//console.log ( evt.msg );	
				//console.log ( evt.data );
				var messages = evt.data.split(',');
				if (messages[1] == "exit") {
					console.log(messages[0] + " has left");
					var index = opponent.indexOf( messages[0] );
					console.log(index);
					opponent.splice(0,1);
					user2x.splice(0,1);
					user2y.splice(0,1);
					players--;
				}else{
					if ( opponent.indexOf( messages[0] )  >= 0) {
						var index = opponent.indexOf( messages[0] );
						opponent[index] = messages[0];
						user2x[index] = messages[1];
						user2y[index] = messages[2];
					}else{
						players++;
						opponent[players - 1] = messages[0];
						user2x[players - 1] = messages[1];
						user2y[players - 1] = messages[2];
					}
					//console.log( user2x + " : " + user2y )
					//displayOnTextArea ( evt.data );
				}
			}
			
			ws.onclose = function ( ) {
				
				console.log ( "Disconnected" );
			}
	} 
	
 	window.onbeforeunload = function (e) {
 	  sendMessage (userName + ",exit")
	};

	
	
	
	
	
	
	
	
	
	
	