
const $ = (selector) => document.querySelector(selector);

const canvas = /** @type {HTMLCanvasElement} */ ($('#game'));
const game = canvas.getContext('2d');
const btnUp = $('#up');
const btnLeft = $('#left');
const btnRight = $('#right');
const btnDown = $('#down');

let canvasSize;
let elementSize;

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
  starGame();
}

function starGame() {
  // game.loquesea()
  console.log({canvasSize, elementSize});
  game.font = `${elementSize}px Arial`;
  game.textAlign = 'start';

  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split('')); 
  console.log({map, mapRows, mapRowCols});

  //filas y columnas VERSIÓN 0.2 ----------------
  mapRowCols.forEach((row, rowI) =>  {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI)
      const posY = elementSize * (rowI + 1)
      game.fillText(emoji, posX , posY)
      console.log({row, rowI, col, colI});
    });    
  });


  //filas y columnas VERSION 0.1-----------------
  // for (let row = 1; row <= 10; row++) {
  //   for (let col = 0; col < 10; col++) {
  //     game.fillText(emojis[mapRowCols[row - 1][ col]], elementSize* col , elementSize* row);
  //   }
  // }
};



