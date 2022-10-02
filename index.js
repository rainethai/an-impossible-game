let points = 0;
let currentQuestion = 0;
let current_user = "";
let workWithThis;
function startQuestions() {
    getQuestion();
    buttonStuff()
};

// increases score by 1 and updates the UI
function increaseScore() {
    points += 1;
    document.getElementById("score").innerHTML = "Score: " + points;
   
}

// posts to the highscores database the user that just completed the quiz and their score
function submitScore(score) {
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/newHighscore";
    call.open("POST", url, true);
    call.setRequestHeader("Content-Type", "application/json", "Access-Control-Allow-Origin", "*");
    
    score = score.toString();
    let toSend = JSON.stringify({user: localStorage.currentperson, score: score});
    console.log(toSend)
    
    // call.setRequestHeader("Content-type", "application/json", "Access-Control-Allow-Origin", "*" );
    call.send(toSend);
    call.onload = () => {
        //console.log((call.response));
    }
}

// calls a new question and if there are no more questions, go to leaderboard functionality
function getQuestion() {
    // increaseScore if button selected with correct: 1
    getID();
    currentQuestion += 1;
    if (currentQuestion > 15) {
        document.location = 'leaderboard.html';
        validateUser(points);
        trackUserHistory();
        getID();
        return;
    }
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/questions/" + currentQuestion
    console.log(url)
    call.open("GET", url)
    call.send();
    call.onload = () => {
        document.getElementById("question").innerHTML = call.response
        // console.log(JSON.parse(call.response))
    }
    getAnswers();
}

// checks for correct answer
function getAnswers() {
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/questions/" + currentQuestion + "/answers"
    console.log(url)
    call.open("GET", url)
    call.send();
    call.onload = () => {
        let returnedResponse = call.response // will be a dictionary.
        console.log('returned response', returnedResponse);
        workWithThis = (JSON.parse(returnedResponse))
        // the last element will have the correct answer.
        document.getElementById("answer1").innerHTML = workWithThis["answerOne"];
        document.getElementById("answer2").innerHTML = workWithThis["answerTwo"];
        document.getElementById("answer3").innerHTML = workWithThis["answerThree"];
        document.getElementById("answer4").innerHTML = workWithThis["answerFour"];

        // console.log(JSON.parse(call.response))
    }
}

// populates buttons on quiz
function populateButtons() {
    document.getElementById("answer1").innerHTML = workWithThis["answerOne"]["answer"];
    document.getElementById("answer2").innerHTML = workWithThis["answerTwo"];
    document.getElementById("answer3").innerHTML = workWithThis["answerThree"];
    document.getElementById("answer4").innerHTML = workWithThis["answerFour"];
}

// checks if the button pressed was correctt
function checkButton(number) {
    let res;
    if (number == 0) {
        res = workWithThis[0]["correct"];

    } else {
        if (number = 1) {
            res = workWithThis[1]["correct"];
        }
    }
}

// don't use anymore
function buttonStuff() { // The necessity of this will probably change when changed to radio buttons 
    document.getElementById("starting_Button").style.display = "none"
    document.getElementById("answer1").style.visibility = "visible"
    document.getElementById("answer2").style.visibility = "visible"
    document.getElementById("answer3").style.visibility = "visible"
    document.getElementById("answer4").style.visibility = "visible"
}

// creates a new user from the form on index.html
function postUser() {
    const user = document.getElementById("login_form").user.value;
    const pass = document.getElementById("login_form").pass.value;
    let testing = document.getElementById("login_form").user.value;
    console.log(testing);
    current_user = testing;
    console.log(current_user);
    localStorage.currentperson = testing;
    document.location = 'quiz.html';
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/new/";
    console.log(url);
    call.open("POST", url, true);
    
    // call.setRequestHeader("Access-Control-Allow-Origin", "*");
    call.setRequestHeader("Content-Type", "application/json", "Access-Control-Allow-Origin", "*");
    // call.send("user=test&pass=supersecurepassword");
    let toSend = JSON.stringify({user: user, pass: pass});
    //console.log(toSend)
    
    // call.setRequestHeader("Content-type", "application/json", "Access-Control-Allow-Origin", "*" );
    call.send(toSend);
    call.onload = () => {
        current_user = ((call.response));
        console.log(current_user)
    }
}

// posts to lastplayer database
function trackUserHistory() {
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/new/lastPlayer/";
    console.log(url);
    call.open("POST", url, true);
    
    // call.setRequestHeader("Access-Control-Allow-Origin", "*");
    call.setRequestHeader("Content-Type", "application/json", "Access-Control-Allow-Origin", "*");
    // call.send("user=test&pass=supersecurepassword");
    let toSend = JSON.stringify({user: localStorage.currentperson});
    
    call.send(toSend);
    call.onload = () => {
        console.log((call.response));
    }
}

// gets last players (player history) from database
function getUserHistory() {
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/lastPlayers/"
    console.log(url)
    call.open("GET", url)
    call.send();
    call.onload = () => {
        document.getElementById("Element to put response into (multiple elements may be necessary)").innerHTML = call.response
        console.log(JSON.parse(call.response))
    }
}

// checks if answer was right and increases score if so
function checkIfRight(buttonNumber) {
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/answer/" + currentQuestion + "/" + buttonNumber;
    console.log(url)
    console.log("URL ^")
    call.open("GET", url)
    call.send();
    call.onload = () => {
        //document.getElementById("Element to put response into (multiple elements may be necessary)").innerHTML = call.response
        console.log(call.response)
        if (call.response != "False") {
            increaseScore();
        }
    }
}

