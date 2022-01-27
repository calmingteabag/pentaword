const word = 'panda';
let arr = '';

function checkWord() {
    let index = 0
    let result = ''
    for (let char of arr) {
        if (word.includes(char)) {
            result += 'green';
        } else {
            result += 'red';
        }
        // if (word.includes(char)) {
        //     if (char == word[index]) {
        //         result += 'green';
        //         index++;
        //     } else {
        //         result += 'yellow';
        //         index++;
        //     }

        // } else {
        //     result + 'red';
        //     index++;
        // }
    };

    document.getElementById('test').innerHTML = result;
    console.log(result)
};

function getKeypress() {
    const getelements = document.getElementsByClassName('keybutton');
    let elementvalue = getelements[0].attributes[3].value;
    document.getElementById('test').innerHTML = elementvalue;

    if (arr.length < 5) {
        arr += elementvalue;
    } else {
        document.getElementById('valor').innerHTML = arr;
    }
};





    // add current key to key position in html


