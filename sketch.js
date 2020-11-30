//create all global variables
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var ground;
var PLAY,END;
var gamestate=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage  = loadImage("obstacle.png");
 
  
}

function setup() {
  createCanvas(400,400);

  //create monkey sprite
  monkey=createSprite(50,300,50,100);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.13;
  
  //create ground sprite
  ground=createSprite(200,350,500,20);
  ground.x=ground.width/2;
  ground.velocityX=-4;
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
}


function draw() {
  background("lightBlue");
  
  //gameState=PLAY ;
  
  //infite ground
  if(ground.x<200){
    ground.x=ground.width/2;
  }
  
  text("score =  "+ score,300,30);
  
  if( gamestate==PLAY){
    //make monkey jump
  if(keyDown("space")){
    monkey.velocityY=-12;
  }
  
  //give gravity to monkey
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //collide monkey on ground
  monkey.collide(ground);   
  
    //add scre if touching banana
  if(monkey.isTouching(FoodGroup)){
     score=score+1;
     FoodGroup.destroyEach();
     }
  
  //reduce score if touching banana
   if(monkey.isTouching(obstacleGroup)){
     score=score - 1;
     monkey.scale=0.13;
     obstacleGroup.destroyEach();
     } 
  
    //swich scale
   switch(score){
      case 10: monkey.scale=0.12;
        break;
      case 20: monkey.scale=0.14;
        break
      case 30: monkey.scale=0.16;  
        break;
      case 40: monkey.scale=0.18;  
        break;  
       default: break; 
    }
   
    
    obstacles();
    food();
    
  }
 
  if(gamestate===END && score==-1){
   text("GAME OVER! ", 200,100);
    text("press R key to rest your game",100,200);
    obstacleGroup.velocityX=0; 
    obstacleGroup.destroyEach();
    FoodGroup.velocityX=0;
    FoodGroup.destroyEach(); 
    restart();
  }
  
  if(score==-1){
    gamestate=END; 
  }
  
  
 drawSprites(); 
}

//create food function
function food (){
  if (frameCount%80===0){
    banana=createSprite(390,random(120,200),25,35);
    banana.addImage(bananaImage,"bananaimage");
    banana.scale=0.12;
    banana.velocityX=-10;
    banana.lifetime=50;
    FoodGroup.add(banana);
  }
}

//create obsical function
function obstacles(){
  if(frameCount%150===0){
    obstacle=createSprite(random(280,350),300,60,70);
    obstacle.addImage(" obstacleImage",obstacleImage);
    obstacle.velocityX=-11;
    obstacle.scale=0.2;
    obstacle.lifetime=50; 
    obstacleGroup.add(obstacle);
  }
}

function restart(){
  if(keyDown("r")){
    gamaestate=PLAY;
    score=0;
  }
}