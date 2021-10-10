const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, ground, tower, towerImg, bgImg, cannon, cannonBall;
var angle;
var balls = [];

function preload() {
  bgImg = loadImage("assets/background.gif");
  towerImg = loadImage("assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  var options_ground_tower = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, 1300, 5, options_ground_tower);
  World.add(world, ground);

  tower = Bodies.rectangle(150, 350, 160, 310, options_ground_tower);
  World.add(world, tower);

  angleMode(DEGREES);
  angle = 15;

  cannon = new Cannon(180, 110, 130, 100, angle);
}

function draw() {
  image(bgImg, 0, 0, 1200, 600);

  Engine.update(engine);

  rect(ground.position.x, ground.position.y, 1300, 5);

  push();
  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160, 310);
  pop();

  cannon.display();

  for (var i = 0;i < balls.length;i ++) {
    showCannonBalls(balls[i]);
  }
}

function keyPressed() {
  if (keyCode == DOWN_ARROW) {
    cannonBall = new CannonBall(cannon.x, cannon.y);
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball) {
  if (ball) {
    ball.show();
  }
}

function keyReleased() {
  if (keyCode == DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}