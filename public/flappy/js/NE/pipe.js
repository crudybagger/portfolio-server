function Pipe() {

    // How big is the empty space
    var spacing = 100;
    // Where is th center of the empty space
    var centery = random(spacing, height - spacing);
  
    // Top and bottom of pipe
    this.top = centery - spacing / 2;
    this.bottom = height - (centery + spacing / 2);
    // Starts at the edge
    this.x = width;
    // Width of pipe
    this.w = 50;
    // How fast
    this.speed = 4;
    this.collide = false;
  
    // Did this pipe hit a bird?
    this.hits = function(bird) {
      if ((bird.y - bird.r) < this.top || (bird.y + bird.r) > (height - this.bottom)) {
        if (bird.x > this.x && bird.x < this.x + this.w) {
          return true;
        }
      }
      return false;
    }
  
    // Draw the pipe
    this.show = function() {
      fill(0, 200, 0);
        if(this.collide){
            fill(200, 0, 0)
        }
        noStroke();
      rect(this.x, 0, this.w, this.top);
      rect(this.x, height - this.bottom, this.w, this.bottom);
      this.collide = false;
    }
  
    // Update the pipe
    this.update = function() {
      this.x -= this.speed;
    }
  
    // Has it moved offscreen?
    this.offscreen = function() {
      if (this.x < -this.w) {
        return true;
      } else {
        return false;
      }
    }
  }