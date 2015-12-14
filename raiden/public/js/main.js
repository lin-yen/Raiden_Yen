'use strict';
var game = new Phaser.Game(640 , 360 , Phaser.AUTO);
var l = 1;//光年用的count
var power = [],result = [],action;
//
var gameState = {
  preload: function(){
    this.load.image('background1','img/s.png');
    for(var count = 0;count < 10;count ++){
      this.load.image('a'+count,'img/aircraft'+count+'.png');
    }
    this.load.json('gameFile','config/game.json');
  },
  create: function(){
    //parse the file
    this.gameFile = this.game.cache.getJSON('gameFile');

    //background
    this.game.stage.backgroundColor = '#000';
    this.background1 = this.game.add.sprite(0 , 0 , 'background1');
    this.game.add.tween(this.background1).to({ y: 360 }, 2000, Phaser.Easing.Linear.None, true, 4000, 3, false);
    this.background2 = this.game.add.sprite(0 , -360 , 'background1');
    this.game.add.tween(this.background2).to({ y: 0}, 2000, Phaser.Easing.Linear.None, true, 4000, 3, false);

    //line and text
    //起點
    this.startLine = game.add.graphics(0,0);
    this.startLine.lineStyle(5, 0x33FFFF);
    this.startLine.moveTo(0,270);
    this.startLine.lineTo(640, 270);
    this.game.add.tween(this.startLine).to({ y: 360}, 1000, Phaser.Easing.Linear.None, true, 4000, 0, false);
    this.startText = this.game.add.text(575 , 250 , '1000光年' , {
      font: '15px Arial',
      fill: '#33FFFF',
      wordWrap: true,
      wordWrapWidth: this.background1.width,
      align: 'center' });
    this.game.add.tween(this.startText).to({ y: 360}, 330, Phaser.Easing.Linear.None, true, 4000, 0, false);
    //光年
    this.graphics = game.add.graphics(0,0);
    this.graphics.lineStyle(1, 0xFFFFFF);
    this.graphics.moveTo(0,0);
    this.graphics.lineTo(640, 0);
    this.game.add.tween(this.graphics).to({ y: 380}, 1000, Phaser.Easing.Linear.None, true, 5000, 4, false);
    this.lineText = this.game.add.text(640 , 0 , this.gameFile['lightyear'][0] + '光年' , {
      font: '15px Arial',
      fill: '#FFFFFF',
      wordWrap: true,
      align: 'center' });
    this.lineText.anchor.setTo(1,1);
    this.game.add.tween(this.lineText).to({ y: 380}, 1000, Phaser.Easing.Linear.None, true, 5000, 4, false);
    //終點
    this.endLine = game.add.graphics(0,0);
    this.endLine.lineStyle(5, 0x33FFFF);
    this.endLine.moveTo(0,-5);
    this.endLine.lineTo(640, -5);
    this.game.add.tween(this.endLine).to({ y: 150}, 1200, Phaser.Easing.Linear.None, true, 11000, 0, false);

    //aircraft
    var o = 0;
    for(var aCount in this.gameFile['aircraftPoint']){
      this['a'+aCount] = this.game.add.sprite(this.gameFile['aircraftPoint'][aCount].x, this.gameFile['aircraftPoint'][aCount].y, 'a'+aCount);
      this['a'+aCount].anchor.setTo(0.5);
      this['a'+aCount].scale.setTo(0.3);
      if(aCount === power[0]){
        this['m' + aCount] = this.game.add.tween(this['a' + aCount]);
        this['m' + aCount].to({ y: this.gameFile.point.firstP.power[0]}, 1000, Phaser.Easing.Linear.None, false, 4000, 0, false);
      }
      else if(aCount === power[1]){
        this['m' + aCount] = this.game.add.tween(this['a' + aCount]);
        this['m' + aCount].to({ y: this.gameFile.point.firstP.power[1]}, 1000, Phaser.Easing.Linear.None, false, 4000, 0, false);
      } else if(aCount === power[2]){
        this['m' + aCount] = this.game.add.tween(this['a' + aCount]);
        this['m' + aCount].to({ y: this.gameFile.point.firstP.power[2]}, 1000, Phaser.Easing.Linear.None, false, 4000, 0, false);
      } else {
        this['m' + aCount] = this.game.add.tween(this['a' + aCount]);
        this['m' + aCount].to({ y: this.gameFile.point.firstP.other[o]}, 1000, Phaser.Easing.Linear.None, false, 4000, 0, false);
        o++;
      }
    }
    for(var rCount = 0;rCount < result.length;rCount++){
      this['m' + result[rCount]].to({ y: this.gameFile.point.actionP[action][rCount][0]}, 2000, Phaser.Easing.Linear.None, false, 1000, 0, false);
      this['m' + result[rCount]].to({ y: this.gameFile.point.actionP[action][rCount][1]}, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
      this['m' + result[rCount]].to({ y: this.gameFile.point.actionP[action][rCount][2]}, 1000, Phaser.Easing.Linear.None, false, 0, 0, false);
      this['m' + result[rCount]].to({ y: this.gameFile.point.actionP[action][rCount][3]}, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
      this['m' + result[rCount]].start();
    }
  },
  update: function(){
    if(this.graphics.y === 380 && l < 5){
      this.lineText.text = this.gameFile.lightyear[l++] + '光年';
    }
  }
};

//test
document.getElementById("randomTest").onclick = function() {
  var exist;
  //亂數取0~9不重複
  for(var i = 0; i < 10; i++) {
    var r = 0;
    do {
      exist = false;
      r = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
      if(result.indexOf(r) != -1) exist = true;
    } while (exist);
    result[i] = r;
  }
  result = result.toString().split(",");
  //輸出
  for(var z in result){
    var x = Number(z) + 1,
      na = 'no' + x;
    document.getElementById(na).value  = result[z];
  }
  document.getElementById('seed').value = Math.floor(Math.random() * 9999);
  document.getElementById('action').value = '';
  for(var u=1;u<4;u++){
    var pName = 'power' + u;
    document.getElementById(pName).value = '';
  }
};

document.getElementById("run").onclick = function(){
  game.state.clearCurrentState();

  //seed to power and action
  var val = document.getElementById('seed').value;
  var arr = {'action':'','seed':[]};
  arr.action = val % 5;
  arr.seed[0] = Math.sqrt(val).toFixed(1).split(".")[1];
  arr.seed[1] = Math.sqrt(val).toFixed(2).split(".")[1].split("")[1];
  if(arr.action > 3){
    arr.seed[2] = Math.sqrt(val).toFixed(3).split(".")[1].split("")[2];
  }

  //設定和輸出 action,power,result
  action = arr.action;
  document.getElementById('action').value = action;
  var pN = 1;
  for(var i in arr.seed){
    power[i] = arr.seed[i];
    var pName = 'power' + pN++;
    document.getElementById(pName).value = power[i];
  }
  var rC = 0;
  for(var gCount = 1;gCount <11;gCount ++){
    var getName = 'no' + gCount;
    result[rC++] = document.getElementById(getName).value;
  }

  //game.state.start
  game.state.add('gameState' , gameState);
  game.state.start('gameState', true, false);
};

/*
 //機率
 var arr1 = [0,0,0,0,0,0,0,0,0,0];
 for (var i = 0; i < 10000; i ++) {
 var num1 = Math.sqrt(i).toFixed(1).split(".");
 arr1[num1[1]]+=1;
 }
 console.log(arr1); //[1000, 990, 1010, 980, 1000, 1000, 1000, 1020, 990, 1010]
 var arr2 = [0,0,0,0,0,0,0,0,0,0];
 for (var j = 0; j < 10000; j ++) {
 var num2 = Math.sqrt(j).toFixed(2).split(".")[1].split("");
 arr2[num2[1]]+=1;
 }
 console.log(arr2); //[1000, 999, 1016, 983, 1000, 1000, 1000, 1017, 984, 1001]
 var arr3 = [0,0,0,0,0,0,0,0,0,0];
 for (var z = 0; z < 10000; z ++) {
 var num3 = Math.sqrt(z).toFixed(3).split(".")[1].split("");
 arr3[num3[2]]+=1;
 }
 console.log(arr3); //[1099, 961, 958, 1022, 957, 1003, 996, 1007, 981, 1016]
*/