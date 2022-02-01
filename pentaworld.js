// Let's assume this as a daily word to check


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
let item_pos = 0;
let active_row = 0;
let arr = [];
const word = 'panda';

function getKeyPress(current) {
    const current_key = document.getElementById(current)
    const current_char = current_key.textContent

    console.log(`You pressed this key: ${current_char}`)

    if (item_pos < 5) {
        // What we need to do is populate only the current row
        let rowlist = document.getElementsByClassName('row_try')[active_row];
        let curr_char = rowlist.children;

        // document.getElementsByClassName('char')[item_pos].innerHTML = `<span class='charspan'>${current_char}</span>`;
        curr_char[item_pos].innerHTML = `<span class='charspan'>${current_char}</span>`
        item_pos++
        arr.push(current_char)
    };
};


// This function will add a eventListener to all CHRACTER keys. Works
// as if onclick=function() is set to each element
function addCharListener() {
    let btn_elem = document.getElementsByClassName('keybutton')

    for (let elem of btn_elem) {
        let current_attb = elem.getAttribute('id')
        elem.addEventListener("click", function () { getKeyPress(current_attb) }, false)
    };
};

//Another function but to add eventListener to DELETE chracters previously filled
function delCharListener() {
    let del_btn = document.getElementById('del_elem')
    del_btn.addEventListener("click", delChar, false)
};

// This one adds an eventListener to CHECK words
function checkWordListener() {
    let sub_btn = document.getElementById('sub_elem')
    sub_btn.addEventListener("click", subWord, false)
};

// Listeners added to document
document.addEventListener("DOMContentLoaded", addCharListener, false);
document.addEventListener("DOMContentLoaded", delCharListener, false);
document.addEventListener("DOMContentLoaded", checkWordListener, false);

// This function will check chracters and delete them
function delChar() {
    let current_pos = item_pos
    let current_row = active_row

    if (item_pos > 0) {
        let curr_row = document.getElementsByClassName('row_try')[current_row]
        let curr_char = curr_row.getElementsByClassName('char')[current_pos - 1]
        curr_char.innerHTML = ''
        arr.pop()
        item_pos--
    };
};

function subWord() {

    if (item_pos == 5) {
        console.log('lez do it')
        console.log(arr)
        checkWord()
        active_row += 1
        item_pos = 0
        arr = []

        // need to stop the game if we are on the the last row

    } else {
        console.log('ehh nope')
        console.log(arr)

    };
};


// Need a way now to check input array to word
function checkWord() {
    let check_pos = 0
    let check_word = word.toUpperCase()

    for (let char of arr) {
        // console.log(char)
        // console.log(typeof (char))
        // console.log(typeof (word[check_pos]))
        if (char == check_word[check_pos]) {
            console.log('green')
        } else {
            console.log('red')
        }
    };

    // for (let char of arr) {
    //     if (word.includes(char)) {
    //         result += 'green';
    //     } else {
    //         result += 'red';
    //     }
    //};
};

