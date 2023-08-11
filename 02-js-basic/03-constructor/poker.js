/* 
利用构造函数创建一幅扑克牌
Poker： 一张扑克牌
Deck：一副扑克牌
*/
/**
 * 扑克牌构造函数，创建一张扑克牌
 * @param {number} number 1-1...12-Q 13-K 14-小王 15-大王
 * @param {number} color 1-黑桃 2-红桃 3-梅花 4-方片
 */
function Poker(number, color) {
  this.number = number;
  this.color = color;
}

Poker.prototype.print = function () {
  if (this.number === 14) {
    console.log("小王");
    return;
  }
  if (this.number === 15) {
    console.log("大王");
    return;
  }
  var colors = ["♠", "♥", "♣", "♦"];
  var numbers = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  console.log(colors[this.color - 1] + numbers[this.number - 1]);
};

function Deck() {
  this.pokers = [];
  for (let i = 1; i <= 14; i++) {
    for (let j = 1; j <= 4; j++) {
      this.pokers.push(new Poker(i, j));
    }
  }
}

Deck.prototype.print = function () {
  for (let i = 0; i < this.pokers.length; i++) {
    this.pokers[i].print();
  }
};

var deck = new Deck();
deck.print();
