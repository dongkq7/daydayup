const gameWidth  = gameDom.clientWidth;

class Pipe extends Rectangle {
  constructor(height, top, speed, dom) {
    super(52, height, gameWidth, top, speed, 0, dom);
  }
  onMove() {
    if (this.left < -this.width) {
      this.dom.remove();
    }
  }
}

function getRandomHeight(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class PipePair {
  constructor(speed) {
    // 间隙高度
    this.spaceHeight = 150;
    this.minHeight = 80;
    this.maxHeight = landTop - this.spaceHeight - this.minHeight;
    const upHeight = getRandomHeight(this.minHeight, this.maxHeight);

    const upDom = document.createElement('div');
    upDom.className = 'pipe up';
    this.upPipe = new Pipe(upHeight,0, speed,upDom);

    const downHeight = landTop - upHeight - this.spaceHeight;
    const downTop = landTop - downHeight;
    const downDom = document.createElement('div');
    downDom.className = 'pipe down';
    this.downPipe = new Pipe(downHeight, downTop, speed, downDom);

    gameDom.appendChild(upDom);
    gameDom.appendChild(downDom);
  }

  get useLess() {
    return this.upPipe.left < -this.upPipe.width;
  }

  move(duration) {
    this.upPipe.move(duration);
    this.downPipe.move(duration);
  }
}

class PipePairProducer {
  constructor(speed) {
    this.speed = speed;
    this.pairs = [];
    this.timer = null;
    this.tick = 1500;
  }
  startProduce() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.pairs.push(new PipePair(this.speed));
      // 从数组中移除超出视野的水管
      for (let i = 0; i < this.pairs.length; i++) {
        if (this.pairs[i].useLess) {
          this.pairs.splice(i, 1);
          i--;
        }
      }
    }, this.tick);
  }
  stopProduce() {
    clearInterval(this.timer);
    this.timer = null;
  }
}