// individually checks each button for correctness
function buttonOneAction() {
    let buttonNumber = 1;
    //console.log("Before Check")
    checkIfRight(buttonNumber);
    //console.log("After Check")
    getQuestion();
}
function buttonTwoAction() {
    let buttonNumber = 2;
    //console.log("Before Check")
    checkIfRight(buttonNumber);
    //console.log("After Check")
    getQuestion();
}
function buttonThreeAction() {
    let buttonNumber = 3;
    //console.log("Before Check")
    checkIfRight(buttonNumber);
    //console.log("After Check")
    getQuestion();
}
function buttonFourAction() {
    let buttonNumber = 4;
    //console.log("Before Check")
    checkIfRight(buttonNumber);
    //console.log("After Check")
    getQuestion();
}

// deletes a user from database
function deleteFunction() {
    let id = localStorage.lastID;
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/delete/user/" + localStorage.currentperson;
    console.log(url)
    call.open("DELETE", url)
    call.send();
    call.onload = () => {
        console.log(call.response)
    }
    deleteDatabase();
}

function deleteDatabase() {
    let id = localStorage.lastID;
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/delete/users/" + localStorage.currentperson;
    console.log(url)
    call.open("DELETE", url)
    call.send();
    call.onload = () => {
        console.log(call.response)
    }
}

// grabs user ID
function getID() {
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/user/last";
    
    call.open("GET", url)
    call.send();
    call.onload = () => {
        //document.getElementById("Element to put response into (multiple elements may be necessary)").innerHTML = call.response
        console.log(call.response)
    }
}

// creates leaderboard!!! Which is essentially a list of players and their scores
function createLeaders() {
    var my_list = document.getElementById("leaders");
    var call = new XMLHttpRequest();
    var url = "http://localhost:5000/app/highscores/";

    call.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            myFunction(myArr);
        }
    };
    call.open("GET", url, true);
    call.send();

    function myFunction(arr) {
        var i;
        for(i = 0; i < arr.length; i++) {
            my_list.innerHTML += "<li> User: "+ arr[i].user + " --- Score: "+ arr[i].score+ "</li>";
        }
        localStorage.lastID = i;
    }
}

// Meant to update account if user chooses to change password
function updateAccount() {
    const user = document.getElementById("change_form").user.value;
    const pass = document.getElementById("change_form").pass.value;
    console.log(user, pass)
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/update/user/" + user + "/";
    call.open("PATCH", url, true);
    
    // call.setRequestHeader("Access-Control-Allow-Origin", "*");
    call.setRequestHeader("Content-Type", "application/json", "Access-Control-Allow-Origin", "*");
    // call.send("user=test&pass=supersecurepassword");
    let toSend = JSON.stringify({pass: pass});
    //console.log(toSend)
    
    // call.setRequestHeader("Content-type", "application/json", "Access-Control-Allow-Origin", "*" );
    call.send(toSend);
    call.onload = () => {
    }
    document.location = "index.html"
}

// checks if a user is already in the scores database and if their score tops their highscore
function validateUser(score) {
    var call = new XMLHttpRequest();
    var url = "http://localhost:5000/app/highscores/";
    let seen = false;

    call.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            myFunction(myArr);
        }
    };
    call.open("GET", url, true);
    call.send();

    function myFunction(arr) {
        var i;
        for(i = 0; i < arr.length; i++) {
            if (myArr[i].user == localStorage.currentperson) {
                if (myArr[i].score < score) {
                    patchScore(myArr[i].user, score);
                }
                seen = true;
            }
        }
    };
    if (seen === false) {
        submitScore(points);
    }
}
          
// Password validation!
function validateLogin() {
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/users/"
    console.log(url)
    call.open("GET", url)
    call.send();
    call.onload = () => {
        let returningJSON = (JSON.parse(call.response))
        for (let i = 0; i < returningJSON.length; i++) {
            if (returningJSON[i].user == document.getElementById("login_form").user.value) {
                if (returningJSON[i].pass == document.getElementById("login_form").pass.value) {
                    postUser();
                } else {
                    alert("That is the incorrect password!")
                    return
                }
            }
        }
    }
}

// validates user's attempt to create an account
function validateSignup() {
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/users/"
    console.log(url)
    call.open("GET", url)
    call.send();
    call.onload = () => {
        let returningJSON = (JSON.parse(call.response))
        let seen = false
        for (let i = 0; i < returningJSON.length; i++) {
            if (returningJSON[i].user == document.getElementById("login_form").user.value) {
                alert("This account already exists!")
                seen = true
                return;
            }
        }
        if (!(seen)) {
            postUser();
        }
    }
}

// updates score if a user's current score is better than the recorded one
function patchScore(user, score) {
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000//app/update/highscores/" + user;
    console.log(url);
    call.open("POST", url, true);
    
    // call.setRequestHeader("Access-Control-Allow-Origin", "*");
    call.setRequestHeader("Content-Type", "application/json", "Access-Control-Allow-Origin", "*");
    // call.send("user=test&pass=supersecurepassword");
    let toSend = JSON.stringify({user: user, score: score});
    //console.log(toSend)
    
    // call.setRequestHeader("Content-type", "application/json", "Access-Control-Allow-Origin", "*" );
    call.send(toSend);
    call.onload = () => {
        current_user = ((call.response));
        console.log(current_user)
    }
}
