img = "";
status = "";
object = [];
function preload() {
    img = loadImage("dog_cat.jpg");
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}
function draw() {
    image(video, 0, 0, 380, 380);
    console.log("image_draw");
    objectDetector.detect(video, getResults);
    if (status != "") {
        console.log(" in status");
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected ";
            document.getElementById("number_of_object").innerHTML = "Number of objects detected are : " + object.length;
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 10, object[i].y + 20);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }

}
function modelLoaded() {
    console.log('Model is loaded');
    status = true;

}
function getResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        object = results;
    }
}