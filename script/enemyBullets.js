let enemyBullets = [];

class EnemyBullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 2;
        this.height = 8;
        this.color = 'red';
        this.color2 = 'green';
        this.init = function () {
            enemyBullets.push(this);
        };
        this.draw = function () {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        };
        this.uppdate = function () {
            this.y += 2;
        };
    }
}