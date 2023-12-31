
const $ = (selector) => document.querySelector(selector);

const canvas = /** @type {HTMLCanvasElement} */ ($('#game'));
const game = canvas.getContext('2d');
const btnUp = $('#up');
const btnLeft = $('#left');
const btnRight = $('#right');
const btnDown = $('#down');
const spanLives = $('#lives');
const spanTime = $('#time');
const spanRecord = $('#record');
const pResult = $('#result')
//PANTALLA DE INICIO
const welcomeCard = $('.welcome-message');
const initialGame = $('#initial-play');
//PANTALLA DE nuevo RECORD
const newRecordCard = $('.message--record');
const newRecordPlace = $('.new--record');
const playAgainButton1 = $('#record-play-again');
//Pantalla de victoria SIN RECORD
const victoryCard = $('.win-without-record');
const playAgainButton2 = $('#record-play-again2');
//Pantalla de derrota por vidas
const defeatCard = $('.message--defeat');
const playAgainButton3 = $('#record-play-again3');


let canvasSize;
let elementSize;
// CLASS 14 : creamos la variable para el cambio de niveles 
let level = 0;
// CLASS 15 : creamos la variable para las vidas
let lives = 3;
//Class 17  Variables para medir el tiempo 
let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
  x: undefined,
  y: undefined,
};

 //Clase 12 : OBJETO regaloPosition
const giftPosition = {
  x: undefined,
  y: undefined,
};
// Class 13 : Creando arreglo de enemigos
  let enemyPositions = [];

//Incorporando fuego en las colisiones
let firePosition = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

playAgainButton1.addEventListener('click', playAgain);
playAgainButton2.addEventListener('click', playAgain);
playAgainButton3.addEventListener('click', playAgain);

function playAgain() {
  newRecordCard.classList.add('inactive');
  timeStart= null;
  location.reload();
  
}




function setCanvasSize() {
  // if (window.innerHeight > window.innerWidth) {
  //   canvasSize = window.innerWidth * 0.8;    
  // } else {
  //   canvasSize= window.innerHeight * 0.8;
  // }
  canvasSize =
    window.innerHeight > window.innerWidth
      ? window.innerWidth * 0.8
      : window.innerHeight * 0.8;

  canvasSize = Number(canvasSize.toFixed(0));

  canvas.setAttribute('width', canvasSize)
  canvas.setAttribute('height', canvasSize)
  
  // Aquí dividimos el canvasSize por la cantidad de elementos a insertar
  elementSize = canvasSize /10.3 ;
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  welcome();
}

function startGame() {
  // game.loquesea()
  console.log({canvasSize, elementSize});
  game.font = `${elementSize}px arial`;
  game.textAlign = '';

  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }
//class 17 : condicional  para saber que empezamos a jugar  y a correr el tiempo
  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime,100); 
  //Class 19  creamos la función para que nos muestre el record
  showRecord()
  }

  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split('')); 
  
//Class 16 mandamos a llamar a la función 
  showLives();

// Class 13  Limpiamos nuestro arreglo  
  enemyPositions = [];  

//Nos ayuda a limpiar el mapa 
  game.clearRect(0,0,canvasSize, canvasSize);

  //filas y columnas VERSIÓN 0.2 ----------------
  mapRowCols.forEach((row, rowI) =>  {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI)
      const posY = elementSize * (rowI + 1)

  // Colocamos un doble condicional para actualizar las coordenadas y no redefinirlas en su posición inicial
      if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          // console.log({playerPosition});
        }
  // Ubicar posición del regalo (clase 12)
      }else if (col == 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
  // Ubicar la posición de la bombita y asigarla (Class 13 )
      }else if (col == 'X') {
        enemyPositions.push({
          x: posX,
          y: posY,
        });
      }
  //


      game.fillText(emoji, posX , posY)
      // console.log({row, rowI, col, colI});
    });    
  });
  movePlayer()

  firePosition.forEach( fire => game.fillText(emojis['BOMB_COLLISION'],fire.x,fire.y));
  //filas y columnas VERSION 0.1-----------------
  // for (let row = 1; row <= 10; row++) {
  //   for (let col = 0; col < 10; col++) {
  //     game.fillText(emojis[mapRowCols[row - 1][ col]], elementSize* col , elementSize* row);
  //   }
  // }
}

function movePlayer() {
  const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3)
  const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3)
  const giftCollision = giftCollisionX && giftCollisionY

  console.log({giftCollisionX, giftCollisionY});

// Class 14 : Usamos la condicional para ejecutar la función LEVELWIN()
  if (giftCollision) {
    // console.log( 'Subiste de nivel!!!');
    levelWin();
  }
