# Contents

   * [Testing User Stories](#Testing-User-Stories)
   * [Validators](#Validators)
   * [Testing Features](#Testing-Features)
        * [Navigation](#Navigation)
        * [Game Functions](#Game-Functions)
        * [Social Media Links](#Social-Media-Links)
        * [Buttons and Solutions Functions](#Buttons-and-Solutions-Functions)
        * [Alerts](#Alerts)
        * [Score Counter](#Score-Counter)
        * [404 Page](#404-Page)
   * [Site Responsiveness](#Site-Responsiveness)
   * [User Testing](#User-Testing)
   * [Known Bugs and Issues](#Known-Bugs-and-Issues)
   * [Further Testing](#Further-Testing) 

## Testing User Stories

### Test Case 1.

1. As a first time user I want to play a game with intuitive UX design

**Description**
Verify that the game's UX is intuitive.

**Steps**
1. Open one's internet browser of choice.
2. Navigate to [https://motherfolklore.herokuapp.com/](https://motherfolklore.herokuapp.com/)
3. A modal will appear offering the user the choice to read gameplay instructions or begin the game.
4. If the user selects the "How to Play" button a modal with a list of game play instructions appears and also a button to start the game.
5. Once the user has selected the start game button a modal will appear to ask the user to select the gender of their character. 
6. Once the character has been selected game play will begin.
7. These options are also available in the navigation bar for ease of use.

**Expected Result:**
The user will navigate to the site's gameplay with ease.

**Actual Result:**
The user can navigate to the site's gameplay with ease.

**Pass/Fail:**
Pass

**Image of Test Result:** 

<img src="assets/doc-images/modal1.png" width="450" height="250" alt="modal1">

<img src="assets/doc-images/modal2.png" width="450" height="250" alt="modal2">

<img src="assets/doc-images/modal4.png" width="450" height="250" alt="modal4"> 


        
### Test Case 2.

2. As a first time user I want to play a game thematically inspired by retro games.

**Description**
Verify that the game is inspired by retro games.

**Steps**
1. Open one's internet browser of choice.
2. Navigate to [https://motherfolklore.herokuapp.com/](https://motherfolklore.herokuapp.com/)
3. A modal will appear offering the user the choice to read gameplay instructions or begin the game.
4. Observe the retro style graphics and game play that have been implemented to fulfill this task. 
5. Observe the custom audio that has been implemented to further enhance the retro feel of the game. 


**Expected Result:**
The user will be presented with a game that has a similar gameplay and aesthetic to that of retro games.

**Actual Result:**
The user is presented with a game that has a similar gameplay and aesthetic to that of retro games.

**Pass/Fail:**
Pass


### Test Case 3.    

3.  As a first time user I want a fun medieval style platform game.

**Description**
Verify that the game is a platform game with a medieval style and aesthetic.

**Steps**
1. Open one's internet browser of choice.
2. Navigate to [https://motherfolklore.herokuapp.com/](https://motherfolklore.herokuapp.com/)
3. Begin gameplay.
4. Observe the medieval dungeon setting coupled with the medieval wizard characters. 
5. Observe the platform format in which the game has been presented.
6. Observe the custom audio designed to complement this game thematically.

**Expected Result:**
The user will be presented with a platform game with a medieval style and aesthetic.

**Actual Result:**
The user is presented with a platform game with a medieval style and aesthetic.

**Pass/Fail:**
Pass

**Image of Test Result:** 

<img src="assets/doc-images/cowbell.gif" width="600" height="400">


### Test Case 4. 

4. As a returning user I want to beat the game quicker than my last attempt.

**Description**
Verify that the user has the option of replaying the game.

**Steps**
1. Open one's internet browser of choice.
2. Navigate to [https://motherfolklore.herokuapp.com/](https://motherfolklore.herokuapp.com/)
3. Begin gameplay.
4. Continuing playing the game for as long as desired


**Expected Result:**
The user will be able to play the game as much as they wish.

**Actual Result:**
The user is able to play the game as much as they wish.

**Pass/Fail:**
Pass


    
### Test Case 5.

5. As a user I want the option to select the gender of my character.

**Description**
Verify that the user has the option of selecting the gender of their character.

**Steps**
1. Open one's internet browser of choice.
2. Navigate to [https://motherfolklore.herokuapp.com/](https://motherfolklore.herokuapp.com/)
3. Click the 'Start Game' button
4. Choose the gender of your character in the pop up modal.


**Expected Result:**
The user will be able to select the gender of their character.

**Actual Result:**
The user is able to select the gender of their character.

**Pass/Fail:**
Pass

**Image of Test Result:** 

<img src="assets/doc-images/modal4.png" width="450" height="250" alt="modal4"> 


### Test Case 6
  
6. As a user I want a game with fun, unique audio. 

**Description**
Verify that the game has it's own custom unique audio.

**Steps**
1. Open one's internet browser of choice.
2. Navigate to [https://motherfolklore.herokuapp.com/](https://motherfolklore.herokuapp.com/)
3. Begin gameplay.
4. Observe the custom audio designed to complement this game thematically.

**Expected Result:**
The user will be presented with a platform game with it's own custom audio.

**Actual Result:**
The user is presented with a platform game with it's own custom audio.

**Pass/Fail:**
Pass



## Validators
* All Javascript code was passed through the [JShint](https://jshint.com/) validator with little to no issues with the exception of 'let', 'const' and template literals being available in ES6 and the '$' being recognised as an unused variable. Screenshots of the results of these files can be found below:

    - [quiz.js validator results](documentation/doc-images/jShintquestions.png)

    - [main.js validator results](documentation/doc-images/jShintMain.png)

    - [email.js validator results](documentation/doc-images/emailJsjshint.png)

* All HTML passed through the prescribed [W3C validator](https://validator.w3.org/) with no issues. Screenshots of the results of these files can be found below:

    - [index.html validator results](documentation/doc-images/index-validator.w3.png)

    - [contact.html validator results](documentation/doc-images/contact-validator.w3.png)

    - [404.html validator results](documentation/doc-images/404-validator.w3.org.png)

* All CSS passed through the prescribed [Jigsaw CSS validator](https://jigsaw.w3.org/css-validator/) with no issues. A screenshot of the results can be found below:

    - [CSS validator results](documentation/doc-images/jigsaw.w3.png)



## Testing Features

 ### Navigation 
 
 <img src="documentation/doc-images/CPEatag.png" height="100" width="200">

  <img src="documentation/doc-images/CPEhome.png" height="70" width="150">

   * On the home page click the "Child's Play English" header on the top left corner to navigate to the home page.
   * On the contact page click the "Child's Play English" header on the top left corner to navigate to the home page.
   * On the 404 page click the "Child's Play English" header on the top left corner to navigate to the home page.
   * Alternatively click "Home" on the top right corner to navigate to the home page on the home page, contact page and      404 page.
   * On the home page, contact page and 404 page click "Contact/About" to navigate to the contact page. On mobile this can   be selected from the dropdown menu.
   * Testing was done to ensure all Navigation features functioned as expected at the time of submission.

 ### Game functions



 ### Social Media links

 

 ### Buttons and Solutions Functions
 * When the home button on the 404 page has been selected, ensure that the user is immediately brought back to the home page.
 * Testing was done to ensure all solution buttons functioned as expected and triggered the correct functions at the time of submission. 
 *  Testing was done to ensure the home button on the 404 page functioned as expected at the time of submission.

 ### Alerts
 * Testing was done to ensure the correct alert appeared after a user clicked a solutions and that all alerts functioned as expected at the time of submission.

 ### Score Counter
 * When a correct answer has been clicked, ensure that the numbers on the score counter move accordingly.
 * Testing was done to ensure the score counter moved accordingly during the quiz and fucntioned as expected at the time of submission.

 ### 404 Page
 * Ensure that there is a functioning 404 page that allows users to navigate back to the home page.
 * Testing was done to ensure that there was a functioning 404 page that allowed the user to easily navigate back to the home oage at the time of submission.


## Site Responsiveness
* The website was primarily tested on the following devices:

    - Hp Pavilion g series laptop
    - Samsung A10

* Other devices used for site testing include:

    - HP 250 G6 Notebook PC 
    - Huawei P smart 2020
    - Iphone SE
    - Samsung A70

* Other tests performed to determine site responsiveness were conducted using google Dev Tools in order to view the site on a variety of devices. The [Am I Responsive](http://ami.responsivedesign.is/) website was also used to test the visual presentation of the site on different devices. 


## User Testing
* The site was also tested by members of the Slack community in the peer-code-review channel who pointed out that the desktop version had an unnecessary scroll feature to find the question buttons and also that the footer links did not open in a new tab. These issues have since been resolved. 



## Known Bugs and Issues

* When the random quiz function was first implemented it did not handle repeat questions effectively at all. With some guidance from my classmate Kotaro Tanaka I was able to effectively tackle this issue with the following code.

        - if (!usedQuestions.includes(randomQuestion)) { 
		console.log(randomQuestion);
		usedQuestions.push(randomQuestion); 
	    } else {
		randomQuiz();
	    }

This code was inserted into the randomQuiz function and, along with the usedQuestions array, effectively prevented questions repetition. However when this code was implemented it created a new issue. The food question array stopped calling the else if (questionCount == 12) statement of the checkSolutions function and displayed the questionCount numbers in the console on an infinite loop and stopped handling user interactions effectively. After using the debugger tool in google dev tools with the help of tutor support it was discovered that the askQuestion function that was being called inside the chooseObjectQuiz and chooseFoodQuiz functions and this was causing extra questions to be called and discarded before a question was displayed in the DOM. This caused the foodQuestions bank to be less than the required 12 questions needed to call the else if (questionCount == 12) statement of the checkSolutions function. The askQuestion function was removed from these two functions and the problem was resolved. 

## Further Testing

* Testing was performed in the following browsers on both laptop and mobile devices:
    - Google Chrome

    - Mozilla Firefox

    - Opera 

    - Microsoft Edge

    No issues were detected in any of these browsers at the time of submission.


    The below image is an example result of lighthouse testing performed on the index page for desktop with every other test achieving similar results. The lighthouse tool found in Google Dev Tools was used repeatedly throughout the building of the project and was essential in discovering and resolving the issues described below. A lighthouse test was performed on both mobile and desktop for each individual page on the site with links to the full reports of each of these tests found below. The lighthouse tool tested each of the following criteria: performance, accessibility, best practices and SEO of each individual page in both mobile and desktop. Each test resulted in a score of 90 or above for desktop criteria and 70 or above for mobile criteria.

    <img src="documentation/doc-images/lighthouseMS2.jpg" width="600" height="250">

    [Lighthouse Desktop Index page results](documentation/doc-images/indexlightMS2desktop.pdf) |
    [Lighthouse Mobile Index page results](documentation/doc-images/indexMS2lightmobile.pdf)

    [Lighthouse Desktop Contact page results](ddocumentation/doc-images/contactlightMS2desktop.pdf) | 
    [Lighthouse Mobile Contact page results](documentation/doc-images/contactlightMS2mobile.pdf) 