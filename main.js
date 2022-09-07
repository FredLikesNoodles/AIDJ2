leftWristX = 0
leftWristY = 0;
rightWristY = 0;
rightWristX = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
music = "";
function preload() {
  music = loadSound("music.mp3");
}
function setup() {
  canvas = createCanvas(600, 500);
  background("white");
  video = createCapture(VIDEO);
  video.hide();
  posenet = ml5.poseNet(video, modelLoaded)
  posenet.on("pose", gotPoses)
}
function draw() {
  image(video, 0, 0, 600, 500);
  fill("red")
  stroke("red")
  if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20)
    leftWristtoNumber = Number(leftWristY)
    floored_number = Math.floor(leftWristtoNumber)
    volume = floored_number/1000
    v1 = volume*2;
    music.setVolume(v1)
    document.getElementById("volume").innerHTML = v1
  }
  if(scoreRightWrist > 0.2){
    circle(rightWristX, rightWristY, 20)
    if(rightWristY > 0 && rightWristY <= 100){
      document.getElementById("speed").innerHTML = " 0.5x"
      music.rate(0.5)
    }
    else if(rightWristY > 100 && rightWristY <= 200){
      document.getElementById("speed").innerHTML = " 1x"
      music.rate(1)
    }
    else if(rightWristY > 200 && rightWristY <= 300){
      document.getElementById("speed").innerHTML = " 1.5x"
      music.rate(1.5)
    }
    else if(rightWristY > 300 && rightWristY <= 400){
      document.getElementById("speed").innerHTML = " 2x"
      music.rate(2)
    }
    else if(rightWristY > 400 && rightWristY <= 500){
      document.getElementById("speed").innerHTML = " 2.5"
      music.rate(2.5)
    }
    

  }

}

function play() {
  music.play();
  music.setVolume(0.5)
  music.rate(1)
}

function modelLoaded(){
    console.log("PoseNet has been intialized")
}
function gotPoses(results){
    if(results.length>0){
        console.log(results)
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        console.log(leftWristX, leftWristX, rightWristX, rightWristY)
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

    }
}