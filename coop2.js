
var contStep = 0;

var optimalRate = 80;

var resW = 720;

var resH = 480;

//The canvas DOM for the game
var canvas1;

//The context to draw all elements
var ctx1;

//The context for the splat frame
var ctx2;

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

var rumble = false;

//Press state of each key
var kup = false; var kdown = false; var kleft = false; var kright = false;

//Image of the crosshairs
var crosshairs;
var play1 = true;


var direction = 1;

var direction2 = 1;

//Image of the bricks
var pattern;

//Arrays of the x/y co-ords of each zombie
var zx;
var zy;

var fx2 = 0;

var fy2 = 0;

//The number of zombies
var numZombies = 0;

//The speed of each zombie
var zspeed;

//The maximum speed of the xombies (minimum is equil to 0)
var zspeedmax = 1.5;

//Number above 1
var difficulty = 20;

//Number of zombies killed
var zombiesKilled = 0;

var player = 0;

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

var g = new Array();

//The initial offset, in pixels, for the charactor's animation
var fx = 120;
var fy = 0;

var fx2;

var fy2;

var zd;

var zt = new Array();

var opponent = " ";

var zimg;

var time = 0;

var total = 0;

var totalRate = 0;

var rate = 0;

var walls = [7,0, 9,0, 7,1, 9,1, 7,2, 9,2, 7,3, 9,3, 7,4, 9,4];

var score = 0;

var missiles = new Array();

var interval2;

var gears = new Array();

var box1 = 0;

var pressed;

var gun = 1;

var fRate = 80; 

var clicked = false;

var fireInterval;

var myDataRef;

var splat;

var blood;

var bomb;

var bx;
var by;

var time2 = (new Date()).getTime();

var bombOn = false;

var playerImg2;

var zimg2;

var zimg3;

var ws = new WebSocket('ws://localhost:1234', 'echo-protocol'),
				first = true,
				id;

ws.addEventListener("message", function(e) {
			    // The data is simply the message that we're sending back
			    var msg = e.data;

			    if(first){
			    	id = msg;
			    	console.log("id: "+id);
			    	first = false;
			    }else{
			    	if (msg == "connected"){
			    		console.log("connected");
			    		game(0,0,0,0);
			    		playerHealth = 999999;

			    	}else{
			    		console.log("recieved msg");
			    		parseFromPlayer1(JSON.parse(msg))
			    	}
			    }

			    
			});

function parse(msg){
	var json = JSON.parse(msg);
	eval(json.type + "(json)" );
}



///---------------------------------------
///------Sending methods------------------
///---------------------------------------
function sendPlayer(){
	var json = {
		type:"Player",
		x:x,
		y:y
	}
	ws.send(id+":::"+JSON.stringify(json));
}

function sendPlayerAdvanced(){
	var json = {
		type:"PlayerAdvanced",
		x:x,
		y:y,
		fx:fx,
		fy:fy
	}
	ws.send(id+":::"+JSON.stringify(json));
}

//Implementation will need to be changed eventually.
function sendZombies(){
	var json = {
		type:"Zombies",
		zx:zx,
		zy:zy,
		fx2:fx2,
		fy2:fy2,
		zt:zt
	}
	ws.send(id+":::"+JSON.stringify(json));
}

//Experimental implementation to send only newlly created zombies.
function sendNewZombies(nx,ny,_fx2,_fy2,_zt){
	var json = {
		type:"NewZombies",
		nx:nx,
		ny:ny,
		fx2:_fx2,
		fy2:_fy2,
		zt:_zt
	}
	ws.send(id+":::"+JSON.stringify(json));
}

function sendMissiles(){
	var l = missiles.length;
	var m = [missiles[l-4], missiles[l-3], missiles[l-2], missiles[l-1]];
	var json = {
		type:"Missiles",
		m:m
	}
	ws.send(id+":::"+JSON.stringify(json));
}

