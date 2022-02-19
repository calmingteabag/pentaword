class Hololive {
    constructor() {
        this.holoElement = document.getElementById('divid')
    }

    getthisObject() {
        console.log(this.holoElement)
        console.log(typeof this.holoElement)
    }


    correrSwitch() {
        if (document.getElementById('divid').innerHTML == "CORRE") {
            document.getElementById('divid').innerHTML = "WAIFU"
        } else {
            document.getElementById('divid').innerHTML = "CORRE"
        }
    };

    addCorrer() {
        let divGlobal = document.getElementById('divid')
        divGlobal.addEventListener("click", () => { this.correrSwitch() }, false);
    };
    addtoDOMArrow() {
        let cali = new Hololive()
        document.addEventListener("DOMContentLoaded", () => { cali.addCorrer() }, false);
    };
    addtoDOMFunction() {
        let kiara = new Hololive()
        document.addEventListener("DOMContentLoaded", function () { kiara.addCorrer() }, false);
    };
};

// usar um metodo pra adicionar o listener quando a pagina abrir dá erradp
// E se tirar do metodo e fazer um 
// document.addEventListener("DOMContentLoade", objeto.metodo) por fora da funcao?

let gura = new Hololive()
// document.addEventListener("DOMContentLoaded", () => { gura.addCorrer() }, false)
// document.addEventListener("DOMContentLoaded", () => { gura.addCorrer() }, false)
gura.addtoDOMArrow()


// gura.getthisObject()
// gura.addToDOMFunction()
// gura.addToDOMArrow()
// gura.getthisObject()

// function getthisObject() {
//     document.getElementById('divid').innerHTML = this
// }
// document.addEventListener("DOMContentLoaded", getthisObject, false);

// let outElement = document.getElementById('divid')
// console.log(outElement)
// console.log(typeof outElement)
/*
Step 1 - Define a function that does something()
Step 2 - Define a function that adds something() to a DOM
Step 3 - Make 'Step 2' run on page load, so something() is ran, adding events to their dom
*/
// function correrSwitch() {
//     if (document.getElementById('divid').innerHTML == "CORRE") {
//         document.getElementById('divid').innerHTML = "WAIFU"
//     } else {
//         document.getElementById('divid').innerHTML = "CORRE"
//     }
// };

// function addCorrer() {
//     let divGlobal = document.getElementById('divid')
//     divGlobal.addEventListener("click", () => { correrSwitch() }, false);
// }

// document.addEventListener("DOMContentLoaded", addCorrer, false);


