var thor, thor_moving;
var hulk, hulk_moving;
var ironman, iron_moving;
var captain, captain_moving;
var thanos,gumora,hella,ronan;

var bg;
var startbg;
var start2;
var enemy,enemyGroup;


var gameState="serve";
var thor_score=0;
var hulk_score=0;
var captain_score=0;
var iron_score=0;

var thor_life=3;
var hulk_life=3;
var captain_life=3;
var iron_life=3;


var flag=null;
 

function preload(){
  thor_moving=loadImage("avengers/thor.png");
  hulk_moving=loadImage("avengers/hulk.png");
  iron_moving=loadImage("avengers/iron.png");
  captain_moving=loadImage("avengers/captain.png");
   thanos=loadImage("enemies/thanos.png");
   gumora=loadImage("enemies/gumora.png");
   hella=loadImage("enemies/hella.png");
   ronan=loadImage("enemies/ronan.png");
  bg=loadAnimation("background/start.jpg");
  start=loadAnimation("background/battle.png");
  startButton=loadImage("background/start2.png");
  gameOver=loadAnimation("game.jpg");
  
  
}
function setup(){
  createCanvas(displayWidth,displayHeight);
 startbg=createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
 startbg.addAnimation("initial",bg);
 startbg.addAnimation("selection",start);
 startbg.addAnimation("over",gameOver);
 startbg.scale=5;

 hulk=createSprite(100,150,20,20);
 hulk.addImage(hulk_moving);
 hulk.visible=false;
 hulk.scale=0.7;
 hulk.debug=true;
 hulk.setCollider("circle",0,0,180)

 iron=createSprite(500,150,20,20);
 iron.addImage(iron_moving);
 iron.visible=false;
 iron.debug=true;
iron.setCollider("rectangle",0,0,150,300);

 captain=createSprite(950,150,20,20);
 captain.scale=0.7;
 captain.visible=false;
 captain.addImage(captain_moving);
 captain.debug=true;
 captain.setCollider("rectangle",0,0,340,550)

 thor=createSprite(1400,150,20,20);
 thor.visible=false;
 thor.addImage(thor_moving);
 thor.debug=true;
 thor.setCollider("rectangle",0,0,320,450)

 start2=createSprite(displayWidth/2-100,displayHeight/2,20,20);
 start2.addImage(startButton);
 enemyGroup=createGroup();
 
  
}
function draw(){
  if(gameState==="serve"){
  if(mousePressedOver(start2)){
    startbg.changeAnimation("selection");
    start2.destroy();
    thor.visible=true;
    hulk.visible=true;
    iron.visible=true;
    captain.visible=true;
    gameState="play"
  }
}
if(gameState==="play"){
  
    if(keyDown("t")){
      movebackGround();
      enemies();
      flag="thor";
      thor.visible=true;
      hulk.visible=false;
      iron.visible=false;
      captain.visible=false;

      thor.x=World.mouseX;
     thor.y=World.mouseY;
     
    if(thor.isTouching(enemyGroup)){
      enemyGroup[0].destroy();
      thor_score+=1;
      }
    thor_life-=1;
    if(!keyDown("t")&&thor.isTouching(enemyGroup)&&thor_life<1){
      gameState="end";
      
    }
    }
    else if(keyDown("h")){
      movebackGround();
      enemies();
      flag="hulk";
      hulk.visible=true;
      thor.visible=false;
      iron.visible=false;
      captain.visible=false;
     hulk.x=World.mouseX;
     hulk.y=World.mouseY;
     if(hulk.isTouching(enemyGroup)){
      enemyGroup[0].destroy();
      hulk_score+=1;
      }
   
    }
    else if(keyDown("i")){
      movebackGround();
      enemies();
      flag="iron";
      thor.visible=false;
      hulk.visible=false;
      iron.visible=true;
      captain.visible=false;
      iron.x=World.mouseX;
     iron.y=World.mouseY;
 if(iron.isTouching(enemyGroup)){
      enemyGroup[0].destroy();
      iron_score+=1;
      }
     
    } 
    else if(keyDown("c")){
      movebackGround();
      enemies();
      flag="captain";
      thor.visible=false;
      hulk.visible=false;
      iron.visible=false;
      captain.visible=true;

      captain.x=World.mouseX;
      captain.y=World.mouseY;
   
    if(captain.isTouching(enemyGroup)){
      enemyGroup[0].destroy();
      captain_score+=1;
      }
    }

     
  }
  drawSprites();
  if(gameState==="serve"){
    textSize(30);
    stroke("green");
    fill("orange");
    text("Click on start to initiate the war by following the below instructions to play",50,50)
    text("Press t to start with thor",50,100);
    text("Press i to start with iron",50,150);
    text("Press c to start with captain",50,200);
    text("Press h to start with hulk",50,250);
  }

  if(gameState==="play"){
    textSize(30);
    stroke("red");
    fill("white");
if(flag==="thor"){
  text("Continue Pressing t and  move the mouse to defeat the enemies",50,50);
}
else if(flag==="captain"){
  text("Continue Pressing c and  move the mouse to defeat the enemies",50,50);
} 
else if(flag==="hulk"){
  text("Continue Pressing h and  move the mouse to defeat the enemies",50,50);
}
else if(flag==="iron"){
  text("Continue Pressing i and  move the mouse to defeat the enemies",50,50);
}
  }
   

}
function enemies(){
  if(frameCount%60===0){
  enemy=createSprite(displayWidth,random(100,displayHeight-200));
  enemy.debug=true;
  var x= Math.round(random(1,2));
  if(x===1){
    enemy.x=displayWidth;
    enemy.velocityX=-12;
  }else{
    enemy.x=0;
    enemy.velocityX=12;
  }
  
  enemy.lifetime=displayWidth/6;
  var x=Math.round(random(1,4));
  switch(x){
    case 1:enemy.addImage(thanos);
    break;
    case 2:enemy.addImage(gumora);
    break;
    case 3:enemy.addImage(hella);
    break;
    case 4:enemy.addImage(ronan);
    break;
    default:break;
  }
  enemyGroup.add(enemy);
  }
}

function movebackGround(){
  startbg.velocityX=-4;
  if(startbg.x<0){
    startbg.x=displayWidth/2;
  }
}