function sendObjects(){
	var json = {
		type:"Objects",
		gears:gears,
		bx:bx,
		by:by,
		bombOn:bombOn;
	}
	ws.send(id+":::"+JSON.stringify(json));
}




///---------------------------------------
///------Parsing methods------------------
///---------------------------------------

function Player(json){
	user2x = json.x;
	user2y = json.y;
}

function PlayerAdvanced(json){
	user2x = json.x;
	user2y = json.y;
	//Must add user2 fx and user2 fy
}

function Zombies(json){
		zx=json.zx;
		zy=json.zy;
		fx2=json.fx2;
		fy2=json.fy2;
		zt=json.zt;
}

function NewZombies(json){		
		zx.push(json.nx);
		zy.push(json.ny);
		fx2.push(json.fx2);
		fy2.push(json.fy2);
		zt.push(json.zt);	
}

function Missiles(json){
	missiles = missiles.concat(json.m);
}

function Objects(json){
	gears=json.gears,
	bx=json.bx,
	by=json.by,
	bombOn=json.bombOn;
}









//For player 1 to send to player 2.
function makeJSON(){


	var json = {

		"x":x,
		"y":y,
		"zx":zx,
		"zy":zy,
		"gears":gears

	}

	ws.send(id+":::"+JSON.stringify(json));

}


//For player 2 to send to player 1.
function makeResponseJSON(){
	var json = {
		x:x,
		y:y,
		zx:zx,
		zy:zy,
		gears:gears
	}
}

//Parse JSON sent from player 1 to player 2
function parseFromPlayer1(json){
	user2x = json.x;
	user2y = json.y;
	zx = json.zx;
	zy = json.zy;
}


//Parse JSON sent from player 2 to player 1.
function parseFromPlayer2(json){
	user2x = json.x;
	user2y = json.y;
	zx = json.zx;
	zy = json.zy;
}





function game2(){
	console.log("coop2 loaded");
	w=$(window).width();
	h=$(window).height();

	//game(0,0,0,0);
}

