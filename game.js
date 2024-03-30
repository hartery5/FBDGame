class game {playerfeed
    constructor(){
        this.mode = 'Score';
        this.gameOver = false;
        this.startMenu = true;
        this.levelPlaying = false;
        this.levelComplete = false;
        this.level = 1;
        this.timerMAX = 120;
        this.timer = this.timerMAX;
        this.frameCounter = 0;
        this.buttons = [];
        this.questions = [];
        this.vectors = [];
        this.imgs = [];
        this.hintCost = 1;
        this.heartCost = 5;
        this.timeCost = 0.50;
        this.currentQuestion;
        this.questionIndexIndex = 0;
        this.questionIndex = 0;
        this.questionIndices = [];
        this.playerFeedback = '';
        this.winCounter = 0;
        this.testNumberOfQuestions = 10;
        this.resp='';
        this.numCorrect=0;
        this.numberAnswered=0;
        this.BKGDcolor = color(85,107,47);
        this.FONTcolor = color(65,87,27);
        this.mute = true;
    }

    loadQuestions(questions){
        this.questions = questions;

        this.questionIndices = [];
        for (let i = 0; i < this.questions.length; i++){
            this.questionIndices.push(i);
        }
    }

    loadButtons(buttons){
        this.buttons = buttons;
    }

    loadVectors(vectors){
        this.vectors = vectors;
    }

    loadImages(imgs){
        this.imgs = imgs;
    }

    selectQuestion(){
      // This might seem weird, but I don't want to tamper with question & image array once formed.
      // Instead, this allows me to keep track of questions not yet answered in questionIndex and slice
      // this array as students complete question. This is mainly to avoid re-loading assets.
      this.questionIndexIndex = int(random(0,this.questionIndices.length));
      this.questionIndex = this.questionIndices[this.questionIndexIndex];
      this.questionIndex = 2;
      this.currentQuestion = this.questions[this.questionIndex];
      if (this.mode=='Study'){
        PLAYER.currentHints = this.currentQuestion.hints;
      } else {
        PLAYER.currentHints = [];
      }
    }

    update(){
        if (this.startMenu){
            this.showStartMenu();
        } else if (this.levelPlaying){
            this.showLevel();
        } else if (this.levelComplete){
            this.showLevelComplete();
        } else if (this.gameOver){
            this.showGameOver();
        }
    }

    showGameOver(){
        // Is this going to glitch gameover button? May have to hide all buttons except this one
        this.hideButtons();

        push();
        fill(0);
        strokeWeight(4);
        stroke(0);
        rect(width/5-6,height/6+6,3*width/5,height/3,43);
        fill(255);
        stroke(this.BKGDcolor)
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
        gameover_button.show();
    }

    showLevel(){
        if (this.mode == 'Score'){
          if (PLAYER.health==0 || this.timer==0){
            this.gameOver = true;
            this.levelPlaying = false;
            return
          }
        } else if (this.mode == 'Test'){
          if (this.timer==0){
            this.gameOver = true;
            this.levelPlaying = false;
            return
          }
        }
        
        // Hide DOM
        this.hideButtons();

        // Level BKGD
        push();
        fill(255,255,255,255);
        stroke(0);
        strokeWeight(3);
        rect(20,20,width-40,height-40,20);
        pop();

        // Display Progress Panel
        this.displayProgressPanel();
        
        // Show DOM
        checkans_button.show();

        // Show Problem
        image(this.questions[this.questionIndex].img, 40,height-this.questions[this.questionIndex].img.height-25);
        push();
        textFont('Calibri');
        textSize(16);
        textWrap(WORD);
        textLeading(14);
        text(this.currentQuestion.description, 30, height/2+15,width/2-60);
        pop();
        
        push();
        textWrap(WORD)
        textSize(16);
        text(this.playerFeedback,width/2+20,height/2-20,width/2-40);
        pop();
        
        push();
        textFont('VT323')
        text('Click on arrows above to add to FBD below.', width/2+25, height/2-80);
        pop();
        for (let i = 0; i<this.vectors.length; i++){
          this.vectors[i].show();
        }

        if (vectorName_flag){
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
        for (let i =0; i<this.vectors.length; i++){
          let dx = abs(mouseX-(this.vectors[i].r.x + this.vectors[i].v.x/2));
          let dy = abs(mouseY-(this.vectors[i].r.y + this.vectors[i].v.y/2));
          if ((dx<Npos/2) && (dy<Npos/2) && (ireleased) &&(!vectorName_flag)){
            this.vectors[i].active = true;
            isActive = true;
            i_active = i;
          } else {
            this.vectors[i].active = false;
          }
          this.vectors[i].show();
        }
        this.frameCounter++;
    }

    displayProgressPanel(){
      // Progress Panel BKGD
      push();
      fill(this.BKGDcolor);
      stroke(0);
      strokeWeight(2);
      rect(20,20,width/2-20,height/2-20,20)
      pop();
  
      switch (this.mode){
        case 'Study':
          this.displayLevel(40);
          this.displayHints(65);
          break;
        case 'Score':
          this.displayLevel(40);
          this.displayTimer(65);
          this.displayHealth(90);
          this.displayCash(115);
          if (PLAYER.currentHints.length>0){
            this.displayHints(140);
          }
          this.displayMiniStore(260);
          break;
        case 'Test':
          this.displayLevel(40);
          this.displayTimer(65);
          break;
      }
    }

    displayCash(displayHeight){
      push();
      textFont('VT323')
      textStyle(BOLD);
      textSize(20);
      text("Credits:",30,displayHeight);
      textStyle(NORMAL)
      text("$"+nf(PLAYER.money,0,2),180,displayHeight);
      pop();
    }

    displayHealth(displayHeight){
      push();
      textFont('VT323')
      textStyle(BOLD);
      textSize(20);
      text("Health:",30,displayHeight)
      for (let i = 0; i<PLAYER.health; i++){
        image(heartImage,180+i*30,displayHeight-12.5);
      }
      pop();
    }

    displayTimer(displayHeight){
      push();
      textFont('VT323');
      textStyle(BOLD);
      textSize(20);
      text("Time Remaining:",30,displayHeight);
      textStyle(NORMAL);
      text(nf(Math.floor(this.timer/60))+':'+nf(this.timer % 60,2),180,displayHeight);
      if (this.frameCounter % 60 == 0 && this.timer>0){
        this.timer--;
      }
      pop();
    }

    displayLevel(displayHeight){
      push();
      textFont('VT323');
      textStyle(BOLD);
      textSize(20);
      text("Level: ",30,displayHeight);
      textStyle(NORMAL);
      text(nf(this.level),180,40);
      pop();
    }

    displayHints(displayHeight){
      push();
      textFont('VT323');
      textStyle(BOLD);
      textSize(20);
      text("Hints:",30,displayHeight);
      pop();
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
      text(hintText,80,displayHeight-14,width/2-75);
      pop();
    }

    displayMiniStore(displayHeight){
      hint_button.position(35,displayHeight);
      time_button.position(155,displayHeight);
      heart_button.position(270,displayHeight)
      if (this.currentQuestion.hints.length>0 && PLAYER.money>=this.hintCost){
        hint_button.show();
      } else {
          hint_button.hide();
      }
      if (PLAYER.money>=this.timeCost){
          time_button.show();
      } else {
          time_button.hide();
      }
      if (PLAYER.money>=this.heartCost){
          heart_button.show();
      } else {
          heart_button.hide();
      }
    }

    showStartMenu(){
        this.mode = gameModeSelect.value();
        switch (this.mode) {
          case 'Study':
            PLAYER.currentHints = this.currentQuestion.hints;
            this.BKGDcolor = color(255, 223, 142);
            this.FONTcolor = color(205, 173, 92);
            break;
          case 'Score':
            this.BKGDcolor = color(87,107,47);
            this.FONTcolor = color(67, 87, 27);
            break;
          case 'Test':
            this.BKGDcolor = color(94,150,195);
            this.FONTcolor = color(74, 130, 175);
          break;
        }
    
        // Not sure why this didn't work. Revisit another time.
        
        for (let i=0;i<this.buttons.length;i++){
          this.buttons[i].style('bakground-color: '+this.BKGDcolor.toString('#rrggbb'))
        }
        
        push();
        fill(0);
        strokeWeight(4);
        stroke(0);
        rect(width/5-6,height/6+6,3*width/5,height/2,43);
        fill(255);
        stroke(this.FONTcolor)
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
        fill(this.FONTcolor);
        text("Free Body Diagram:",tx,ty);
        ty+=60;
        fill(0);
        text("THE GAME",tx-3,ty+3);
        fill(this.FONTcolor);
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
        vectorName.hide();
        heart_button.hide();
    }



    showLevelComplete(){
        this.hideButtons();

        ireleased = true;
        vectorName_flag = false;
        isActive = false;
        this.playerFeedback = '';
    
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
        
        if (this.mode=='Score'){
          let score = this.timer*PLAYER.health*this.level;

     
          push();
          textFont('VT323')
          textStyle(BOLD);
          textSize(18);
          let dispspeed = 15;
          if (this.winCounter>dispspeed){
            text("Seconds Remaining: ", 200, 200);
          }
          if (this.winCounter>3*dispspeed){
            text("Hearts Remaining:", 200, 225);
          }
          if (this.winCounter>5*dispspeed){
            text("Level Multiplier:", 200, 250);
          }
          if (this.winCounter>7*dispspeed){
            text("Level Score:", 200, 275);
          }
          if (this.winCounter>14*dispspeed){
            text('Cash Earned:',200,300);
          }
          textStyle(NORMAL);
          if (this.winCounter>2*dispspeed){
            text(nf(this.timer), 400, 200);
          }
          if (this.winCounter>4*dispspeed){
            text(nf(PLAYER.health), 400, 225);
          }
          if (this.winCounter>6*dispspeed){
            text(nf(this.level), 400, 250);
          }
          if (this.winCounter>8*dispspeed){
            let dispscore = round((this.winCounter-8*dispspeed)*score/(6*dispspeed));
            dispscore = min(dispscore,score);
            text(dispscore, 400, 275);
          } 
          let cashEarned = score/100.0;
          if (this.winCounter>16*dispspeed){
            text('$'+nf(cashEarned,0,2),400,300);
          }
          if (this.winCounter>18*dispspeed){
            if (this.questionIndices.length>0){
              nextlevel_button.position(400, 325);
              nextlevel_button.show();
            } else {
              textStyle(BOLD);
              textSize(24);

              // this needs to move!
              text('Game Complete!',200,300);
              gameover_button.position(400,325);
              gameover_button.show();
            }
          }
          pop();
          if (this.winCounter==0){
            PLAYER.money+=cashEarned;
          }
          this.winCounter++;
        } else if (this.mode=='Test') {
          push();
          textFont('VT323')
          textStyle(BOLD);
          textSize(18);
          text('Current Score:',200,225);
          text('Questions left:',200,250);
          text(nf(this.testNumberOfQuestions-this.numberAnswered),400,250)
          text(nf(this.numCorrect)+'/10',400,225);
          if (this.level<this.testNumberOfQuestions){
            text(this.resp,200,200);
            nextlevel_button.position(400, 325);
            nextlevel_button.show();
          } else {

            textStyle(BOLD);
            textSize(18);
            text('Letter Grade:',200,275);
            let ltr = ''
            if (this.numCorrect>=9){
              ltr = 'A+'
            } else if (this.numCorrect>=8){
              ltr = 'A-'
            } else if (this.numCorrect>=7){
              ltr = 'B-'
            } else if (this.numCorrect>=6){
              ltr = 'C'
            } else if (this.numCorrect>=5){
              ltr = 'D'
            } else {
              ltr = 'F'
            }
            text(ltr,400,275)

            textSize(18);
            // this needs to move!
            text('Pencils Down!',200,300);
            gameover_button.position(400,325);
            gameover_button.show();
          }
          pop();
        } else {
          if (this.questionIndices.length>0){
            nextlevel_button.position(400, 325);
            nextlevel_button.show();
          } else {
            textStyle(BOLD);
            textSize(24);

            // this needs to move!
            text('Game Complete!',200,300);
            gameover_button.position(400,325);
            gameover_button.show();
          }
        }
    }

    hideButtons(){
        for(let i=0; i<this.buttons.length; i++){
            this.buttons[i].hide();
        }
    }
}