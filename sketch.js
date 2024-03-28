let vectors = [];
let startScreenVecs = [];
let startScreenAngs = [];
let nStart = 128;
let studans = [];
let i_active;
let Npos = 15;
let Nang = 8;
let name;
let name_flag;
let ireleased = true;
let level = 1;
let _GLOBTIMER = 120;

// Sounds
let vectorSelectSound;
let vectorDeselectSound;
let scorePointSound;
let d3Sound;
let f3Sound;
let a3Sound;
let d4Sound;


let img;
let questions = [];
let questionIX = [];
let currentquestion;
let imgs = [];
let currentimage;
let ii,iqi,iq;
let lastresp = '';
let isActive = false;

// Other Images
let heartImage;

// Interactive Elements
let checkans_button;
let nextlevel_button;
let gameover_button;
let hint_button;
let time_button;

// gamestates
let levelcomplete = false;
let startscreen = false;
let gameover = false;
let levelplaying = false;
let startMenu = true

// gamemodes
let gameModeSelect;
let tutorialBox, tutorialBoxLabel;
let gameMode;
let startWithTutorial = true;

let gameTIMER = _GLOBTIMER;
let frameCounter = 0;
let winCounter = 0;
let playerHealth = 5;
let playerFeedback = '';
let playerMoney = 10.00;
let hintCost = 1;
let timeCost = 0.5;
let heartCost = 5;

let PLAYER;

function preload(){
  imgs[imgs.length] = loadImage('assets/img/accelerom2.gif');
  imgs[imgs.length] = loadImage('assets/img/piano1.gif');
  imgs[imgs.length] = loadImage('assets/img/block01-02.gif');
  imgs[imgs.length] = loadImage('assets/img/Curzon6.6.gif');
  imgs[imgs.length] = loadImage('assets/img/B1.jpg')
  imgs[imgs.length] = loadImage('assets/img/B1.jpg')
  imgs[imgs.length] = loadImage('assets/img/elevator.1.gif')
  
  heartImage= loadImage('assets/img/heart.png');

  vectorSelectSound = loadSound('assets/sounds/vectorSelect.mp3');
  vectorDeselectSound = loadSound('assets/sounds/vectorDeselect.mp3');
  scorePointSound = loadSound('assets/sounds/scorePoint.mp3');
  d3Sound = loadSound('assets/sounds/D3.mp3');
  a3Sound = loadSound('assets/sounds/A3.mp3');
  f3Sound = loadSound('assets/sounds/F3.mp3');
  d4Sound = loadSound('assets/sounds/D4.mp3');
}

