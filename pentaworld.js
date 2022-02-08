// game data
let item_pos = 0;
let active_row = 0;
let arr = [];
const word = 'panda';
let game_active = true;


/*
Basics of this game is, as the key is pressed it fills a display and is added
to an array. If the display is filled, the user entered word is compared to the
daily word.

item_pos tracks the char position on a row
active_row tracks which row is being filled

game_active is needed to prevent odd execution, for example
user being able to delete chars after the game ended
*/

// Set user data
function createUserData() {
    let userID = randInt(0, 600000)
    let insertValues = new Map([
        ['user', userID],
        ['playedGames', 0],
        ['wonGames', 0],
        ['lostGames', 0],
        ['currStreak', 0],
        ['maxStreak', 0],
        ['row_0', 0],
        ['row_1', 0],
        ['row_2', 0],
        ['row_3', 0],
        ['row_4', 0],
        ['row_5', 0],
    ]);

    for (let values of insertValues) {
        localStorage.setItem(values[0], values[1])
    }
}

function checkExistUserData() {
    if (!localStorage.getItem('user')) {
        createUserData()
    } else {
        console.log('Storage Exists')
    }
}

// Update user data
function updateUserData(storageItem, value) {
    localStorage.setItem(storageItem, value)
}


// First, we need to populate the display (squares) on a row and
// add letters to an array tha will be used later
function getKeyPress(currentKey) {
    const current_key = document.getElementById(currentKey)
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

function addCharListener(classname, atrib) {
    let btn_elem = document.getElementsByClassName(classname)

    for (let elem of btn_elem) {
        let current_attb = elem.getAttribute(atrib)
        elem.addEventListener("click", function () { getKeyPress(current_attb) }, false)
    }
};

function delCharListener(delElem) {
    let del_btn = document.getElementById(delElem)
    del_btn.addEventListener("click", delChar, false)
};

function checkWordListener(checkElem) {
    let sub_btn = document.getElementById(checkElem)
    sub_btn.addEventListener("click", subWord, false)
};

function exitStatListener(exitStat) {
    let exit_btn = document.getElementById(exitStat)
    exit_btn.addEventListener("click", function () { closeStat('score_wrapper') }, false)
}

function showStatsListener(statElement) {
    let stat_listener = document.getElementById(statElement)
    stat_listener.addEventListener("click", function () { statToggle('score_wrapper') }, false)
}

function statToggle(toggleElement) {
    let viewToggle = document.getElementById(toggleElement)
    if (viewToggle.style.visibility == 'hidden') {
        showStat('score_wrapper')
    } else {
        closeStat('score_wrapper')
    }
}

function showStat(statElement) {
    let show_stat = document.getElementById(statElement)
    updateInfo()
    show_stat.style.visibility = 'visible'
}

function closeStat(statElement) {
    let stat_window = document.getElementById(statElement)
    stat_window.style.visibility = 'hidden'
    document.getElementById('score_wrapper').style.backgroundColor = 'rgb(39, 39, 39)'
    document.getElementById('score_wrapper').style.borderColor = 'rgb(151, 56, 159)'
    document.getElementById('score_title').style.color = 'rgb(255, 42, 184)'
    document.getElementById('score_title').innerHTML = 'Statistics'
}

function delChar() {

    if (item_pos > 0 && game_active == true) {
        let curr_row = document.getElementsByClassName('row_try')[active_row]
        let curr_char = curr_row.getElementsByClassName('char')[item_pos - 1]
        curr_char.innerHTML = ''
        arr.pop()
        item_pos--
    }
};

document.addEventListener("DOMContentLoaded", function () { addCharListener('keybutton', 'id') }, false);
document.addEventListener("DOMContentLoaded", function () { delCharListener('del_elem') }, false);
document.addEventListener("DOMContentLoaded", function () { checkWordListener('sub_elem') }, false);
document.addEventListener("DOMContentLoaded", function () { exitStatListener('exit_stats') }, false);
document.addEventListener("DOMContentLoaded", function () { showStatsListener('show_stat') }, false);
document.addEventListener("DOMContentLoaded", checkExistUserData, false);
// document.addEventListener("DOMContentLoaded", testFunction, false);


// Will update stats window
function updateInfo() {
    let htmlElements = document.getElementsByClassName('score_info_value')
    let winRatio = (parseInt(localStorage.getItem('wonGames')) / parseInt(localStorage.getItem('playedGames')) * 100).toFixed(1)
    console.log(winRatio)
    console.log(htmlElements.length)
    let updateElements = ['playedGames', 'currStreak', 'maxStreak']

    for (let i = 0; i < updateElements.length; i++) {

        if (i == 1) {
            htmlElements[i].innerHTML = 'sar'
        }
        htmlElements[i].innerHTML = localStorage.getItem(updateElements[i])
    }
}


// This function controls the main flow of the game and uses checkWord()
// to process the visual part
function subWord() {
    let dailyWordArr = word.toUpperCase().split('')

    // user guessed wrong keep going
    if (active_row < 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == false && game_active == true) {
        checkWord()
        active_row++
        item_pos = 0
        arr = []

        // user guessed right
    } else if (active_row < 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == true && game_active == true) {
        checkWord()
        game_active = false
        document.getElementById('score_wrapper').style.visibility = 'visible'
        document.getElementById('score_wrapper').style.backgroundColor = 'rgb(4, 29, 8)'
        document.getElementById('score_wrapper').style.borderColor = 'rgb(2, 255, 23)'
        document.getElementById('score_title').style.color = 'rgb(2, 255, 23)'
        document.getElementById('score_title').innerHTML = 'You got it!'

        let updateStorage = ['playedGames', 'wonGames', `row_${active_row}`, 'currStreak']
        for (let key of updateStorage) {
            let getValue = parseInt(localStorage.getItem(key), 10)
            localStorage.setItem(key, getValue + 1)
        }

        // localStorage.setItem(`row_${active_row}`, parseInt(localStorage.getItem(`row_${active_row}`), 10) + 1)
        // localStorage.setItem('playedGames', parseInt(localStorage.getItem('playedGames'), 10) + 1)
        // localStorage.setItem('wonGames', parseInt(localStorage.getItem('wonGames'), 10) + 1)
        // localStorage.setItem('currStreak', parseInt(localStorage.getItem('currStreak'), 10) + 1)
        if (parseInt(localStorage.getItem('currStreak')) > parseInt(localStorage.getItem('maxStreak'))) {
            localStorage.setItem('maxStreak', localStorage.getItem('currStreak'))
        }


        // last row, right guess
    } else if (active_row == 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == true && game_active == true) {
        checkWord()
        game_active = false
        document.getElementById('score_wrapper').style.visibility = 'visible'
        document.getElementById('score_wrapper').style.backgroundColor = 'rgb(4, 29, 8)'
        document.getElementById('score_wrapper').style.borderColor = 'rgb(2, 255, 23)'
        document.getElementById('score_title').style.color = 'rgb(2, 255, 23)'
        document.getElementById('score_title').innerHTML = 'You got it!'


        let updateStorage = ['playedGames', 'wonGames', `row_${active_row}`, 'currStreak']
        for (let key of updateStorage) {
            let getValue = parseInt(localStorage.getItem(key), 10)
            localStorage.setItem(key, getValue + 1)
        }

        // localStorage.setItem(`row_${active_row}`, parseInt(localStorage.getItem(`row_${active_row}`), 10) + 1)
        // localStorage.setItem('playedGames', parseInt(localStorage.getItem('playedGames'), 10) + 1)
        // localStorage.setItem('wonGames', parseInt(localStorage.getItem('wonGames'), 10) + 1)
        // localStorage.setItem('currStreak', parseInt(localStorage.getItem('currStreak'), 10) + 1)
        if (parseInt(localStorage.getItem('currStreak')) > parseInt(localStorage.getItem('maxStreak'))) {
            localStorage.setItem('maxStreak', localStorage.getItem('currStreak'))
        }


        // tries ends
    } else if (active_row == 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == false && game_active == true) {
        checkWord()
        game_active = false
        document.getElementById('score_wrapper').style.visibility = 'visible'
        document.getElementById('score_wrapper').style.backgroundColor = 'rgb(24, 2, 2)'
        document.getElementById('score_wrapper').style.borderColor = 'red'
        document.getElementById('score_title').style.color = 'red'
        document.getElementById('score_title').innerHTML = 'Try again tomorrow'


        let updateStorage = ['playedGames', 'lostGames']
        for (let key of updateStorage) {

            let getValue = parseInt(localStorage.getItem(key), 10)
            localStorage.setItem(key, getValue + 1)
        }
        localStorage.setItem('currStreak', 0)
        // localStorage.setItem('playedGames', parseInt(localStorage.getItem('playedGames'), 10) + 1)
        // localStorage.setItem('lostGames', parseInt(localStorage.getItem('lostGames'), 10) + 1)
        // localStorage.setItem('currStreak', 0)

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
// keyboards too, so I've implemented that because I found it's easier
// to play this way.

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

function randInt(start, end) {
    let percent = Math.random();
    let num = Math.floor(percent * (Math.floor(end) - Math.ceil(start) + 1) + start)

    return num
}