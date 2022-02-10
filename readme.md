# Bem vindo ao Pentaworld, um clone do Wordle/Letreco. 

## Experiencia pessoal com o projeto

Quando tive a idéia de fazer meu clone do Wordle/Letreco, já existiam alguns tutoriais de como construir o jogo, mas todos muito confusos ou muito longos. Juntando o fato de eu acreditar que tutoriais não ensinam quase nada, exceto mostrar que é possivel fazer algo com alguma coisa, resolvi tentar sozinho fazendo meio que um reverse engineering do jogo. Queria aprender javascript no processo, então meus parametros pra escrever foram, usar só vanilla JS/HTML/CSS e um minimo de backend só pra deploy o projeto em algum lugar (atualmente com Django pois só sei usar ele). Conheço a existencia de React, Vue, Angular, NodeJS pra backend, mas fica para um próximo projeto.

Dito isso, foi um puta, mas um puta desafio pra quem até agora só tinha feito umas paginas estáticas usando Django. Js é muito diferente, já que ele mexe diretamente com DOM. Aprendi infinitamente mais quebrando a cabeça nesse projeto do que aprenderia se ficasse vendo milhões de tutoriais na internet. Por exemplo, eu queria fazer com que, assim que o usuario digitasse uma letra, ela fosse
colocada nos quadradinhos. Então eu parava e "ok, tenho que ler que letra o usario aperta, como se faz isso?". Depois "ok, agora essa letra tem que ir pro HTML, como faço pra modificar o texto de uma tag?" e indo desse jeito, no final do caminho, acabei aprendendo várias, mas várias coisas sobre javascript.


## Info pra mim

Terminei a parte do timer pro jogo resetar cada 24 horas. 
Agora preciso fazer um timer pra dizer pro usuario quanto tempo até a proxima jogada.

Descobri uma função chamada setInterval(função, tempo), que ele executa uma função a cada tempo (em milisegundos)
Se o tempo anda em segundos...um inetervalo de 1000ms, faz a função ser executada a cada segundo, ou seja, meio que
um cronometro.

E acho que consigo ver dois jeitos, que é primeiro a cada segundo a função pegar a hora local e ir exibindo ou, ele pegar
uma vez a hora e a cada vez que o setinterval chama a função, ele desconta 1 segundo, até chegar meia noite.




Sobre o jogo carregar a palavra do dia: Vou usar beautifulsoup pra scrap a pagina especifica do dicio (que mostram palavras de 5 letras.
Na hora de pegar a palavra, fazer um check se tem letras repetidas, pra ele pegar de novo