function setup() {
  textFont('VT323');

  question1 = new question('accelerom2.gif',
                          'A truck accelerates, causing a lightbulb suspended by a string to form an angle of 45 degrees with the vertical. Draw a FBD for the bulb.',
                          [[2,15]],
                           ['Aside from w, only an object touching the system can exert a force on the system.',
                           'Tension always pulls away from the system along the string.',
                           'The net force must point in the direction of acceleration.',
                           'There is no force pulling the bulb backwards.',
                           'Rigidly connected objects share the same acceleration.']);
  
  questions.push(question1);
  
  question2 = new question('piano1.gif',
                          'A man pushes a piano, causing it to accelerate to the right. The piano experiences no friction with the floor. Draw a FBD for the piano.',
                           [[2,6,0],[2,6,8],[10,14,0],[10,14,8]],
                           ['Only forces acting ON the system are included in an FBD',
                           'If an object is accelerating, it must have a net force.']);
  questions.push(question2);

  question3 = new question('block01-02.gif',
                          'A box is pressed up against a wall with sufficient force that it remains stationary. Draw a FBD for the box.',
                          [[0,2,4,6],[0,10,4,14],[8,2,12,6],[8,10,12,14]],
                          ['Static friction opposes the combined forces(s) along the surface.',
                          'When pushed, a rigid object will push back with equal force.']);
  questions.push(question3);

  question4 = new question('Curzon6.6.gif',
                          'Two blocks of unequal mass (m2>m1) are suspended by a string around a pulley. Draw a FBD for the m2 as it accelerates.',
                          [[6,10]],
                          ['Only forces acting ON the system are included in an FBD',
                          'If an object is accelerating, it must have a net force in the direction of acceleration.',
                          'If mass 2 is heavier than mass 1, in which direction will it accelerate?']);
  questions.push(question4);

  question5 = new question('B1.gif',
                          'Two blocks (B & C) are pushed with force, F2, causing them to accelerate with an acceleration, a2. Ignoring any friction, draw a FBD for block C.',
                          [[0,12,10,14],[0,12,2,6]],
                          ['Only forces acting ON the system are included in an FBD',
                          'If an object is accelerating, it must have a net force in the direction of acceleration.',
                          'If block C pushes on block B, block B must push on block C!']);
  questions.push(question5);

  question6 = new question('B1.gif',
                          'Two blocks (B & C) are pushed with force, F2, causing them to accelerate with an acceleration, a2. Ignoring any friction, draw a FBD for block B.',
                          [[12,10,14],[12,2,6],[4,10,14],[4,2,6]],
                          ['Only forces acting ON the system are included in an FBD',
                          'If an object is accelerating, it must have a net force in the direction of acceleration.',
                          'If block C pushes on block B, block B must push on block C!']);
  questions.push(question6);

  question7 = new question('elevator1.gif',
                          'A person is inside of an elevator, traveling upwards with velocity, v. The elevator is also accelerating, as shown by the vector, a. Draw a FBD for the person.',
                          [[2,14]],
                          ['Only forces acting ON the system are included in an FBD',
                          'If an object is accelerating, it must have a net force in the direction of acceleration.']);
  questions.push(question7);

  for (let i = 0; i<questions.length; i++){
    questionIX.push(i);
  }
  
  iqi = int(random(0,questionIX.length)); // random
  iqi = 6
  iq = questionIX[iqi];
  ii = iq;
  currentquestion = questions[iq];
  
  // initiate player
  PLAYER = new player(playerHealth, playerMoney);
  print(PLAYER.health)
  
  // Font Settings
  textFont('VT323');
  textSize(16);
  
  createCanvas(800, 600);
  for (let k=0;k<imgs.length;k++){
    imgs[k].resize(width/2-60,height/2-120);
  }
  heartImage.resize(25,0);
  
  checkans_button = createButton('Submit!');
  checkans_button.position(3*width/4-30, height-75);

  checkans_button.mousePressed(() => {
    let resp = currentquestion.check_ans(studans);
    if (resp=='Correct!'){
      levelcomplete = true;
      levelplaying = false;
    } else {
      playerFeedback = resp;
      PLAYER.health--;
    }
  });
  
  nextlevel_button = createButton('Next Level?');
  nextlevel_button.hide();
  
  nextlevel_button.mousePressed(() => {
    gameTIMER = _GLOBTIMER;
    winCounter = 0;
    
    checkans_button.hide();
    name.hide();
    ireleased = true;
    name_flag = false;
    isActive = false;
    PLAYER.currentHints = [];
    
    for (let i = 0; i<studans.length; i++){
      let cq = 2*Nang;
      vectors.splice(cq,1);
    }
    studans = [];
    
    iqi = int(random(0,questionIX.length)); // random
    iq = questionIX[iqi];
    ii = iq;
    currentquestion = questions[iq];
    levelcomplete = false;
    levelplaying = true;
    level++;
  });
  
  gameover_button = createButton('Play Again?');
  gameover_button.hide();
  
  gameover_button.mousePressed(() => {
    gameTIMER = _GLOBTIMER;
    winCounter = 0;
    level = 1;
    PLAYER.health = 5;
    PLAYER.money = 10;
    PLAYER.currentHints = [];
    playerFeedback = '';
    
    checkans_button.hide();
    name.hide();
    ireleased = true;
    name_flag = false;
    isActive = false
    
    for (let i = 0; i<studans.length; i++){
      let cq = 2*Nang;
      vectors.splice(cq,1);
    }
    studans = [];

    for (let i = 0; i<questions.length; i++){
      questionIX.push(i);
    }
    
    iqi = int(random(0,questionIX.length)); // random
    iq = questionIX[iqi];
    ii = iq;
    currentquestion = questions[iq];
    levelcomplete = false;
    levelplaying = false;
    gameover = false;
    startMenu = true;
    gameover_button.hide();
    
  });
  
  hint_button = createButton('Hint ($'+nf(hintCost,0,2)+')');
  hint_button.position(35,height/2-45);
  hint_button.hide();
  
  hint_button.mousePressed(() => {
  if (PLAYER.money>=hintCost && currentquestion.hints.length>0){
      PLAYER.money-=hintCost;
      let hi = int(random(0,currentquestion.hints.length));
      //playerFeedback = currentquestion.hints[hi];
      PLAYER.currentHints.push(currentquestion.hints[hi]);
      currentquestion.removeHint(hi);
    }
  });
  
  time_button = createButton('+30s ($'+nf(timeCost,0,2)+')');
  time_button.position(155,height/2-45);
  time_button.hide();
  time_button.mousePressed(() => {
    if (PLAYER.money>=timeCost){
      PLAYER.money -= timeCost;
      gameTIMER += 30;
    }
  });
  
  heart_button = createButton('+1 heart ($'+nf(heartCost,0,2)+')');
  heart_button.position(270,height/2-45);
  heart_button.hide();
  heart_button.mousePressed(() => {
  if (PLAYER.money>=heartCost && PLAYER.health<=5){
      PLAYER.money -= heartCost;
      PLAYER.health += 1;
    }
  });

  start_button = createButton('Start!');
  start_button.hide();
  start_button.mousePressed(() => {
    startMenu = false;
    levelplaying = true;
    tutorialBoxLabel.hide();
    gameModeSelect.hide();
    start_button.hide();
  })
  
  name = createInput('')
  name.hide();
  
  name.input(() => {
    let msg = name.value();
    print(msg, i_active)
    vectors[i_active].name = msg;
  });
  
  for (let i = 0; i<Nang; i++){
    let angle =i*2*PI/Nang;
    
    let mdx = 3*width/4-75;
    let mdy = 90;
    let md_vec = new vector(mdx,mdy,40,angle,'');
    vectors.push(md_vec)
  }
  
  for (let i = 0; i<Nang; i++){
    let angle = i*2*PI/Nang;
    let lgx = 3*width/4+75;
    let lgy = 90;
    let lg_vec = new vector(lgx,lgy,40*sqrt(2),angle,'');
    vectors.push(lg_vec);
  }

  for (let i=0; i<nStart; i++){
    let angle = random(0,2*PI);
    let sx = random(0,width);
    let sy = random(0,height);
    let l = random(20,50)
    let v = new vector(sx,sy,l,angle,'');
    startScreenVecs.push(v);
    startScreenAngs.push(random(0,2*PI));
  }
  
  for (let i=0;i<questions.length;i++){
    questions[i].load_key(vectors);
  }
  currentquestion.load_key(vectors);

  tutorialBoxLabel = createElement(
    'label',
    `<input id="toggle" type="checkbox" />
     <span class="slider round"></span>`
  );
  
  tutorialBoxLabel.addClass('switch');
  tutorialBox = select('#toggle')

  
  gameModeSelect = createSelect();
  gameModeSelect.option('Study');
  gameModeSelect.option('Score');
  gameModeSelect.option('Test');
  gameModeSelect.selected('Score');
  gameModeSelect.style('font-family: VT323');
  gameModeSelect.style('font-size: 20px');
}

