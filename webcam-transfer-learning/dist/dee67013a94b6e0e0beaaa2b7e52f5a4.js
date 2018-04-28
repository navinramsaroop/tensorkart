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
})({248:[function(require,module,exports) {
module.exports="/dist/0544174cac4bc98bcc7b8ef6292b4371.png";
},{}],249:[function(require,module,exports) {
module.exports="/dist/4ad0d23891144f351c4bc56c730722a9.png";
},{}],251:[function(require,module,exports) {
module.exports="/dist/a90db6528a49848061b9b208cb7f8900.png";
},{}],252:[function(require,module,exports) {
module.exports="/dist/f5622f6a2ef51fb0f69171b7da37929b.png";
},{}],250:[function(require,module,exports) {
module.exports="/dist/4c5c7eeb693eb1973bd52ddfe8e85eae.png";
},{}],253:[function(require,module,exports) {
module.exports="/dist/17c8798dfa651291ce8e01d04b280937.png";
},{}],2:[function(require,module,exports) {
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
var CONTROLS = ['up', 'down', 'left', 'right', 'fist', 'palm'];
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
function preload() {
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
  car = this.physics.add.sprite(700, 475, 'green_car');
  cursors = this.input.keyboard.createCursorKeys();
  car.setCollideWorldBounds(true);
  temp = bl.y;
  accel = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  timedEvent = this.time.addEvent({
    delay: 1500,
    callback: renderSpikes,
    callbackScope: this,
    loop: true
  });
  timedEvent2 = this.time.addEvent({
    delay: 10000,
    callback: nuke,
    callbackScope: this,
    loop: true
  });
  cursors = this.input.keyboard.createCursorKeys();
}
function renderSpikes() {
  console.log('hello');
  xVal = Math.random() * 750 + 300;
  var spike = this.physics.add.sprite(xVal, -100, 'spikes');
  spike.setVelocityY(300);
  this.physics.add.collider(car, spike);
  spikes.push(spike);
}
function nuke() {
  console.log('nuke');
  xVal = Math.random() * 750 + 300;
  var nuke = this.physics.add.sprite(xVal, 0, 'nuke');
  nuke.setVelocityY(300);
  if (spikes.length > 0) {
    for (var i = 0; i < spikes.length; i++) {
      spikes[i].destroy();
    }
  }
}
function update() {
  var devId = document.getElementById('header').innerHTML;

  console.log(bl.y);
  console.log(temp);
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
      car.setVelocityX(-700);
    }
  } else if (devId === CONTROLS[3]) {
    if (car.x > 1100) {
      car.setVelocityX(50);
    } else {
      car.setVelocityX(700);
    }
  } else if (devId === CONTROLS[0]) {
    car.setVelocityY(-60);
    console.log('help where is accel');
  } else {
    car.setVelocityX(0);
    bl.setVelocityX(0);
    bl.setVelocityY(0);
    br.setVelocityX(0);
    br.setVelocityY(0);
    bl_top.setVelocityY(0);
    br_top.setVelocityY(0);
    bl_bot.setVelocityY(0);
    br_bot.setVelocityY(0);
    car.setVelocityY(0);
  }
  if (car.x < 320 || car.x > 1000) {
    bl.setVelocityY(100);
    br.setVelocityY(100);
    bl_top.setVelocityY(100);
    br_top.setVelocityY(100);
    bl_bot.setVelocityY(100);
    br_bot.setVelocityY(100);
  } else {
    bl.setVelocityY(700);
    br.setVelocityY(700);
    bl_top.setVelocityY(700);
    br_top.setVelocityY(700);
    bl_bot.setVelocityY(700);
    br_bot.setVelocityY(700);
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
}
},{"./images/le_road.png":248,"./images/green_car.png":249,"./images/nav_ideal.png":251,"./images/nav_idear.png":252,"./images/spikes.png":250,"./images/platformIndustrial_106.png":253}]},{},[2])
//# sourceMappingURL=/dist/dee67013a94b6e0e0beaaa2b7e52f5a4.map