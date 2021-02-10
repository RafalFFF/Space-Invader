let ufo = [];
let ufoMissle = [];

const ufoImg = new Image();
ufoImg.src = "images/ufov2.png";
const ufoSound = new Audio();
ufoSound.src = "audio/ufo.mp3";




class Ufo {
    constructor() {
        this.x = canva.width;
        this.y = 10;
        this.width = 64;
        this.height = 32;
        this.id = 3;
        this.color = "white";
        this.hit = 0;
        this.draw = function () {
            context.drawImage(ufoImg, this.x, this.y, 64, 32);

        }
        this.move = function () {
            this.x -= 2;
        }
        this.init = function () {
            ufo.push(this);
        }
        this.checkIfAlive = function () {
            if (this.hit >= 5) {
                return false;
            } else return true;
        }
    }
}

class ufoBullets {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = 'orange';
        this.width = 4;
        this.height = 16;
        this.init = function () {
            ufoMissle.push(this);
        }
        this.draw = function () {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
        this.move = function () {
            this.y += 2;
        }
    }
}

function createUfo() {
    let temp1 = new Ufo();
    ufoSound.play();
    temp1.init();
}

let startshooting = false;

function moveUfo() {
    if (ufo.length != 0) {
        ufo.forEach(item => {
            item.move()
            startshooting = true;
            if (item.x + item.width <= 0) {
                ufo.pop();
                startshooting = false;
            }
        })
    }
}

function drawUfo() {
    ufo.forEach(item => {
        item.draw();
    })
}

function ufoShot() {
    if (ufo.length) {
        let temp1 = new ufoBullets(ufo[0].x + 22, ufo[0].y + ufo[0].height - 2);
        if ((ufo[0].x + ufo[0].width / 2 <= canva.width) && (ufo[0].x + ufo[0].width / 2 >= 0)) {
            let temp3 = new Audio();
            temp3.src = "audio/ufoShot.mp3";
            temp3.play();
        }
        temp1.init();
    }
}

function moveUfoMissle() {
    ufoMissle.forEach(item => {
        item.move();
    })
}

function drawUfoMissle() {
    ufoMissle.forEach(item => {
        item.draw();
    })
}