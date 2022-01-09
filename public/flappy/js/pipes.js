class Pipe{
    constructor(){
        this.x = width;
        this.speed = 2;
        this.collide = false;
        
        this.space = 75;
        this.padding = 100;
        
        this.top = random(this.padding, height - (this.padding + this.space));
        this.bottom = this.top + this.space;
        this.width = 35;
    }

    offScreen(){
        return (this.x + this.width < 0);
    }
    collides(bird){
        if(bird.y - bird.r < this.top || bird.y + bird.r > this.bottom){
            if(bird.x + bird.r > this.x && bird.x - bird.r < this.x + this.width){
                return true;
            }
        }
        return false;
    }
    
    show(){
        fill(0, 200, 0);
        if(this.collide){
            fill(200, 0, 0);
            noLoop();
        }
        noStroke();
        rect(this.x, 0, this.width, this.top);
        rect(this.x, this.bottom, this.width, height - this.bottom)
        this.collide = false;
    }
    update(){
        this.x -= this.speed;
    }
}