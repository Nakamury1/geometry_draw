// ---------------------------------------------
// Initialisation des variables
// ---------------------------------------------
let NP = 600;
let PI = Math.PI;

// Le SVG sera construit ici
let svg = "";

// ---------------------------------------------
// Export du SVG
// ---------------------------------------------
function saveSVG(svgCode, filename = "dessin.svg") {
  const blob = new Blob([svgCode], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ---------------------------------------------
function setup() {
  INIT();
  TRACE();

  // Fermeture de la balise <svg>
  svg += "</svg>";

  // Sauvegarde finale
  saveSVG(svg);
}

// ---------------------------------------------
// INIT — initialisation du SVG
// ---------------------------------------------
function INIT() {
  createCanvas(NP, NP);
  noLoop();
  background(40);

  svg = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="${NP}" height="${NP}"
     viewBox="0 0 ${NP} ${NP}">
  <rect width="100%" height="100%" fill="rgb(40,40,40)" />
  <g transform="translate(${NP/2},${NP/2})">
`;
}

// ---------------------------------------------
// TRACE — tout le dessin converti en SVG
// ---------------------------------------------
function TRACE() {

  // ------------------------------
  // Cercles fragmentés concentriques
  // ------------------------------
  svg += `<g transform="rotate(${180/6})">\n`;
  for (let i = 0; i < 8; i++) {
    let r = 280 - i * 15;
    let R = r/2;
    let col = `rgb(${255 - i*20},${100 - i*15},${100 - i*10})`;

    for (let j = 0; j < 8; j++) {
      let a1 = j * PI/4;
      let a2 = a1 + PI/4 - 0.2;
      let x1 = R * Math.cos(a1);
      let y1 = R * Math.sin(a1);
      let x2 = R * Math.cos(a2);
      let y2 = R * Math.sin(a2);

      svg += `<path d="M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}" fill="none" stroke="${col}" stroke-width="3"/>\n`;
    }
  }
  svg += `</g>\n`;

  // ------------------------------
  // Cercles déconstruits en anneau
  // ------------------------------
  svg += `<g transform="rotate(${-180/2.5})">\n`;
  for (let i = 0; i < 12; i++) {
    let radius = 180;
    let x = Math.cos(i * PI/6) * radius;
    let y = Math.sin(i * PI/6) * radius;
    let s = 30 - i * 1.5;
    svg += `<circle cx="${x}" cy="${y}" r="${s/2}" fill="rgba(255,200,${100+i*10},0.47)"/>\n`;
  }
  svg += `</g>\n`;

  // ------------------------------
  // Rosace à 8 branches
  // ------------------------------
  svg += `<g stroke="rgba(150,10,250,0.7)" stroke-width="2" fill="none">\n`;
  svg += `<circle cx="0" cy="0" r="140"/>\n`;
  for (let i = 0; i < 8; i++) {
    let ang = i * PI/4;
    let cx = Math.cos(ang) * 140;
    let cy = Math.sin(ang) * 140;
    svg += `<circle cx="${cx}" cy="${cy}" r="140"/>\n`;
  }
  svg += `</g>\n`;

  // ------------------------------
  // Hexagones emboîtés
  // ------------------------------
  svg += `<g transform="rotate(${180/9})" stroke="rgb(100,100,255)" stroke-width="2" fill="none">\n`;
  for (let i = 0; i < 4; i++) {
    let pts = [];
    let r = 100 + i * 30;
    for (let j = 0; j < 6; j++) {
      let a = j * PI/3 + i * PI/12;
      pts.push(`${Math.cos(a)*r},${Math.sin(a)*r}`);
    }
    svg += `<polygon points="${pts.join(" ")}"/>\n`;
  }
  svg += `</g>\n`;

  // ------------------------------
  // Arcs fragmentés externes
  // ------------------------------
  svg += `<g transform="rotate(${180/4})">\n`;
  for (let i = 0; i < 16; i++) {
    let R = 250/2;
    let hue = i * 22.5;
    let col = `rgb(${150+Math.cos(hue*PI/180)*50},${100+Math.sin(hue*PI/180)*50},255)`;
    let a1 = i * PI/8;
    let a2 = a1 + PI/12;
    let x1 = R * Math.cos(a1);
    let y1 = R * Math.sin(a1);
    let x2 = R * Math.cos(a2);
    let y2 = R * Math.sin(a2);
    svg += `<path d="M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}" fill="none" stroke="${col}" stroke-width="4"/>\n`;
  }
  svg += `</g>\n`;

  // Fermeture du groupe principal
  svg += `</g>\n`;
}
