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


// As the user presses key, current key is added to display
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

    if (item_pos > 0) {
        let curr_row = document.getElementsByClassName('row_try')[active_row]
        let curr_char = curr_row.getElementsByClassName('char')[item_pos - 1]
        curr_char.innerHTML = ''
        arr.pop()
        item_pos--
    };
};

// Decided on my own to separate the tracking part (how many tries) from the
// word checking part to declutter stuff
// Need a way to exit before exausting attempts
function subWord() {

    if (active_row < 6 && item_pos == 5) {
        checkWord()

        if (arr == word.toUpperCase().split('')) {
            windows.alert('Game ended')
        }

        active_row += 1
        item_pos = 0
        arr = []
    } else {
        window.alert('Game ended for real')
    }
};


// This function will do the heavy lifting, aka comparison
function checkWord() {
    let check_pos = 0
    let daily_word_arr = word.toUpperCase().split('')
    let result_str = ''


    for (let char of arr) {

        if (daily_word_arr.includes(char) && char == daily_word_arr[check_pos]) {
            let check_row = document.getElementsByClassName('row_try')[active_row]
            let current_letter = check_row.children[check_pos];
            current_letter.style.color = 'green';
            current_letter.style.borderColor = '#00FF00';
            // would be nice if this effect worked only on current row
            // will think about it later
            current_letter.style.animation = 'glow_lighten 1.5s ease-in-out infinite alternate'


            check_pos++
            result_str += 'green '
        } else if (daily_word_arr.includes(char) && char != daily_word_arr[check_pos]) {
            let check_row = document.getElementsByClassName('row_try')[active_row]
            let current_letter = check_row.children[check_pos];
            current_letter.style.color = 'yellow'
            current_letter.style.borderColor = '#FFFF00';

            check_pos++
            result_str += 'yellow '
        } else {
            let check_row = document.getElementsByClassName('row_try')[active_row]
            let current_letter = check_row.children[check_pos];
            current_letter.style.color = 'red'
            current_letter.style.borderColor = '#FF0000';

            check_pos++
            result_str += 'red '
        }
    };

    return result_str
};

// Key event listener
// Will do the same process as getKeypress
// As the user types a word, needs to limit inputs to only characters
// and probably need separate events to backspace and enter

document.addEventListener('keyup', keyPressAlpha);

function keyPressAlpha(usrkey) {
    console.log(`You pressed this key: ${usrkey.key}`)
    console.log(`You pressed the ${usrkey.code} keycode`)

    if (item_pos < 5 && isAlpha(usrkey.key) == true && usrkey.key != '') {
        let rowlist = document.getElementsByClassName('row_try')[active_row];
        let curr_char = rowlist.children;

        curr_char[item_pos].innerHTML = `<span class='charspan'>${usrkey.key.toUpperCase()}</span>`
        item_pos++
        arr.push(usrkey.key.toUpperCase())

    } else if (item_pos <= 5 && usrkey.key == 'Backspace') {
        delChar()

    } else if (item_pos == 5 && usrkey.key == 'Enter') {
        subWord()
    };
};

// since there is no .isalpha() like on python, we need to somewhat create it 
function isAlpha(word) {
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    for (let check of word) {
        if (alphabet.includes(check)) {
            return true
        } else {
            return false
        };
    };
};