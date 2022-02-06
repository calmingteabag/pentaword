let item_pos = 0;
let active_row = 0;
let arr = [];
const word = 'panda';
let game_active = true;


/*
Basics of this game is, as the key is pressed it fills a display and is added
to an array. If the display is filled, the user entered word is compared to the
daily word.
*/


// First, we need to populate the display (squares) on a row and
// add letters to an array tha will be used later
function getKeyPress(current) {
    const current_key = document.getElementById(current)
    const current_char = current_key.textContent

    console.log(`You pressed this key: ${current_char}`)

    if (item_pos < 5 && game_active == true) {

        let rowlist = document.getElementsByClassName('row_try')[active_row];
        let curr_char = rowlist.children;

        curr_char[item_pos].innerHTML = `<span class='charspan'>${current_char}</span>`
        item_pos++
        arr.push(current_char)
    }
};


// Since the program has screen keyboards, some listeners and their respective
// functions are needed

function addCharListener() {
    let btn_elem = document.getElementsByClassName('keybutton')

    for (let elem of btn_elem) {
        let current_attb = elem.getAttribute('id')
        elem.addEventListener("click", function () { getKeyPress(current_attb) }, false)
    }
};

function delCharListener() {
    let del_btn = document.getElementById('del_elem')
    del_btn.addEventListener("click", delChar, false)
};

function checkWordListener() {
    let sub_btn = document.getElementById('sub_elem')
    sub_btn.addEventListener("click", subWord, false)
};

document.addEventListener("DOMContentLoaded", addCharListener, false);
document.addEventListener("DOMContentLoaded", delCharListener, false);
document.addEventListener("DOMContentLoaded", checkWordListener, false);

function delChar() {

    if (item_pos > 0 && game_active == true) {
        let curr_row = document.getElementsByClassName('row_try')[active_row]
        let curr_char = curr_row.getElementsByClassName('char')[item_pos - 1]
        curr_char.innerHTML = ''
        arr.pop()
        item_pos--
    }
};


// This function controls the main flow of the game and uses checkWord()
// to process the visual part

function subWord() {
    let dailyWordArr = word.toUpperCase().split('')

    // user guessed wrong keep going
    if (active_row < 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == false && game_active == true) {
        checkWord()
        active_row++
        item_pos = 0
        console.log(arr)

        arr = []

        // user guessed right
    } else if (active_row < 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == true && game_active == true) {
        checkWord()
        game_active = false
        window.alert(`You got the right word in less than 6 tries. It was on row ${active_row}`)
        console.log(game_active)

        // last row, right guess
    } else if (active_row == 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == true && game_active == true) {
        checkWord()
        game_active = false
        window.alert('You got it right in the last try, phew!')


        // tries ends
    } else if (active_row == 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == false && game_active == true) {
        checkWord()
        game_active = false
        window.alert('Game ended for real')

    }
};


// To declutter the subWord() function, did a separate one
// just to handle visuals. 

function checkWord() {
    let check_pos = 0
    let daily_word_arr = word.toUpperCase().split('')

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

        } else if (daily_word_arr.includes(char) && char != daily_word_arr[check_pos]) {
            let check_row = document.getElementsByClassName('row_try')[active_row]
            let current_letter = check_row.children[check_pos];
            current_letter.style.color = 'yellow'
            current_letter.style.borderColor = '#FFFF00';
            check_pos++

        } else {
            let check_row = document.getElementsByClassName('row_try')[active_row]
            let current_letter = check_row.children[check_pos];
            current_letter.style.color = 'red'
            current_letter.style.borderColor = '#FF0000';
            check_pos++

        }
    }
};


// Like the original, words can be entered by typing on the physical
// keyboards too, so I've implemented that

document.addEventListener('keyup', keyPressAlpha);

function keyPressAlpha(usrkey) {

    if (item_pos < 5 && isAlpha(usrkey.key) == true && usrkey.key != '' && game_active == true) {
        let rowlist = document.getElementsByClassName('row_try')[active_row];
        let curr_char = rowlist.children;

        curr_char[item_pos].innerHTML = `<span class='charspan'>${usrkey.key.toUpperCase()}</span>`
        item_pos++
        arr.push(usrkey.key.toUpperCase())

    } else if (item_pos <= 5 && usrkey.key == 'Backspace' && game_active == true) {
        delChar()

    } else if (item_pos == 5 && usrkey.key == 'Enter' && game_active == true) {
        subWord()
    }
};

// Since there is no .isalpha() like on python, I had to create it

function isAlpha(word) {
    alphabet = 'abcdefghijklmnopqrstuvwxyz'

    for (let check of word) {
        if (alphabet.includes(check)) {
            return true
        } else {
            return false
        }
    }
};

// Needed this to compare both arrays (user's and daily word). Could
// have done in a different way using for(let i = 0, i < arr_a.length, i++)
// decided to try this way to train myself.

function compareArr(arr_a, arr_b) {
    let iter = 0

    if (arr_a.length == 0) {
        return false

    } else {
        for (let element of arr_a) {
            if (arr_b[iter] != element) {
                return false
            }
            iter++
        }
        return true
    }
};