const paises = ['Brasil', 'Canada', 'Japão']
console.log(paises.length)

console.log(paises[0])
// first element
console.log(paises[paises.length - 1])
// last element. Indexes are always numbers for indexes purposes in js

paises.forEach(function (item, index, array) {
    console.log(item, index);
});
// works as python's for i in enumerate(array)

for (let x of paises) {
    console.log(x);
}

var map = new Map([[1, 2], [2, 3]]);
console.log(map)

var object = {
    index: 1,
    name: "carl",
    height: 1.65
};

console.log(object)