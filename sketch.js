//CREATING VARIABLES
var tina, tinaImage, tinaImageFall
var road, roadImage
var edges;
var invisibleRoad
var cloud, cloudImage
var rock, rock1Image, rock2Image, rock3Image, rock4Image, rock5Image, rock6Image
var score = 0
var PLAY = 1
var END = 0
var gameState = PLAY
var rockGroup, cloudsGroup
var gameover, gameoverImage, restart, restartImage
var checkpointSound, dieSound, jumpSound
//FUNCTION PRELOAD
function preload(){

  //LOADING ANIMATIONS
tinaImage = loadAnimation("Tina1.png","Tina2.png","Tina3.png") 
trexImageCollide = loadAnimation("Tina_falling.png")
roadImage = loadImage("Road.png")
cloudImage = loadImage("Cloud.png")
rock1Image = loadImage("Rock1.png")
rock2Image = loadImage("Rock2.png")
rock3Image = loadImage("Rock3.png")
rock4Image = loadImage("Rock4.png")
rock5Image = loadImage("Rock5.png")
rock6Image = loadImage("Rock6.png")
gameoverImage = loadImage("Gameover.png")
restartImage = loadImage("Restart.png")
checkpointSound = loadSound("checkpoint.mp3")
dieSound = loadSound("die.mp3")
jumpSound = loadSound("jump.mp3")
}

function setup(){
  createCanvas(600,200)
  
  //CODING FOR THE TINA SPRITE
 tina = createSprite(5,165,20,50)
 tina.addAnimation("runningtina",tinaImage)
 tina.addAnimation("fallingtina",tinaImageFall)
 tina.scale = 0.2

 //CODING FOR ROAD SPRITE
 road =  createSprite(50,190,600,10)
 road.addImage(roadImage)
 road.velocityX = -(5+5*score/100)

 //CODING FOR INVISIBLE GROUND
 invisibleGround = createSprite(50,195,600,10)
 invisibleGround.visible = false

 //TINA COLLSSION AREA
tina.debug = false
tina.setCollider("circle",0,0,40)

 //CODING FOR EDGES
 edges = createEdgeSprites()

 //CREATING GROUPS
 rockGroup = createGroup()
 cloudsGroup = createGroup()

 //GAME OVER SPRITE
 gameover = createSprite(300,100)
 gameover.addImage(gameoverImage)
 gameover.scale = 0.3

 restart = createSprite(300,130)
 restart.addImage(restartImage)
 restart.scale = 0.1
}

//FUNCTION DRAW
function draw(){

  //BACKGROUND COLOR
  background("white")

  //SCORES
  text("Score: "+score,450,50)

  //GAME STATE
if(gameState === PLAY){
  //CODING GAMEOVER AND RESTART
  road.velocityX=-3
  gameover. visible = false
  restart. visible = false
  score = score+ Math.round(getFrameRate()/60)
  //CODING FOR TINA'S JUMP
  if(keyDown("space") && tina.y>80){
    tina.velocityY = -12
    jumpSound.play()
  }

  //SETTING VELOCITY
  tina.velocityY = tina.velocityY + 0.5

  if(score%100 ==0 && score>0){
  checkpointSound.play()
  }

  //CREATION OF INFINITE ROAD
  if(road.x<0){
    road.x = road.width/2
  }
  //SPAWNING CLOUDS
spawnClouds()

//SPAWNING ROCKS
spawnRocks()

if(rockGroup.isTouching(tina)){
dieSound.play()
gameState = END
}
}
if(gameState === END){
gameover. visible = true
restart. visible = true
tina.changeAnimation("fallingtina",tinaImageFall)
road.velocityX = 0
rockGroup.setVelocityXEach(0)
cloudsGroup.setVelocityXEach(0)
rockGroup.setLifetimeEach(-1)
cloudsGroup.setLifetimeEach(-1)
}

  //EDGES[0],EDGES[1]
tina.collide(invisibleGround)

if(mousePressedOver(restart)){
reset()
}

//DRAW SPRITES
drawSprites()
}

function reset(){
gameState= PLAY;
score = 0
rockGroup.destroyEach()
cloudsGroup.destroyEach()
tina.changeAnimation("runningtina",tinaImage)
}

//CODING FOR CLOUDS
function spawnClouds() {
if(frameCount % 60 ===0){
cloud = createSprite(500,100,40,20)
cloud.velocityX = -3
cloud.addImage(cloudImage)
cloud.scale = 0.25
cloud.y = Math.round(random(10,80))
cloud.depth = tina.depth
tina.depth += 1
cloud.lifetime = 180
cloudsGroup.add(cloud)
}


}

//CODING FOR ROCKS
function spawnRocks() {
if(frameCount % 80 ===0){
rock = createSprite(500,170,20,30)
rock.velocityX = -(6+2*score/100)
var rand = Math.round(random(1,6))
switch(rand) {
case 1: rock.addImage(rock1Image)
break;
case 2: rock.addImage(rock2Image)
break;
case 3: rock.addImage(rock3Image)
break;
case 4: rock.addImage(rock4Image)
break;
case 5: rock.addImage(rock5Image)
break;
case 6: rock.addImage(rock6Image)
break;
default:
break;
}
rock.depth = tina.depth
tina.depth += 1
rock.scale = 0.2
rock.lifetime = 180
rockGroup.add(rock)

}
}