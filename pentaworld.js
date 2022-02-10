/*
Basics of this game is, as the key is pressed it fills a display and is added
to an array. If the display is filled, the user entered word is compared to the
daily word.

Since I was pratically learning js from the ground up
and doing so as this project grew, code is really messy. Tried
to refactor as much as I could.
*/

/*
Basic game setup

item_pos tracks the char position on a row
active_row tracks which row is being filled

game_active is needed to prevent odd execution, for example
user being able to delete chars after the game ended
*/
let item_pos = 0;
let active_row = 0;
let arr = [];
let word = 'panda';
let game_active = ''; // alters game state


/*
Needed some kind of 'save' for the game and given the size of it I
thought using databases would be really overkill. Went for local
storage because another thing I wanted was it for run local only,
no server.
*/
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

// Check and create user data
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


function getKeyPress(currentKey) {
    /*
    Populates display as the user presses a key
    */
    const current_key = document.getElementById(currentKey)
    const current_char = current_key.textContent

    if (item_pos < 5 && game_active == true) {

        let rowlist = document.getElementsByClassName('row_try')[active_row];
        let curr_char = rowlist.children;

        curr_char[item_pos].innerHTML = `<span class='charspan'>${current_char}</span>`
        item_pos++
        arr.push(current_char)
    }
};

/*
Since the program has screen keyboards, some listeners and their respective
functions are needed. Not 100% sure if listeners are needed for a project
of this size, seemed a bit overkill to add listerners for single functions.
Did it anyway, for practice.
*/

// Need to check if user can or can't play the game
// So, if it's a new user, state must be true and change to false after playing ended
// Now if its a existing user, we could assume he already played and is waiting
// for the next reset. So for this guy, game state would be false.

// pseudocode for that
// game state is set to false
// if user doesn't exists (1st time playing),
// set state to true
// if user exists, (nth time playing) and it's not midnight, game state keeps
// on false.
// if user exists and time is midnight turn it to true -> problem resides here

// if the default state is false, what happens is, the last line will turn state to true but
// as soon as the page is reloaded, it will turn false again.
// HOW TO FIX THAT?!?

// just thought of a workaround
// move game state variable to localStorage, so, on load, it will create the
// state variable there and it will save current state. then we ""only""" need
// to look for where active_state is used and change for localStorage.getItem

async function startCheck() {
    let fullDate = new Date();
    let currentTime = fullDate.getHours() + ":" + fullDate.getMinutes() + ":" + fullDate.getSeconds();

    await new Promise((resolve, reject) => {
        if (currentTime == '00:00:00') {
            resolve(game_active = true)
        }
    });
};

async function rowGlowAnimate() {
    /*
    Didn't knew much about async/await and promises until I needed a way to use a timer. 
    Figured out it was time to, at least, use some basic level of it.
    */
    let allChars = document.getElementsByClassName('char')

    for (let char of allChars) {
        await new Promise((resolve, reject) => setTimeout(resolve, 25))
        char.style.animation = 'char_animation 0.7s ease-in-out 0s 2 alternate'
    }
};

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
    populateInfo()
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

