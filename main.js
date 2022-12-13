var status = "";
objects = [];
var sound = "";
function preload(){
    sound = loadSound("emergency_alert.mp3");
}
function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
function draw(){
    image(video, 0, 0, 400, 400);
    if(status != ""){
        objectDetector.detect(video, gotResults);
            r = random(255);
            g = random(255);
            b = random(255);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person"){
                document.getElementById("isbabyhere").innerHTML = "Baby Found!";
                sound.stop();
            }
            else{
                document.getElementById("isbabyhere").innerHTML = "Baby Missing";
                sound.play();
            }
        }
        if(objects.length == 0){
            document.getElementById("isbabyhere").innerHTML = "Baby Missing";
            sound.play();
        }
    }
}
