# FBDGame
This is an educational game designed to help students create free body diagrams. It was designed for an algebra-based introductory Physics class. It may be suitable for high school students, depending on the curriculum. Want to try it out? Play here: 

https://hartery5.github.io/FBDGame/

## Game Modes
From the main menu, a student can select one of three modes. For a description of gameplay, see "How to Play".

**N.B.: currently "Score" mode is entered regardless of selected option**.

### Study (not yet coded)
This mode is intended for students who just want to use the game as a learning tool. They will incur no penalties, are not restricted by time limits, and will have all hints available to them.

### Score
This mode is intended for students who want to compete for a high score! The student begins the game with 5 health, $10, and a 120 s time limit per question. For each level that the student completes, they will earn the student cash. Cash can be used to purchase health, hints, or time on subsequent levels. The game is over once the student's health reaches zero, or they complete all available questions. The student is then prompted if they wish to post their high score.

#### Health
Each incorrect answer diminishes the student's health, with additional health costing $5. Health carries over from level to level.

#### Hints
Hints can be purchased for $1 each and will be displayed immediately. Hints do not carry over from level to level.

#### Time
After every level is completed, the time limit will decrease by 10 seconds until level 10 is reached. All subsequent levels beyond level 10 will have a time limit of 20 seconds. Additional time can be purchased for $0.50 in 30-second increments. Additional time purchased only applies to the current level.

### Test (not yet coded)
This mode is intended for students who want to simulate the test environment. In this mode, the time limit is fixed per question and cannot be extended. The student is given one attempt per question, with feedback letting the student know if they were correct or not. After 10 random questions, the student's "grade" is displayed. The letter grade follows Dalhousie's Common Undergraduate Grade Scale: 
https://www.dal.ca/campus_life/academic-support/grades-and-student-records/grade-scale-and-definitions.html

## How to Play
Once the game mode is selected, the student can initiate the game via the "Start!" button. The first level will begin immediately unless "Start w/ Tutorial" is selected. The tutorial will essentially walk the student through the following description of the game screen. 

**N.B: coding the tutorial is still on my to-do list.**

The game screen is divided into 4 quadrants:

### Progress Menu (Top Left)
The contents of the progress menu depend on which mode the student selected:

#### Study Mode
The current level and all hints are displayed.

#### Score Mode
The current level, timer, student health, and student cash are displayed. Hints will appear as they are purchased. At the bottom of the progress menu are buttons to purchase Hints, Time, or Health. They will only display if a student has enough cash.

#### Test Mode
The current level, timer, and student health are displayed.

### Question Prompt
The prompt consists of a visual aid and a verbal prompt. The visual aid will indicate the direction of net acceleration (if the object is accelerating), any known forces, and labels for objects when necessary. The prompt will further explain whether certain forces are already known, whether friction can be ignored, whether gravity can be ignored (e.g. massless pulleys), and which object the student should make an FBD for.

### Vector Selection (upper right)
Based on the question prompt, the student must use the vector roses in the top right-hand of the screen to add forces to the FBD in the bottom right corner of the screen. Every time a student selects a vector, they MUST enter a name for the force before selecting another vector.

### FBD (lower right)
A display of the current FBD constructed by the student. Once the student is ready to submit their answer, they can click "Submit!". If correct, the game will transition to the Level Complete screen, otherwise generic feedback will be given.

## Brightspace/D2L Integration
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

## Creating a Custom Question
Adding to the question library currently involves manually editing sketch.js. This is tedious, terrible coding practice, and lots can go wrong, so you should be confident debugging JavaScript code. At some stage, I will implement a better way to do this.

### 1. Design the Question
You are restricted to FBDs that can be drawn with the vector roses displayed, so carefully think of questions that can be answered using only these vectors. The larger vector rose is a scaled version of the smaller rose by a factor of $\sqrt{2}$ for the obvious purpose of having the larger rose's vectors at 45 degrees being the sums of the smaller rose's horizontal and vertical vectors.

Solution vectors are indexed **COUNTER-CLOCKWISE** starting with the vector at 0º:
Small vectors: 0 - 7 (inclusive)
Large vectors: 8 - 15 (inclusive)

e.g., gravity should be represented as the vector 2 or 10.

Your question prompt should be brief and to the point, so try to communicate as much information visually as possible. Make sure to specify the system that the student must analyze in the last sentence: "Draw a FBD of **X**".

Consider what hints would be helpful for the question. Try not to make these too long, otherwise you will run into display errors.

Your image should ideally be 350 px X 200 px to avoid any re-sizing issues. JPEG file format is recommended, but static GIFs are permitted, too.

### 2. Code the Question
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
Why only code one solution for this problem? We typically teach students that $0\lt\mu\lt1$, so I wouldn't want to accept a solution where $\|\vec{F_n}\|=\|\vec{f_k}\|$, e.g.:
```
[[0,2,4,6]]
```

## Credits
The current repository ships with images created by LON-CAPA:
https://www.lon-capa.org/index.html
"The LON-CAPA software is freely available and free (GNU General Public License), and may be modified and adapted. under a GNU Public license."
https://s10.lite.msu.edu/adm/help/What_Is_LON-CAPA.hlp#What_Is_LON_CAPA

These will slowly be replaced, mostly due to issues resizing. All other assets were created by Sean Hartery.



