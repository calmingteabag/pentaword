function testFunction() {
    document.getElementById("testscript").innerHTML = "Changed!!";
};

// function randomColorGet() {
//     let r, g, b;
//     r = Math.random() * (0 - 256) + min;
//     g = Math.random() * (0 - 256) + min;
//     b = Math.random() * (0 - 256) + min;
// };

function randomColorText() {
    let r = Math.random() * 256;
    let g = Math.random() * 256;
    let b = Math.random() * 256;
    document.getElementById("testscript").style.color = `rgb(${r}, ${g}, ${b})`;
};

function randomColorBackground() {
    let r = Math.random() * 256;
    let g = Math.random() * 256;
    let b = Math.random() * 256;
    document.getElementById("testscript").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
};

function randomTextSize() {
    randsize = Math.random() * (10, 50);
    document.getElementById("testscript").style.fontSize = `${randsize}px`;
}

function randomColor() {
    randomColorText();
    randomColorBackground();
    randomTextSize();
};

function showCoords(event) {
    let x = event.clientX;
    let y = event.clientY;
    let xy_coords = "X=" + x + ' ' + "Y=" + y
    document.getElementById("coords").innerHTML = xy_coords
};

function toCelcius() {
    var celciustemp = document.getElementById("getdata").value;
    var celcius = (celciustemp - 32) / 1.8;
    document.getElementById('result').innerHTML = `Current temp in celcius is ${celcius} C`
};

// function randomColorText2() {
//     let r = Math.random() * 256;
//     let g = Math.random() * 256;
//     let b = Math.random() * 256;
//     document.getElementById("result").style.color = `rgb(${r}, ${g}, ${b})`;
// };

function toCelciusRandColor() {
    toCelcius();
    // randomColorText2();
};