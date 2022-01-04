//parametros da bola
 let bolaEixoX = 345;
 let bolaEixoY = 420;
 let bolaDiam = 10;
 let bolaRaio = bolaDiam/2;
 let velocidade = 5;
 let velocidadeXDaBola = velocidade;
 let velocidadeYDaBola = velocidade;
  
//placar inicial
 let placarJogador1 = 0;
 let placarJogador2 = 0;
  
//parametros do gol para verificar fezGol()
 let posicaoXDosGols = [12,680]; 
 let posicaoYDosGols = 390;
 let larguraDosGols = 5;
 let alturaDosGols = 50;
   
// parametros das raquetes indices 0,1,jogador1; indices 2,3 jogador2
 let raquetesDosJogadoresEixoX = [130,445,250,560];
 let raquetesDoJogador1EixoY = 370;
 let raquetesDoJogador2EixoY = 370;
 let larguraDasRaquetes = 10; 
 let alturaDasRaquetes = 90;
 let limiteSuperiorDaRaquete = 270;  
 let limiteInferiorDaRaquete = 470;
   
//variavel inicial da collideRectCircle()
 let colisao = false
   
//arrays usadas para desenhar e posicionar os elementos da arquibancada   
 let posicaoNaArquibancadaX = [195,180,170,150,140,0,440];
 let posicaoNaArquibancadaY = [105,110,170,150,175,220,220];
 let larguraNaArquibancada = [305,350,360,400,420,0,0];
 let alturaNaArquibancada = [65,75,15,75,75,0,0];
//indice 2 vazio nas arrays por que foi reaproveitado a array posicaoNaArquibancadaY na movimentarTorcida()
 let velocidadeDaTorcida = [0.3,0.6,true,0.5,0.4];
 let alturaMaximaDaTorcida= [100,105,true,150,170];
 let alturaMinimaDaTorcida = [105,110,true,155,175];

   
function preload(){
  imagemFundo = loadImage("imagens/fundoEstadio.png");
  torcedorAzul = loadImage("imagens/TimeAzul.png");
  torcedorVermelho = loadImage("imagens/TimeVermelho.png");
  torcedorPreto = loadImage("imagens/TimePreto.png");
  torcedorVerde = loadImage("imagens/TimeVerde.png");
  oferecimento = loadImage("imagens/Oferecimento.png");
  musicaDeFundo = loadSound("efeitos sonoros/musica de fundo.mp3");
  somDaTorcida = loadSound("efeitos sonoros/som da torcida.mp3");
  somDoChute = loadSound("efeitos sonoros/som do chute.mp3");
  gritoDeGol = loadSound("efeitos sonoros/grito de gol.mp3");
  elementosArquibancada = [torcedorAzul,torcedorVerde,oferecimento,torcedorVermelho,torcedorPreto,oferecimento,oferecimento];
}  
   
function setup() {
  createCanvas(700,650);
 musicaDeFundo.loop();
 somDaTorcida.loop();
}

function draw() {
  background(imagemFundo);  
  desenharBola();
  limitesDaBola();
  movimentarBola();
  desenharRaquetesDosJogadores();
  movimentarRaquetesDoJogador1();
  movimentarRaquetesDoJogador2();
  verificarColisaoComAsRaquetes();
  fezGol();
  desenharPlacar();
  desenharMarcacoesDoCampo();
  desenharGols();
  desenharArquibancada(); 
  movimentarTorcida();
}


function desenharBola(){
  fill(255);
  circle(bolaEixoX,bolaEixoY,bolaDiam);
}

function limitesDaBola(){
  if(bolaEixoY + bolaRaio > 565|| 
     bolaEixoY - bolaRaio < 270){
     velocidadeYDaBola *= -1
  }
   if(bolaEixoX + bolaRaio > 685||
      bolaEixoX - bolaRaio < 15){
      velocidadeXDaBola *= -1}
}

function movimentarBola(){
  bolaEixoY += velocidadeYDaBola;
  bolaEixoX += velocidadeXDaBola;
}

function posicaoInicialDaBola(){
  bolaEixoX = 345;
  bolaEixoY = 420;
}

function desenharRaquetesDosJogadores(){
  for(let i = 0 ;i<raquetesDosJogadoresEixoX.length;i++){
    if((i==0)||(i==1)){
       fill(color(0));
       noStroke();
       rect(raquetesDosJogadoresEixoX[i],raquetesDoJogador1EixoY,larguraDasRaquetes,alturaDasRaquetes);
       }  
   if((i==2)||(i==3)){
       fill(color(255,0,0));
      rect(raquetesDosJogadoresEixoX[i],raquetesDoJogador2EixoY,larguraDasRaquetes,alturaDasRaquetes);
    }
  }
}

function movimentarRaquetesDoJogador1(){
  if((keyIsDown(87))&&raquetesDoJogador1EixoY>limiteSuperiorDaRaquete){
    raquetesDoJogador1EixoY -= 10;
  }
  if((keyIsDown(83))&&raquetesDoJogador1EixoY<limiteInferiorDaRaquete){
     raquetesDoJogador1EixoY += 10;
  }
}
function movimentarRaquetesDoJogador2(){
  if((keyIsDown(UP_ARROW))&&raquetesDoJogador2EixoY>limiteSuperiorDaRaquete){
    raquetesDoJogador2EixoY -= 10;
  }
  if((keyIsDown(DOWN_ARROW))&&raquetesDoJogador2EixoY<limiteInferiorDaRaquete){
    raquetesDoJogador2EixoY += 10; 
  }
}

