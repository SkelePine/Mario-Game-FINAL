var backgroundimg, bulletimg, gunimg, mariofallingimg, mariorunningimg
var mariorunning, mariofalling, gun, bullet, mario
var edges, gameoverimg, gameover
var bowser, bowserimg
var gamestate = "play"
var bulletG
var gun2img
var gun2
var bullet2, bullet2img
var bowser2,bowser2img
var score = 0
var highscore = 0
var gunshotsound, gameoversound
var diesound




function preload(){
backgroundimg = loadImage("images/background.jpg")
bulletimg = loadImage("images/bullet.png")
gunimg = loadImage("images/gun.png")
mariofallingimg = loadImage("images/mariofalling.png")
mariorunningimg = loadImage("images/mariorunning.png")
gameoverimg = loadImage("images/gameover.png")
bowserimg = loadImage("images/bowser.png")
gun2img = loadImage("images/gun2.png")
bullet2img = loadImage("images/bullet2.png")
bowser2img = loadImage("images/bowser2.png")

gunshotsound = loadSound("gunshotsound.mp3")
gameoversound = loadSound("gameoversound.wav")
gameoversound.setVolume(0.1)
diesound = loadSound("die.mp3")
diesound.setVolume(0.2)
}


function setup() {
  createCanvas(800,650);
 mario = createSprite(500,600 , 50, 50);
 mario.addImage(mariorunningimg)
 mario.scale = 0.4
  gun = createSprite(100,600,50,50)
  gun.addImage(gunimg)
  gun.scale = 0.05
  gameover = createSprite(400,320,10,10)
  gameover.addImage(gameoverimg)
  gameover.scale = 2.0
  bulletG = new Group()
  bowser = createSprite(20,20,20,20)
  
  bowser.addImage(bowserimg)
  bowser.scale = 0.2
  gun2 = createSprite(700,600,50,50)
  gun2.addImage(gun2img)
  gun2.scale = 0.20
  bowser2 = createSprite(20,20,20,20)
  bowser2.addImage(bowser2img)
  bowser2.scale = 0.2
}

function draw() {
 
  background(backgroundimg); 
fill ("white")
textSize(20)
 
 text("Score: " + score,  700,50)
  text("Highscore: " + highscore, 20,50)
  if(gamestate == "end"){
    textSize(50)
    text("Press space to restart!", 175,100)
  }

if(score > highscore){
  highscore = score
}
//bullet.x = gun.x + 30
  if(gamestate == "play"){
   
    bowser.x = gun.x-60
    bowser.y = gun.y+10
    bowser2.x = gun2.x+60
    bowser2.y = gun2.y-10
    gameover.visible = false
    score = Math.round( frameCount/40 )
  if(keyDown("RIGHT_ARROW")){
    mario.x = mario.x + 15
  }
  if(keyDown("LEFT_ARROW")){
    mario.x = mario.x - 15
  }
  if(keyDown("UP_ARROW")){
    mario.y = mario.y - 15
  }
  if(keyDown("DOWN_ARROW")){
    mario.y = mario.y + 15
  }
  Shoot()
  
  gun.y = mario.y - 60
  gun2.y = mario.y 
  }


edges = createEdgeSprites()
mario.collide(edges)
 
if(bulletG.collide(mario) || gun.collide(mario)|| bowser.collide(mario)){
  mario.addImage(mariofallingimg)
  gamestate = "end"
}
  if(gamestate == "end"){
    diesound.play()
    gameover.visible = true
    mario.x = 400
    mario.y = 500
    gun.visible = false
    bullet.visible = false
    bowser.visible = false;
    bowser2.visible = false;
    bullet2.visible = false;
    gun2.visible = false;
    bulletG.destroyEach()
  }
   
  if(gamestate == "end" && keyDown("space")){
    diesound.stop()
    gamestate = "play"
    mario.addImage(mariorunningimg)
    mario.x = 500
    mario.y = 600
    gun.visible = true;
    bullet.visible = true;
    bowser.visible = true;  
    gun2.visible = true;
    bullet2.visible = true;
    bowser2.visible = true;
    score = 0;
    frameCount = 0
  }

  drawSprites();
  
}

function Shoot(){
  if(frameCount % 26 == 0){
    gunshotsound.play()

  bullet = createSprite(gun.x+30,gun.y-20,50,50)
  bullet.addImage(bulletimg)
  bullet.scale = 0.07
  bullet.lifetime = 200
    bullet.velocityX += 8

    bullet.y = gun.y - 20

    bullet2 = createSprite(gun2.x+30,gun2.y-20,50,50)
    bullet2.addImage(bullet2img)
    bullet2.scale = 0.07
    bullet2.lifetime = 200
      bullet2.velocityX -= 8
  
      bullet2.y = gun2.y - 20
     

    bulletG.add(bullet);
    bulletG.add(bullet2)
  }
}
