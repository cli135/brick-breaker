import Sprite from "./Sprite.js";

class Ball extends Sprite {
  
  // non default constructors are inherited
  // unlike Java
  
  // makes the bouncing exact by accounting
  // for the width and height of the block
  // adds the game-over functionality with a else-if
  
  bounce(canvasWidth, canvasHeight) {
    if (this.x < 0 || this.x + this.width > canvasWidth) {
      // bounce off the left/right edges
      this.dx *= -1; // switch direction
    } 

    if (this.y < 0) {
      // bounce off the top edge
      this.dy *= -1; // switch direction
    } else if (this.y + this.height > canvasHeight) {
      // fall through the bottom edge!
      return false;
    }
  
    return true;
  }
  

  // collision method for ball
  // uses the intersect method
  collides(paddle) {
    if (this.intersects(paddle)) {
      this.dy *= -1; // switch direction
    }
  }
  
  
}

export default Ball;