function draw() {
  background(85,107,47);

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

  
  if (levelcomplete){
    checkans_button.hide();
    name.hide();
    hint_button.hide();
    time_button.hide();
    heart_button.hide();
    ireleased = true;
    name_flag = false;
    isActive = false;
    playerFeedback = '';
    if (winCounter==0){
      questionIX.splice(iqi,1);
    }

    push();
    fill(0);
    strokeWeight(4);
    stroke(0);
    rect(width/5-6,height/6+6,3*width/5,height/2,43);
    fill(255);
    stroke(64,79,36)
    rect(width/5,height/6,3*width/5,height/2,40);
    pop()
    
    push();
    textSize(40);
    textStyle(BOLD);
    fill(0)
    text('Level Complete!', 200-2, 150+2);
    fill(64,79,36)
    text('Level Complete!', 200, 150);
    pop();
    
    let score = gameTIMER*PLAYER.health*level;

    let soundCheck = [2,4,6,14,16]
    for (let i=0; i<soundCheck.length; i++){
      if (winCounter==15*soundCheck[i]){
        scorePointSound.play();
      }
    }

    
    push();
    textFont('VT323')
    textStyle(BOLD);
    textSize(18);
    let dispspeed = 15;
    if (winCounter>dispspeed){
      text("Seconds Remaining: ", 200, 200);
    }
    if (winCounter>3*dispspeed){
      text("Hearts Remaining:", 200, 225);
    }
    if (winCounter>5*dispspeed){
      text("Level Multiplier:", 200, 250);
    }
    if (winCounter>7*dispspeed){
      text("Level Score:", 200, 275);
    }
    if (winCounter>14*dispspeed){
      text('Cash Earned:',200,300);
    }
    textStyle(NORMAL);
    if (winCounter>2*dispspeed){
      text(nf(gameTIMER), 400, 200);
    }
    if (winCounter>4*dispspeed){
      text(nf(playerHealth), 400, 225);
    }
    if (winCounter>6*dispspeed){
      text(nf(level), 400, 250);
    }
    if (winCounter>8*dispspeed){
      let dispscore = round((winCounter-8*dispspeed)*score/(6*dispspeed));
      dispscore = min(dispscore,score);
      text(dispscore, 400, 275);
    } 
    let cashEarned = score/100.0;
    if (winCounter>16*dispspeed){
      text('$'+nf(cashEarned,0,2),400,300);
    }
    if (winCounter>18*dispspeed){
      print(questionIX.length);
      if (questionIX.length>0){
        nextlevel_button.position(400, 325);
        nextlevel_button.show();
      } else {
        textStyle(BOLD);
        textSize(24);
        text('Game Complete!',200,300);
        gameover_button.position(400,375);
        gameover_button.show();
      }
    }
    pop();
    if (winCounter==0){
      PLAYER.money+=cashEarned;
    }
    winCounter++;
    
  } else if (gameover){
    // Hide DOM
    nextlevel_button.hide();
    checkans_button.hide();
    hint_button.hide();
    time_button.hide();
    name.hide();
    heart_button.hide();

    push();
    fill(0);
    strokeWeight(4);
    stroke(0);
    rect(width/5-6,height/6+6,3*width/5,height/3,43);
    fill(255);
    stroke(64,79,36)
    rect(width/5,height/6,3*width/5,height/3,40);
    pop()
    
    push();
    textSize(40);
    textStyle(BOLD);
    textAlign(CENTER,CENTER)
    fill(0)
    text('Game Over!', width/2-2, 150+2);
    fill(64,79,36)
    text('Game Over!', width/2, 150);
    pop();
    
    gameover_button.position(width/2-50,225);
    gameover_button.show()
    
  } else if (levelplaying){
    push();
    fill(255,255,255,255);
    stroke(0);
    strokeWeight(3);
    rect(20,20,width-40,height-40,20);
    pop();

    if (PLAYER.health==0 || gameTIMER==0){
      gameover = true;
    }
    
    // Hide DOM
    nextlevel_button.hide();
    gameover_button.hide();
    
    // Show DOM
    checkans_button.show();
    if (currentquestion.hints.length>0 && PLAYER.money>=hintCost){
      hint_button.show();
    } else {
      hint_button.hide();
    }
    if (PLAYER.money>=timeCost){
      time_button.show();
    } else {
      time_button.hide();
    }
    if (PLAYER.money>=heartCost){
      heart_button.show();
    } else {
      heart_button.hide();
    }
    
    // Show Problem
    image(imgs[ii], 40,height-imgs[ii].height-25);
    push();
    textFont('Calibri');
    textSize(16);
    textWrap(WORD);
    textLeading(14);
    text(questions[iq].description, 30, height/2+15,width/2-60);
    pop();
    
    push();
    fill(85,107,47);
    stroke(0);
    strokeWeight(2);
    rect(20,20,width/2-20,height/2-20,20)
    pop();
    
    if (frameCounter % 60 == 0 && gameTIMER>0){
      gameTIMER--;
    }

    push();
    textFont('VT323')
    textStyle(BOLD);
    text("Level: ",30,40);
    text("Time Remaining:",30,65);
    text("Health:",30,90)
    text("Credits:",30,115);
    if (PLAYER.currentHints.length>0){
      text("Hints:",30,140);
    }
    textStyle(NORMAL)
    text(nf(level),150,40);
    text(nf(gameTIMER),150,65);
    text('$'+nf(PLAYER.money,0,2),150,115);
    textWrap(WORD)
    textSize(16);
    text(playerFeedback,width/2+20,height/2-20,width/2-40);
    pop();
    
    if (PLAYER.currentHints.length>0){
      let hintText = ''
      for (let i = 0; i<PLAYER.currentHints.length;i++){
        hintText += nf(i+1);
        hintText += '. '
        hintText += PLAYER.currentHints[i];
        hintText += '\n'
      }
      push();
      textWrap(WORD);
      textLeading(12)
      textSize(16);
      text(hintText,75,128,width/2-75);
      pop();
    }
    
    for (let i = 0; i<PLAYER.health; i++){
      image(heartImage,150+i*30,77.5);
    }
    
    push();
    textFont('VT323')
    text('Click on arrows above to add to FBD below.', width/2+50, height/2-100);
    pop();
    for (let i = 0; i<vectors.length; i++){
      vectors[i].show();
    }
    
    if (name_flag){
      push();
      textStyle(BOLD)
      text('Label Vector:', width/2+25,height/2+40);
      pop();
    }

    push();
    fill(0);
    circle(3*width/4,3*height/4,10);
    pop();
    isActive = false;
    for (let i =0; i<vectors.length; i++){
      let dx = abs(mouseX-(vectors[i].r.x + vectors[i].v.x/2));
      let dy = abs(mouseY-(vectors[i].r.y + vectors[i].v.y/2));
      if ((dx<Npos/2) && (dy<Npos/2) && (ireleased) &&(!name_flag)){
        vectors[i].active = true;
        isActive = true;
        i_active = i;
      } else {
        vectors[i].active = false;
      }
      vectors[i].show();
    }
    frameCounter++;
  } else if (startMenu){

    push();
    fill(0);
    strokeWeight(4);
    stroke(0);
    rect(width/5-6,height/6+6,3*width/5,height/2,43);
    fill(255);
    stroke(64,79,36)
    rect(width/5,height/6,3*width/5,height/2,40);
    pop()

    push();
    textFont('VT323');
    textStyle(BOLD);
    textSize(60);
    textAlign(CENTER,CENTER);
    let tx = width/2;
    let ty = height/4;
    fill(0);
    text("Free Body Diagram:",tx-3,ty+3);
    fill(64,79,36);
    text("Free Body Diagram:",tx,ty);
    ty+=60;
    fill(0);
    text("THE GAME",tx-3,ty+3);
    fill(64,79,36);
    text("THE GAME",tx,ty);
    pop();

    push();
    textFont('VT323')
    textStyle(BOLD)
    textSize(20)
    text('Select Mode:', width/4,height/4+130);
    text('Start w/ Tutorial?:', width/4,height/4+170);
    tutorialBoxLabel.position(width/4+200,height/4+150);
    tutorialBoxLabel.show();
    gameModeSelect.position(width/4+200,height/4+115);
    gameModeSelect.show();
    pop()

    start_button.position(width/2-40,height/2+50);
    start_button.show();

    nextlevel_button.hide();
    checkans_button.hide();
    hint_button.hide();
    time_button.hide();
    name.hide();
    heart_button.hide();
  }
}

