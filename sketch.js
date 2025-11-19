// Initialisation des variables

let NP=650, PI = Math.PI;
let K=10, H=3, CX=NP/2, CY=NP/2, R = NP*0.45, AD=PI/2;

let outer = [];
let inner = [];
let outerNum = 5;
let innerNum = 6;

let outerAngles = [];
let innerAngles = [];
let delta = 0.01;

function setup() {
  INIT();

  for (let i = 0; i < K; i++) {
    outerAngles[i] = 2 * i * H * PI / K + AD;
  }

  for (let i = 0; i < innerNum; i++) {
    innerAngles[i] = TWO_PI / innerNum * i;
  }
}

function draw() {
  background(200);

  outer = [];
  inner = [];

  for (let i = 0; i < K; i++) {
    outerAngles[i] += delta;
    let angle = outerAngles[i];
    let x = CX + R * cos(angle);
    let y = CY + R * sin(angle);
    outer.push(createVector(x, y));
  }

  for (let i = 0; i < innerNum; i++) {
    innerAngles[i] -= delta * 1.5;
    let angle = innerAngles[i];
    let r2 = R * 0.4;
    let x = CX + r2 * cos(angle);
    let y = CY + r2 * sin(angle);
    inner.push(createVector(x, y));
  }

  let colors = [
    color(150, 0, 0),
    color(0, 80, 100)
  ];

  for (let i = 0; i < outer.length; i++) {
    for (let j = 0; j < inner.length; j++) {
      let index = (i + j) % 2;
      stroke(colors[index]);
      strokeWeight(2);
      line(outer[i].x, outer[i].y, inner[j].x, inner[j].y);
    }
  }

  TRACE();
}