function keyPressAlpha(usrkey) {
    /*
    Like the original, characters can be entered by typing on the physical
    keyboards, so I thought it would be nice to have this functionality
    here too.
    */

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

function dailyWordChange(word) {
    // on game load, do some comparisons that check a timer
    // and if its zero, change current daily word
    document.getElementById('daily_word').innerHTML = word
}



document.addEventListener("DOMContentLoaded", startCheck, false);
document.addEventListener("DOMContentLoaded", function () { addCharListener('keybutton', 'id') }, false);
document.addEventListener("DOMContentLoaded", function () { delCharListener('del_elem') }, false);
document.addEventListener("DOMContentLoaded", function () { checkWordListener('sub_elem') }, false);
document.addEventListener("DOMContentLoaded", function () { exitStatListener('exit_stats') }, false);
document.addEventListener("DOMContentLoaded", function () { showStatsListener('show_stat') }, false);
document.addEventListener('keyup', keyPressAlpha);
document.addEventListener("DOMContentLoaded", checkExistUserData, false);
document.addEventListener("DOMContentLoaded", function () { dailyWordChange('chato') }, false);
document.addEventListener("DOMContentLoaded", rowGlowAnimate, false);

function populateInfo() {
    let htmlElements = document.getElementsByClassName('score_info_value')
    let winRatio = (parseInt(localStorage.getItem('wonGames')) / parseInt(localStorage.getItem('playedGames')) * 100).toFixed(1)
    let updateElements = ['playedGames', 'winRatiodummy', 'currStreak', 'maxStreak']

    for (let i = 0; i < htmlElements.length; i++) {

        if (i == 1) {
            htmlElements[i].innerHTML = winRatio + '%'
            i++ // makes getItem skip updateElements[1] which is a dummy element made to complete 4-element list, so
            // the loop won't get the wrong elements
        }
        htmlElements[i].innerHTML = localStorage.getItem(updateElements[i])
    }

    // histogram
    let fillElements = document.getElementsByClassName('score_info_graph_fill')

    for (let col = 0; col < fillElements.length; col++) {
        let winRatioColumn = parseInt(localStorage.getItem(`row_${col}`)) / parseInt(localStorage.getItem('wonGames')) * 100
        fillElements[col].style.width = winRatioColumn.toFixed(2) + '%'
    }
}

function subWord() {
    /*
    This function controls the main flow of the game and uses checkWord()
    to process the visual part

    Why there is set of conditionals just for the last row:

    Game needs to know which row is the active one so it can populate the
    'tiles' with characters and it does so by looking at the 'active_row' variable. 
    Betweem rows 0 and 5, it works just fine. User tries to guess, it doesn't
    match the daily word and game skips to the next row by doing 'active_row++'.

    If the game is on the last row and we increment active_row it'll go
    out of range and break the function we use to populate tiles because it'll try
    to process a row that doesn't exists, returning an error.

    So the solution that I kinda of found out was to set those conditionals just for the
    last row that doesn't increment 'active_row' so the game can safely end without
    breaking anything.
    */
    let dailyWordArr = word.toUpperCase().split('')

    // Wrong Guess, row < last. Continue Game.
    if (active_row < 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == false && game_active == true) {
        checkWord()
        active_row++
        item_pos = 0
        arr = []

        // Right guess, row < last.
    } else if (active_row < 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == true && game_active == true) {
        checkWord()
        game_active = false

        let updateData = ['playedGames', 'wonGames', `row_${active_row}`, 'currStreak']
        for (let key of updateData) {
            let getValue = parseInt(localStorage.getItem(key), 10)
            localStorage.setItem(key, getValue + 1)
        }

        if (parseInt(localStorage.getItem('currStreak')) > parseInt(localStorage.getItem('maxStreak'))) {
            localStorage.setItem('maxStreak', localStorage.getItem('currStreak'))
        }

        populateInfo()
        document.getElementById('score_wrapper').style.visibility = 'visible'
        document.getElementById('score_wrapper').style.backgroundColor = 'rgb(4, 29, 8)'
        document.getElementById('score_wrapper').style.borderColor = 'rgb(2, 255, 23)'
        document.getElementById('score_title').style.color = 'rgb(2, 255, 23)'
        document.getElementById('score_title').innerHTML = 'You got it!'

        // Right guess, row == last.
    } else if (active_row == 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == true && game_active == true) {
        checkWord()
        game_active = false

        let updateData = ['playedGames', 'wonGames', `row_${active_row}`, 'currStreak']

        for (let key of updateData) {
            let getValue = parseInt(localStorage.getItem(key), 10)
            localStorage.setItem(key, getValue + 1)
        }

        if (parseInt(localStorage.getItem('currStreak')) > parseInt(localStorage.getItem('maxStreak'))) {
            localStorage.setItem('maxStreak', localStorage.getItem('currStreak'))
        }
        populateInfo()
        document.getElementById('score_wrapper').style.visibility = 'visible'
        document.getElementById('score_wrapper').style.backgroundColor = 'rgb(4, 29, 8)'
        document.getElementById('score_wrapper').style.borderColor = 'rgb(2, 255, 23)'
        document.getElementById('score_title').style.color = 'rgb(2, 255, 23)'
        document.getElementById('score_title').innerHTML = 'You got it!'

        // Wrong guess, row == last.
    } else if (active_row == 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == false && game_active == true) {
        checkWord()
        game_active = false

        let updateStorage = ['playedGames', 'lostGames']

        for (let key of updateStorage) {
            let getValue = parseInt(localStorage.getItem(key), 10)
            localStorage.setItem(key, getValue + 1)
        }

        localStorage.setItem('currStreak', 0)

        populateInfo()
        document.getElementById('score_wrapper').style.visibility = 'visible'
        document.getElementById('score_wrapper').style.backgroundColor = 'rgb(24, 2, 2)'
        document.getElementById('score_wrapper').style.borderColor = 'red'
        document.getElementById('score_title').style.color = 'red'
        document.getElementById('score_title').innerHTML = 'Try again tomorrow'

    }
};

function checkWord() {
    /*
    To declutter a bit of the subWord() function, did a separate one
    just to handle visuals.
    */
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



function isAlpha(word) {
    /*
    Re-inventing the wheel by creating a function that
    is easily accessible if it was in python.
    */
    alphabet = 'abcdefghijklmnopqrstuvwxyz'

    for (let check of word) {
        if (alphabet.includes(check)) {
            return true
        } else {
            return false
        }
    }
};


function compareArr(arr_a, arr_b) {
    /*
    Needed this to compare both arrays (user's and daily word). Could
    have done in a different way using for(let i = 0, i < arr_a.length, i++)
    decided to try this way to train myself.
    */

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
    /*
    Re-inventing the wheel one more time.
    */
    let percent = Math.random();
    let num = Math.floor(percent * (Math.floor(end) - Math.ceil(start) + 1) + start)

    return num
}