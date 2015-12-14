'use strict';
var game = new Phaser.Game(730, 350, Phaser.CANVAS, '', { preload: preload, create: create, render: render, update: update});
var manager = null;
var emitter = null;
var e = null;
var line;
var i = 0;
//test
var num = [0,1,2];

function preload() {
  game.forceSingleUpdate = true;
  for(var count = 0;count < 10;count ++){
    game.load.image('a'+count,'img/aircraft'+count+'.png');
  }
}
function create() {
  firework();
  var aircraft = game.add.sprite(100, 300, 'a0');
  aircraft.anchor.setTo(0.5);
  aircraft.scale.setTo(0.5);
  var c = game.add.tween(aircraft);
  c.to({ y: 200}, 1000, Phaser.Easing.Linear.None, false, 0, 0, false);
  c.start();
  //firework();
  //places();
}

function update() {
  emitter.renderer.clear(0.09);
}
function render () {
}
function firework(){
  manager = game.plugins.add(Phaser.ParticleStorm);
  manager.addData('red', {
    lifespan: 2000, //長
    red: { min: 200, max: 255 },
    vx: { min: -1, max: 1 }, //寬
    vy: { min: -2, max: 0 } //高
  });
  manager.addData('yellow', {
    lifespan: 2000,
    red: 200,
    green: { min: 200, max: 255 },
    vx: { min: -1.5, max: 1.5 },
    vy: { min: -2, max: 0 }
  });
  var setPosition = [
    {'x':130,'y':275},
    {'x':600,'y':300},
    {'x':450,'y':125},
    {'x':150,'y':100},
    {'x':365,'y':185},
    {'x':250,'y':250},
    {'x':430,'y':290}
  ];
  var position = [];
  emitter = manager.createEmitter(Phaser.ParticleStorm.PIXEL, new Phaser.Point(0, 0.01)); //方向遞增遞減 point(x,y);
  emitter.renderer.autoClear = false; //自動殘影消失，false用update設定
  emitter.renderer.pixelSize = 2.5; //線粗細
  for(var count in setPosition){
    position[count] = manager.createLineZone(setPosition[count].x, setPosition[count].y, setPosition[count].x, setPosition[count].y);//x,y to x,y (噴射口)
    //emitter.createGravityWell(setPosition[count].x, 500, 0, 500); //做會合點：x，y，角度？，拋距？
    emitter.addToWorld();
    emitter.emit('red', 0, 0, { zone: position[count], total: 50, repeat: 5, frequency: 3000 }); //frequency 頻率：秒
    emitter.emit('yellow', 0, 0, { zone: position[count], total: 50, repeat: 5, frequency: 3000 });
  }
}
function places(){
  var testB = game.add.group();
  var text = game.add.text(400 , 300 , '第'+'名' , {
    font: '15px Arial',
    fill: '#FFFFFF',
    wordWrap: true,
    align: 'center'
  });
  testB.add(text);
  var j = 240;
  for(var i in num){
    var aircraft = game.add.sprite(j, 300, 'a'+num[i]);
    aircraft.anchor.setTo(0.5);
    aircraft.scale.setTo(0.5);
    j+=125;
    testB.add(aircraft);
  }
}