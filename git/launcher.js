

var w;
var h;
var c1R;
var ctx;
var ctx3;
var c;
var rMain = 0;
var mx = 0;
var my = 0;
var cx;
var cy;
var mdown = false;
var draw = true;
var img;
var c1=false; var c2=false; var c3=false; var c4=false; var c5=false;
var ox; var oy;
var br = false;
var end = false;
var downYet = false;
var interval;
var laser = null;

var numLinks;

var bools = new Array();

var names = new Array();

window.onload = function(){
	run2();	
}

function run2(){
	
	var launch = document.getElementsByTagName("launcher")[0];
	//var launch = document.getElementById("test");
	launch.onmousedown=function(e){down(e);};
	launch.onmousemove=function(e){move(e);};
	launch.onmouseup=function(e){up(e);};
	
	launch.ontouchstart=function(e){e.preventDefault();down(e);};
	launch.ontouchmove=function(e){e.preventDefault();move(e);};
	launch.ontouchend=function(e){e.preventDefault();up(e);};
	
	img = new Array();
	oy = new Array();
	ox = new Array(); 
	
	w=launch.offsetWidth;
	h=launch.offsetHeight;
	//w = 500;
	//h = 500;
	alert(w + ", " + h );
	
	if (w>h){
		c1R = h/30;
	}else{
		c1R = w/30;
	}
	cx = w/2 - c1R/2;
	cy = h/2 - c1R/2;
	
	launch.innerHTML += "<canvas  id='myCanvas2' style='position:absolute; top: 0; left = 0; border:1px solid #000000;'></canvas>";
	
	launch.innerHTML += "<canvas  id='myCanvas' style='position:absolute; top: 0; left = 0; border:1px solid #000000;'> </canvas>";
	
	launch.innerHTML += "<canvas  id='myCanvas3' style='position:absolute; top: 0; left = 0; border:1px solid #000000;'></canvas>"
	
	c=document.getElementById("myCanvas");
	c.width = w;
	c.height = h;

	

	var c3 = document.getElementById("myCanvas3");
	c3.width = w;
	c3.height = h;
	ctx3 = c3.getContext("2d");
	
	ctx=c.getContext("2d");
	redraw2();
	redrawpointer();
	interval = setInterval(function(){prep();},40);
	
	var nodes = document.getElementsByTagName("node");
	
	for (var i = 0; i < nodes.length; i++){
		img[i] = new Image();
		img[i].src = nodes[i].getAttribute("src");
		bools[i] = false;
		names[i] = nodes[i].getAttribute("tag");
		if (names[i] == null || names[i] == undefined)  names[i] = " ";
	}
	
	numLinks = nodes.length;
	
	/*img[0] = new Image();
	img[0].src = 'http://cdn4.iconfinder.com/data/icons/brightmix/128/monotone_cog_settings_gear.png';
	img[1] = new Image();
	img[1].src = 'http://cdn1.iconfinder.com/data/icons/defaulticon/icons/png/256x256/media-play-pause-resume.png';
	img[2] = new Image();
	img[2].src = 'http://icongal.com/gallery/image/6030/network_wireless_wifi.png';
	img[3] = new Image();
	img[3].src = 'http://icons.iconarchive.com/icons/icons-land/metro-raster-sport/256/Trophy-icon.png';
	img[4] = new Image();
	img[4].src = 'http://www.freestockphotos.biz/pictures/14/14376/book.png';*/
	
};

	/*function exit2(){
		
		document.getElementById("book").style.visibility = "hidden";
		document.getElementById("exit").style.visibility = "hidden";
		
	}*/

	function down(e){
		draw = true;
		br = false;
		if (!downYet)rMain = 0;
		downYet=true;
		mdown = true;
		c5 = false;
		
	}
	function move(e){
		
		if (mdown && getDistance(x(e), y(e)) < c1R*12) {
			
			cx = x(e);
			cy = y(e);
			redrawpointer();
			for (var i = 0; i < numLinks; i++){
				if (!bools[i]){
					
					if (dst(cx,cy,ox[i],oy[i]) < c1R*4){ bools[i]=true;redraw();}else{bools[i]=false;}                        /////////////////////////////////////
					
				}else{
					
					if (dst(cx,cy,ox[i],oy[i]) > c1R*4){ bools[i]=false;redraw(); }
						
				}
				
			}
			/*if (!c1 && !c2 && !c3 && !c4 && !c5){
			
			if (dst(cx,cy,ox[0],oy[0]) < c1R*4){ c1=true;}else{c1=false;}
			if (dst(cx,cy,ox[1],oy[1]) < c1R*4){ c2=true;}else{c2=false;}
			if (dst(cx,cy,ox[2],oy[2]) < c1R*4){ c3=true;}else{c3=false;}
			if (dst(cx,cy,ox[3],oy[3]) < c1R*4){ c4=true;}else{c4=false;}
			if (dst(cx,cy,ox[4],oy[4]) < c1R*4){ c5=true;}else{c5=false;}
			if (c1 || c2 || c3 || c4 || c5){
				redraw();
			}
			}
			if (c1 || c2 || c3 || c4 || c5){
				if (dst(cx,cy,ox[0],oy[0]) < c1R*4){ c1=true;}else{c1=false; redraw();}
				if (dst(cx,cy,ox[1],oy[1]) < c1R*4){ c2=true;}else{c2=false; redraw();}
				if (dst(cx,cy,ox[2],oy[2]) < c1R*4){ c3=true;}else{c3=false; redraw();}
				if (dst(cx,cy,ox[3],oy[3]) < c1R*4){ c4=true;}else{c4=false; redraw();}
				if (dst(cx,cy,ox[4],oy[4]) < c1R*4){ c5=true;}else{c5=false; redraw();}
			}
			*/
		}
		
	}
	function up(e){
		draw = true;
		mdown = false;
		br = true;
		cx = w/2 - c1R/2;
		cy = h/2 - c1R/2;
		
		for (var i = 0; i < numLinks; i++){
			
			if (bools[i]) redirect();                                                                                 /////////////////////////////////////////////////////////
			return 0;
			
		}
		
		/*if (c1 || c2 || c3 || c4 || c5){
			redirect();
			return 0;
		}*/
		
		redrawpointer();
		redraw();
	}
	
	function x(e){
		var x;
		
			
			x = e.pageX;	
		
			
			if (x==0 || x==null)x = e.targetTouches[0].pageX;
		
		return x;
	}
	function y(e){
		var y;
	
		y = e.pageY;	
	
		if (y==0 || y==null)y = e.targetTouches[0].pageY;
	
		return y;
	}
	
	
	
	function redirect(){
		//window.location = "http://www.tucker-studios.com";
		clearInterval(interval);
		
		if (!c1 && !c5){
		
		var canvases = document.getElementsByTagName("canvas");
		var i=0;
		while (i<canvases.length){
			
			canvases[i].style.visibility = "hidden";
			i++;
		}
		}
		if (c1) {
			
		}
		if (c3) {
			
		}
		if (c2) {
			
		}
		if (c4) {
			
		}
		
		if (c5) {
						
		}
		
		
	}
	
	function full() {
		var element = document.getElementById("b")
		var requestMethod = element.requestFullScreen || element.webkitRequestFullscreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    	if (requestMethod) { // Native full screen.
        	requestMethod.call(element);
    	} else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        	var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
       
    }
    run2();
    }
	function prep(){
		if (draw) redraw();	
	}
	
	function redrawpointer(){
		ctx3.clearRect ( 0 , 0 , w , h );
		
		//Draw center circle
		ctx3.fillStyle = "rgba(225, 225, 225, 0.3)";
		ctx3.beginPath();
		ctx3.arc(cx, cy, c1R, 0, Math.PI*2, true); 
		ctx3.closePath();
		ctx3.fill();
	}

	function redraw(){
		
		ctx.clearRect ( 0 , 0 , w , h );
		
		//Draw center circle
		/*ctx.fillStyle = "rgba(225, 225, 225, 0.8)";
		ctx.beginPath();
		ctx.arc(cx, cy, c1R, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();*/
		
		
		
	
		//ctx.arc(w/2 - c1R/2, h/2 - c1R/2, c1R*12, 0, Math.PI*2, true); 
		
		
		var count = 0;
		var r = rMain;
		var x;
		
		//ctx.strokeStyle='#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
		ctx.strokeStyle = "#EEEEEE"
		
		
		if (br){
			theta = 0;
			if (r > c1R){
			//Draw the expanding circle
			while (theta <= Math.PI*2){
				ctx.beginPath();
				ctx.arc(r*Math.cos(theta) + (w/2 - c1R/2), r*Math.sin(theta) + (h/2 - c1R/2), (c1R*12)/20, 0, Math.PI*2, true); 
				ctx.closePath();
				ctx.stroke();
				theta = theta + Math.PI/32;
			}
		}
			if (rMain >= 0) {
				rMain=rMain - (c1R*12)/15;
			}
			
			return 0;
		}
		
		
		//If the expanding circle animation is done.
		if (rMain >= (c1R*12)-c1R){
			draw = false;
			end=true;
			ctx.strokeStyle = "#333333";
			
			
			if (mdown){
				
				//Draw the outer circle
				ctx.beginPath();
				ctx.arc(w/2 - c1R/2, h/2 - c1R/2, c1R*12, 0, Math.PI*2, true); 
				ctx.closePath();
				ctx.stroke();
				ctx.lineWidth = 1;
				r *= 1.1;
				
				//theta = Math.PI/3.3;
				theta = (2*Math.PI)/numLinks;                                                                            /////////////////////////////////////////////////////////////////////////
				
				ctx.lineWidth = 5;
				
				ctx.font="20px monospace";
				
				
				//Draw the hotpoints
				while (theta <= Math.PI*2){
					ctx.fillStyle = "rgba(0, 0, 0, 1)";
					ctx.strokeStyle = "#000000";
					ctx.beginPath();
					ox[count] = r*Math.cos(theta) + (w/2 - c1R/2);
					oy[count] = r*Math.sin(theta) + (h/2 - c1R/2);
					//ctx.arc(r*Math.cos(theta) + (w/2 - c1R/2), r*Math.sin(theta) + (h/2 - c1R/2), c1R*2, 0, Math.PI*2, true); 
					
					var i = count;
					
						ctx.drawImage(img[i], r*Math.cos(theta) + (w/2 - c1R/2) - c1R*2, r*Math.sin(theta) + (h/2 - c1R/2) - c1R*2,c1R*4,c1R*4)
						if (bools[i]){
							ctx.arc(ox[i], oy[i], c1R*3, 0, Math.PI*2, true);
							ctx.fillStyle = 'white';
							if (theta > Math.PI){
								ctx.fillText(names[i],ox[i] - 6.25*names[i].length ,oy[i] + c1R*4);
							}else{
								ctx.fillText(names[i],ox[i] - 6.25*names[i].length ,oy[i] - c1R*4);
							}
						}
					
					
					/*
					
					if (count == 0){
						ctx.drawImage(img[0], r*Math.cos(theta) + (w/2 - c1R/2) - c1R*2, r*Math.sin(theta) + (h/2 - c1R/2) - c1R*2,c1R*4,c1R*4);
						if (c1){
							 ctx.arc(ox[0], oy[0], c1R*3, 0, Math.PI*2, true);
							 ctx.fillStyle = 'white';
							 ctx.fillText("SETTINGS",ox[0] - 50,oy[0] + c1R*4);
						}
						
					}
					if (count == 1){
						ctx.drawImage(img[1], r*Math.cos(theta) + (w/2 - c1R/2) - c1R*2, r*Math.sin(theta) + (h/2 - c1R/2) - c1R*2,c1R*4,c1R*4);
						if (c2){
							 ctx.arc(ox[1], oy[1], c1R*3, 0, Math.PI*2, true);
							 ctx.fillStyle = 'white';
							 ctx.fillText("PLAY",ox[1] - 25,oy[1] + c1R*4);
						}
					}
					if (count == 2){
						ctx.drawImage(img[2], r*Math.cos(theta) + (w/2 - c1R/2) - c1R*2, r*Math.sin(theta) + (h/2 - c1R/2) - c1R*2,c1R*4,c1R*4);
						if (c3){
							 ctx.arc(ox[2], oy[2], c1R*3, 0, Math.PI*2, true);
							 ctx.fillStyle = 'white';
							 ctx.fillText("CO-OP",ox[2] - 30,oy[2] + c1R*4);
						}
					}
					if (count == 3){
						ctx.drawImage(img[3], r*Math.cos(theta) + (w/2 - c1R/2) - c1R*2, r*Math.sin(theta) + (h/2 - c1R/2) - c1R*2,c1R*4,c1R*4);
						if (c4){
							 ctx.arc(ox[3], oy[3], c1R*3, 0, Math.PI*2, true);
							 ctx.fillStyle = 'white';
							 ctx.fillText("HIGHSCORES",ox[3] - 60,oy[3] + c1R*4);
						}
					}
					if (count == 4){
						ctx.drawImage(img[4], r*Math.cos(theta) + (w/2 - c1R/2) - c1R*2, r*Math.sin(theta) + (h/2 - c1R/2) - c1R*2,c1R*4,c1R*4);
						if (c5){
							 ctx.arc(ox[4], oy[4], c1R*3, 0, Math.PI*2, true);
							 ctx.fillStyle = 'white';
							 ctx.fillText("STORY",ox[4] - 30,oy[4] + c1R*4);
						}
					}
					*/
					ctx.closePath();
					ctx.stroke();
					theta = theta + (2*Math.PI)/numLinks;
					count++;
				}
			
			}
			ctx.lineWidth = 1;
			
		//The animation is running.
		}else{
			
			theta = 0;
			
			//Draw the expanding circle
			while (theta <= Math.PI*2){
				ctx.beginPath();
				ctx.arc(r*Math.cos(theta) + (w/2 - c1R/2), r*Math.sin(theta) + (h/2 - c1R/2), (c1R*12)/20, 0, Math.PI*2, true); 
				ctx.closePath();
				ctx.stroke();
				theta = theta + Math.PI/32;
			}
		
			if (rMain <= (c1R*12)-c1R/2) {
				rMain=rMain + (c1R*12)/15;
			}
			
		}
		
		
		
		/*
		count = 0;
		r = c1R*12;
		while(r > 0){
			x = -1*c1R*12+count*((c1R*12)/20);
			alert((Math.abs(Math.sqrt(r^2-x^2)/x)));
			ctx.beginPath();
			ctx.arc((x)+(w/2 - c1R/2), Math.sqrt(Math.pow(r,2) - Math.pow(x,2)) + (h/2 - c1R/2), (c1R*12)/20, 0, Math.PI*2, true); 
			ctx.closePath();
			ctx.stroke();
			count++;
			if (count == 40){
				r = r - (c1R*12)/20;
				count = 0;
			}
			
		}*/
		
		
		
		ctx.font=c1R/3+"px Arial";
		//ctx.fillText("START",w/2- c1R,h/2- c1R/2 + c1R/6);
		
		
		
	}
	
	function redraw2(){
		var r = 0;
		var c2=document.getElementById("myCanvas2");
		c2.width = w;
		c2.height = h;
		var ctx2=c2.getContext("2d");
		//ctx2.fillStyle   = '#c6b4ca';
		ctx2.fillStyle   = '#2c221a';
		ctx2.fillRect  (0,   0, w, h);  // now fill the canvas
		ctx2.stokeStyle = "#000000"
		var theta = 0;
		while (r<=c1R*12){
			ctx2.beginPath();
			ctx2.arc(r*Math.cos(theta) + (w/2 - c1R/2), r*Math.sin(theta) + (h/2 - c1R/2), (c1R*12)/20, 0, Math.PI*2, true); 
			ctx2.closePath();
			ctx2.stroke();
			theta = theta + Math.PI/32;
			
			if (theta >= Math.PI*2){
				theta = 0;
				r = r + (c1R*12)/20;	
			}
		}
	}
	
	function getDistance(cx_,cy_)
	{
 		var xs = 0;
  		var ys = 0;
  		xs = cx_ - (w/2 - c1R/2);
  		xs = xs * xs;
  		ys = cy_ - (h/2 - c1R/2);
  		ys = ys * ys;
  		return Math.sqrt( xs + ys );
}

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
	

