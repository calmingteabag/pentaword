// "Fixed version, less spaghetti"

// Sets up current game data
class GameData {
    constructor(item_pos, active_row, arr, tried_words, word, style_arr,) {

        this.item_pos = item_pos
        this.active_row = active_row
        this.arr = arr
        this.tried_words = tried_words
        this.word = word
        this.style_arr = style_arr
    }
};

// Creates user
class UserData {
    constructor(user, playedGames, wonGames, lostGames, currStreak,
        maxStreak, row_0, row_1, row_2, row_3, row_4, row_5, game_state,
        last_game_state, nextday) {
        this.user = user
        this.playedGames = playedGames
        this.wonGames = wonGames
        this.lostGames = lostGames
        this.currStreak = currStreak
        this.maxStreak = maxStreak
        this.row_0 = row_0
        this.row_1 = row_1
        this.row_2 = row_2
        this.row_3 = row_3
        this.row_4 = row_4
        this.row_5 = row_5
        this.game_state = game_state
        this.last_game_state = last_game_state
        this.nextday = nextday
    };

    createUserData() {
        let insertValues = new Map([
            ['user', this.user],
            ['playedGames', this.playedGames],
            ['wonGames', this.wonGames],
            ['lostGames', this.lostGames],
            ['currStreak', this.currStreak],
            ['maxStreak', this.maxStreak],
            ['row_0', this.row_0],
            ['row_1', this.row_1],
            ['row_2', this.row_2],
            ['row_3', this.row_3],
            ['row_4', this.row_4],
            ['row_5', this.row_5],
            ['game_state', this.game_state],
            ['last_game_state', this.last_game_state],
            ['nextday', this.nextday],
        ])

        for (let values of insertValues) {
            localStorage.setItem(values[0], values[1])
        }

    };

    async checkExistUserData() {

        let currDate = new DateAndTime()
        let currDay = currDate.day // only needs current date, will return
        // this from DateAndTime class

        if (!localStorage.getItem('user')) {
            this.createUserData()
            localStorage.setItem('nexday', currDay + 1)
        } else {
            // get last game results from saved localstorage
            let get_states = JSON.parse(localStorage.getItem('last_game_state'))
            let charElements = document.getElementsByClassName('char')

            await new Promise((resolve, reject) => setTimeout(resolve, 2000))

            for (let entry = 0; entry < Object.keys(get_states).length; entry++) {
                await new Promise((resolve, reject) => setTimeout(resolve, 25))
                charElements[entry].removeAttribute('style')
                await new Promise((resolve, reject) => setTimeout(resolve, 25))
                charElements[entry].setAttribute('style', get_states[entry][1])
                charElements[entry].innerHTML = get_states[entry][0]
            }
        }
    }

    randInt(start, end) {
        let percent = Math.random();
        let num = Math.floor(percent * (Math.floor(end) - Math.ceil(start) + 1) + start)

        return num
    };
};

// Deals with date and time
class DateAndTime {
    constructor() {
        let DateObj = new Date();
        // Current Day and Time
        let currentDay = DateObj.getDate()
        let currentFullTime = DateObj.getHours() + ":" + DateObj.getMinutes() + ":" + DateObj.getSeconds();

        // Timer
        let timerHour = 23 - parseInt(DateObj.getHours(), 10)
        let timerMinute = 59 - parseInt(DateObj.getMinutes(), 10)
        let timerSecond = 59 - parseInt(DateObj.getSeconds(), 10)
        let fullCountDown = this.leadZerotime(timerHour) + ":" + this.leadZerotime(timerMinute) + ":" + this.leadZerotime(timerSecond)

        // Maybe need to separate timer reference from actual time
        this.day = currentDay
        this.hour = timerHour
        this.minute = timerMinute
        this.second = timerSecond
        this.fulltime = currentFullTime
        this.countdown = fullCountDown
    };

    leadZerotime(zeroes) {
        if (zeroes < 10) {
            let newzeroes = '0' + zeroes
            return newzeroes
        } else {
            return zeroes
        }
    };
};


// This class jave a method to get user pressed key and it needs to be added as a listener function.
class UserIteration extends GameData {
    constructor(item_pos, active_row, arr, tried_words, word, style_arr) {
        super(item_pos, active_row, arr, tried_words, word, style_arr);
    };

    getKeyPress(currentKey) {
        // Need to ultimately push a key to an instance of GameData array. Since we are first
        // instancing that class, this class needed to magically know which name we used
        // for that instancing for it to, for example, push to instanced arr. This will
        // not work obviously. Game variables needs to be global, so I think there is no
        // need for GameData class, just initialize those variables out of a class.

        const current_key = document.getElementById(currentKey)
        const current_char = current_key.textContent

        if (item_pos < 5 && localStorage.getItem('game_state') == 'active') {

            let rowlist = document.getElementsByClassName('row_try')[active_row];
            let curr_char = rowlist.children;

            curr_char[item_pos].innerHTML = current_char
            item_pos++
            arr.push(current_char)
        }
    };
};


let newgame = new UserIteration(0, 0, [], [], 'panda', [])
console.log(newgame.word)

// Game Instancing to initilize game variables
// let gameRunData = new GameData(0, 0, [], [], 'panda', [])
// console.log(gameRunData.arr)
// gameRunData.arr.push('somevar')
// console.log(gameRunData.arr)

// Time Instancing
let gameTime = new DateAndTime()
console.log(gameTime.countdown)