//Ititiates the game board and everything that goes with it.
function game(up, down, left, right){
	
	
	myDataRef = new Firebase('https://r1bx45ta4hw.firebaseio-demo.com/');
	
	document.getElementById("hG").style.display = "block";
	document.getElementById("hR").style.display = "block";
	
	w=$(window).width();
	h=$(window).height();
	if (up != 0){
		upkey = up;
		downkey = down;
		leftkey = left;
		rightkey = right;
	}else{
		upkey = 'w';
		downkey = 's';
		leftkey = 'a';
		rightkey = 'd';		
	}
	time = (new Date()).getTime();
	
	
	//Array of the zombies'
	zx = new Array();
	zy = new Array();
	
	fx2 = new Array();
	fy2 = new Array();
	
	rx = new Array();
	ry = new Array();
	rt = new Array();
	
	initializeWalls();
	
	fx2[0] = frame2Width * 2;
	fy2[0] = frame2Height * 3;
	
	//The speed of each zombie
	zspeed = new Array();
	
	zd = new Array();
	
	frameHeight = imgHeight/6;
	frameWidth = imgWidth/5;
	
	fx = frameWidth * 2;
	fy = frameHeight * 3;
	
	var w = window.innerWidth;
	var h = window.innerHeight;
	
	//Set the height/width of the background image
	document.getElementById("img").height = h*.99;
	document.getElementById("img").width = w;
	zombies = new Array();
	sidesx = new Array();
	sidesy = new Array();
	
	newRocks(100);
	
	//Initialize all of the images
	
	crosshairs = new Image();
	crosshairs.src = "./img/Decals/Crosshair.png";
	
	pattern = new Image();
	pattern.src = "./img/Map/Map.png";
	
	zimg = new Image();
	zimg.src = "./img/Zombie/Zombie.png";
	
	zimg2 = new Image();
	zimg2.src = "./img/Zombie/Zombie2.gif";
	
	zimg3 = new Image();
	zimg3.src = "./img/Zombie/Zombie3.gif";
	
	playerImage = new Image();
	playerImage.src =  "./img/Human808/808.png";
	
	//playerImg2 = new Image();
	//playerImg2.src =  "http://openedfire.com/img/Human71-M/Ti-M.png";
	
	rock = new Image();
	
	rock.src = "./img/Decals/Decals.png";
	
	box = new Image();
	box.src = "./img/Decals/Ingot.png";
	
	blood = new Image();
	blood.src = "http://www.mudandblood.net/wiki/images/1/1f/Blood_splatter.png";
	
	bomb = new Image();
	bomb.src = "./img/Decals/Mine.png"
	
	
	//Creates the walls sourounding the scene
	initializeWalls();
	
	//Gets the canvas element and adjusts it's size to the size of the browser window
	canvas1 = document.getElementById("game1");
	
	canvas1.width = w;
	canvas1.height = h;
	
	splat = document.getElementById("splat");
	splat.style.visibility = "visible";
	
	splat.width = w;
	splat.height = h;
	
	//canvas1.style.width = w ;
	//canvas1.style.height = h;
	
	x = w/2;
	y = h/2;
	
	//MIKE EDIT: Was 10000 MAKE GAME HARDER.
	difficulty /= 8500;
	
	//Create the first zombies
	for (var i = 0; i<1; i++){
		newZombie(Math.random() * w,Math.round(Math.random())*h);
	}
	
	//Start playing the music
	var myAudio = new Audio('http://openedfre.com/sounds/Opened Fire.wav'); 
	myAudio.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	myAudio.play();
	
	
	
	//Initiates the movement
	document.getElementById("b").onmousedown=function(e){down2(e);};
	document.getElementById("b").onmousemove=function(e){move2(e);};
	document.getElementById("b").onmouseup=function(e){up2(e);};
	
	document.getElementById("b").ontouchstart=function(e){e.preventDefault();tdown(e);};
	document.getElementById("b").ontouchmove=function(e){e.preventDefault();tmove(e);};
	document.getElementById("b").ontouchend=function(e){e.preventDefault();tup(e);};
	
	
	//Called when any key is pressed
	document.onkeypress=function(e){
		var e=window.event || e
		var char = String.fromCharCode(e.charCode);
		pressed = char;

		if (e.keyCode == 32 || char == " ") {


			throw2();

		}

 		//interval2 = setInterval(function(){send();},50);
 		
 		//Upu
 		if (char == upkey){
 			if (y>blocksize){
 				if (!kup){
 					kup = true;
 					fx = frameWidth*2;
 					fy = 0;
 					direction = 1;
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
 					direction = 2;
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
 					direction = 3;
 				}                                            ///////////////////////////////////////////////////////////////////////////////////////
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
 					direction = 4;
 				}
 			}else{
			//	kright = false;
		}

	}

 		//Initiating Multiplayer
 		if (char == '1'){
 			player = 1;
 			//multi();
 			//send();
 		}
 		
 		if (char == '2'){
 			player = 2;
 			//multi();
 			//send();
 		}
 		
 		//send();
 		//alert("Sending...");
 		makeJSON();
 		
 	}

	//If any key is raised, then stop all movement
	document.onkeyup=function(e){
		
		if (pressed == 'q' && box1 > 0){
			box1--;
			playerHealth += 50;
			if (playerHealth > 100) playerHealth = 100;
			
			document.getElementById("hG").style.width = .9*playerhealth + "%";
		}
		
		if (pressed == 'e'){
			if (box1 > 0){
				if (gun == 1){
					console.log("gun change");
					gun = 2;
					console.log("poop change");
					box1-=1;
					console.log("yay change");
					

				}else if (gun == 2){
					if (box1 >= 2){
						gun = 3;
						box1-=2;
					}
				}else if (gun == 3){
					if (box1 >= 3){
						gun = 4;
						box1-=3;
					}
				}
				
			}
			
		}
		
		
		
		//clearInterval(interval2);
		kup = false;
		kdown = false;
		kleft = false;
		kright = false;		
	}
	
	//Gets a context used to draw everything
	ctx1=canvas1.getContext("2d");
	
	ctx2=splat.getContext("2d");

	
	
	$('#game1').jrumble({
		x: 4,
		y: 4,
		rotation: 2
	});
	
	
	
	//Draw the charactor for the first time
	ctx1.fillRect(x, y, 100, 100);
	
	
	document.getElementById("i").onmousedown=function(e){
		
		document.getElementById("i").style.visibility = "hidden";
		
		//run();
		
		//Re-Draw the game every specified number of miliseconds
		interval = setInterval(function(){postdraw();},10);
		
		//Re-Draw the charactors' animation every specified number of miliseconds
		setInterval(function(){reload();},500);

		/*
		window.setInterval(function(){
			makeJSON();
		}, 100)*/
		
		//setInterval(function(){send();},5);
		//send();
		
		

	};



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
	
	//alert("Pause");
	
	//Keeps player from running off the screen
	if (y<blocksize){
		kup = false;	
	}

	if (!blocksize){

		kdown = false;
	}

	if (x<blocksize){

		kleft = false;
	}

	if (!(x<w-100 - blocksize)){
		
		kright = false;
	}
	
	//Projectiles!!!
	if (missiles.length > 0){
		for (var i = 1; i < missiles.length; i += 4){
			var spd = 30;
			var dx, dy;
			dx =  missiles[i] - missiles[i+2];
			dy =  missiles[i+1] - missiles[i+3] ;
			var dydx = dy/dx;
			var speedx, speedy;
		/*if (Math.abs(dydx) > Math.PI/2){
			dydx -= Math.PI/2;	
		}*/
		if (dx != 0){
			var theta = Math.atan(dydx);
			if (theta > 0) theta *= -1;
			if (dx < 0){
				speedx =  spd * Math.cos(theta);
				missiles[i]+= speedx
			}else{
				speedx =  spd * Math.cos(theta);	
				missiles[i]-= speedx	
				speedx *= -1
			}
			if (dy <0){
				speedy = spd * Math.sin(theta)
				missiles[i+1]-= speedy ;
				speedy *= -1
			}else{
				speedy = spd * Math.sin(theta)
				missiles[i+1]+= speedy ;
				
			}
			for(var j = 0; j<zx.length; j++){
				if ( missiles[i] >= w || missiles[i+1] >= h || missiles[i] <= 0 || missiles[i+1]<=0){
					missiles.splice(i,4);
				}
				if (j != g[0]){
					if (dst(zx[j],zy[j], missiles[i], missiles[i+1]) < blocksize){

						drawSplat(zx[j],zy[j]);

						if (zt[j] == 1){
							if (Math.random() < .5){

								zx.splice(j,1);
								zy.splice(j,1);
								zspeed.splice(j,1);
								fx2.splice(j,1);
								fy2.splice(j,1);
								zd.splice(j,1);
								zt.splice(j,1);

							}

						}else if(zt[j] == 0){

							zx.splice(j,1);
							zy.splice(j,1);
							zspeed.splice(j,1);
							fx2.splice(j,1);
							fy2.splice(j,1);
							zd.splice(j,1);
							zt.splice(j,1);

						}else{
							if (Math.random() < .2){

								zx.splice(j,1);
								zy.splice(j,1);
								zspeed.splice(j,1);
								fx2.splice(j,1);
								fy2.splice(j,1);
								zd.splice(j,1);
								zt.splice(j,1);

							}
						}



						if (gun == 1 || gun == 3) missiles.splice(i,4);

						numZombies--;
						zombiesKilled++;
						score += Math.random() * 100

					}

			//Else, it is a missile.
		}else{

		}
	}

}


}
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
			//Removes player health when zombies are near
			if ( dst(x, y, zx[i], zy[i]) < frameWidth )
			{
				playerHealth-=.05;
				document.getElementById("hG").style.width = .9*playerHealth + "%";
			}
		}
	}

	//Updates the movement of the player
	if (kup) y -= step;
	if (kdown) y += step;
	if (kleft) x -= step;
	if (kright) x += step;
	
	//Collision detection for boxes.
	for (var i = 0; i < gears.length; i = i + 2){
		if (dst(x,y,gears[i], gears[i+1]) < frameWidth){
			gears.splice(i,2);
			box1++;
		}
	}
	
	//Difficulty level incresing
	if (Math.random() < difficulty){
		var rand = Math.random(); 
		 //Was .5 changed to .4 MIKE CHANGE
		 if (rand <= .4){newZombie(Math.random() * w,Math.round(Math.random())*h);
		 }else{newZombie(Math.round(Math.random())*w,Math.random()*h);}
		}
		difficulty += difficulty/2000;

	//Player loses health over time
	playerHealth-=0.01;
	
	document.getElementById("hG").style.width = .9*playerHealth + "%";
	
	score += .0000001*score + .01;
	
	if (playerHealth <= 0)
	{
		alert("You Lose!");
		clearInterval(interval);
		window.location="http://openedfire.com";
	}
	
	if (playerHealth <= 10 && !rumble){
		rumble = true;
		$('#game1').trigger('startRumble');	
	}else if(rumble == true && playerHealth > 30){
		
		$('#game1').trigger('stopRumble');	
		rumble = false;
	}
	
	if (Math.random() < .001){
		gears[gears.length] = Math.random() * w;
		gears[gears.length] = Math.random() * h;
	}
	
	if (!bombOn){

		if (Math.random() < .0005){
			bombOn = true;
			bx = Math.random() * w;
			by = Math.random() * h;
		}

	}else{
		
		if (dst(x,y,bx, by) < 50){
			
			alert("BOOM!!!");
			
			bombOn = false;
			
			zx = new Array();
			zy = new Array();
			zspeed = new Array();
			fx2 = new Array();
			fy2 = new Array();
			zd = new Array();
			
			score += numZombies * (Math.random() +1) *5
			
			numZombies = 0;
			
			playerHealth = playerHealth*.75;
			
		}
		
	}
	
	
}

