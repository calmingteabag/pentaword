# Program flow

<!-- Global vars set -->
    
<!-- document.AddEventListener -> 
    startCheck
        check if currente date = localStorage date, sets game state to active
        bumps nextday counter by 1 -->

document.AddEventListener -> 
    rowGLowAnimate
        animates all char tiles

document.AddEventListenr -> 
    addCharListener(element class, id name) 
        get list of elements of that class
        loop through then to add -> 
            getKeyPress 
                locate row
                populates row
                push gotten char to arr

document.delCharListener ->
    delCharListener(element class) -> 
        delChar
            locate char row
            locate char pos
            set innerHTML to ''
            remove from arr

document.checkWordListener ->
    subWord ->
        checkWord ->
            compares words, adds visuals
        saveEndGameVisuals ->
            saves visuals to localstorage

document.exitStatListener ->
    closeStat ->
        set stat window to hidden

document.showStatsListener ->
    statToggle -> 
        showStat -> set state to visible
            populateInfo ->
                fills stat window
            closestat ->
                set stat windows to hidden

document.addEventListener (on keyup, not on domcontentload) ->
    keyPressAlpha ->
        gets user pressed key on keyboard

document.addEventListener ->
    checkExistUserData ->
        if no data on localstorage ->
            createUserData ->
                map values and store then on localstorage

document.addEventListener ->
    dailywordchange ->
        changes daily word 

document.addEventListener -> executes with setInterval
    showTimerDOM -> timer for next game






