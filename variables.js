/*
Conceitos basicos de JS



### Declarar Variáveis!!! ###

Ao contrário do python que vc só chega e  x = 5, 
no js isso não funciona. Vc em que dizer pro js que tipo
de variavel é (var, let, const)

Então vc pode fazer de dois jeitos, primeiro declarando tudo antes 
de usar

let x, y, z
var x, y, z
const x, y, z

ou tudo junto ja 'assigning' valores

let x = 5
var casa = 'grande'
const arr = ['pera', 'maca']




### Bloco de execução ###

No python, o bloco é definido com identação

for i in range(10)
    print(i) ===>> identação

No js, é o ';'

for (let i = 0; i < 10, i++) {
    console.log(i);
}



### int + string vai ser string no js ###

const x = 5
const y = 'domino'

const z = x + y
vai 'printar' 5domino



### Operadores ###

Todos os operadores são mais ou menos iguais no python. 
Os aritimeticos são quase iguais (soma, potencia, etc)
Os de assignment idem, quase iguais

Os de comparison são iguais, mas tem 2 especiais
=== e !==

== e != compara se os valores são iguais ou não, igual python, com 
a diferença que ele não diferencia "5" de 5

=== e !== compara se os valores e os tipos são iguais

*/
const x = 5;
const y = 7;
const z = x + y;
console.log(z);
console.log("=".repeat(50));

const num1 = 5
const word1 = 'domino'

const result = num1 + word1
console.log(result)

var var1 = 5
var var2 = "5"

