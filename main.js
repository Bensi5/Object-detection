img = "";
status="";
object=[];
function preload() {
    img = loadImage("dog_cat.jpg");
}
function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}
function draw() {
    image(img, 0, 0, 640, 420);
    console.log("image_draw");
    if(status!= ""){
        console.log(" in status");
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML = "Status : Object Detected ";

            fill("red");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+10,object[i].y+20);
            noFill();
            stroke("red");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
   
}
function modelLoaded(){
    console.log('Model is loaded');
    status=true;
    objectDetector.detect(img,getResults);
}
function getResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object=results;
    }
}