// Class 13 Detectando colisiones con el método find
  const enemyCollision = enemyPositions.find(enemy => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    
    return enemyCollisionX && enemyCollisionY;
  });
  

  if (enemyCollision) {
    // console.log('Hubo colisió!!! :c');
    firePosition.push({x:playerPosition.x.toFixed(3), y:playerPosition.y.toFixed(3)});
    renderizarFire();
    levelFail();
  }

  game.fillText(emojis['PLAYER'],playerPosition.x, playerPosition.y);
    
}
function renderizarFire(){
  game.fillText(emojis['BOMB_COLLISION'],firePosition.x,firePosition.y)
}


function levelWin() {
  console.log('Subiste de nivel!!');
  level++;
  firePosition = [],
  startGame();
}

function levelFail() {
  console.log('Chocaste contra una bomba BOOM!!!');
  lives--;


  if (lives <= 0) {
    level = 0;
    lives = 3;
    //Class 17  Reseteamos el tiempo.
    timeStart = undefined;
    firePosition = []
    defeatCard.classList.remove('inactive');
  }
  
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}



//Class 19  Creamos la función showRecord
function showRecord() {
  spanRecord.innerHTML = formatTime(localStorage.getItem('record'));
}

function gameWin() {
  console.log('TERMINASTE EL JUEGO !!!');
  //class 17 : Al terminar el juego colocamos un clearInterval para finalizar el tiempo 
  clearInterval(timeInterval);
  
//Class 19 Empezamos a crear las variables para los tiempos 
  const recordTime = localStorage.getItem('record');
  const playerTime = Date.now() - timeStart;
  window.removeEventListener('keydown', moveByKeys);
  
  if (recordTime) {    
    if (recordTime  >= playerTime) {
      localStorage.setItem('record', playerTime);
      pResult.innerHTML = 'SUPERASTE EL RECORD !! 🥳🍻';
      newRecordCard.classList.remove("inactive");
      newRecordPlace.innerHTML = formatTime(recordTime);
    }else {
      pResult.innerHTML = 'No superaste tus límites 😔';
      victoryCard.classList.remove('inactive');
    }
  } else {
    localStorage.setItem('record', playerTime);
    victoryCard.classList.remove('inactive');
  }


    // if (localStorage.length == 0) {
    //   localStorage.setItem('record',playerTime);
    //   victoryCard.classList.remove('inactive');
      
    // }
  
    
  console.log({recordTime, playerTime});
}

//Class 15  Creamos una función para volver a colocar las posiciones UNDEFINED

//Class 16 Función para mostrarle al jugador cuantas vidas le quedan
function showLives() {
  // me crea un array con mi variable LIVES  [1,2,3]
  const heartsArray =  Array(lives).fill(emojis['HEART']);
  console.log(heartsArray);  
  
  spanLives.innerHTML = ""; // lIMPIAMOS las vidas cada vez que recarguemos
  heartsArray.forEach(heart => spanLives.append(heart));
  // spanLives.innerHTML =  emojis['HEART'];
}

//Class Función para mostrar el tiempo del jugador 
function showTime() {
  spanTime.innerHTML = formatTime(Date.now() - timeStart);
}

function formatTime(ms){
    const cs = parseInt(ms/10) % 100
    const seg = parseInt(ms/1000) % 60
    const min = parseInt(ms/60000) % 60
    const csStr = `${cs}`.padStart(2,"0")
    const segStr = `${seg}`.padStart(2,"0")
    const minStr = `${min}`.padStart(2,"0")
    return`${minStr}:${segStr}:${csStr}`
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    const moveFunctions = {
        ArrowUp: moveUp,
        ArrowLeft: moveLeft,
        ArrowRight: moveRight,
        ArrowDown: moveDown
      };
    
      const moveFunction = moveFunctions[event.key];
      console.log({moveFunction});
      if (moveFunction) {
        moveFunction();
      }
}

// function moveByKeys(event) {
//   if (event.key == 'ArrowUp') moveUP();
//   else if (event.key == 'ArrowLeft') moveLeft();
//   else if (event.key == 'ArrowRight') moveRight();
//   else if (event.key == 'ArrowDown') moveDown();
  
// }
function moveUp() {
    if ((playerPosition.y - elementSize) <= 0 ) {
        console.log("OUT");
    } else {
      playerPosition.y -= elementSize;
      startGame()
    }
}
function moveLeft() {
    if ((elementSize + playerPosition.x ) <= elementSize ) {
        console.log("OUT");
    } else {
      playerPosition.x  -= elementSize;
      startGame()
    }
}
function moveRight() {
    if ((playerPosition.x + elementSize) >= canvasSize - elementSize ) {
        console.log("OUT");
    } else {
      playerPosition.x  += elementSize;
      startGame()
    } 
}
function moveDown() {
    if ((playerPosition.y + elementSize) > canvasSize ) {
        console.log("OUT");
    } else {
      playerPosition.y  += elementSize;
      startGame()
    } 
}

function welcome() {
  welcomeCard.classList.remove('inactive');
}
initialGame.addEventListener('click', initial);

function initial() {
  welcomeCard.classList.add("inactive");
  timeStart = null;
  startGame();
}


