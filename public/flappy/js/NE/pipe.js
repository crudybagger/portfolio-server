function Pipe() {
  var spacing = 100;
  var centery = random(spacing, height - spacing);

  this.top = centery - spacing / 2;
  this.bottom = height - (centery + spacing / 2);
  this.x = width;
  this.w = 50;
  this.speed = 4;
  this.collide = false;

  this.hits = function (bird) {
    if (bird.y - bird.r < this.top || bird.y + bird.r > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  };

  // Draw the pipe
  this.show = function () {
    fill(0, 200, 0);
    if (this.collide) {
      fill(200, 0, 0);
    }
    noStroke();
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
    this.collide = false;
  };

  this.update = function () {
    this.x -= this.speed;
  };

  // Has it moved offscreen?
  this.offscreen = function () {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  };
}
