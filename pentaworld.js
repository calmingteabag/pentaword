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

// function to get what key pressed
function getKeyPress(keynum) {
    const getelements = document.getElementsByClassName('keybutton');
    let elementvalue = getelements[keynum].innerHTML;

    console.log(elementvalue)
    return elementvalue
};

// function keytest(arg) {
//     let x = getKeyPress(arg)
//     console.log(x)
// }

// funciton to add pressed key to array
function KeytoArr() {
    key = getKeyPress(keynum);
    if (arr.length < 5) {
        arr += key;
    }
}

// function to populate the display
function populateDisplay() {
    key = getKeyPress();

}


// These are the main functions
function processKeypress() {
    getKeyPress();
    addKeytoArr();
    populateDisplay();
}

function compareResult() {

}




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

// function getKeypress() {
//     const getelements = document.getElementsByClassName('keybutton');
//     let elementvalue = getelements[0].attributes[3].value;
//     document.getElementById('test').innerHTML = elementvalue;

//     if (arr.length < 5) {
//         arr += elementvalue;
//     } else {
//         document.getElementById('valor').innerHTML = arr;
//     }
// };
