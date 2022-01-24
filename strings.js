let x = "the smiths";
console.log(x.length);

// let txt1 = "smith "maniac" johanson"
let txt1 = "smith \"maniac\" johanson";
// usar o \"  faz o js colocar o caractere " inves de ler como string
console.log(txt1)

let example = "kono isekai warui";
let txt_slice = example.slice(2, 8);
console.log(txt_slice);
// slice(start, stop)

let arr = Array.from(example);
console.log(arr);

let arr2 = example.split(' ');
console.log(arr2)
// create array from string, specifies separator

let num1 = 456;
console.log(num1.toString())
// converts int to string


