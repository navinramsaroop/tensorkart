// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({24:[function(require,module,exports) {
module.exports="/dist/11e5d56bef66a043882c01d28b172b0d.png";
},{}],267:[function(require,module,exports) {
module.exports="/dist/73458c15bfae4f7858a6c9c8dfb23663.png";
},{}],25:[function(require,module,exports) {
module.exports="/dist/d5cff125f92cbb27a2753b208c08f185.png";
},{}],268:[function(require,module,exports) {
module.exports="/dist/29ae675dc1ccd9de196d579fbbe6a5c5.png";
},{}],269:[function(require,module,exports) {
module.exports="/dist/bc568e8783b302504228f1cb02bd449b.png";
},{}],270:[function(require,module,exports) {
module.exports="/dist/2e1ebcc6710bc2482fa820643702a9c8.png";
},{}],271:[function(require,module,exports) {
module.exports="/dist/9fcf7c2672fcdec4909b99de01342009.png";
},{}],273:[function(require,module,exports) {
module.exports="/dist/3a768dcea9502dabce1f162b9a56e7a1.png";
},{}],272:[function(require,module,exports) {
module.exports="/dist/960998ad1d2ad3a640176acba54eec24.png";
},{}],274:[function(require,module,exports) {
module.exports="/dist/5cdc555daa406958ae2dcaebad0e8990.png";
},{}],275:[function(require,module,exports) {
module.exports="/dist/38d7b5aabb14aa31b02b156250a3317d.png";
},{}],21:[function(require,module,exports) {
module.exports="/dist/88a924f4d0932b61bf12a070225151dd.png";
},{}],22:[function(require,module,exports) {
module.exports="/dist/5d595152a693cc06fa3b6eeaf85f3b98.png";
},{}],23:[function(require,module,exports) {
module.exports="/dist/bb5b947e56edab125525fbb40a6a74e4.png";
},{}],26:[function(require,module,exports) {
module.exports="/dist/c022000e894e2486a620905eb168f684.png";
},{}],9:[function(require,module,exports) {
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
var CONTROLS = ['straight', 'down', 'left', 'right', 'fist', 'palm'];
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
  br = this.physics.add.sprite(1250, 475, 'background_right').setScale(0.7, 0.7);
  bl_top = this.physics.add.sprite(140, 0, 'background_left').setScale(0.7, 0.7);
  br_top = this.physics.add.sprite(1250, 0, 'background_right').setScale(0.7, 0.7);
  bl_bot = this.physics.add.sprite(140, 950, 'background_left').setScale(0.7, 0.7);
  br_bot = this.physics.add.sprite(1250, 950, 'background_right').setScale(0.7, 0.7);
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
  var devId = document.getElementById('header').innerHTML;
  if (devId.search('Prepare') > -1) return;

  console.log('star');
  xVal = Math.random() * 750 + 300;
  var star = this.physics.add.sprite(xVal, -100, 'star');
  star.setVelocityY(700);
  this.physics.add.collider(car, star, onStar);
  //star.push(star)
}

function renderOil() {
  var devId = document.getElementById('header').innerHTML;
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
    setTimeout(function () {
      boosting.value = 0;
    }, 1000);
  }
}
function onStar(a, b) {
  b.destroy();
  var devId = document.getElementById('header').innerHTML;
  if (devId == CONTROLS[4]) {
    car.setVelocityY(-60);
    bl.setVelocityY(100);
    br.setVelocityY(100);
    bl_top.setVelocityY(100);
    br_top.setVelocityY(100);
    bl_bot.setVelocityY(100);
    br_bot.setVelocityY(100);
    boosting.value = 1;
    setTimeout(function () {
      boosting.value = 0;
    }, 3000);
  }
}

function renderSpikes() {
  var devId = document.getElementById('header').innerHTML;
  if (devId.search('Prepare') > -1) return;

  xVal = Math.random() * 750 + 300;
  var spike = this.physics.add.sprite(xVal, -100, 'spikes');
  spike.setVelocityY(500);
  this.physics.add.collider(car, spike, function () {
    spike.rotation += 0.1;
    spike.setVelocityX(30);
  });
  spikes.push(spike);
}
function nuke() {
  var devId = document.getElementById('header').innerHTML;
  if (devId.search('Prepare') > -1) return;

  xVal = Math.random() * 750 + 300;
  var nuke = this.physics.add.sprite(xVal, 0, 'nuke');
  nuke.setVelocityY(300);
}

function motoRaid() {
  var devId = document.getElementById('header').innerHTML;
  if (devId.search('Prepare') > -1) return;

  xVal = Math.random() * 750 + 300;
  var moto = this.physics.add.sprite(xVal, -100, 'car_blue');
  moto.setVelocityY(500);
  this.physics.add.collider(car, moto);
}
function carRaid() {
  var devId = document.getElementById('header').innerHTML;
  if (devId.search('Prepare') > -1) return;

  xVal = Math.random() * 750 + 300;
  var car_opp = this.physics.add.sprite(xVal, -100, 'car_black');
  car_opp.setVelocityY(500);
  this.physics.add.collider(car, car_opp);
}
function carRaid1() {
  var devId = document.getElementById('header').innerHTML;
  if (devId.search('Prepare') > -1) return;

  xVal = Math.random() * 750 + 300;
  var car_opp = this.physics.add.sprite(xVal, -100, 'car_red');
  car_opp.setVelocityY(1000);
  this.physics.add.collider(car, car_opp);
}
function fence() {
  var devId = document.getElementById('header').innerHTML;
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
  var devId = document.getElementById('header').innerHTML;
  if (devId.search('Prepare') > -1) return;

  if (car.y >= 600) {
    this.cameras.main.shake(500);
    this.add.image(700, 250, 'over');
    this.time.delayedCall(1500, function () {
      this.katyvoor.END;
    }, [], this);
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
},{"./images/spikes.png":24,"./images/star.png":267,"./images/platformIndustrial_106.png":25,"./images/motorcycle_red.png":268,"./images/motorcycle_black.png":269,"./images/car_blue_small_5.png":270,"./images/car_black_small_3.png":271,"./images/car_red_small_4.png":273,"./images/cone_down.png":272,"./images/oil.png":274,"./images/over.png":275,"./images/le_road.png":21,"./images/green_car.png":22,"./images/nav_ideal.png":23,"./images/nav_idear.png":26}]},{},[9])
//# sourceMappingURL=/dist/ed1d90ee69e4960fe99898d711119d34.map