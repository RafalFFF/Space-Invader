let enemy2 = [];

const enemy2Img = new Image();
enemy2Img.src = "images/ufo2.png";

class SecondEnemy {
    constructor(x) {
        this.x = x;
        this.y = 100;
        this.id = 2;
        this.width = 32;
        this.height = 32;
        this.flag = false;
        this.counter = 0;
        this.hit = 0;
        this.alive = true;
        this.init = function () {
            x += 50;
            enemy2.push(this);
        }
        this.move = function () {
            if (this.flag == true) {
                this.x += 0.8;
                this.counter++;
            } else if (this.flag == false) {
                this.x -= 0.8;
                this.counter--;
            }
            if (this.counter <= 0) {
                this.flag = true;
            } else if (this.counter >= 100) {
                this.flag = false;
            }
            this.checkIfAlive = function () {
                if (this.hit >= 3) {
                    return false;
                } else return true;
            }
        }
        this.draw = function () {
            context.drawImage(enemy2Img, this.x, this.y);
        }
    }

}

function createEnemy2() {
    let space = 50;
    for (let i = 0; i < 12; i++) {
        let enemy = new SecondEnemy(70);
        enemy.x = enemy.x + (i * space);
        enemy.init();
    }
    for (let i = 0; i < 12; i++) {
        let enemy = new SecondEnemy(70);
        enemy.y = 150
        enemy.x = enemy.x + (i * space);
        enemy.init();
    }
}

function drawEnemy2() {
    enemy2.forEach(item => {
        item.draw();
    })
}

function moveEnemy2() {
    enemy2.forEach(item => {
        item.move();
    })
}