// Vectors
let startScreenVecs = [];
let startScreenAngs = [];
let nStart = 128;
let studans = [];
let Nang = 8;
let Npos = 16;
let isActive = false;
let ireleased = true;
let i_active;
let firstGesture = false;

// Sounds
let FBDGameThemeSound;
let muteState = false;
var snds = {};

// Questions
let questions = [];

// Images
let imgs = [];
let heartImage;
let sndOffImage;
let sndOnImage;

// DOM Elements
let checkans_button;
let nextlevel_button;
let gameover_button;
let hint_button;
let time_button;
let gameModeSelect;
let tutorialBox, tutorialBoxLabel;
let gameMode;
let startWithTutorial = true;
let vectorName;
let vectorName_flag;

let PLAYER;
let GAME;
let QUESTIONLIST = [];

function preload(){
  GAME = new game();

  // Ultimately this should read a file listing from server side so that questions can be added without static list,
  // but that cannot be done on GitHub and I do not want to host the website (yet). So, hard-coding it is.
  // Note to self: re-visit Dan Schiffman's 12.1 - 12.3 on how to do this with node.js
  loadJSON("questions.json", getQuestionList);


  
  heartImage= loadImage('assets/img/heart.png');
  sndOnImage = loadImage('assets/img/sound-on.png');
  sndOffImage = loadImage('assets/img/sound-off.png');

  snds["Game Theme"] = loadSound('assets/sounds/FBDGameTheme.mp3');
}

function getQuestionList(data){
  QUESTIONLIST = data['questions'];
  for (let i=0; i<QUESTIONLIST.length; i++){
    loadJSON("assets/questions/"+QUESTIONLIST[i], loadQuestion);
  }
}

function loadQuestion(data){
  questions[questions.length] = new question(data);
}

function setup() {
  // Fixed size (for now)
  createCanvas(800, 600);

  // Global Font Settings
  textFont('VT323');
  textSize(20);

  // Load Questions

  
  // initiate player
  PLAYER = new player();
  
  // Resize images! Eventually this won't be necessary.
  for (let k=0;k<questions.length;k++){
    questions[k].img.resize(350,150);
  }
  heartImage.resize(25,0);
  sndOffImage.resize(20,20);
  sndOnImage.resize(20,20);
  
  // DOM Elements
  let buttons = [];
  checkans_button = createButton('Submit!');
  checkans_button.position(3*width/4-30, height-75);
  checkans_button.mousePressed(() => {
    let resp = GAME.currentQuestion.check_ans(PLAYER.ans);
    GAME.resp = resp;
    if (GAME.mode=='Test'){
      if (resp=='Correct!'){
        GAME.numCorrect+=1;
      }
      GAME.questionIndices.splice(GAME.questionIndexIndex,1);
      GAME.levelComplete = true;
      GAME.levelPlaying = false;
      GAME.resp = resp;
      GAME.numberAnswered+=1;
      checkans_button.hide();
    }
    if (GAME.mode=='Study' || GAME.mode=='Score'){
      if ( resp=='Correct!'){
        GAME.levelComplete = true;
        GAME.levelPlaying = false;
        GAME.questionIndices.splice(GAME.questionIndexIndex,1);
        checkans_button.hide();
      } else{
        GAME.playerFeedback = resp;
        PLAYER.health--;
      } 
    }
  });
  buttons.push(checkans_button);
  
  nextlevel_button = createButton('Next Level?');
  nextlevel_button.hide();
  nextlevel_button.mousePressed(() => {
    if (GAME.mode=='Score'){
      GAME.timerMax -= 10;
      GAME.timer = GAME.timerMAX;
    }
    GAME.winCounter = 0;
    
    checkans_button.hide();
    vectorName.hide();
    ireleased = true;
    vectorName_flag = false;
    isActive = false;
    PLAYER.currentHints = [];
    PLAYER.ans = [];
    
    // Should really store as separate array, rather than appending and splicing...
    for (let i = 0; i<studans.length; i++){
      let cq = 2*Nang;
      GAME.vectors.splice(cq,1);
    }
    studans = [];
    
    GAME.selectQuestion();

    GAME.levelComplete = false;
    GAME.levelPlaying = true;
    GAME.level++;
    nextlevel_button.hide();
  });
  buttons.push(nextlevel_button);
  
  gameover_button = createButton('Play Again?');
  gameover_button.hide();
  gameover_button.mousePressed(() => {
    // It makes more sense to have this in the start button.
    GAME.timer = GAME.timerMAX;
    GAME.winCounter = 0;
    GAME.level = 1;
    PLAYER.health = 5;
    PLAYER.money = 10;
    PLAYER.currentHints = [];
    GAME.playerFeedback = '';
    
    checkans_button.hide();
    vectorName.hide();
    ireleased = true;
    vectorName_flag = false;
    isActive = false
    
    for (let i = 0; i<studans.length; i++){
      let cq = 2*Nang;
      GAME.vectors.splice(cq,1);
    }
    studans = [];

    GAME.loadQuestions(questions);
    GAME.selectQuestion()
    GAME.gameOver = false;
    GAME.startMenu = true;
    gameover_button.hide();
    
  });
  buttons.push(gameover_button);
  
  hint_button = createButton('Hint ($'+nf(GAME.hintCost,0,2)+')');
  hint_button.mousePressed(() => {
    if (PLAYER.money>=GAME.hintCost && GAME.currentQuestion.hints.length>0){
        PLAYER.money-=GAME.hintCost;
        let hi = int(random(0,GAME.currentQuestion.hints.length));
        PLAYER.currentHints.push(GAME.currentQuestion.hints[hi]);
        GAME.currentQuestion.removeHint(hi);
      }
  });
  buttons.push(hint_button);
  
  time_button = createButton('+30s ($'+nf(GAME.timeCost,0,2)+')');
  time_button.mousePressed(() => {
    if (PLAYER.money>=GAME.timeCost){
      PLAYER.money -= GAME.timeCost;
      GAME.timer += 30;
    }
  });
  buttons.push(time_button);
  
  heart_button = createButton('+1 heart ($'+nf(GAME.heartCost,0,2)+')');
  heart_button.mousePressed(() => {
    if (PLAYER.money>=GAME.heartCost && PLAYER.health<=5){
        PLAYER.money -= GAME.heartCost;
        PLAYER.health += 1;
    }
  });
  buttons.push(heart_button);

  start_button = createButton('Start!');
  start_button.hide();
  start_button.mousePressed(() => {
    GAME.startMenu = false;
    GAME.levelPlaying = true;
    if (GAME.mode=='Test'){
      GAME.timer = 600;
    }

    tutorialBoxLabel.hide();
    gameModeSelect.hide();
    start_button.hide();
  })
  buttons.push(start_button);


  
  vectorName = createInput('')
  vectorName.hide();
  
  vectorName.input(() => {
    let msg = vectorName.value();
    vectors[i_active].name = msg;
  });
  
  // Create Vector Roses
  let vectors = [];
  for (let i = 0; i<Nang; i++){
    let angle =i*2*PI/Nang;
    
    let mdx = 3*width/4-75;
    let mdy = 110;
    let md_vec = new vector(mdx,mdy,40,angle,nf(i));
    vectors.push(md_vec)
  }
  
  for (let i = 0; i<Nang; i++){
    let angle = i*2*PI/Nang;
    let lgx = 3*width/4+75;
    let lgy = 110;
    let lg_vec = new vector(lgx,lgy,40*sqrt(2),angle,nf(i+8));
    vectors.push(lg_vec);
  }

  // Game inherits these elements.
  GAME.loadButtons(buttons);
  GAME.loadQuestions(questions);
  GAME.loadVectors(vectors)

  // These could also be inherited by GAME.
  for (let i=0; i<nStart; i++){
    let angle = random(0,2*PI);
    let sx = random(0,width);
    let sy = random(0,height);
    let l = random(20,50)
    let v = new vector(sx,sy,l,angle,'');
    startScreenVecs.push(v);
    startScreenAngs.push(random(0,2*PI));
  }
  
  GAME.selectQuestion();

  // Nice slider
  tutorialBoxLabel = createElement(
    'label',
    `<input id="toggle" type="checkbox" />
     <span class="slider round"></span>`
  );
  
  tutorialBoxLabel.addClass('switch');
  tutorialBox = select('#toggle')

  // Game Mode Select
  gameModeSelect = createSelect();
  gameModeSelect.option('Study');
  gameModeSelect.option('Score');
  gameModeSelect.option('Test');
  gameModeSelect.selected('Score');
  gameModeSelect.style('font-family: VT323');
  gameModeSelect.style('font-size: 20px');
}

