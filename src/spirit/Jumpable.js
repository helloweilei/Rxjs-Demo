export default class Jumpable {
  constructor(spirit, { interval }) {
    this._spirit = spirit;
    this.initY = this._spirit.y;
    this.initVy = 8;
    this.timer = 0;
    this.interval = interval;
    this.isJumping = false;
    this._g = 9.8;
    this._meterToPixelRatio = 50;
    this._jumpTimes = 0;
    this.lastY = this.initY;
  }

  paint(...args) {
    this._spirit.paint(...args);
  }

  update(...args) {
    this._spirit.update(...args);

    if (!this.isJumping) {
      return;
    }

    this.timer += this.interval;
    const timeInSecond = this.timer / 1000;
    const dy = this.initVy * timeInSecond - 0.5 * this._g * Math.pow(timeInSecond, 2);
    
    this._spirit.y = this.lastY - dy * this._meterToPixelRatio;
    if (this._spirit.y > this.initY) {
      this._spirit.y = this.initY;
      this.isJumping = false;
      this._jumpTimes = 0;
      this.lastY = this.initY;
    }
  }

  jump() {
    if (this.isJumping) {
      if (this._jumpTimes >= 3) {
        return;
      }
      this.lastY = this._spirit.y;
      this._jumpTimes++;
      this.timer = 0;
      return;
    };
    this.isJumping = true;
    this._jumpTimes++;
    this.timer = 0;
  }
}