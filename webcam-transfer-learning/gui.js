var config = {
  type: Phaser.AUTO,
  width: 1400,
  height: 1000,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var game = new Phaser.Game(config);
const CONTROLS = ['straight', 'down', 'left', 'right', 'fist', 'palm'];
var car;
var cursors;
var bl;
var br;
var bl_bot;
var br_bot;
var bl_top;
var br_top;
var accel;
var spikes = [];
var score_text;
var score = 0;
var boosting = { value: 0 };
var LEVEL = 3;

var training = true;
var playing = false;
var lost = false;

function preload() {
  this.load.image('spikes', require('./images/spikes.png'));
  this.load.image('star', require('./images/star.png'));
  this.load.image('nuke', require('./images/platformIndustrial_106.png'));
  this.load.image('moto_red', require('./images/motorcycle_red.png'));
  this.load.image('moto_black', require('./images/motorcycle_black.png'));
  this.load.image('car_blue', require('./images/car_blue_small_5.png'));
  this.load.image('car_black', require('./images/car_black_small_3.png'));
  this.load.image('car_red', require('./images/car_red_small_4.png'));
  this.load.image('cone', require('./images/cone_down.png'));
  this.load.image('oil', require('./images/oil.png'));
  this.load.image('over', require('./images/over.png'));
  this.load.image('le_road', require('./images/le_road.png'));
  this.load.image('green_car', require('./images/green_car.png'));
  //this.load.spritesheet('background_left', 'assets/sprite_sheet_left.png', 6, 21, 22);
  this.load.image('background_left', require('./images/nav_ideal.png'));

  this.load.image('background_right', require('./images/nav_idear.png'));
  var turnOnSpikes;
  this.load.image('spikes', require('./images/spikes.png'));
  this.load.image('nuke', require('./images/platformIndustrial_106.png'));
}
function create() {
  //  mysprite = this.add.sprite(15, 30, 'background_left');
  // mysprite.animations.add('scroll');
  // mysprite.animations.play('scroll', 50, true);
  /*this.anims.create({
            key:'left',
            frames:this.anims.generateFrameNumbers('background_left', {start:0, end:20}),
            frameRate: 10,
            repeat: 3,
        })*/

  this.add.image(700, 500, 'le_road');
  bl = this.physics.add.sprite(140, 475, 'background_left').setScale(0.7, 0.7);
  br = this.physics.add
    .sprite(1250, 475, 'background_right')
    .setScale(0.7, 0.7);
  bl_top = this.physics.add
    .sprite(140, 0, 'background_left')
    .setScale(0.7, 0.7);
  br_top = this.physics.add
    .sprite(1250, 0, 'background_right')
    .setScale(0.7, 0.7);
  bl_bot = this.physics.add
    .sprite(140, 950, 'background_left')
    .setScale(0.7, 0.7);
  br_bot = this.physics.add
    .sprite(1250, 950, 'background_right')
    .setScale(0.7, 0.7);
  car = this.physics.add.sprite(700, 300, 'green_car');
  cursors = this.input.keyboard.createCursorKeys();
  car.setCollideWorldBounds(true);
  temp = bl.y;
  accel = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

  timedEvent = this.time.addEvent({
    delay: 1500 * LEVEL,
    callback: renderSpikes,
    callbackScope: this,
    loop: true
  });
  timedEvent2 = this.time.addEvent({
    delay: 10000 * LEVEL,
    callback: nuke,
    callbackScope: this,
    loop: true
  });
  timedEvent3 = this.time.addEvent({
    delay: 7000 * LEVEL,
    callback: motoRaid,
    callbackScope: this,
    loop: true
  });
  timedEvent4 = this.time.addEvent({
    delay: 2000 * LEVEL,
    callback: carRaid,
    callbackScope: this,
    loop: true
  });
  timedEvent4 = this.time.addEvent({
    delay: 2000 * LEVEL,
    callback: carRaid1,
    callbackScope: this,
    loop: true
  });
  timedEvent5 = this.time.addEvent({
    delay: 5000 * LEVEL,
    callback: fence,
    callbackScope: this,
    loop: true
  });
  starev = this.time.addEvent({
    delay: 3000 * LEVEL,
    callback: renderStar,
    callbackScope: this,
    loop: true
  });
  oilev = this.time.addEvent({
    delay: 1000 * LEVEL,
    callback: renderOil,
    callbackScope: this,
    loop: true
  });

  text = this.add.text(0, 0, 'Score: ' + score, {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffff00'
  });

  cursors = this.input.keyboard.createCursorKeys();
}
function renderStar() {
  let devId = document.getElementById('header').innerHTML;
  if (devId.search('Prepare') > -1) return;

  console.log('star');
  xVal = Math.random() * 750 + 300;
  var star = this.physics.add.sprite(xVal, -100, 'star');
  star.setVelocityY(700);
  this.physics.add.collider(car, star, onStar);
  //star.push(star)
}

function renderOil() {
  let devId = document.getElementById('header').innerHTML;
  if (devId.search('Prepare') > -1) return;

  console.log('oil');
  xVal = Math.random() * 750 + 300;
  var oil = this.physics.add.sprite(xVal, -100, 'oil');
  oil.setVelocityY(700);
  this.physics.add.collider(car, oil, onOil);
  //star.push(star)
}

function onOil(a, b) {
  b.destroy();
  //let devId = document.getElementById('header').innerHTML;
  if (true) {
    car.setVelocityY(+60);
    bl.setVelocityY(0);
    br.setVelocityY(0);
    bl_top.setVelocityY(0);
    br_top.setVelocityY(0);
    bl_bot.setVelocityY(0);
    br_bot.setVelocityY(0);
    boosting.value = -1;
    setTimeout(function() {
      boosting.value = 0;
    }, 1000);
  }
}
function onStar(a, b) {
  b.destroy();
  let devId = document.getElementById('header').innerHTML;
  if (devId == CONTROLS[4]) {
    car.setVelocityY(-60);
    bl.setVelocityY(100);
    br.setVelocityY(100);
    bl_top.setVelocityY(100);
    br_top.setVelocityY(100);
    bl_bot.setVelocityY(100);
    br_bot.setVelocityY(100);
    boosting.value = 1;
    setTimeout(function() {
      boosting.value = 0;
    }, 3000);
  }
}

function renderSpikes() {
  let devId = document.getElementById('header').innerHTML;
  if (devId.search('Prepare') > -1) return;

  xVal = Math.random() * 750 + 300;
  var spike = this.physics.add.sprite(xVal, -100, 'spikes');
  spike.setVelocityY(500);
  this.physics.add.collider(car, spike, () => {
    spike.rotation += 0.1;
    spike.setVelocityX(30);
  });
  spikes.push(spike);
}
function nuke() {
  let devId = document.getElementById('header').innerHTML;
  if (devId.search('Prepare') > -1) return;

  xVal = Math.random() * 750 + 300;
  var nuke = this.physics.add.sprite(xVal, 0, 'nuke');
  nuke.setVelocityY(300);
}

function motoRaid() {
  let devId = document.getElementById('header').innerHTML;
  if (devId.search('Prepare') > -1) return;

  xVal = Math.random() * 750 + 300;
  var moto = this.physics.add.sprite(xVal, -100, 'car_blue');
  moto.setVelocityY(500);
  this.physics.add.collider(car, moto);
}
function carRaid() {
  let devId = document.getElementById('header').innerHTML;
  if (devId.search('Prepare') > -1) return;

  xVal = Math.random() * 750 + 300;
  var car_opp = this.physics.add.sprite(xVal, -100, 'car_black');
  car_opp.setVelocityY(500);
  this.physics.add.collider(car, car_opp);
}
function carRaid1() {
  let devId = document.getElementById('header').innerHTML;
  if (devId.search('Prepare') > -1) return;

  xVal = Math.random() * 750 + 300;
  var car_opp = this.physics.add.sprite(xVal, -100, 'car_red');
  car_opp.setVelocityY(1000);
  this.physics.add.collider(car, car_opp);
}
function fence() {
  let devId = document.getElementById('header').innerHTML;
  if (devId.search('Prepare') > -1) return;

  var cone1 = this.physics.add.sprite(1170, -100, 'cone');
  var cone2 = this.physics.add.sprite(1220, -100, 'cone');
  var cone3 = this.physics.add.sprite(1270, -100, 'cone');
  var cone4 = this.physics.add.sprite(1320, -100, 'cone');
  var cone5 = this.physics.add.sprite(1370, -100, 'cone');
  var cone6 = this.physics.add.sprite(30, -100, 'cone');
  var cone7 = this.physics.add.sprite(80, -100, 'cone');
  var cone8 = this.physics.add.sprite(130, -100, 'cone');
  var cone9 = this.physics.add.sprite(180, -100, 'cone');
  var cone10 = this.physics.add.sprite(230, -100, 'cone');
  cone1.setVelocityY(200);
  cone2.setVelocityY(200);
  cone3.setVelocityY(200);
  cone4.setVelocityY(200);
  cone5.setVelocityY(200);
  cone6.setVelocityY(200);
  cone7.setVelocityY(200);
  cone8.setVelocityY(200);
  cone9.setVelocityY(200);
  cone10.setVelocityY(200);
  this.physics.add.collider(car, cone1);
  this.physics.add.collider(car, cone2);
  this.physics.add.collider(car, cone3);
  this.physics.add.collider(car, cone4);
  this.physics.add.collider(car, cone5);
}

function update() {
  let devId = document.getElementById('header').innerHTML;
  if (devId.search('Prepare') > -1) return;

  if (car.y >= 600) {
    this.cameras.main.shake(500);
    this.add.image(700, 250, 'over');
    this.time.delayedCall(
      1500,
      function() {
        this.katyvoor.END;
      },
      [],
      this
    );
  }
  if (car.x < 50 && !cursors.right.isDown) {
    car.setVelocityX(0);
    bl.setVelocityY(100);
    br.setVelocityY(100);
    bl_top.setVelocityY(100);
    br_top.setVelocityY(100);
    bl_bot.setVelocityY(100);
    br_bot.setVelocityY(100);
  } else if (car.x > 1350 && !cursors.left.isDown) {
    car.setVelocityX(0);
    bl.setVelocityY(100);
    br.setVelocityY(100);
    bl_top.setVelocityY(100);
    br_top.setVelocityY(100);
    bl_bot.setVelocityY(100);
    br_bot.setVelocityY(100);
  } else {
    if (temp + 450 <= bl.y) {
      bl_bot.y = bl_top.y - 475;
      br_bot.y = br_top.y - 475;
      swap = bl_bot;
      swap1 = br_bot;
      bl_bot = bl;
      br_bot = br;
      bl = bl_top;
      br = br_top;
      bl_top = swap;
      br_top = swap1;
      temp = bl.y;
    }

    if (devId === CONTROLS[2]) {
      // mysprite.anims.play('left',true);
      if (car.x < 320) {
        car.setVelocityX(-50);
      } else {
        car.setVelocityX(-500);
      }
    } else if (devId === CONTROLS[3]) {
      if (car.x > 1100) {
        car.setVelocityX(50);
      } else {
        car.setVelocityX(500);
      }
    } else {
      if (boosting.value != 0) {
        if (boosting.value != -1) {
          car.setVelocityX(0);
        }
        return;
      } else {
        car.setVelocityX(0);
      }
      bl.setVelocityY(0);
      br.setVelocityX(0);
      br.setVelocityY(0);
      bl_top.setVelocityY(0);
      br_top.setVelocityY(0);
      bl_bot.setVelocityY(0);
      br_bot.setVelocityY(0);
      car.setVelocityY(0);
    }
  }
  if (car.x < 320 || car.x > 1000) {
    bl.setVelocityY(100);
    br.setVelocityY(100);
    bl_top.setVelocityY(100);
    br_top.setVelocityY(100);
    bl_bot.setVelocityY(100);
    br_bot.setVelocityY(100);
    text.setText('Score: ' + score.toString());
  } else {
    score += 5;
    text.setText('Score: ' + score.toString());
    bl.setVelocityY(700);
    br.setVelocityY(700);
    bl_top.setVelocityY(700);
    br_top.setVelocityY(700);
    bl_bot.setVelocityY(700);
    br_bot.setVelocityY(700);
  }
}
/*
  if (devId === CONTROLS[2]) {
    car.setVelocityX(-100);
    car.setVelocityY(0);
  } else if (devId === CONTROLS[3]) {
    car.setVelocityX(100);
    car.setVelocityY(0);
  } else if (devId === CONTROLS[0]) {
    car.setVelocityY(-100);
    car.setVelocityX(0);
  } else if (devId === CONTROLS[1]) {
    car.setVelocityY(100);
    car.setVelocityX(0);
  } else {
    car.setVelocityX(0);
    car.setVelocityY(0);
  }
  */