//Draws everything
function postdraw(){
	
	//updates all of the positions.
	update();
	
	//clears canvas
	ctx1.clearRect ( 0 , 0 , w , h );
	
	if (bombOn){
		ctx1.drawImage(bomb, bx, by,100,100); 	
	}
	
	for (var i = 0; i < rx.length; i++){
		if (rt[i] <= 1) ctx1.drawImage(rock, 0, 0, 90, 80, rx[i], ry[i], frameWidth*.5, frameHeight*.5); 
	}

	for (var i = 0 ; i < walls.length; i = i + 2){
 		//ctx1.drawImage(pattern, walls[i], walls[i+1],blocksize,blocksize); 
 	}
 	
 	for (var i = 0; i < gears.length; i = i + 2){
 		ctx1.drawImage(box, gears[i], gears[i+1], 40, 40);
 	}
 	if (gun == 1){
 		ctx1.fillStyle = '#ffff00';
 	}else if (gun == 2 || gun == 4){
 		ctx1.fillStyle = '#ff0000';
 	}else{
 		ctx1.fillStyle = '#c0c0c0';
 	}
 	for (var i = 1; i < missiles.length; i += 4)
 		ctx1.fillRect(missiles[i], missiles[i+1], 10, 10);

 	//Draw player
 	ctx1.drawImage(playerImage, fx, fy, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
 	//ctx1.fillRect(x, y, 50, 50);

 	ctx1.fillRect(user2x, user2y, 50, 50);
 	
 	
 	//ctx1.drawImage(playerImg2, fx2, fy2, frameWidth, frameHeight, user2x, user2y, frameWidth, frameHeight);
 	
 	/*ctx1.font="60px Arial";
 	ctx1.fillText(opponent,user2x,user2y);*/

	//MIKE CHANGE: Small YELLOW SCORE
	//ctx1.font = '168px 8bit';
	//ctx1.fillText("Score: " +  Math.floor(score),w - w/4,h - h/8);

 	//Create all brick
 	for (var i = 0; i<sidesy.length; i++){
 		//ctx1.fillRect(sidesx[i], sidesy[i], blocksize *.9, blocksize * .9);
 		ctx1.drawImage(pattern, sidesx[i], sidesy[i],blocksize *.9,blocksize * .9); 
 	}
 	
 	
 	
 	//Draws zombies
 	for (var i = 0; i<zx.length; i++){
 		//ctx1.drawImage(pattern, zx[i], zy[i],blocksize *.9,blocksize * .9);
 		//if (fx2[i] > img2Width || fy2[i] > imgHeight || fx2[i] < 0 || fy2[i] < 0) console.log(fx2[i] + ", " + fy2[i] + ": " + zd[i] ); 		
 		if (zt[i] == 0){
 			ctx1.drawImage(zimg, fx2[i], fy2[i], frame2Width, frame2Height, zx[i], zy[i], frame2Width, frame2Height);
 		}else if (zt[i] == 1){
 			ctx1.drawImage(zimg2, fx2[i], fy2[i], frame2Width, frame2Height, zx[i], zy[i], frame2Width, frame2Height);
 		}else{
 			ctx1.drawImage(zimg3, fx2[i], fy2[i], frame2Width, frame2Height, zx[i], zy[i], frame2Width, frame2Height);
 		}
 	}
 	
 	

	//Draws crosshairs
	ctx1.drawImage(crosshairs, cx - c1R*1.5, cy - c1R*1.2,c1R*2,c1R*2); 
	
	//console.log( 1/ ( ((new Date()).getTime() - time)/1000 ) );
	
	totalRate +=  1/ ( ((new Date()).getTime() - time)/1000 );
	total++;
	
	
	if (total > 100){
		rate = totalRate/100;
		totalRate = 0;
		total = 0;
		fRate = Math.round(rate);
		step = 2 * (80/fRate);
		zspeedmax = 1.5 * (80/fRate);
	}
 	//rate =  1/ ( ((new Date()).getTime() - time)/1000 );

 	document.getElementById("stats").innerHTML = "Supplies: " + box1 + "   Score: " + Math.floor(score);

	//document.getElementById("m").innerHTML = "<h1>"+ "Kills: " + zombiesKilled + "    Health: " + Math.round(playerHealth) + "    Number of Zombies: " + numZombies + "   Framerate: " + Math.round(rate) +  " fps   Score: " + Math.floor(score) + "    boxes: " + box1 + "  gun: " + gun + "</h1>" ;
	time = (new Date()).getTime();
	

}



function drawSplat(x, y){
	
	ctx2.drawImage(blood, x, y, 50,50);
	
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



function fire(){
	var snd1  = new Audio();
	var src1  = document.createElement("source");
	src1.type = "sounds/Gun sounds/Pew(Gun1).wav";
	if (gun == 1){
		src1.src  = "sounds/Gun sounds/Pew(Gun1).wav";
	}else if(gun == 2){
		src1.src  = "sounds/Gun sounds/Bpgau(Gun2).wav";
	}else if (gun == 3){
		src1.src  = "sounds/Gun sounds/PicPicPic(Gun3).wav";	
	}else if (gun == 4){
		src1.src  = "sounds/Gun sounds/TcTcTc(Gun4).wav";
	}

	snd1.appendChild(src1);
	snd1.play();

	console.log(x2 + ", " + y2 + ", " + gun)
	if (missiles.length != 0){
		missiles[ missiles.length] = x
	}else{
		missiles[ missiles.length + 1] = x
	}
	missiles[ missiles.length] = y
	missiles[ missiles.length] = cx + (cx- x)*100
	missiles[ missiles.length] = cy + (cy - y)*100	
}

function throw2(){

	if (missiles.length != 0){
		missiles[ missiles.length] = x
	}else{
		missiles[ missiles.length + 1] = x
	}
	missiles[ missiles.length] = y
	missiles[ missiles.length] = cx + (cx- x)
	missiles[ missiles.length] = cy + (cy - y)	

	g[g.length] = missiles.length - 1;
	setTimeout(function(){
		missiles.splice(g[0],1);

	},2000);
}


	//Called when the mouse is pressed.
	function down2(e){
		
		clicked = true;
		
		var snd1  = new Audio();
		var src1  = document.createElement("source");
		src1.type = "audio/wav";
		src1.src  = "sounds/Gun sounds/Pew(Gun1).wav";
		snd1.appendChild(src1);
		snd1.play();
		
		if (gun == 3 || gun == 4){
			fire();
			clearInterval(fireInterval);                                
			fireInterval = setInterval(function(){fire();},100);
		}else{
			
			var snd1  = new Audio();
			var src1  = document.createElement("source");
			src1.type = "audio/wav";
			if (gun == 1){
				src1.src  = "sounds/Gun sounds/Pew(Gun1).wav";
			}else if(gun == 2){
				src1.src  = "sounds/Gun sounds/Bpgau(Gun2).wav";
			}else if (gun == 3){
				src1.src  = "sounds/Gun sounds/PicPicPic(Gun3).wav";	
			}else if (gun == 4){
				src1.src  = "sounds/Gun sounds/TcTcTc(Gun4).wav";
			}
			console.log(src1.src);
			snd1.appendChild(src1);
			snd1.play();
			
			if (missiles.length != 0){
				missiles[ missiles.length] = x
			}else{
				missiles[ missiles.length + 1] = x
			}
			missiles[ missiles.length] = y
			missiles[ missiles.length] = tx(e) + (tx(e) - x)*100
			missiles[ missiles.length] = ty(e) + (ty(e) - y)*100

		}
		
		
		
		
		/*for(var i = 0; i<zx.length; i++){
			if (dst(zx[i],zy[i], tx(e), ty(e)) < blocksize){
				 zx.splice(i,1);
				 zy.splice(i,1);
				 zspeed.splice(i,1);
				 fx2.splice(i,1);
				 fy2.splice(i,1);
				 zd.splice(i,1);
				 numZombies--;
				 zombiesKilled++;
				 score += Math.random() * 100
			}
		}*/
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
	
	/*function double(e){
		down2(e);
	};*/
	
	function tdown(e){
		
		e.preventDefault();
		//alert((new Date()).getTime() - time2)
		if ((new Date()).getTime() - time2 < 500){
			
			time2 = (new Date()).getTime();
			down2(e);
			return 0;
			
		}
		time2 = (new Date()).getTime();
		
		
		cx = e.targetTouches[0].pageX;                                         //////////////////////////////////////////////////////////////////////////////////////////////////////////
		cy = e.targetTouches[0].pageY;
		
		if (cx < w/2 && cy > h/4 && cy < h - h/4 && !kleft) {
			kleft = true;
			fx = 0;
			fy = frameHeight*3;
		}else if (cx > w/2 && cy > h/4 && cy < h - h/4){
			if (!kright){
				kright = true;
				fx = frameWidth*3;
				fy = frameHeight*3;
			}
			
		}else if (cy < h/2 && cx > w/4 && cx < w - w/4){
			if (cy>blocksize){
				if (!kup){
					kup = true;
					fx = frameWidth*2;
					fy = 0;
				}
			}
			
		}else if (cy > h/2 && cx > w/4 && cx < w - w/4){
			
			if (!kdown){
				kdown = true;	
				fx = frameWidth*2;
				fy = frameHeight*4;
			}
			
		}
		
	}
	
	function tup(e){
		kup = false;
		kdown = false;
		kleft = false;
		kright = false;	
		
	}
	
	function tmove(e){
		
	}
	
	function up2(e){
		clearInterval(fireInterval);
		clicked = false;
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
		
		var rand = Math.random();
		
		if (rand < (.6*Math.pow(score,2) + 10)/(Math.pow(score,2)+10000000)){
			zt[numZombies] = 2;
		}else if(rand < (.8*Math.pow(score,2) + 10)/(Math.pow(score,2)+100000)){
			zt[numZombies] = 1;			
		}else {
			zt[numZombies] = 0;
		}
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

		sendMessage (userName + "," + x + "," + y + "," + fx + "," + fy);
	}


//------------------------------------------------------------------
//---Bellow is the code to connect to the multiplayer server--------
//------------------------------------------------------------------
// /*

// var ws;
// var userName = "";

// var sendMessage = function ( msg ) {
// 	console.log("sending...");
// 	try{
// 		ws.send (msg);
// 	}catch(err){}
// 		//myDataRef.push({name: cx, text: cy});
// 	}
	
	
	
// 	var safe_tags = function(str) {
// 		return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
// 	}
	
// 	var getUsername = function ( ) {
// 		var default_ = "guest" + Math.floor(Math.random()*9999+500);
// 		var name=prompt("Please enter a name",default_);
// 		if ( name == null ) {
// 			return default_;
// 		}
// 		if (name == "andrew ;)") {step = 50; playerHealth = 10000;difficulty = 0;}
// 		if (name == "mike 8D") {step = 1; playerHealth = 999999; box1 = 100;}
// 		return name;
// 	}
	
// 	/*myDataRef.on('child_added', function(snapshot) {
// 		console.log("retrieved");
//         var message = snapshot.val();
//         //displayChatMessage(message.name, message.text);
//         //console.log(message.name + ", " + message.text);
//     });*/



// 	$(document).keypress ( function ( event ) {
// 		 if ( event.which == 13 ) { 
// 		 	displayOnTextArea ( 'You: ' + safe_tags($('#input_').val()) );
// 			sendMessage ( safe_tags($('#input_').val()) );
// 			$('#input_'). val ( "" );
// 		 }
// 		} );

// function run (){
// 	userName = getUsername ( );
// 	console.log ( "Attempting to connect to server" );

// 	ws = new WebSocket ( "ws://198.58.104.249:1035/multi542773" ); 


// 	ws.onopen = function ( ) {
// 		console.log ( "Connected" );	

// 	}

// 	ws.onmessage = function ( evt ) {
// 				//console.log ( evt.msg );	
// 				//console.log ( evt.data );
				
				
				
// 				var messages = evt.data.split(',');
// 				opponent = messages[0]
// 				user2x = messages[1];
// 				user2y = messages[2];
// 				fx2 = messages[3];
// 				fy2 = messages[4];
				
// 				//console.log( user2x + " : " + user2y )
// 				//displayOnTextArea ( evt.data );
// 			}
			
// 			ws.onclose = function ( ) {
// 				console.log ( "Disconnected" );
// 			}
// 		}*/



//Function for reassigning keys on settings page
function reassignKeys( mup, mdown, mright, mleft)
{
	upkey = mup;
	downkey = mdown;
	rightkey = mright
	leftkey = mleft
	
	removejscssfile("coop.js", "js");
	
/*	var headID = parent.document.getElementsByTagName("head")[0];         
	var newScript = parent.document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.onload=game;
	newScript.src = 'http://openedfire.com/game.js';
	headID.appendChild(newScript);*/
	
	document.getElementById("settings").style.visibility = "hidden";
	document.getElementById("myCanvas").style.visibility = "hidden";
	document.getElementById("myCanvas2").style.visibility = "hidden";
	document.getElementById("myCanvas3").style.visibility = "hidden";
	document.getElementById("game1").style.visibility = "visible";
	
	
	game(upkey, downkey, rightkey, leftkey);
}


function multiplyall (array, value){
	for (var i = 0; i < array.length; i++){
		array[i] *= value;
	}
}

function initializeWalls(){
	for (var i = 0; i < walls.length; i++){




	}
	
}













