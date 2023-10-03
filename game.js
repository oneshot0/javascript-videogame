
const $ = (selector) => document.querySelector(selector);

const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector('#game'));
const game = canvas.getContext('2d');


window.addEventListener('load', starGame);
window.addEventListener('resize', starGame);

function starGame() {
  // game.loquesea()
  let canvasSize;
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;    
  } else {
    canvasSize= window.innerHeight * 0.8;
  }
  canvas.setAttribute('width', canvasSize)
  canvas.setAttribute('height', canvasSize)

// Aquí dividimos el canvasSize por la cantidad de elementos a insertar
  const elementSize = canvasSize / 10.3 ;
  console.log({canvasSize, elementSize});

  game.font = elementSize  + 'px arial';
  game.textAlign = ""

  for (let j = 1; j <= 10; j++) {
    for (let i = 0; i < 10; i++) {
      game.fillText(emojis['X'], elementSize* i , elementSize* j);
      
    }
  }


  // game.fillRect(100,25,100,100);
  // game.clearRect(125,50,50,50);
  // game.fillText('PLATZI', 133,78);
};