function draw() {
  background(GAME.BKGDcolor);

  for (let i=0; i<nStart; i++){
    startScreenVecs[i].show();
    startScreenVecs[i].r.x+=cos(startScreenAngs[i]);
    startScreenVecs[i].r.y+=sin(startScreenAngs[i]);
    if (startScreenVecs[i].r.x>width){
      startScreenVecs[i].r.x=0;
    } else if (startScreenVecs[i].r.x<0){
      startScreenVecs[i].r.x=width;
    } 
    if (startScreenVecs[i].r.y>height){
      startScreenVecs[i].r.y=0;
    } else if (startScreenVecs[i].r.y<0){
      startScreenVecs[i].r.y=height;
    } 
  }

  push();
  fill(255,255,255,50);
  noStroke();
  rect(0,0,width,height);
  pop();

  if (GAME.mute){
    snds["Game Theme"].pause();
    image(sndOffImage,width-25,height-25);
  } else if (!snds["Game Theme"].isPlaying() && firstGesture){
    snds["Game Theme"].setVolume(0.5);
    snds["Game Theme"].loop();
    image(sndOnImage,width-25,height-25);
  } else {
    image(sndOnImage,width-25,height-25);
  }

  GAME.update();
}

function mousePressed() {
  firstGesture=true;
  if (GAME.levelPlaying){
    if ((i_active<(2*Nang)) && (!vectorName_flag) && (isActive)){
      let avec = new vector(3*width/4,3*height/4,GAME.vectors[i_active].vmag,GAME.vectors[i_active].theta);
      GAME.vectors.push(avec);
      studans.push(avec);
      PLAYER.ans.push(i_active);
      i_active = GAME.vectors.length-1;
      vectorName_flag = true;
      vectorName.position(width/2+150,height/2+25);
      vectorName.show();
      ireleased = false;
    } else if ((ireleased) && (!vectorName_flag) && (isActive)) {
      let ai = studans.indexOf(GAME.vectors[i_active]);
      studans.splice(ai,1)
      PLAYER.ans.splice(ai,1);
      GAME.vectors.splice(i_active,1);
      vectorName.hide();
      vectorName_flag = false;
      ireleased = true;
    }
  }
  if (mouseX>(width-30)&&(mouseY>(height-30))){
    GAME.mute = !GAME.mute;
  }
}

function keyPressed(){
  if (GAME.levelPlaying){
    if (keyCode==ENTER) {
      vectorName.hide();
      vectorName.value('');
      ireleased = true;
      vectorName_flag = false;
    }
  }
}
