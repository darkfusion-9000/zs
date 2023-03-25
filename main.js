video = ""
function preload() {
 video = createVideo("video.mp4");   
}


function setup() {
  canvas = createCanvas(480,380);
  canvas.center();
  video.hide();
}

function start() {
 objectDetector = ml5.objectDetector('cocossd',modelLoaded);
 document.getElementById("status").innerHTML = "status : Detecting Objects"; 
}

function modelLoaded() {
  console.log("modelLoaded!");
  status = true;
  video.loop();
  video.speed(3.5);
  video.volume(0);
}

function gotResult(error,results) {
 if (error) {
  console.log(error);
 } 
 console.log(results);
 object = results;
}

function draw() {
  image(video,0,0.480,380);
  if (status != "") {
    objectDetector.detect(video, gotResult);
for (index = 0; index < object.length; index++) {
  document.getElementById("status").innerHTML = "status : Detecting Objects";
  document.getElementById("object").innerHTML = "No. Of Objects Detected Are : " + object.length;
  fill("coral");
  percent = floor(object[index].confidence*100);
   text(object[index].label+" "+ percent+"%",object[index].x+15, object[index].y+15);
   noFill();
   stroke("coral");
   rect(object[index].x, object[index].y, object[index].width, object[index].height);
}
  }
}
