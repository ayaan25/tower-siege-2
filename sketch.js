const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var bird, slingShot;
var gamestate="onsling";
var score = 0;

function preload() {
    //backgroundImg = loadImage("sprites/bg.png");
    changeBackground();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

  t1 = new Pig(800,350);
  t2 = new Pig(850,350);
  t3 = new Pig(900,350);
  t4 = new Pig(950,300);
  t5 = new Pig(825,300);
  t6 = new Pig(875,300);
  t7 = new Pig(925,300);
  t8 = new Pig(850,250);

    bird = new Bird(200,50);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
    background(backgroundImg);
    Engine.update(engine);
    textSize(30);
    fill ("white");
    text("score :"+ score,1000,50);
    t1.display();
    t2.display();
    t3.display();
    t4.display();
    t5.display();
    t6.display();
    t7.display();
    t8.display();

    
    t1.score();
    t2.score();
    t3.score();
    t4.score();
    t5.score();
    t6.score();
    t7.score();
    t8.score();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display(); 
}

function mouseDragged(){
    if(gamestate==="onsling")
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
}


function mouseReleased(){
    slingshot.fly();
    gamestate="launch";
}
function keyPressed(){
    if (keyCode===32){
        slingshot.attach(bird.body);
        Matter.Body.setPosition(bird.body,{x:200, y:50});
        bird.trajectory=[];
        gamestate="onsling";
    }
}
async function changeBackground(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
     var responseJson= await response.json();
     var dateTime = responseJson.datetime ;
     var hour = dateTime.slice(11,13);
     if (hour>=6 && hour<18){
         bg="sprites/bg.png"
     }
     else
     bg="sprites/bg2.jpg";
     backgroundImg=loadImage(bg);
}