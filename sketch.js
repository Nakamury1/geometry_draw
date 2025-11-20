//Initialisation des variables

let NP = 600;
let PI = Math.PI;

// ----------------------------------------------------
function setup() {
  INIT({svg:true});
  TRACE();
}

// ----------------------------------------------------
// INIT — initialisation du canvas, couleurs, etc.
// ----------------------------------------------------
function INIT() {
  createCanvas(NP, NP);
  noLoop();
  background(40);
}

// ----------------------------------------------------
// TRACE — tout le dessin
// ----------------------------------------------------
function TRACE() {

  push();
  translate(NP/2, NP/2);

  // ----------------------------------------------------
  // Cercles fragmentés concentriques
  // ----------------------------------------------------
  push();
  rotate(PI/6);
  noFill();
  strokeWeight(3);
  for (let i = 0; i < 8; i++) {
    stroke(255 - i * 20, 100 - i * 15, 100 - i * 10);
    let r = 280 - i * 15;
    for (let j = 0; j < 8; j++) {
      arc(0, 0, r, r, j * PI/4, j * PI/4 + PI/4 - 0.2);
    }
  }
  pop();

  // ----------------------------------------------------
  // Cercles déconstruits en anneau
  // ----------------------------------------------------
  push();
  rotate(-PI/2.5);
  for (let i = 0; i < 12; i++) {
    let radius = 180;
    let x = cos(i * PI/6) * radius;
    let y = sin(i * PI/6) * radius;
    fill(255, 200, 100 + i * 10, 120);
    noStroke();
    circle(x, y, 30 - i * 1.5);
  }
  pop();

  // ----------------------------------------------------
  // Rosace à 8 branches
  // ----------------------------------------------------
  push();
  let rRosace = 140;
  noFill();
  stroke(150, 10, 250, 180);
  strokeWeight(2);

  // Cercle central
  circle(0, 0, rRosace * 2);

  // 8 cercles autour
  for (let i = 0; i < 8; i++) {
    let angle = i * PI/4;
    let cx = cos(angle) * rRosace;
    let cy = sin(angle) * rRosace;
    circle(cx, cy, rRosace * 2);
  }
  pop();

  // ----------------------------------------------------
  // Hexagones emboîtés
  // ----------------------------------------------------
  push();
  rotate(PI/9);
  stroke(100, 100, 255);
  strokeWeight(2);
  noFill();

  for (let i = 0; i < 4; i++) {
    beginShape();
    for (let j = 0; j < 6; j++) {
      let r = 100 + i * 30;
      let a = j * PI/3 + i * PI/12;
      vertex(cos(a) * r, sin(a) * r);
    }
    endShape(CLOSE);
  }
  pop();

  // ----------------------------------------------------
  // Arcs fragmentés externes
  // ----------------------------------------------------
  push();
  rotate(PI/4);
  noFill();
  strokeWeight(4);

  for (let i = 0; i < 16; i++) {
    let hue = i * 22.5;
    stroke(
      150 + cos(hue * PI/180) * 50,
      100 + sin(hue * PI/180) * 50,
      255,
      180
    );
    arc(0, 0, 250, 250, i * PI/8, i * PI/8 + PI/12);
  }
  pop();

  pop();
}