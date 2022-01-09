var counter = 0;
let pipes = [];
var slider;
let bird;
var text;
function setup(){
    createCanvas(800, 400);
    bird = new Bird();
    //pipes.push(new Pipe());
}

function draw(){
    background(30, 30, 200);
        
    if(counter % 100 == 0){
        pipes.push(new Pipe());
    }

    for(var i = pipes.length -1; i >= 0; i--){
        pipes[i].update();
        if(pipes[i].offScreen()){
            pipes.splice(i, 1);
        }
    }
    
    for (var j = 0; j < pipes.length; j++) {
        if (pipes[j].collides(bird)) {
            pipes[j].collide = true;
            gameOver();
            break;
        }
    }
    bird.update();
    counter++;
    for(pipe of pipes){
        pipe.show();
    }
    bird.show();
    //bird.update();
}
function keyPressed(){
        if(key == " "){
            bird.up();
        }
}
function gameOver(){
    document.getElementsByTagName("h2")[0].style.color = "black"
}