function mousePressed() {
  if (levelplaying){
    if ((i_active<(2*Nang)) && (!name_flag) && (isActive)){
      vectorSelectSound.play();
      let avec = new vector(3*width/4,3*height/4,vectors[i_active].vmag,vectors[i_active].theta);
      vectors.push(avec);
      studans.push(avec);
      i_active = vectors.length-1;
      name_flag = true;
      ireleased = false;
    } else if ((ireleased) && (!name_flag) && (isActive)) {
      vectorDeselectSound.play();
      let ai = studans.indexOf(vectors[i_active]);
      studans.splice(ai,1)
      vectors.splice(i_active,1);

      name_flag = false;
      ireleased = true;
    }
  }
}

function touchStarted() {
  if (levelplaying){
    if ((i_active<(2*Nang)) && (!name_flag) && (isActive)){
      vectorSelectSound.play();
      let avec = new vector(3*width/4,3*height/4,vectors[i_active].vmag,vectors[i_active].theta);
      vectors.push(avec);
      studans.push(avec);
      i_active = vectors.length-1;
      name_flag = true;
      ireleased = false;
    } else if ((ireleased) && (!name_flag) && (isActive)) {
      vectorDeselectSound.play();
      let ai = studans.indexOf(vectors[i_active]);
      studans.splice(ai,1)
      vectors.splice(i_active,1);

      name_flag = false;
      ireleased = true;
    }
  }
}

function mouseReleased(){
  if (levelplaying){
    if (mouseY<400){
    if (name_flag){
      name.position(width/2+150,height/2+25);
      name.show();
      ireleased = false;
    } else {
      name.hide();
      ireleased = true;
    }
    }
  }
}

function touchEnded(){
  if (levelplaying){
    if (mouseY<400){
    if (name_flag){
      name.position(width/2+150,height/2+25);
      name.show();
      ireleased = false;
    } else {
      name.hide();
      ireleased = true;
    }
    }
  }
}

function keyPressed(){
  if (levelplaying){
    if (keyCode==ENTER) {
      name.hide();
      name.value('');
      ireleased = true;
      name_flag = false;
    }
  }
}
