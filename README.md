# Typing Master

A simple application for improving typing skills. This application gives users the ability to submit blocks of text in any format and then practice typing those blocks and track their progress.

## Installation

1. `git clone`

2. `npm install`

3. `npm start`

## Screenshots


### Main Screen

![Typing Exercise](https://user-images.githubusercontent.com/26190589/26945929-7663794e-4c5b-11e7-90b6-77cb6a3cc90b.png)

### Typing Exercise

![Main Screen](https://user-images.githubusercontent.com/26190589/26945857-3bbc59dc-4c5b-11e7-86d5-5ca3b104641a.png)

## Technologies
- [ReactJS](https://facebook.github.io/react/) - React is a popular framework for handling the view layer of an application.
- [Create React App](https://github.com/facebookincubator/create-react-app) - Boilerplate React project provided by Facebook that includes deployment scripts for testing locally and deploying to Production
- [React Router](https://github.com/ReactTraining/react-router) - Library built with React that handles browser routing and integrates well with other React projects.
- [Material UI](http://www.material-ui.com/#/) - Library that implements Google's Material Design principles in React components.

## Approach

My approach involved a few major steps.

### Step 1

Figure out how to track a user's typing and give validate their answers. I did this using just vanilla javascript and html/css.  No backend or framework involved.

### Step 2

Implement a simple authentication scheme using React and React Router.  This is a requirement for the project so I decided that if I couldnt figure it out quickly, I should just scrap React completely.  Once I realized I could do it, I decided to stick with React and see what happened.

### Step 3

Convert my old vanilla JS/HTML/CSS typing area into the React components.  This part was defintely the hardest. I was still getting used to React and how state works and I had to convert some complicated logic into that state and props when I didn't even really understand what everything meant yet.

### Step 4

Styles!  The most fun part, cleaning up code to make it cleaner and more readable and improving the styling of my application through CSS.


## User Stories
- **Sign Up** - As a user I want to be able to create an account so that I can track my progress
- **Sign In** - As a user I want to be able to sign in so that I can acccess the site
- **Change Password** - As a user I want to be able to change my password so that I can keep my account secure
- **Sign Out** - As a user I want to be able to sign out of my account so that other people cannot access my account from the same browser session
- **Add Exercise** - As a user I want to be able to add blocks of text so that I can practice typing them
- **Update Exercise** - As a user I want to be able to update the exercises I have submitted so that I can fix typos
- **Delete Exercise** - As a user I want to be able to remove exercises in case I dont want to use them anymore
- **See all exercises** - As a user I want to be able to see all available exercises so that I can pick which one I want to practice

## Wireframes

- [Typing Area](https://cloud.githubusercontent.com/assets/26190589/26786300/24db6c32-49d4-11e7-9eba-f705c0db7835.JPG)
- [Authentication Form](https://cloud.githubusercontent.com/assets/26190589/26786342/441ee29a-49d4-11e7-864d-661bccc5ea00.JPG)
- [Exercises](https://cloud.githubusercontent.com/assets/26190589/26786361/56d83350-49d4-11e7-951f-aa8f48151afd.JPG)

## Unsolved Problems

I really wanted to somehow track a user's progress better. Currently the only thing the user has is the leaderboard so they can see where they stack up, but if I had more time I'd like a personalized view of their statistics so they can see if they are improving over time.
