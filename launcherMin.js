var w,h,c1R,ctx,ctx3,c,rMain=0,mx=0,my=0,cx,cy,mdown=!1,draw=!0,img,c1=!1,c2=!1,c3=!1,c4=!1,c5=!1,ox,oy,br=!1,end=!1,downYet=!1,interval,laser=null;window.onload=function(){run2()};
function run2(){document.getElementById("myCanvas3").onmousedown=function(a){down(a)};document.getElementById("myCanvas3").onmousemove=function(a){move(a)};document.getElementById("myCanvas3").onmouseup=function(a){up(a)};document.getElementById("myCanvas3").ontouchstart=function(a){a.preventDefault();down(a)};document.getElementById("myCanvas3").ontouchmove=function(a){a.preventDefault();move(a)};document.getElementById("myCanvas3").ontouchend=function(a){a.preventDefault();up(a)};document.getElementById("exit").onmousedown=
function(a){down(a)};img=[];oy=[];ox=[];w=$(window).width();h=$(window).height();c1R=w>h?h/30:w/30;cx=w/2-c1R/2;cy=h/2-c1R/2;c=document.getElementById("myCanvas");c.width=w;c.height=h;var b=document.getElementById("myCanvas3");b.width=w;b.height=h;ctx3=b.getContext("2d");ctx=c.getContext("2d");redraw2();redrawpointer();interval=setInterval(function(){prep()},40);img[0]=new Image;img[0].src="http://cdn4.iconfinder.com/data/icons/brightmix/128/monotone_cog_settings_gear.png";img[1]=new Image;img[1].src=
"http://cdn1.iconfinder.com/data/icons/defaulticon/icons/png/256x256/media-play-pause-resume.png";img[2]=new Image;img[2].src="http://icongal.com/gallery/image/6030/network_wireless_wifi.png";img[3]=new Image;img[3].src="http://icons.iconarchive.com/icons/icons-land/metro-raster-sport/256/Trophy-icon.png";img[4]=new Image;img[4].src="http://www.freestockphotos.biz/pictures/14/14376/book.png"}
function down(){draw=!0;br=!1;downYet||(rMain=0);mdown=downYet=!0;c5=!1;"inline"==document.getElementById("book").style.display&&(interval=setInterval(function(){prep()},40));document.getElementById("book").style.zindex=-1;document.getElementById("book").style.display="none";document.getElementById("exit").style.visibility="hidden";console.log("down")}
function move(b){if(mdown&&getDistance(x(b),y(b))<12*c1R&&(cx=x(b),cy=y(b),redrawpointer(),!c1&&(!c2&&!c3&&!c4&&!c5)&&(c1=dst(cx,cy,ox[0],oy[0])<4*c1R?!0:!1,c2=dst(cx,cy,ox[1],oy[1])<4*c1R?!0:!1,c3=dst(cx,cy,ox[2],oy[2])<4*c1R?!0:!1,c4=dst(cx,cy,ox[3],oy[3])<4*c1R?!0:!1,c5=dst(cx,cy,ox[4],oy[4])<4*c1R?!0:!1,(c1||c2||c3||c4||c5)&&redraw()),c1||c2||c3||c4||c5))dst(cx,cy,ox[0],oy[0])<4*c1R?c1=!0:(c1=!1,redraw()),dst(cx,cy,ox[1],oy[1])<4*c1R?c2=!0:(c2=!1,redraw()),dst(cx,cy,ox[2],oy[2])<4*c1R?c3=!0:(c3=
!1,redraw()),dst(cx,cy,ox[3],oy[3])<4*c1R?c4=!0:(c4=!1,redraw()),dst(cx,cy,ox[4],oy[4])<4*c1R?c5=!0:(c5=!1,redraw())}function up(){draw=!0;mdown=!1;br=!0;cx=w/2-c1R/2;cy=h/2-c1R/2;if(c1||c2||c3||c4||c5)return redirect(),0;redrawpointer();redraw()}function x(b){var a;a=b.pageX;if(0==a||null==a)a=b.targetTouches[0].pageX;return a}function y(b){var a;a=b.pageY;if(0==a||null==a)a=b.targetTouches[0].pageY;return a}
function redirect(){clearInterval(interval);if(!c1&&!c5)for(var b=document.getElementsByTagName("canvas"),a=0;a<b.length;)b[a].style.visibility="hidden",a++;c1&&(document.getElementById("book").style.zindex=-1,document.getElementById("book").style.display="none",document.getElementById("exit").style.visibility="hidden",document.getElementById("settings").style.zindex=1E3,document.getElementById("settings").style.visibility="visible");c3&&(document.getElementById("book").style.zindex=-1,document.getElementById("book").style.display=
"none",document.getElementById("exit").style.visibility="hidden",removejscssfile("game.js","js"),b=document.getElementsByTagName("head")[0],a=document.createElement("script"),a.type="text/javascript",a.onload=function(){coop()},a.src="http://openedfire.com/coop.js",b.appendChild(a),document.getElementById("coop").style.visibility="visible");c2&&(document.getElementById("book").style.zindex=-1,document.getElementById("book").style.display="none",document.getElementById("exit").style.visibility="hidden",
removejscssfile("coop.js","js"),document.getElementById("game1").style.visibility="visible",game2());c4&&(document.getElementById("book").style.zindex=-1,document.getElementById("book").style.display="none",document.getElementById("exit").style.visibility="hidden",document.getElementById("highscores").style.visibility="visible",highscores());c5&&(document.getElementById("book").style.zindex=110,document.getElementById("book").style.display="inline",document.getElementById("book").style.visibility=
"visible",document.getElementById("exit").style.visibility="visible")}function full(){var b=document.getElementById("b"),a=b.requestFullScreen||b.webkitRequestFullscreen||b.mozRequestFullScreen||b.msRequestFullScreen;a?a.call(b):"undefined"!==typeof window.ActiveXObject&&(b=new ActiveXObject("WScript.Shell"),null!==b&&b.SendKeys("{F11}"));run2();document.getElementById("book").style.visibility="hidden";document.getElementById("book").style.display="none"}function prep(){draw&&redraw()}
function redrawpointer(){ctx3.clearRect(0,0,w,h);ctx3.fillStyle="rgba(225, 225, 225, 0.8)";ctx3.beginPath();ctx3.arc(cx,cy,c1R,0,2*Math.PI,!0);ctx3.closePath();ctx3.fill()}
function redraw(){ctx.clearRect(0,0,w,h);var b=0,a=rMain;ctx.strokeStyle="#EEEEEE";if(br){theta=0;if(a>c1R)for(;theta<=2*Math.PI;)ctx.beginPath(),ctx.arc(a*Math.cos(theta)+(w/2-c1R/2),a*Math.sin(theta)+(h/2-c1R/2),12*c1R/20,0,2*Math.PI,!0),ctx.closePath(),ctx.stroke(),theta+=Math.PI/32;0<=rMain&&(rMain-=12*c1R/15);return 0}if(rMain>=12*c1R-c1R){draw=!1;end=!0;ctx.strokeStyle="#333333";if(mdown){ctx.beginPath();ctx.arc(w/2-c1R/2,h/2-c1R/2,12*c1R,0,2*Math.PI,!0);ctx.closePath();ctx.stroke();ctx.lineWidth=
1;a*=1.1;theta=Math.PI/3.3;ctx.lineWidth=5;for(ctx.font="20px monospace";theta<=2*Math.PI;)ctx.fillStyle="rgba(0, 0, 0, 1)",ctx.strokeStyle="#000000",ctx.beginPath(),ox[b]=a*Math.cos(theta)+(w/2-c1R/2),oy[b]=a*Math.sin(theta)+(h/2-c1R/2),0==b&&(ctx.drawImage(img[0],a*Math.cos(theta)+(w/2-c1R/2)-2*c1R,a*Math.sin(theta)+(h/2-c1R/2)-2*c1R,4*c1R,4*c1R),c1&&(ctx.arc(ox[0],oy[0],3*c1R,0,2*Math.PI,!0),ctx.fillStyle="white",ctx.fillText("SETTINGS",ox[0]-50,oy[0]+4*c1R))),1==b&&(ctx.drawImage(img[1],a*Math.cos(theta)+
(w/2-c1R/2)-2*c1R,a*Math.sin(theta)+(h/2-c1R/2)-2*c1R,4*c1R,4*c1R),c2&&(ctx.arc(ox[1],oy[1],3*c1R,0,2*Math.PI,!0),ctx.fillStyle="white",ctx.fillText("PLAY",ox[1]-25,oy[1]+4*c1R))),2==b&&(ctx.drawImage(img[2],a*Math.cos(theta)+(w/2-c1R/2)-2*c1R,a*Math.sin(theta)+(h/2-c1R/2)-2*c1R,4*c1R,4*c1R),c3&&(ctx.arc(ox[2],oy[2],3*c1R,0,2*Math.PI,!0),ctx.fillStyle="white",ctx.fillText("CO-OP",ox[2]-30,oy[2]+4*c1R))),3==b&&(ctx.drawImage(img[3],a*Math.cos(theta)+(w/2-c1R/2)-2*c1R,a*Math.sin(theta)+(h/2-c1R/2)-
2*c1R,4*c1R,4*c1R),c4&&(ctx.arc(ox[3],oy[3],3*c1R,0,2*Math.PI,!0),ctx.fillStyle="white",ctx.fillText("HIGHSCORES",ox[3]-60,oy[3]+4*c1R))),4==b&&(ctx.drawImage(img[4],a*Math.cos(theta)+(w/2-c1R/2)-2*c1R,a*Math.sin(theta)+(h/2-c1R/2)-2*c1R,4*c1R,4*c1R),c5&&(ctx.arc(ox[4],oy[4],3*c1R,0,2*Math.PI,!0),ctx.fillStyle="white",ctx.fillText("STORY",ox[4]-30,oy[4]+4*c1R))),ctx.closePath(),ctx.stroke(),theta+=2*Math.PI/5,b++}ctx.lineWidth=1}else{for(theta=0;theta<=2*Math.PI;)ctx.beginPath(),ctx.arc(a*Math.cos(theta)+
(w/2-c1R/2),a*Math.sin(theta)+(h/2-c1R/2),12*c1R/20,0,2*Math.PI,!0),ctx.closePath(),ctx.stroke(),theta+=Math.PI/32;rMain<=12*c1R-c1R/2&&(rMain+=12*c1R/15)}ctx.font=c1R/3+"px Arial"}
function redraw2(){var b=0,a=document.getElementById("myCanvas2");a.width=w;a.height=h;a=a.getContext("2d");a.fillStyle="#c6b4ca";a.fillRect(0,0,w,h);a.stokeStyle="#000000";for(var d=0;b<=12*c1R;)a.beginPath(),a.arc(b*Math.cos(d)+(w/2-c1R/2),b*Math.sin(d)+(h/2-c1R/2),12*c1R/20,0,2*Math.PI,!0),a.closePath(),a.stroke(),d+=Math.PI/32,d>=2*Math.PI&&(d=0,b+=12*c1R/20)}function getDistance(b,a){var d=0,e=0,d=b-(w/2-c1R/2),e=a-(h/2-c1R/2);return Math.sqrt(d*d+e*e)}
function dst(b,a,d,e){var f=0,g=0,f=b-d,g=a-e;return Math.sqrt(f*f+g*g)};