function verificarColisaoComAsRaquetes(){
  for(let i = 0 ;i<raquetesDosJogadoresEixoX.length;i++){
    let eixoX;
    if((i==0)||(i==1)){
      eixoX = raquetesDoJogador1EixoY;
    }
    if((i==2)||(i==3)){
      eixoX = raquetesDoJogador2EixoY;
    }
colisao = collideRectCircle( raquetesDosJogadoresEixoX[i],eixoX,larguraDasRaquetes,alturaDasRaquetes,bolaEixoX , bolaEixoY,bolaRaio);
  if(colisao){
    somDoChute.play();
    velocidadeXDaBola *= -1;
  }
 }
}

function fezGol(){
  for(let i = 0 ;i<posicaoXDosGols.length;i++){
colisao = collideRectCircle(posicaoXDosGols[i],posicaoYDosGols,larguraDosGols,alturaDosGols,bolaEixoX , bolaEixoY,bolaRaio);
 if(colisao){
    gritoDeGol.play();
    velocidadeXDaBola *= -1;
    posicaoInicialDaBola();
   if(i==0){
    placarJogador2+=1;}
    if(i==1){
      placarJogador1+=1;
   } 
  }
 }
}


function desenharPlacar(){
  textAlign(CENTER);
  stroke(255,165,0);
//retangulo maior do placar
  fill(color(169,169,169));
  rect(225,50,250,60,20);
//retangulo esquerdo do contador
  fill(color(25,25,112));
  rect(265,55,70,55,10);
//retangulo direito do contador
  fill(color(25,25,112));
  rect(365,55,70,55,10);
//retangulo do jogador1
  noStroke();
  fill(color(0));
  rect(230,75,25,25,5);
//retangulo do jogador2
  noStroke();
  fill(color(255,0,0));
  rect(445,75,25,25,5);
//letreiro esquerdo
  noStroke();
  fill(color(25,25,112));
  textSize(14);
  text("TIME",210,60,75);
//letreiro direito
  noStroke();
  fill(color(25,25,112));
  textSize(14);
  text("TIME",420,60,75);
//contadores
  fill(color(255));
  textSize(40);
  text(placarJogador2,400,95);
  text(placarJogador1,300,95);
// X do centro
  fill(color(0));
  textSize(45);
  text("X",350,100);
}

function desenharMarcacoesDoCampo(){ 
  stroke(255);
  strokeWeight(2);
  noFill();
  
//linha central do campo
  line(350,270,350,565);
  
//arcos do campo;1º superior esquerdo; 2º inferior esquerdo; 3º superior direito;4º inferior direito;5º arcoInterno esquerdo; 6ºarcoInterno direito;
  arc(15,270,25,25,0,1.6);
  arc(15,565,25, 25,11,12.5);
  arc(685,270,25,25, 1.6,9.3);
  arc(685,565,25,25,3.2,4.7);
  arc(90,420,50,70.3,4.9,7.7);
  arc(610,420,50,70.2,8,10.8);
  
//circulos do campo:1º central maior;2º central Menor;3º esquerdo;4º direito
  circle(350,420,90);
  circle(350,420,4);
  circle(70,420,4);
  circle(640,420,4);
  
//retangulos do campo:1º externo; 2º gol esq; 3º gol dir; 4º pequena area esq; 5º pequena area dir; 6 grande area esq; 7º grande area dir
  rect(15,270,670,295);
  rect(5,385,10,60);
  rect(685,385,10,60);
  rect(15,375,20,80);
  rect(665,375,20,80);
  rect(15,340,80,150);
  rect(605,340,80,150);
  
}

function desenharGols(){
  fill(255);
  rect(10,390,5,50);
  rect(685,390,5,50);  
}

function desenharElementos(elementosParaSeremDesenhados,posicaoX,posicaoY,largura,altura){
  for(let i=0; i<elementosParaSeremDesenhados.length; i++){
image(elementosParaSeremDesenhados[i],posicaoX[i],posicaoY[i],largura[i],altura[i]);}
 }

function movimentarEixoY(velocidade,posicaoY,alturaYMaxima,alturaMinima){
   for(let i = 0 ;i <velocidade.length; i++){
     posicaoY[i]+=velocidade[i];
  if(posicaoY[i] < alturaYMaxima[i]){
  velocidade[i] *= -1;}
  if(posicaoY[i] > alturaMinima[i]){
  velocidade[i] *= -1;}
   }
}

function desenharArquibancada(){
desenharElementos(elementosArquibancada,posicaoNaArquibancadaX,posicaoNaArquibancadaY,larguraNaArquibancada,alturaNaArquibancada);
}

function movimentarTorcida(){  movimentarEixoY(velocidadeDaTorcida,posicaoNaArquibancadaY,alturaMaximaDaTorcida,alturaMinimaDaTorcida);
}
