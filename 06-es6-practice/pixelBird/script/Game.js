class Game {
  constructor() {
    this.sky = new Sky();
    this.land = new Land();
    this.bird = new Bird();
    this.pipePairProducer = new PipePairProducer(-100);
    this.tick = 16;
    this.timer = null;
    this.gameOver = false;
  }
  start() {
    if (this.timer) {
      return;
    }
    if (this.gameOver) {
      window.location.reload();
    }
    this.bird.startSwing();
    this.pipePairProducer.startProduce();
    this.timer = setInterval(() => {
      const duration = this.tick / 1000
      this.sky.move(duration);
      this.land.move(duration);
      this.bird.move(duration);
      this.pipePairProducer.pairs.forEach(pair => pair.move(duration));
      if (this.isGameOver()) {
        this.stop();
        this.gameOver = true;
      }
    }, this.tick);
  }

  isGameOver() {
    if (this.bird.top === this.bird.maxY) {
      return true;
    }
    for(let i = 0; i < this.pipePairProducer.pairs.length; i++) {
      const pair = this.pipePairProducer.pairs[i];
      if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
        return true;
      }
    } 
    return false;
  }

  isHit(rec1, rec2) {
    const centerX1 = rec1.left + rec1.width / 2;
    const centerX2 = rec2.left + rec2.width / 2;
    const centerY1 = rec1.top + rec1.height / 2;
    const centerY2 = rec2.top + rec2.height / 2;
    const disX = Math.abs(centerX1 - centerX2);
    const disY = Math.abs(centerY1 - centerY2);
    if (disX < (rec1.width + rec2.width) / 2 && disY < (rec1.height + rec2.height) / 2) {
      return true;
    }
    return false;
  }

  regEvent() {
    window.onkeydown = (e) => {
      if (e.key === 'Enter') {
        if (this.timer) {
          this.stop();
        } else {
          this.start();
        }
      } else if (e.key === ' ') {
        this.bird.jump();
      }
    }
  }
  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.bird.stopSwing();
    this.pipePairProducer.stopProduce();
  }
}

const g = new Game();
g.regEvent();