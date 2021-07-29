let player;
let bgImge;
let playerImage;
let obstacleImage;
let obstacles = [];

let wordClassifier;

function preload() {
      bgImge = loadImage ("background.jpg")
      playerImge = loadImage ("player.png")
      obstacleImage = loadImage ("obstacle.png")

    let options={
      probabilityThreshold: 0.85,
    };

    wordClassifier = ml5.soundClassifier("SpeechCommands18w",options);
}

function heardWord(error,results){
  if(results[0].label == "up") player.jump();
}

function setup() {
  createCanvas(1000, 500);
  player = new Player() ;
  wordClassifier.classify(heardWord);
}

function keyPressed(){
  if (key === " ") {
    player.jump();
    console.log("up")
  }
}

function draw() {

  if (random(1) < 0.01){
    obstacles.push(new Obstacle());
  }

  background(bgImge);
  player.show();
  player.move();

  for (let obs of obstacles)
  {
    obs.show();
    obs.move();
   
    if(player.collided(obs) == true)
    {
      console.log("Game-Over");
      noLoop();
    }
  }
}
