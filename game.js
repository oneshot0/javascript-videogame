
const $ = (selector) => document.querySelector(selector);

const canvas = /** @type {HTMLCanvasElement} */ ($('#game'));
const game = canvas.getContext('2d');
const btnUp = $('#up');
const btnLeft = $('#left');
const btnRight = $('#right');
const btnDown = $('#down');

let canvasSize;
let elementSize;

const playerPosition = {
  x: undefined,
  y: undefined,
};

 //Clase 12 : OBJETO regaloPosition
const giftPosition = {
  x: undefined,
  y: undefined,
};

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);


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


  canvas.setAttribute('width', canvasSize)
  canvas.setAttribute('height', canvasSize)
  
  // Aquí dividimos el canvasSize por la cantidad de elementos a insertar
  elementSize = canvasSize /10.3 ;
  startGame();
}

function startGame() {
  // game.loquesea()
  console.log({canvasSize, elementSize});
  game.font = `${elementSize}px arial`;
  game.textAlign = '';

  const map = maps[0 ];
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split('')); 
  console.log({map, mapRows, mapRowCols});
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
          console.log({playerPosition});
        }
  // Ubicar posición del regalo (clase 12)
      }else if (col == 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      }


      game.fillText(emoji, posX , posY)
      // console.log({row, rowI, col, colI});
    });    
  });
  movePlayer()
  //filas y columnas VERSION 0.1-----------------
  // for (let row = 1; row <= 10; row++) {
  //   for (let col = 0; col < 10; col++) {
  //     game.fillText(emojis[mapRowCols[row - 1][ col]], elementSize* col , elementSize* row);
  //   }
  // }
};

function movePlayer() {
  const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3)
  const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3)
  const giftCollision = giftCollisionX && giftCollisionY

  console.log({giftCollisionX, giftCollisionY});

  if (giftCollision) {
    console.log( 'Subiste de nivel!!!');
  }

  game.fillText(emojis['PLAYER'],playerPosition.x, playerPosition.y);
    
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
    if ((playerPosition.y - elementSize) < elementSize ) {
        console.log("OUT");
    } else {
      playerPosition.y -= elementSize;
      startGame()
    }
}
function moveLeft() {
    if ((playerPosition.x - elementSize) < elementSize ) {
        console.log("OUT");
    } else {
      playerPosition.x  -= elementSize;
      startGame()
    }
}
function moveRight() {
    if ((playerPosition.x + elementSize) > canvasSize -elementSize ) {
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


