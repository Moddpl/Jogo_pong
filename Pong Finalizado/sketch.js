// variaveis bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 16;
let raio = diametro / 2
let colidiu = false;

// velociade bolinha
let velocidadeXBolinha = 6
let velocidadeYBolinha = 6

// variaveis raquete
let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;

// velocidade raquete
let velocidadeXRaquete = 5;
let velocidadeYRaquete = 150;

// variaveis raquete Do Oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//placar
let meusPontos = 0;
let oponentePontos = 0;

//Sons jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrarBolinha();
  movimentoBolinha();
  colisaoBorda();
  mostrarRaquete(xRaquete, yRaquete); //Raquete do player
  movimentoRaqueteP();
  //colisaoRaqueteP();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete); //Colisão Playet
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente); //Raquete bot
  movimentoRaqueteO();
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente); // Colisão bot
  placar();
  adicionarPontos();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
}

function colisaoRaquete(){
  
  if (xBolinha - raio < xRaquete + larguraRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete ){
    
    velocidadeXBolinha *= -1
  }
}


function mostrarRaquete(x, y){
  
  rect (x, y, larguraRaquete, alturaRaquete);

}



function mostrarBolinha () {
  // Bolinha (X, Y, Diametro)
  circle(xBolinha, yBolinha, diametro);
  
}

function movimentoBolinha(){ 
  
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
  
}

function colisaoBorda () { 

//se estiver tocando a borda
  
  if (xBolinha + raio > width || xBolinha - raio < 0 ) {
    
    velocidadeXBolinha *= -1;
    
  }
  
  
  if (yBolinha + raio > height || yBolinha - raio < 0) { 
  
    velocidadeYBolinha *= -1;
  }
  
  
}

function movimentoRaqueteP (){ 
 
  if (keyIsDown(UP_ARROW)){ 
    yRaquete -= 10;
  } 
  
  if (keyIsDown(DOWN_ARROW)){ 
    yRaquete += 10;
  }
}

function colisaoRaqueteBiblioteca(x, y) {
  
colidiu = collideRectCircle(x,y,larguraRaquete,alturaRaquete,xBolinha,yBolinha,raio);
  
  if (colidiu) {
    
    velocidadeXBolinha *= -1;
    
    raquetada.play();
    
  }
  
}


function movimentoRaqueteO(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - larguraRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
  
}


function placar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(220, 20, 60));
  rect(150, 10, 40, 20); //player
  rect(450, 10, 40, 20); //oponente
  
  fill(255);
  text(meusPontos, 170, 26);
  text(oponentePontos, 470, 26 );
}


function adicionarPontos(){
  
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    oponentePontos += 1;
    ponto.play();
  }
}


function calculaChanceDeErrar() {
  if (oponentePontos >= meusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35;
    }
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha + raio > 600){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
}