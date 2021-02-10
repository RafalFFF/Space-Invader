const canva = document.querySelector("#board");
const context = canva.getContext('2d');
const heart1 = document.querySelector('#live1');
const heart2 = document.querySelector('#live2');
const heart3 = document.querySelector('#live3');
const gameOver = document.querySelector("#middle");
const spanScore = document.querySelector('#spanPoints');
const overHeatBar = document.querySelector('#bar');
overHeatBar.style.height = 15 + "px";
overHeatBar.style.margin = 0;
overHeatBar.style.backgroundColor = "white";
//punkty gracza
let score = 0;

//tło
const spaceImg = new Image();
spaceImg.src = "images/space.jpg";
//grafiki statku 
const shipImg = new Image();
shipImg.src = "images/ship.png";
const upgradeShip = new Image();
upgradeShip.src = "images/upgradeShip.png"
const upgradeShip2 = new Image();
upgradeShip2.src = "images/upgradeShip2.png"

let sound = new Audio;
sound.src = "audio/overHeat.mp3";
let upgradeSound = new Audio();
upgradeSound.src = "audio/upgrade.mp3";

const ship = {
    x: canva.width / 2,
    y: canva.height - 40,
    alive: true,
    lives: 3,
    hp: 100,
    canShot: true,
    upgrade: false,
    upgrade2: false,
}


let upgrade1 = true;
let upgrade2 = true;
let upgradePoints = 0;

function drawShip() {
    if (ship.alive && ship.upgrade == false && ship.upgrade2 == false) {
        context.drawImage(shipImg, ship.x, ship.y);
    } else if (ship.alive && ship.upgrade == true) {
        context.drawImage(upgradeShip, ship.x, ship.y);
    } else if (ship.alive && ship.upgrade2 == true) {
        context.drawImage(upgradeShip2, ship.x, ship.y);
    }
}

function checkUpgrade() {
    if (upgradePoints >= 1000 && upgrade1) {
        upgradeSound.play();
        ship.upgrade = true;
        upgrade1 = false;
    } else if (upgradePoints >= 2000 && upgrade2) {
        ship.upgrade = false;
        upgradeSound.play();
        ship.upgrade2 = true;
        upgrade2 = false;
    }
}

function resetShip() {
    ship.x = canva.width / 2;
    ship.y = canva.height - 40;
}

function checkRange(obj) {
    if (obj.x <= 0 || obj.x + 32 >= canva.width) {
        return false;
    } else return true;
}

function moveShip(e) {
    if (checkRange(ship)) {
        switch (e.keyCode) {
            case 37:
                ship.x -= 5;
                break;
            case 39:
                ship.x += 5;
                break;
        }
    } else if (ship.x <= 0) {
        ship.x += 2;
    } else if (ship.x + 32 >= canva.width) {
        ship.x -= 2;
    }
}
/*******************************************************/
/*******************Pociski gracza**********************/
let bullets = [];
let upgradeBullet = [];
class bullet {
    constructor() {
        this.x = ship.x + 15;
        this.y = ship.y - 8;
        this.width = 2;
        this.height = 8;
        this.color = 'white';
        this.init = function () {
            bullets.push(this);
            this.y -= 2;
        };
        this.draw = function () {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        };
        this.uppdate = function () {
            this.y -= 2;
        };
    }
}
/**********************************************************/
/*******************Pasek przegrzania**********************/
let click = 0;
let barColor = "#FFCE03";
setInterval(() => {
    if (click >= 0) {
        click -= 2;
        if (click <= 104) {
            if (click <= 10) {
                barColor = "white";
            } else if (click <= 20) {
                barColor = "#FD9A01"
            } else if (click <= 40) {
                barColor = "#FD6104"
            } else if (click <= 60) {
                barColor = "#FF2C05"
            } else if (click <= 80) {
                barColor = "#D92121"
            }
            overHeatBar.style.backgroundColor = barColor;
            overHeatBar.style.width = click + "px";
        }
    }

}, 100);
/***********************************************************/
/*******************Obsługa strzelania**********************/
function createBullet(e) {
    if (e.keyCode == 32) {
        if (click >= 104) {
            ship.canShot = false;
            sound.play();
            setTimeout(() => {
                ship.canShot = true;
            }, 5000);
        }
        if (ship.canShot && ship.upgrade == false && ship.upgrade2 == false) {
            let missle = new bullet();
            missle.init();
            let playerShot = new Audio();
            playerShot.src = "audio/playerBullet3.mp3";
            playerShot.play();
            if (click <= 104) {
                click += 10;
            }
        } else if (ship.canShot && ship.upgrade == true) {
            let missle1 = new bullet();
            missle1.x = ship.x;
            missle1.init();
            let missle2 = new bullet();
            missle2.x = ship.x + 32;
            missle2.init();
            let sound = new Audio;
            sound.src = "audio/upgradeShot.mp3";
            sound.play();
            if (click <= 104) {
                click += 10;
            }
        } else if (ship.canShot && ship.upgrade2 == true && ship.upgrade == false) {
            let missle1 = new bullet();
            missle1.x = ship.x;
            missle1.y = ship.y + 10;
            missle1.init();
            let missle2 = new bullet();
            missle2.x = ship.x + 16;
            missle2.init();
            let missle3 = new bullet();
            missle3.x = ship.x + 30;
            missle3.y = ship.y + 10;
            missle3.init();
            let sound = new Audio;
            sound.src = "audio/upgradeShot2.mp3";
            sound.play();
            if (click <= 104) {
                click += 10;
            }
        }
    }
}

