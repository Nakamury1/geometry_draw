// Initialisation des variables
let NP=650, PI = Math.PI;
let K=16,H=3,CX=NP/2,CY=NP/2,R=NP*.45,AD=PI/2;

let outer = [];
let inner = [];
let outerNum = 5;
let innerNum = 16;

// Exécution du code
function setup() {
  INIT();
  for (let i = 0; i < K; i++) {
    let angle = 2 * i * H * PI / K + AD;
    let x = CX + R * cos(angle);
    let y = CY + R * sin(angle);
    outer.push(createVector(x, y));
  }

  for (let i = 0; i < innerNum; i++) {
    let angle = TWO_PI / innerNum * i;
    let r2 = R * 0.4;
    let x = CX + r2 * cos(angle);
    let y = CY + r2 * sin(angle);
    inner.push(createVector(x, y));
  }
}

function draw() {
  for (let i = 0; i < outer.length; i++) {
    for (let j = 0; j < inner.length; j++) {
      stroke(20, 10);
      line(outer[i].x, outer[i].y, inner[j].x, inner[j].y);
    }
  }
  TRACE();
}