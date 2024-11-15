/**
 * xSpeed: 水平方向的速度, 单位: px/s, 正数表示向右, 负数表示向左
 * ySpeed: 垂直方向的速度, 单位: px/s, 正数表示向下, 负数表示向上
 */
class Rectangle {
	constructor(width, height, left, top, xSpeed, ySpeed, dom) {
		this.width = width;
		this.height = height;
		this.left = left; 
		this.top = top;
		this.xSpeed = xSpeed;
		this.ySpeed = ySpeed;
		this.dom = dom;
		this.render();
	}
	render() {
		this.dom.style.width = this.width + 'px';
		this.dom.style.height = this.height + 'px';
		this.dom.style.left = this.left + 'px';
		this.dom.style.top = this.top + 'px';
	}
	/**
	 * 矩形移动
	 * @param {number} duration 运动时间, 单位秒
	 */
	move(duration) {
		const xDis = this.xSpeed * duration;
		const yDis = this.ySpeed * duration;
		this.left += xDis;
		this.top += yDis;
		// 如果有移动回调, 则调用
		if (this.onMove) {
			this.onMove();
		}
		this.render();
	}
}