function uppdateBullet() {
    bullets.forEach(element => {
        element.uppdate();
    })
}

function drawBullet() {
    bullets.forEach(element => {
        element.draw();
    })
}
/*******************Pociski wrogów******************/
/***************************************************/
function uppdateEnemyBullet() {
    enemyBullets.forEach(element => {
        element.uppdate();
    })
}

function drawEnemyBullet() {
    enemyBullets.forEach(element => {
        element.draw();
    })
}

function createEnemyBullet(array, timer, color) {
    setInterval(() => {
        if (array.length > 0) {
            let index = Math.floor(Math.random() * array.length);
            let enemyMissle = new EnemyBullet(array[index].x + 15, array[index].y + array[index].height);
            enemyMissle.color = color;
            enemyMissle.init();
        }
    }, timer);
}
/****************************************************************/
/******usuwanie pocisków które są poza zasięgiem planszy*********/

function cleaningBullets() {
    bullets.forEach(element => {
        if (element.y <= 0) {
            let temp1 = bullets.indexOf(element);
            bullets.splice(temp1, 1);
        }
    })
}

function celaningEnemyBullets(array) {
    array.forEach(element => {
        if (element.y >= canva.height) {
            let temp1 = array.indexOf(element);
            array.splice(temp1, 1);
        }
    })
}
/***************************************************************/

let stopGameFlag = false;
/***************************************************************/
/*******************Kolizje pocisków ze statkiem****************/

