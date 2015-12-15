'use strict';
var game = new Phaser.Game(730, 350, Phaser.CANVAS, '', { preload: preload, create: create, render: render, update: update});
var manager = null;
var emitter = null;
var resultObject;

function preload() {
  game.forceSingleUpdate = true;
  for(var count = 1;count < 11;count ++){
    game.load.image('a'+count,'img/aircraft'+count+'.png');
  }
}
function create() {
  firework();
  places();
}

function update() {
  emitter.renderer.clear(0.05);
  if(resultObject.y > 0){
    resultObject.y -= 5;
  }
}
function render () {
}
function firework(){
  manager = game.plugins.add(Phaser.ParticleStorm);
  manager.addData('color1', { //紅
    lifespan: 2000, //長
    red: 165,
    vx: { min: -0.8, max: 0.8 }, //寬
    vy: { min: -1.8, max: -0.8 } //高
  });
  manager.addData('color2', { //黃
    lifespan: 2000,
    red: 255,
    green: 215,
    vx: { min: -1, max: 1 },
    vy: { min: -2, max: -0.6 }
  });
  manager.addData('color3', { //綠
    lifespan: 2000,
    green:255,
    vx: { min: -1.5, max: 1.5 },
    vy: { min: -2, max: 0 }
  });
  manager.addData('color4', { //藍
    lifespan: 2000,
    green:255,
    blue:255,
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
  emitter.renderer.pixelSize = 2; //線粗細
  for(var count in setPosition){
    position[count] = manager.createLineZone(setPosition[count].x, setPosition[count].y, setPosition[count].x, setPosition[count].y);//x,y to x,y (噴射口)
    //emitter.createGravityWell(setPosition[count].x, 500, 0, 500); //做會合點：x，y，角度？，拋距？
    emitter.addToWorld();
    emitter.emit('color' + 1, 0, 0, { zone: position[count], total: 10, repeat: -1, frequency: 3000 }); //frequency 頻率：秒
    emitter.emit('color' + 2, 0, 0, { zone: position[count], total: 10, repeat: -1, frequency: 3000 });
    emitter.emit('color' + 3, 0, 0, { zone: position[count], total: 10, repeat: -1, frequency: 3000 });
    emitter.emit('color' + 4, 0, 0, { zone: position[count], total: 10, repeat: -1, frequency: 3000 });
  }
}
function places() {
  //test
  var result = [5 , 1 , 4];
  //config
  var setPlaces = {
    'result1':{
      'places': {
        'x': 365,
        'y': 100,
        'word': '第一名',
        'font': '40px Arial'
      },
      'num':{
        'x': 365,
        'y': 215,
        'font': '35px Arial'
      },
      'aircraft':{
        'x': 360,
        'y': 150,
        'scale':0.4
      }
    },
    'result2':{
      'places': {
        'x': 243,
        'y': 150,
        'word': '第二名',
        'font': '25px Arial'
      },
      'num':{
        'x': 243,
        'y': 235,
        'font': '25px Arial'
      },
      'aircraft':{
        'x': 240,
        'y': 185,
        'scale':0.3
      }
    },
    'result3':{
      'places':{
        'x':487,
        'y':150,
        'word':'第三名',
        'font':'25px Arial'
      },
      'num':{
        'x': 487,
        'y': 235,
        'font': '25px Arial'
      },
      'aircraft':{
        'x': 485,
        'y': 185,
        'scale':0.3
      }
    }
  };

  var i = 0;
  resultObject = game.add.group();
  for(var count in setPlaces){
    //字
    var places = game.add.text(setPlaces[count].places.x, setPlaces[count].places.y, setPlaces[count].places.word, {
      font: setPlaces[count].places.font,
      fill: '#FFFFFF',
      wordWrap: true,
      align: 'center'
    });
    places.anchor.setTo(0.5, 0);
    resultObject.add(places);
    //機號
    var num = game.add.text(setPlaces[count].num.x, setPlaces[count].num.y, result[i], {
      font: setPlaces[count].num.font,
      fill: '#FFFFFF',
      wordWrap: true,
      align: 'center'
    });
    num.anchor.setTo(0.5,0);
    resultObject.add(num);
    //飛機
    var aircraft = game.add.sprite(setPlaces[count].aircraft.x, setPlaces[count].aircraft.y, 'a' + result[i]);
    aircraft.anchor.setTo(0.5, 0);
    aircraft.scale.setTo(setPlaces[count].aircraft.scale);
    resultObject.add(aircraft);
    i++;
  }
  resultObject.y += 190;
}