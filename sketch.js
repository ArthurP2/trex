var trex, trex_correndo, trex_colidiu, bordas, solo, solo_invisivel;

var imagemdosolo;

var rand;

var nuvem, imagem_nuvem 
var obstaculo, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6 ;

var pontuacao = 0; 

var JOGAR = 1;

var ENCERRAR = 0;

var estadojogo = JOGAR;

var grupo_nuvens, grupo_obstaculos;

var game_over, reiniciar;
var imagem_game_over, imagem_reinciar;

var som_salto, som_morte, som_CheckPoint;

function preload(){
//carregando animações 
  trex_correndo =                  loadAnimation("trex1.png","trex3.png","trex4.png");
  imagemdosolo = loadImage("ground2.png");
  imagem_nuvem = loadImage("cloud.png");
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  trex_colidiu = loadAnimation("trex_collided.png");
  imagem_game_over = loadImage("gameOver.png");
  imagem_reiniciar = loadImage("restart.png");
  som_salto = loadSound("jump.mp3");
  som_morte = loadSound("die.mp3");
  som_CheckPoint = loadSound("checkPoint.mp3");
}

function setup(){
  createCanvas(WindowWidth,WindowHeight);
  
  // criando o trex 
  trex = createSprite(50,height-70,20,50);
  
  // criando o solo
  solo = createSprite(200,170,600,10);
  
  game_over = createSprite(300,100,200,200);
  
  reiniciar = createSprite(300,140);
  
  //animação no threx
  solo_invisivel = createSprite(width/2,height-10,600,10);
  solo_invisivel.visible = false;
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided", trex_colidiu)
  
  //grupo de nuvens e obstaculos 
  grupo_nuvens= createGroup();
  grupo_obstaculos= createGroup();
  
  // colocando animação do solo
  solo.addImage("ground",imagemdosolo);
  
  game_over.addImage("Fim",imagem_game_over);
  game_over.scale = 0.5
  
  reiniciar.addImage("restart",imagem_reiniciar);
  reiniciar.scale = 0.5
  
  // determinando a posição do solo 
  solo.x = solo.width/2;
  
  // criando limites 
  bordas = createEdgeSprites();
  
  // adicionando escala e posição ao trex
  trex.scale = 0.5;
  trex.x = 50;

  trex.setCollider("circle",0, 0, 40);
  trex.debug = true;
  
}


function draw(){
  // definir cor de fundo
  background("white");
  
  console.log(estadojogo);
  
  text("Pontuação: " +pontuacao, 450,30);
  
  // registrando a posição y do trex
  //console.log(trex.y)
  
  if(estadojogo === JOGAR){
    
    // adicionado gravidade
    trex.velocityY = trex.velocityY + 0.5;
    trex.velocityX = 0
  
    // fazendo o solo se movimentar
    solo.velocityX = -(3+pontuacao/200); 
    frameRate()
    pontuacao = pontuacao + Math.round(frameCount / 80)
    
    // tornando o solo infinito 
    if(solo.x < 0 ) {
    solo.x = solo.width/2
    };
      
    gerar_nuvens();
    gerar_obstaculos();
    
    if(grupo_obstaculos.isTouching(trex)){
      som_morte.play();
      estadojogo = ENCERRAR;
      
    }  
      // o trex pula quando a tecla espaço é acionada 
  if(touches.length>0||(keyDown("space")) && trex.y >= height-120 ){
    trex.velocityY = -8; 
    som_salto.play();
    touches=[ ]
  
  };
    game_over.visible = false
    reiniciar.visible = false
    if(pontuacao>0 && pontuacao% 100 ===0){
       //som_CheckPoint.play();
       }
    
  }
  
  
  
  else if (estadojogo === ENCERRAR){
    
     solo.velocityX = 0;
    
     grupo_obstaculos.setVelocityXEach(0);
    
     grupo_nuvens.setVelocityXEach(0);
    
     grupo_obstaculos.setLifetimeEach(-1)
    
     grupo_nuvens.setLifetimeEach(-1)
    
     trex.changeAnimation("collided", trex_colidiu)
    
     game_over.visible = true
    
     reiniciar.visible = true
     if (mousePressedOver(reiniciar)){
       reset()
       //console.log("test")
     }
  }

  
  rand=Math.round(random(1,100));
  //console.log(rand)
  
  
  // impedir o trex de cair 
  trex.collide(solo_invisivel)
  drawSprites();

}
function reset(){
  estadojogo = JOGAR
  game_over.visible = false
  reiniciar.visible = false
  grupo_obstaculos.destroyEach();
  grupo_nuvens.destroyEach();
  pontuacao = 0 
  trex.changeAnimation("running",trex_correndo)
}
 function gerar_nuvens (){
    if(frameCount % 60 === 0){
    nuvem=createSprite(600,100,40,10)
    nuvem.addImage(imagem_nuvem)
    nuvem.scale = 0.5
    nuvem.y = Math.round(random(10,100))
    nuvem.velocityX = -3
    nuvem.depth = trex.depth
    trex.depth = trex.depth + 1
    console.log(trex.depth)
    console.log(nuvem.depth)
    
  nuvem.lifetime = 180
  grupo_nuvens.add(nuvem)
  }  
}
function gerar_obstaculos (){
  if(frameCount % 80 === 0 ){
  obstaculo=createSprite(600,160,10,40)  
  obstaculo.velocityX = -(5+pontuacao/100)
  var rand = Math.round(random(1,6))  
  switch (rand){
    case 1: obstaculo.addImage(obstaculo1)
    break
    case 2: obstaculo.addImage(obstaculo2)
    break
    case 3: obstaculo.addImage(obstaculo3)
    break
    case 4: obstaculo.addImage(obstaculo4)
    break
    case 5: obstaculo.addImage(obstaculo5)
    break
    case 6: obstaculo.addImage(obstaculo6)
    break
    default: break
  }
    obstaculo.scale = 0.6
    obstaculo.lifetime = 130
    grupo_obstaculos.add(obstaculo); 
    obstaculo. 
  }
}