function shipStrike(array) {
    array.forEach(element => {
        if ((element.y + element.height >= ship.y) && (element.x >= ship.x) && (element.x + element.width <= ship.x + 32)) {
            array.splice(array.indexOf(element), 1);
            let shipHit = new Audio();
            shipHit.src = "audio/shipHit.mp3";
            shipHit.play();
            if (element.color == "red") {
                ship.hp -= 51;
            } else if (element.color == "green") {
                ship.hp -= 26;
            } else if (element.color == "orange") {
                ship.hp -= 100;
            }
            if (ship.hp <= 0) {
                resetShip();
                upgradePoints = 0;
                ship.upgrade = false;
                ship.upgrade2 = false;
                upgrade1 = true;
                upgrade2 = true;
                ship.hp = 100;
                ship.lives -= 1;
                enemyBullets = [];
                ufoMissle = [];
                if (ship.lives == 2) {
                    heart1.style.display = "none";
                } else if (ship.lives == 1) {
                    heart2.style.display = "none";
                }
                if (ship.lives == 0) {
                    let over = new Audio();
                    over.src = "audio/over.mp3";
                    over.play();
                    ship.alive = false;
                    heart3.style.display = "none";
                    gameOver.textContent = "GameOver";
                    stopGameFlag = true;
                }
            }
        }
    })
}
/******************************************************************************/
/*************************Zderzenie się dwóch kul*****************************/
function bulletHitBullet(array, arrayEnemy) {
    array.forEach(item => {
        arrayEnemy.forEach(element => {
            if (item.x >= element.x && item.x + item.width <= element.x + element.width && item.y == element.y) {
                score += 25;
                array.splice(array.indexOf(item), 1);
                arrayEnemy.splice(arrayEnemy.indexOf(element), 1);
            }
        })
    })
}
/******************************************************************************/
/***************************Trafienie w przeciwnikami**************************/
function enemyStrike(array, enemyArray) {
    array.forEach(bullet => {
        enemyArray.forEach(enemy => {
            if ((bullet.y <= enemy.y + enemy.height) && (bullet.y >= enemy.y) && (bullet.x >= enemy.x) && (bullet.x + bullet.width <= enemy.x + enemy.width)) {
                enemy.hit++;
                let hit = new Audio();
                hit.src = "audio/hit.mp3";
                hit.play();
                array.splice(array.indexOf(bullet), 1);
                if (!enemy.checkIfAlive()) {
                    let scoreSound = new Audio();
                    scoreSound.src = "audio/score.mp3";
                    scoreSound.play();
                    if (enemy.id == 1) {
                        score += 50;
                        upgradePoints += 50;
                    } else if (enemy.id == 2) {
                        score += 25;
                        upgradePoints += 25;
                    } else if (enemy.id == 3) {
                        score += 100;
                        upgradePoints += 100;
                    }
                    enemyArray.splice(enemyArray.indexOf(enemy), 1);
                }
                spanScore.textContent = score;
            }
        })
    })
}
/******************************************************************************/
function colisionCheck() {
    shipStrike(enemyBullets);
    shipStrike(ufoMissle);
    enemyStrike(bullets, enemy1);
    enemyStrike(bullets, enemy2);
    enemyStrike(bullets, ufo);
}
let timer1 = 0;
let timer2 = 0;

function createBoss() {
    timer1 = setInterval(() => {
        createUfo();
    }, 10000);
    timer2 = setInterval(() => {
        ufoShot();
    }, 500);
}

let respawnCounter1 = 0;
let respawnCounter2 = 0;
let shotingTimer1 = 2000;
let shotingtimer2 = 1000;

function respwan() {
    if (enemy1.length == 0 && respawnCounter1 < 2) {
        createEnemy1();
        respawnCounter1++;
        shotingTimer1 -= 250;
    } else if (enemy2 == 0 && respawnCounter2 < 2) {
        createEnemy2();
        shotingtimer2 -= 250;
        respawnCounter2++
    }
}

createEnemy1();
createEnemy2();

createEnemyBullet(enemy1, shotingTimer1, "red");
createEnemyBullet(enemy2, shotingtimer2, "green");



createBoss();




function mainGame() {
    context.drawImage(spaceImg, 0, 0);

    drawEnemy1();
    moveEnemy();
    drawEnemy2();
    moveEnemy2();

    drawEnemyBullet();
    uppdateEnemyBullet();

    drawUfo();
    moveUfo();

    moveUfoMissle();
    drawUfoMissle();

    bulletHitBullet(bullets, enemyBullets);
    bulletHitBullet(bullets, ufoMissle);

    drawShip();

    drawBullet();
    uppdateBullet();

    colisionCheck();

    checkUpgrade();
    cleaningBullets();
    celaningEnemyBullets(enemyBullets);
    celaningEnemyBullets(ufoMissle);

    respwan();

    let myReq = requestAnimationFrame(mainGame);
    if (stopGameFlag || (respawnCounter1 == 2 && respawnCounter2 == 2) && (enemy1.length == 0 && enemy2.length == 0)) {
        cancelAnimationFrame(myReq);
        clearInterval(timer1);
        clearInterval(timer2);
        context.fillStyle = "orange"
        context.font = '40px sans-serif';
        context.clearRect(0, 0, canva.width, canva.height);
        context.fillText("Game Over", canva.width / 2 - 110, canva.height / 2);
        context.fillText("Your score = " + score, canva.width / 2 - 130, canva.height / 2 + 50);
    }
}
mainGame();
document.addEventListener("keydown", createBullet);
document.addEventListener("keydown", moveShip);