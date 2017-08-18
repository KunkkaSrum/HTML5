/*
  Function  :秋意浓
  Author    :黄益华
  Build_Date:2015-12-18
  Version   :0.0
 */

//1. 公共变量声明块........................................................

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    controls = document.getElementById('controls'),
    animateButton = document.getElementById('sionButton'),
    sky = new Image(),
    qiu = new Image(),
    spritesheet = new Image(),
    text = new Image(),
    paused = true,
    lastTime = 0,
    fps = 0,x=0,y=0,w=0,

    skyOffset = 0,
    SKY_VELOCITY = 30; // 30 pixels/second
    runnerCells = [
      { left: 0,   top: 0, width: 120, height: 90 },
      { left: 120,  top: 0, width: 120, height: 90 },
      { left: 240, top: 0, width: 120, height: 90 },
      { left: 360, top: 0, width: 120, height: 90 },
      { left: 480, top: 0, width: 120, height: 90 },
      { left: 600, top: 0, width: 120, height: 90 },
    ];

    runInPlace = {
       lastAdvance: 0,
       PAGEFLIP_INTERVAL: 100,

       execute: function (sprite, context, time) {
          if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
             sprite.painter.advance();
             this.lastAdvance = time;
          }
       }
    },

    moveLeftToRight = {
       lastMove: 0,
       
       execute: function (sprite, context, time) {
         if (this.lastMove !== 0) {
           sprite.left -= sprite.velocityX *
                          ((time - this.lastMove) / 1000); 

           if (sprite.left < 0) {
              sprite.left = canvas.width;
           }
         }
         this.lastMove = time;
       }
    },
// Sprite....................................................

    sprite = new Sprite('runner',
                        new SpriteSheetPainter(runnerCells),
                        [ runInPlace, moveLeftToRight ]);


// Functions.....................................................

function erase() {
   context.clearRect(0,0,canvas.width,canvas.height);
}

function drawbackground(){
    context.drawImage(qiu,0,0,800,600);
}

function draw() {
   context.save();

   skyOffset = skyOffset < canvas.width ?
               skyOffset + SKY_VELOCITY/fps : 0;

   context.save();
   context.translate(-skyOffset, 0);
   context.drawImage(sky, 0, 0,800,300);
   context.drawImage(sky, sky.width-2, 0);

   context.restore();
}

function calculateFps(now) {
   var fps = 1000 / (now - lastTime);
   lastTime = now;
   return fps; 
}

function animate(now) {
   if (now === undefined) {
      now = +new Date;
   }

   fps = calculateFps(now);

   if (!paused) {
      erase();
	  draw();
     drawbackground(); 
    sprite.update(context, now);
      sprite.paint(context); 
   }

   requestNextAnimationFrame(animate);
}



// Event handlers................................................

animateButton.onclick = function (e) {
   paused = paused ? false : true;
   if (paused) {
      animateButton.value = 'Animate';
   }
   else {
      animateButton.value = 'Pause';
   }
};

// Initialization................................................

canvas.width = canvas.width;
canvas.height = canvas.height;

sky.src = 'png/sky.png';
sky.onload = function (e) {
   draw();
};
qiu.src = 'png/qiu.png';
sky.onload = function (e) {
   drawbackGraound();
};
spritesheet.src = 'png/hudie.png';
text.src = "png/wenzi.png";
spritesheet.onload = function(e) {
    context.drawImage(sky, 0, 0,800,600);
   context.drawImage(qiu, 0, 0,800,600);
   context.drawImage(text, 0, 0,800,600);
};

sprite.velocityX = 25;  // pixels/second
sprite.left = 680;
sprite.top = 300;

requestNextAnimationFrame(animate);
