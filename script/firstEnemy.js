let enemy1 = [];
const enemy1Img = new Image();
enemy1Img.src = "images/ufo1.png";

class firstEnemy {
    constructor(x) {
        this.x = x;
        this.y = 50;
        this.id = 1;
        this.width = 32;
        this.height = 32;
        this.flag = false;
        this.counter = 0;
        this.hit = 0;
        this.alive = true;
        this.init = function () {
            x += 50;
            enemy1.push(this);
        }
        this.move = function () {
            if (this.flag == true) {
                this.x += 0.5;
                this.counter++;
            } else if (this.flag == false) {
                this.x -= 0.5;
                this.counter--;
            }
            if (this.counter <= 0) {
                this.flag = true;
            } else if (this.counter >= 70) {
                this.flag = false;
            }
            this.checkIfAlive = function () {
                if (this.hit >= 3) {
                    return false;
                } else return true;
            }
        }
        this.draw = function () {
            context.drawImage(enemy1Img, this.x, this.y);
        }
    }
}

function createEnemy1() {
    let space = 50
    for (let i = 0; i < 10; i++) {
        let temp1 = new firstEnemy(50);
        if (i == 0) {
            temp1.x = 130
        } else {
            temp1.x = 130 + (space * i);
        }
        temp1.init();
    }
}

function drawEnemy1() {
    enemy1.forEach(element => {
        element.draw();
    })
}

function moveEnemy() {
    enemy1.forEach(element => {
        element.move();
    })
}