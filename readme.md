# Bem vindo ao Pentaworld, um clone do Wordle/Letreco. 

## Experiencia pessoal com o projeto

Quando tive a idéia de fazer meu clone do Wordle/Letreco, já existiam alguns tutoriais de como construir o jogo, mas todos muito confusos ou muito longos. Juntando o fato de eu acreditar que tutoriais não ensinam quase nada, exceto mostrar que é possivel fazer algo com alguma coisa, resolvi tentar sozinho fazendo meio que um reverse engineering do jogo. Queria aprender javascript no processo, então meus parametros pra escrever foram, usar só vanilla JS/HTML/CSS e um minimo de backend só pra deploy o projeto em algum lugar (atualmente com Django pois só sei usar ele). Conheço a existencia de React, Vue, Angular, NodeJS pra backend, mas fica para um próximo projeto.
O codigo ficou um macarronico sem amarrar as coisas em classes e tem muita repetição de variaveis que pegam dados de um mesmo lugar toda hora, que seria resolvido com um simples this.valor. Só fui perceber o tamanho da encrenca depois de 4/5 do projeto andado e refatorar tudo para OOP a essa altura é demais. Aprendi na pele a importancia da parte de gastar mais tempo planejando.

Dito isso, foi um puta, mas um puta desafio pra quem até agora só tinha feito umas paginas estáticas usando Django. Js é muito diferente, já que ele mexe diretamente com DOM. Aprendi infinitamente mais quebrando a cabeça nesse projeto do que aprenderia se ficasse vendo milhões de tutoriais na internet. Por exemplo, eu queria fazer com que, assim que o usuario digitasse uma letra, ela fosse
colocada nos quadradinhos. Então eu parava e "ok, tenho que ler que letra o usario aperta, como se faz isso?". Depois "ok, agora essa letra tem que ir pro HTML, como faço pra modificar o texto de uma tag?" e indo desse jeito, no final do caminho, acabei aprendendo várias, mas várias coisas sobre javascript.




## Info pra mim

Terminei a parte do timer bonitinho e de salvar o estado do ultimo jogo
Porem percebi que o reset do jogo não funciona com ele setado pra 00:00:00 pois o jogo precisa tar aberto e rodando no navegador pra ele resetar, mas o jogador não vai ficar com ele aberto só pra poder jogar depois do reset. Então preciso de um outro jeito dele resetar sem ser checando a hora. Talvez o dia? 

Sobrou só o esquema do jogo pegar uma palavra random. Idéia, pelo que li, é usar um fetch api pq PARECE que ele funfa como beautifulsoup do python. Vamos ver.
