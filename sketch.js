
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var rope, fruit, ground;
var fruit_con;

var bgImg, fruitImg, bunnyImg;
var bunny;
var blinkImg, eatImg, sadImg;

var CutBtn,arBtn;

function preload() {

  bgImg = loadImage('background.png');
  fruitImg = loadImage('melon.png');
  bunnyImg = loadImage('Rabbit-01.png');



  blinkImg = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eatImg = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sadImg = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  
  blinkImg.playing = true;
  eatImg.playing = true;
  sadImg.playing = true;
  sadImg.looping = false;
  eatImg.looping = false;
}

function setup() {
  createCanvas(500, 700);

  frameRate(80);



  engine = Engine.create();
  world = engine.world;


  CutBtn = createImg('cut_btn.png');
  CutBtn.position(220, 30);
  CutBtn.size(50, 50);
  CutBtn.mouseClicked(drop);

  
 arBtn = createImg('balloon.png');
 arBtn.position(10,250);
 arBtn.size(150,100);
 arBtn.mouseClicked(airblow);



  rope = new Rope(7, { x: 245, y: 30 });
  ground = new Ground(200, 690, 600, 20);


  blinkImg.frameDelay = 20;
  eatImg.frameDelay = 20;


  bunny = createSprite(250, 620, 100, 100);
  bunny.scale = 0.2;
  bunny.addAnimation('blinking', blinkImg);
  bunny.addAnimation('eating', eatImg);
  bunny.addAnimation('crying', sadImg);
  bunny.changeAnimation('blinking');


  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);


  fruit_con = new Link(rope, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);

}

function draw() {
  background(51);

  image(bgImg, 0, 0, 500, 690);

  push();
  imageMode(CENTER);
  if (fruit != null) {
    image(fruitImg, fruit.position.x, fruit.position.y, 70, 70);
  }
  pop();


  rope.show();
  ground.show();

  Engine.update(engine);

  drawSprites();

  
  if (collide(fruit, bunny) == true) {
    bunny.changeAnimation('eating');

  }

  if (fruit != null && fruit.position.y >= 650) {
    bunny.changeAnimation('crying');
fruit = null;
  }

}

function drop() {


  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80) {
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    } else {
      return false;
    }
  }
}


function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0}, {x:0.01,y:0});
  airSound.play();
}








