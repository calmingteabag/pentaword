// "Fixed version, less spaghetti"

// Sets up global variables
let item_pos = 0;
let active_row = 0;
let arr = [];
let tried_words = [];
let word = 'panda';
let style_arr = [];

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

    returnDay() {
        return this.day
    }

    returnFullTime() {
        return this.fulltime
    }

    leadZerotime(zeroes) {
        if (zeroes < 10) {
            let newzeroes = '0' + zeroes
            return newzeroes
        } else {
            return zeroes
        }
    };
};

// Start checks
// Need to add a document.addeventlistener on the end of the .js file to call below class's method
class StartChecks extends DateAndTime {
    constructor() {
        super();
        let dateObj = new DateAndTime()
        this.today = dateObj.returnDay()
    };

    async initGame() {
        await new Promise((resolve, reject) => {
            if (this.today == localStorage.getItem('nextday')) {
                resolve(localStorage.setItem('game_state', 'active'))
                resolve(localStorage.setItem('nextday', currDay++))
            }
        })
    };
};


class CreateUser {
    constructor(user, playedGames, wonGames, lostGames, currStreak, maxStreak,
        row_0, row_1, row_2, row_3, row_4, row_5, game_state, last_game_state, nextday) {
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
    }

    createUserData() {
        // Uses names defined on class constructor to be localstorage's variables
        let userID = randInt(0, 60000)
        let insertValues = new Map([
            [this.user = userID],
            [this.playedGames, 0],
            [this.wonGames, 0],
            [this.lostGames, 0],
            [this.currStreak, 0],
            [this.maxStreak, 0],
            [this.row_0, 0],
            [this.row_1, 0],
            [this.row_2, 0],
            [this.row_3, 0],
            [this.row_4, 0],
            [this.row_5, 0],
            [this.game_state, 'active'],
            [this.last_game_state, ''],
            [this.nextday, ''],
        ])

        for (let value of insertValues) {
            localStorage.setItem(value[0], value[1])
        }
    };
};
// User check
// Need to add a document.addeventlistener on the end of the .js file to call below class's method
class UserChecks extends CreateUser {

    constructor(user, playedGames, wonGames, lostGames, currStreak, maxStreak,
        row_0, row_1, row_2, row_3, row_4, row_5, game_state, last_game_state, nextday, classname, attrib_name) {
        super(user, playedGames, wonGames, lostGames, currStreak, maxStreak,
            row_0, row_1, row_2, row_3, row_4, row_5, game_state, last_game_state, nextday);

        let dateObj = new Date()
        this.today = dateObj.getDate()

        this.classname = classname
        this.attrib_name = attrib_name
    };

    async checkExistUserData() {
        if (!localStorage.getItem(this.user)) {
            this.createUserData()
            // It's better to create a separate class to deal with user since this class constructor deals mainly with DOM
            // It also needs to get some data from localstorage, but for the sake of organization, lets assume another class
            // will set up the correct localstorage names and we're only using those names here instead of this.name. 

            // something like
            //
            // new user = CreateUser() -> instantieate another class JUST to create user
            // user.createuserdataorsomethinglikethis() ->sets up localstorage names
            // or use super()
            localStorage.setItem(this.nextday, this.today + 1) // might run into issue of js adding str to int, we'll see. this.local_nextday will be changed to
            // localstorage name instead of this.name
        } else {
            // get last game results from saved localstorage
            let get_states = JSON.parse(localStorage.getItem(this.last_game_state)) // this.local_lastgamsate will be changed to localstorage name instead of this.name
            let charElements = document.getElementsByClassName(this.classname)

            await new Promise((resolve, reject) => setTimeout(resolve, 2000))

            for (let entry = 0; entry < Object.keys(get_states).length; entry++) {
                await new Promise((resolve, reject) => setTimeout(resolve, 25))
                charElements[entry].removeAttribute(this.attrib_name)
                await new Promise((resolve, reject) => setTimeout(resolve, 25))
                charElements[entry].setAttribute(this.attrib_name, get_states[entry][1])
                charElements[entry].innerHTML = get_states[entry][0]
            }
        }
    };

    randInt(start, end) {
        let percent = Math.random();
        let num = Math.floor(percent * (Math.floor(end) - Math.ceil(start) + 1) + start)

        return num
    }

};

// constructor(local_user, local_nextday, local_lastgamestate, classname, attrib_name)

// DOM Listeners
let startCheckGame = new StartChecks()
document.addEventListener("DOMContentLoaded", function () { startCheckGame.initGame() }, false);
let userGame = new UserChecks('user', 'nexday', 'last_game_state', 'char', 'style')
document.addEventListener("DOMContentLoaded", function () { userGame.checkExistUserData() }, false);


