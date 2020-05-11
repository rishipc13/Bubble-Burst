var l=0,score=0,time=10,y,x,timer=false,t=0,f=2,temp,r=0,rb=0, speed=2,spawn=true;
var music,game,pause=false,image=new Image();
image.src="gauntlet.png";
image.enabled=true;
var gauntlet=false;
var image1=new Image();
image1.src="felix.png";
image1.enabled=true;

function start(){
 document.getElementById("intro").style.visibility = "hidden";
 document.getElementById("canvas").style.visibility ="visible";
 music = new sound("bgmusic.mp3");
 music.play();
 x=setInterval("please()",1000-10*l);
}

//define canvas object
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width=600,height=600;

//function to load bg music
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.setAttribute("loop","true");
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
  
}

//function to draw score
function drawScore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Score: "+score, 220, 25);
}

//function to draw timer
function drawTimer() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "#FF0000";
    ctx.fillText("Time: "+time, 400, 25);
}

function drawfelix(){
    ctx.font = "18px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Left: "+f,500,120);
             
}

// function to generate random number
function random(min,max) {
  const num = Math.random()*(max-min) + min;
  return num;
}

// define Ball constructor
function Ball(x, y, velX, velY, color, size,hits) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
  this.hits=hits;
}


// function to draw balls
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
  if(this.hits!=0)
 { ctx.font = "this.size Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(this.hits,this.x,this.y);    
  ctx.closePath;}
};


//function to update the balls position
Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

//function to check if new ball can be spawned
function checknewBall(ball1,ball2)
 { var a1,a2,b1,b2,d1,d2;
   a1 = ball1.x - ball2.x;
   b1 = ball1.y - ball2.y;
   d1=Math.sqrt(a1*a1+b1*b1);
   a2 = ball1.x + ball1.velX - ball2.x;
   b2 = ball1.y + ball1.velY - ball2.y;
   d2=Math.sqrt(a2*a2+b2*b2);
   if(d1<ball1.size+ball2.size||d2<ball1.size+ball2.size)
       {
           spawn=false;
       }
     
 }

//function to detect the collision between 2 balls
function collisionDetect(balls) {
    var i,j,d,a,b;
    for(i=0;i<balls.length-1;i++)
        {
         for(j=i+1;j<balls.length;j++)  
            { a = balls[i].x - balls[j].x;
              b = balls[i].y - balls[j].y;
              d=Math.sqrt(a*a+b*b);
              if(d<=balls[i].size+balls[j].size)
    		    {
    			  //reverse ball one
    			  balls[i].velX = -balls[i].velX;
    			  balls[i].velY= -balls[i].velY;
    
    			  //reverse ball two
    			  balls[j].velX = -balls[j].velX;
    			  balls[j].velY = -balls[j].velY;
    		   }
               
             }
         }
 
};


document.onkeydown = function(e){
    if(time==0 && e.keyCode == 32)
        {
            location.reload();
        }
    else if(time>0&&e.keyCode == 80)
        {
            pause=true;
        }
    else if(time>0&&e.keyCode == 82)
        {
            pause=false;
            x=setInterval("please()",1000-10*l);
        }
}

// function to check if user clicked on ball
function isIntersect(point, circle) {
  return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.size;
}

let rect = canvas.getBoundingClientRect();
canvas.addEventListener('click', (e) => {
  const pos = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
for(var i=0;i<balls.length;i++)
    {
        if(isIntersect(pos,balls[i])&&time>0&&pause==false&& balls[i].hits<=1)
            {   score+=10;
                balls.splice(i,1);
            }
         if(isIntersect(pos,balls[i])&&time>0&&pause==false&& balls[i].hits>1)
            {   score+=10;
                balls[i].hits--;
            }
    }
if(pos.x>=10&&pos.x<=100&&pos.y>=10&&pos.y<=100&& gauntlet==true)
    {gauntlet=false;
     for(var i=0;i<balls.length;i++)
         {
             if(i%2==0)
                 {
                     balls.splice(i,1);
                 }
         }
    }
if(pos.x>=500&&pos.x<=590&&pos.y>=10&&pos.y<=100&& f!=0)    
    {f--;
     temp=l;
     l=-1000;
     setInterval("felixtimer()",1000);
     
    }
});

function felixtimer()
 {
     r++;
 }
if(r>=5)
    {
        l=temp;
        r=0;
    }

let balls = [];

//function to generate new balls
function please()
  { l++;
    t++;
   rb++;
    score+=10;
    const size = random(15,30);
    const size1 = random(30,40);
    let ball = new Ball(
      random(size,width - size),
      random(size,height - size),
      random(-speed,speed),
      random(-speed,speed),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      size,0
      );
   for(var i=0;i<balls.length;i++)
    {   
      checknewBall(balls[i],ball);
    }
   if(spawn==true)     
  { balls.push(ball);
  }
  else {  spawn=true;  }
    
   if(rb%6==0)
       {
           speed++;
       }
   if(rb%10==0)
       {
        let ball = new Ball(
        random(size1,width - size1),
        random(size1,height - size1),
        random(-speed,speed),
        random(-speed,speed),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size1,5
      );
      for(var i=0;i<balls.length;i++)
    {   
      checknewBall(balls[i],ball);
    }
   if(spawn==true)     
  { balls.push(ball);
  }
   else{spawn=true;  
       }
       }
    if(balls.length>20)
    { timer=true;
      time=time-1;
     }
    else if(balls.length<=20)
      { timer=false;
          time=10;
       }
             
 
}


//function to display pause screen
    function pauseScreen(){
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.4)"; 
        ctx.fillRect(canvas.width/4,canvas.height/4,canvas.width/2,canvas.height/2 - 80);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px Consolas";
        ctx.fillText("GAME PAUSED",canvas.width/4,canvas.height/2 - 70);
        ctx.font = "20px Consolas";
        ctx.fillText("Press R to resume",canvas.width/4  + 10,canvas.height/2 - 25);
        ctx.restore();
    }

//function to display score and highscore
function gameOver(){
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.4)"; 
        ctx.fillRect(canvas.width/4,canvas.height/4,canvas.width/2,canvas.height/2 - 50);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px Consolas";
        ctx.fillText("Score: "+score,canvas.width/4 + 80,canvas.height/2 - 70);
        ctx.font = "25px Consolas";

        var highScore = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : score;
        if(highScore <= score){
            highScore = score;
            localStorage.setItem("score",highScore);
        }

        ctx.fillText("Top Score: " + highScore,canvas.width/4  + 10,canvas.height/2 - 35);
        ctx.font = "20px Consolas";
        ctx.fillText("Press Space Bar for",canvas.width/4 + 10,canvas.height/2);
        ctx.fillText("a new game ",canvas.width/4 + 10,canvas.height/2 + 25);
    }

// define loop that keeps drawing the scene constantly
function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';

    ctx.fillRect(0,0,width,height);
    drawScore();
  

  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  }
    if(timer &&time>0)
        {
drawTimer();
        }
    if(time==0)
        {
           clearInterval(x);
           gameOver();    
        }
    if(pause==true &&time>0)
        {   clearInterval(x);
            pauseScreen();
        }
     if(score>150&&t%10==0)
        {
           
           gauntlet=true;
        }
     if(gauntlet)
         {
             ctx.drawImage(image,10,10,90,90);
         }
     if(f!=0)
         {
            ctx.drawImage(image1,500,10,90,90);
            drawfelix();
            }
    
collisionDetect(balls);
game=requestAnimationFrame(loop);
}
loop();