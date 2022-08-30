music = "";
function preload() {
  music = loadSound("music.mp3");
}
function setup() {
  canvas = createCanvas(600, 500);
  background("white");
  video = createCapture(VIDEO);
  video.hide();
}
function draw() {
  image(video, 0, 0, 600, 500);
}

function play() {
  music.play();
}
