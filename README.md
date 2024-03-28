# Free Body Diagram: The Game

# Table of Contents
1. [Overview](#1.-overview) 
2. [Game Modes](#2.-game-modes) 
    1. [Study Mode](#i.-study-not-yet-coded)
    2. [Score Mode](#ii.-score)
    3. [Test Mode](#iii.-test-not-yet-coded)
3. [How to Play](#3.-how-to-play) 
    1. [Progress Panel](#i.-progress-panel-top-left)
    2. [Question Panel](#ii.-question-panel-lower-left)
    3. [Vector Panel](#iii.-vector-panel-upper-right)
    4. [FBD Panel](#iv.-fbd-panel-lower-right)
4. [Brightspace/D2L Integration](#4.-brightspace/d2l-integration)
5. [Creating a Custom Question](#5.-creating-a-custom-question)
6. [Credits](#6.-credits)
7. [To-do Lists](#7.-to-do-lists)


# 1. Overview
*Free Body Diagram: The Game* is an educational game designed to help students create free body diagrams for simple statics & dynamics problems. It was designed for a university-level, introductory Physics class, *PHYC1310: Physics In \& Around You I* offered at Dalhousie University every Fall semester. It may be suitable for high school students, too, depending on the curriculum. This game was written in p5.Js as a final project for the *Gamification and Game-Based Learning* studio course led by Dr Kate Thompson. Many of the game elements & aspects of design are owed to the recommended readings in that course. 

The express intention of this software is to make learning statics & dynamics, well... fun! The ability to create a useful free body diagram (FBD) is a fundamental learning objective in the introductory physics curriculum. While it should be the first step in solving any statics & dynamics problem, students often don't practice this technique enough on their own. Unfortunately, this often leads to ill-formed expressions of Newton's Laws and unphysical calculations of desired quantities. This software attempts to address this issue, by including a large \# (currently... 7... but more coming) of basic dynamics \& statics scenarios which test their understanding of the following forces:
- weight, $\vec{F_g}$ or $\vec{w}$ 
- tension, $\vec{F_T}$ or $\vec{T}$
- normal, $\vec{F_N}$ or $\vec{n}$
- friction, $\vec{f_s}$ or $\vec{f_k}$

as well as generic forces of interaction between objects,e.g. $\vec{F_{B on C}}$. By offering students a sandbox to practice this fundamental skill, students will be better able to tackle even more challenging problems in the Physics curriculum.

In the present release, each level requires the student to create a valid FBD based on a visual aid and written prompt. Future releases will add levels in which the student is given a completed FBD and must construct a correct expression of Newton's 1st or 2nd law along the y- or x-axis based on a selection of magnitudes, signs, and trigonometric functions.

To encourage different levels & styles of play, the software currently has three game modes. In *Study*, the student is given many hints & can take as many attempts at a solution in as much time as they wish. In *Score*, students can shoot for a high score in an arcade-style test of their abilities. Finally, students keen on acing their upcoming statics exam can enter the timed *Test* mode, which provides no hints & provides just one attempt per question. These game modes are described in more detail below.

Want to try it out? Play the current build here:
https://hartery5.github.io/FBDGame/

# 2. Game Modes
From the main menu, a student can select one of three modes. For a description of gameplay, see "How to Play".

**N.B.: currently "Score" mode is entered regardless of selected option**.

## i. Study (not yet coded)
This mode is intended for students who just want to use the game as a learning tool. They will incur no penalties, are not restricted by time limits, and will have all hints available to them.

## ii. Score
This mode is intended for students who want to compete for a high score! The student begins the game with 5 health, $10, and a 120 s time limit per question. For each level that the student completes, they will earn the student cash. Cash can be used to purchase health, hints, or time on subsequent levels. The game is over once the student's health reaches zero, or they complete all available questions. Upon reaching the game over screen, the student is prompted to post their high score (optional).

**N.B.: A basic leader board is on my to-do list. A local JSON file... that gets updated? Maybe??**

#### a. Health
Each incorrect answer diminishes the student's health by one. Health can be replenished via the mini-store at a cost of $5 per heart. Health carries over from level to level.

#### b. Hints
Hints can be purchased for $1 each and will be displayed immediately. Hints do *not* carry over from level to level.

#### c. Time
The student initially begins with 120 seconds to complete the first level. After each level is completed, the time limit of the subsequent level will be 10 seconds less than the previous, until level 10 is reached. All subsequent levels beyond level 10 will have a time limit of 20 seconds. Additional time can be purchased for $0.50 in 30-second increments. Additional time purchased only applies to the current level.

## iii. Test (not yet coded)
This mode is intended for students who want to simulate the test environment. In this mode, the time limit is fixed per question and cannot be extended. The student is given one attempt per question, with feedback letting the student know if they were correct or not. After 10 random questions, the student's "grade" is displayed. The letter grade follows Dalhousie's Common Undergraduate Grade Scale: 
https://www.dal.ca/campus_life/academic-support/grades-and-student-records/grade-scale-and-definitions.html

# 3. How to Play
Once the game mode is selected, the student can initiate the game via the "Start!" button. The first level will begin immediately unless "Start w/ Tutorial" is selected. The tutorial will essentially walk the student through the following description of the game screen. 

**N.B: coding the tutorial is still on my to-do list.**

The game screen is divided into 4 quadrants:

## i. Progress Panel (top left)
The contents of the progress menu depend on which mode the student selected:

#### a. Study Mode
The current level and all hints are displayed.

#### b. Score Mode
The current level, timer, student health, and student cash are displayed. Hints will appear as they are purchased. At the bottom of the progress menu are buttons to purchase Hints, Time, or Health. They will only display if a student has enough cash.

#### c. Test Mode
The current level, timer, and student health are displayed.

## ii. Question Panel (lower left)
The prompt consists of a visual aid and a verbal prompt. The visual aid will indicate the direction of net acceleration (if the object is accelerating), any known forces, and labels for objects when necessary. The prompt will further explain whether certain forces are already known, whether friction can be ignored, whether gravity can be ignored (e.g. massless pulleys), and which object the student should make an FBD for.

## iii. Vector Panel (upper right)
Based on the question prompt, the student must use the vector roses in the top right-hand of the screen to add forces to the FBD in the bottom right corner of the screen. Every time a student selects a vector, they MUST enter a name for the force before selecting another vector.

## iv. FBD Panel (lower right)
A display of the current FBD constructed by the student. Once the student is ready to submit their answer, they can click "Submit!". If correct, the game will transition to the Level Complete screen, otherwise generic feedback will be given.

# 4. Brightspace/D2L Integration
Instructors wishing to locally integrate this into their Brightspace/D2L page can do so as follows:

1. Pull the repository to make a local copy on your computer.
2. On the Brightspace/D2L page for your course, navigate to Course Admin.
3. From the Course Admin menu, select "Manage Files".
4. Upload the repository to your course files.

You can now create a local link to the game anywhere in the Content section of your course page.

1. After clicking the Upload/Create button, select "Add from Manage Files" from the sub-menu that appears.
2. Use the file viewer to navigate inside the FBDGame folder.
3. Select "index.html".

A link to the game will now be displayed wherever you decided to place it, with the unattractive title "index.html". I recommend renaming it to "FBD Game".

Note: I am investigating ways to collect & store user data (play time, best score, etc.). Currently, I'm not sure how to do this. So, you'll have to use D2L's native features to track use of the game.

# 5. Creating a Custom Question
Adding to the question library currently involves manually editing sketch.js. This is tedious, terrible coding practice, and lots can go wrong, so you should be confident debugging JavaScript code. At some stage, I will implement a better way to do this.

## i. Designing a Question
You are restricted to FBDs that can be drawn with the vector roses displayed, so carefully think of questions that can be answered using only these vectors. The larger vector rose is a scaled version of the smaller rose by a factor of $\sqrt{2}$ for the obvious purpose of having the larger rose's vectors at 45 degrees being the sums of the smaller rose's horizontal and vertical vectors.

Solution vectors are indexed **COUNTER-CLOCKWISE** starting with the vector at 0º:
Small vectors: 0 - 7 (inclusive)
Large vectors: 8 - 15 (inclusive)

e.g., gravity should be represented as the vector 2 or 10.

Your question prompt should be brief and to the point, so try to communicate as much information visually as possible. Make sure to specify the system that the student must analyze in the last sentence: "Draw a FBD of **X**".

Consider what hints would be helpful for the question. Try not to make these too long, otherwise you will run into display errors.

Your image should ideally be 350 px × 200 px to avoid any re-sizing issues. JPEG file format is recommended, but static GIFs are permitted, too.

## ii. Coding a Question
1. Place the image in the assets/img folder.
2. In the preLoad() function of sketch.js add the image to the end of the imgs array by adding the following line AFTER all previously defined images:
```
imgs[imgs.length] = loadImage('assets/img/NAME_OF_IMAGE.FILETYPE')
```
4. In the setup() function of sketch.js, add the following lines after all questions have been defined, replacing X with whichever whole number comes after the last defined question:
```
questionX = new question('NAME_OF_IMAGE.FILETYPE',
                          'Written prompt',
                          Array of Solutions,
                          ['Your Custom Hint 1',
                          'Your Custom Hint 2', ...]);
questions.push(questionX);
```
The Array of Solutions is formatted as follows:
```
[[sol1_index1,sol1_index2,...],[sol2_index1,sol2_index2,...],...]
```
The indices should match the vectors from the vector roses described earlier. Multiple arrays are needed as multiple solutions are possible. For instance, a person sliding a block across a frictionless floor leading to a constant acceleration to the right would have a solution array:
```
[[0,2,6],[0,10,14],[8,2,6],[8,10,14]]
```
In the case of a problem with one solution, e.g. a person sliding a box at constant speed across a floor with friction, the array of solutions must still be an array of arrays:
```
[[0,4,10,14]]
```
Why only code one solution for this problem? We typically teach students that $0\lt\mu\lt1$, so I wouldn't want to accept a solution where $|\vec{F_n}|=|\vec{f_k}|$, e.g.:
```
[[0,2,4,6]]
```

# 6. Credits
The current repository ships with images created by LON-CAPA:
https://www.lon-capa.org/index.html
"The LON-CAPA software is freely available and free (GNU General Public License), and may be modified and adapted. under a GNU Public license."
https://s10.lite.msu.edu/adm/help/What_Is_LON-CAPA.hlp#What_Is_LON_CAPA

These will slowly be replaced, mostly due to issues resizing. All other assets were created by Sean Hartery.


# 7. To-do Lists
### i. Important, low-hanging fruit
1. Add more questions. Minimum 20 should be available.
2. Actually code *Test* mode and *Study* mode.
3. Add a leaderboard.
4. Replace images from LON-CAPA with custom images that fit the size available (transparent background might be nice, but this might be PNG?? memory-intensive??).

### ii. Important, high-hanging fruit
1. In study mode, allow student to view question library and select a question to study from that list.
2. Rank the difficulty of questions, so that more difficult questions don't show up until level 5 in Score mode.
3. Create new type of level which requires students to express N<sup>1</sup>L or N<sup>2</sup>L along the x or y axis. I am imagining this Duolingo-style, i.e. getting the student to drag vector magnitudes, signs, and trig functions from a word cloud down to an entry line. This seems... hard?


### iii. Not so important fruit
1. Write different music for different modes.
2. Different color schemes for different modes.
3. Add screenshots to markdown for clarity.
