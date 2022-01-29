// Let's assume this as a daily word to check
const word = 'panda'

/*
First we need to populate the display and for that a single function
should do these steps:
    - Get what key the user pressed and allow only letters, not symbols or numbers
    - Add it to an array which will be checked against daily word
    - Find which display row to populate (if the user is on the Nth try)
    - If array is filled, no more chars can be added
    
Then, after arrays if filled, user need to click on 'try it' button that will do these
steps:
    - Compare each character from array to word and paint the display accordingly
    - Reset array
    - If all six tries ar filled, display end game results
*/


// const word = 'panda';
let arr = '';

/* 
This function works to get what key was pressed (for now)

Maybe this function will have to handle everthing, from getting the key to populating
display.

What I have in mind after getting the key:
First this program needs to know which row to populate. There are 6 rows, all with
the same class='row-try' attribute, so the problem is how does it know which one it is
working on?

HM WAIT, MAYBE...
we do something like

const allrows = document.getElementsByClassName('row_try');
const allchars = document.getElementsByClassName('char');

for (let currentrow of allrows) {
    for (let i =0; i < allchars.length;)

    execute code to fill current "tile" with key
    holy fuck this is a mess...
}

let try something else

maybe we should modify an attribute and set it to active, so we can work on it?

let attribute = document.getElementbyId(`row${num}`)
*/
function getKeyPress(current) {
    const current_key = document.getElementById(current);
    const current_char = current_key.textContent;

    console.log(`You pressed this key: ${current_char}`);
};

// add event listener to clickable letters
// this function will function as onclick=function()
function clickWait() {
    let cl_wait = document.getElementsByClassName('keybutton');
    for (let clickelem of cl_wait) {
        let currentattb = clickelem.getAttribute('id');
        clickelem.addEventListener("click", function () { getKeyPress(currentattb) }, false);
    }
};
// added this line so function clickwait will work
document.addEventListener("DOMContentLoaded", clickWait, false);


// funciton to add pressed key to array
function KeytoArr(key) {
    arr += key;
};

// function to populate the display
function populateDisplay(keytofill, keypos) {

    const rowList = document.getElementsByClassName('row_try')
    let rowEle = document.querySelector("")
    console.log(rowList)
    document.getElementsByClassName('row_try')[1].class = "row_try active_row";

};


// These are the main functions
function processKeypress(keypos) {
    let pressedKey = getKeyPress(keypos);
    let pos = 0

    if (arr.length < 5) {
        KeytoArr(pressedKey);
        populateDisplay(pressedKey, pos);
        pos++;
    }
};


function compareResult() {

};




function checkWord() {
    let index = 0
    let result = ''
    for (let char of arr) {
        if (word.includes(char)) {
            result += 'green';
        } else {
            result += 'red';
        }
    };

    document.getElementById('test').innerHTML = result;
    console.log(result)
};

