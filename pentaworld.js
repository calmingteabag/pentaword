let item_pos = 0;
let active_row = 0;
let arr = [];
const word = 'panda';


// In a more organized way, we should have one function to get the letter
// and another to process it. Decided to do both in the same function to mimic
// original game behaviour that, as a user presses an key, the program (supposedly, in my
// limited knowledge) 'gets' the key first and adds it to a comparison array of
// some sort.
function getKeyPress(current) {
    const current_key = document.getElementById(current)
    const current_char = current_key.textContent

    console.log(`You pressed this key: ${current_char}`)

    if (item_pos < 5) {

        let rowlist = document.getElementsByClassName('row_try')[active_row];
        let curr_char = rowlist.children;

        curr_char[item_pos].innerHTML = `<span class='charspan'>${current_char}</span>`
        item_pos++
        arr.push(current_char)
    }
};


// Since my program has screen keyboards, some listeners and their respective
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

    if (item_pos > 0) {
        let curr_row = document.getElementsByClassName('row_try')[active_row]
        let curr_char = curr_row.getElementsByClassName('char')[item_pos - 1]
        curr_char.innerHTML = ''
        arr.pop()
        item_pos--
    }
};

// need to change window.alert to show some stats and reset game
function subWord() {
    let dailyWordArr = word.toUpperCase().split('')
    console.log(dailyWordArr)
    console.log(active_row)

    if (active_row < 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == false) {
        // user guessed wrong
        checkWord()
        active_row++
        item_pos = 0
        console.log(arr)

        arr = []


    } else if (active_row < 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == true) {
        // user guessed right
        checkWord()
        window.alert(`You got the right word in less than 6 tries. It was on row ${active_row}`)

    } else if (active_row == 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == true) {
        // last row, right guess
        checkWord()
        window.alert('You got it right in the last try, phew!')

    } else if (active_row == 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == false) {
        checkWord()
        window.alert('Game ended for real')
    }
};


// To declutter the subWord() function, did a separate one
// just to handle checking part (user word vs 'daily' word). 
// Added visuals (green/yellow/red) too because it isn't anything 
// too fancy to require a separate function
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

    return result_str
};


// Applied the same logic from original game. Users could either type on
// phisical keyboard or click on the screen to add letters, so again, decided
// to mimic the original behaviour.
document.addEventListener('keyup', keyPressAlpha);

function keyPressAlpha(usrkey) {

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
    }
};

// Since there is no .isalpha() like on python, we had to create it 
// because we are using it to only allow alpha characters to be
// displayed
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

// Needed this to compare both arrays (user's and daily word)
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