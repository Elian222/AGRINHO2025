let trucks = [];
let trees = [];
let buildings = [];
let roadPoints = [];

let isDay = true; // Variável para controlar qual tela está ativa

function setup() {
  createCanvas(900, 600);

  for (let i = 0; i < 4; i++) {
    trucks.push({
      x: random(-200, width + 200),
      yOffset: random(-15, 15),
      speed: random(1.5, 3),
      direction: (random(1) > 0.5) ? 1 : -1,
      color: color(random(100, 220), random(100, 220), random(100, 220)),
      hasProduct: (random(1) > 0.5)
    });
  }

  for (let i = 0; i < 7; i++) {
    trees.push({
      x: random(0, width * 0.45),
      y: random(height * 0.5, height * 0.7),
      size: random(70, 130),
      foliageColor: color(random(40, 90), random(100, 150), random(30, 70))
    });
  }

  let currentX = width * 0.5;
  while (currentX < width) {
    let buildingHeight = random(120, 350);
    let buildingWidth = random(60, 110);
    buildings.push({
      x: currentX,
      y: height * 0.6 - buildingHeight,
      width: buildingWidth,
      height: buildingHeight,
      windowsLit: Array.from({
        length: floor(buildingHeight / 25)
      }, () =>
        Array.from({
          length: floor(buildingWidth / 25)
        }, () => (random(1) < 0.8))
      ),
      buildingColor: color(random(70, 110), random(80, 120), random(90, 130))
    });
    currentX += buildingWidth + random(15, 35);
  }

  roadPoints = [
    { x: 0, y: height * 0.8 },
    { x: width, y: height * 0.7 },
    { x: width, y: height * 0.85 },
    { x: 0, y: height }
  ];
}

function draw() {
  if (isDay) {
    drawDayScene();
  } else {
    drawNightScene();
  }
}

function drawDayScene() {
  drawSkyDay();
  drawGroundDay();
  drawCountrysideDay();
  drawCityDay();
  drawRoadDay();
  drawTrucks();
}

function drawNightScene() {
  drawSkyNight();
  drawGroundNight();
  drawCountrysideNight();
  drawCityNight();
  drawRoadNight();
  drawTrucks();
}

function mousePressed() {
  isDay = !isDay;
}

function drawSkyDay() {
  let c1 = color(135, 206, 235);
  let c2 = color(255, 165, 0);
  for (let i = 0; i <= height / 2; i++) {
    let inter;
    let c;
    if (i < height / 4) {
      inter = map(i, 0, height / 4, 0, 1);
      c = lerpColor(c1, color(180, 200, 240), inter);
    } else {
      inter = map(i, height / 4, height / 2, 0, 1);
      c = lerpColor(color(180, 200, 240), c2, inter);
    }
    stroke(c);
    line(0, i, width, i);
  }

  noStroke();
  fill(255, 255, 255, 180);
  ellipse(width * 0.2, height * 0.15, 150, 60);
  ellipse(width * 0.7, height * 0.1, 180, 70);
  ellipse(width * 0.45, height * 0.08, 100, 50);
  ellipse(width * 0.9, height * 0.2, 120, 50);
  ellipse(width * 0.1, height * 0.3, 100, 40);
  ellipse(width * 0.8, height * 0.35, 130, 50);
}

function drawGroundDay() {
  noStroke();
  fill(80, 130, 50);
  beginShape();
  vertex(roadPoints[0].x, roadPoints[0].y);
  vertex(0, height * 0.6);
  curveVertex(width * 0.2, height * 0.55);
  curveVertex(width * 0.4, height * 0.68);
  curveVertex(width * 0.5, height * 0.6);
  vertex(roadPoints[3].x, roadPoints[3].y);
  endShape(CLOSE);

  fill(70, 80, 90);
  rect(width / 2, height * 0.6, width / 2, height * 0.4);
  fill(120);
  rect(width / 2, height * 0.6, width / 2, 10);
}

function drawCountrysideDay() {
  for (let i = 0; i < 10; i++) {
    fill(random(100, 140), random(160, 200), random(60, 100));
    let plantX = i * (width * 0.4 / 10) + 20;
    let plantY = height * 0.7 + (i % 2) * 20;
    rect(plantX, plantY, 60, 35);
    stroke(random(80, 120), random(140, 180), random(50, 90));
    strokeWeight(1);
    line(plantX + 5, plantY + 10, plantX + 55, plantY + 10);
    line(plantX + 5, plantY + 25, plantX + 55, plantY + 25);
    noStroke();
  }

  for (let tree of trees) {
    drawTree(tree.x, tree.y, tree.size, tree.foliageColor);
  }

  fill(50, 100, 30);
  ellipse(width * 0.08, height * 0.75, 40, 20);
  ellipse(width * 0.35, height * 0.8, 50, 25);

  fill(100, 150, 200, 150);
  beginShape();
  vertex(width * 0.05, height * 0.9);
  curveVertex(width * 0.15, height * 0.85);
  curveVertex(width * 0.25, height * 0.95);
  curveVertex(width * 0.35, height * 0.88);
  vertex(width * 0.45, height * 0.92);
  vertex(width * 0.45, height);
  vertex(width * 0.05, height);
  endShape(CLOSE);

  fill(150, 80, 50);
  rect(width * 0.1, height * 0.58, 80, 60);
  triangle(width * 0.1, height * 0.58, width * 0.1 + 40, height * 0.5, width * 0.1 + 80, height * 0.58);
  fill(50);
  rect(width * 0.1 + 30, height * 0.6, 20, 40);
}

function drawTree(x, y, size, foliageColor) {
  fill(100, 50, 20);
  rect(x, y, size / 8, size);
  fill(foliageColor);
  ellipse(x + size / 16, y - size / 4, size * 0.7, size * 0.8);
  ellipse(x + size / 16 - size * 0.2, y - size / 3, size * 0.5, size * 0.6);
  ellipse(x + size / 16 + size * 0.2, y - size / 3, size * 0.5, size * 0.6);
}

function drawCityDay() {
  for (let building of buildings) {
    fill(building.buildingColor);
    rect(building.x, building.y, building.width, building.height);

    fill(200, 200, 200, 100);
    for (let j = 0; j < building.windowsLit.length; j++) {
      for (let k = 0; k < building.windowsLit[j].length; k++) {
        rect(building.x + k * 25 + 5, building.y + j * 25 + 5, 15, 15);
      }
    }
    if (building.height > 300) {
      fill(40);
      rect(building.x + building.width / 2 - 5, building.y - 20, 10, 20);
    }
  }

  fill(255, 200, 0, 100);
  for (let i = 0; i < 15; i++) {
    let lightX = width * 0.55 + i * (width * 0.4 / 15);
    let lightY = height * 0.6 + 5;
    ellipse(lightX, lightY, 5, 5);
    stroke(200, 180, 0, 100);
    strokeWeight(1);
    line(lightX, lightY, lightX, lightY - 20);
    noStroke();
  }

  fill(50, 60, 70, 150);
  rect(width * 0.5, height * 0.3, width * 0.5, height * 0.3);
  for (let i = 0; i < 10; i++) {
    rect(width * 0.5 + i * random(40, 80), height * 0.3 - random(10, 50), random(20, 50), random(10, 50));
  }
}

function drawRoadDay() {
  fill(60);
  beginShape();
  vertex(roadPoints[0].x, roadPoints[0].y);
  vertex(roadPoints[1].x, roadPoints[1].y);
  vertex(roadPoints[2].x, roadPoints[2].y);
  vertex(roadPoints[3].x, roadPoints[3].y);
  endShape(CLOSE);

  fill(40, 40, 40, 100);
  beginShape();
  vertex(roadPoints[0].x, roadPoints[0].y);
  vertex(roadPoints[1].x, roadPoints[1].y);
  vertex(roadPoints[1].x, roadPoints[1].y + 10);
  vertex(roadPoints[0].x, roadPoints[0].y + 10);
  endShape(CLOSE);

  stroke(255, 255, 0);
  strokeWeight(3);
  let lineOffset = (frameCount * 2) % 40;
  for (let i = -40; i < width + 40; i += 40) {
    let currentX1 = i + lineOffset;
    let currentX2 = i + 20 + lineOffset;
    let y1 = map(currentX1, 0, width, height * 0.82, height * 0.72);
    let y2 = map(currentX2, 0, width, height * 0.82, height * 0.72);
    line(currentX1, y1, currentX2, y2);
    let y1_offset = map(currentX1, 0, width, height * 0.8, height * 0.70);
    let y2_offset = map(currentX2, 0, width, height * 0.8, height * 0.70);
    line(currentX1, y1_offset, currentX2, y2_offset);
  }
  noStroke();

  stroke(255);
  strokeWeight(4);
  line(roadPoints[0].x, roadPoints[0].y, roadPoints[1].x, roadPoints[1].y);
  line(roadPoints[3].x, roadPoints[3].y, roadPoints[2].x, roadPoints[2].y);
  noStroke();

  fill(180);
  beginShape();
  vertex(roadPoints[0].x, roadPoints[0].y);
  vertex(roadPoints[0].x, roadPoints[0].y - 10);
  vertex(width * 0.45, map(width * 0.45, 0, width, height * 0.82, height * 0.72) - 10);
  vertex(width * 0.45, map(width * 0.45, 0, width, height * 0.82, height * 0.72));
  endShape(CLOSE);

  beginShape();
  vertex(width * 0.55, map(width * 0.55, 0, width, height * 0.82, height * 0.72));
  vertex(width * 0.55, map(width * 0.55, 0, width, height * 0.82, height * 0.72) - 10);
  vertex(roadPoints[1].x, roadPoints[1].y - 10);
  vertex(roadPoints[1].x, roadPoints[1].y);
  endShape(CLOSE);

  fill(150, 100, 0);
  for (let i = 0; i < 5; i++) {
    let poleX = map(i, 0, 4, width * 0.05, width * 0.4);
    let poleYBase = map(poleX, 0, width, height * 0.83, height * 0.73);
    rect(poleX, poleYBase - 40, 5, 40);
    fill(255, 255, 0);
    ellipse(poleX + 2, poleYBase - 40, 10, 10);
  }
}

function drawSkyNight() {
  background(20, 20, 70);
  fill(255, 255, 200, 150);
  ellipse(width * 0.8, height * 0.15, 80, 80);

  fill(255, 255, 255, 100);
  for (let i = 0; i < 100; i++) {
    ellipse(random(width), random(height / 2), random(1, 3), random(1, 3));
  }
}

function drawGroundNight() {
  noStroke();
  fill(40, 70, 30);
  beginShape();
  vertex(roadPoints[0].x, roadPoints[0].y);
  vertex(0, height * 0.6);
  curveVertex(width * 0.2, height * 0.55);
  curveVertex(width * 0.4, height * 0.68);
  curveVertex(width * 0.5, height * 0.6);
  vertex(roadPoints[3].x, roadPoints[3].y);
  endShape(CLOSE);

  fill(30, 40, 50);
  rect(width / 2, height * 0.6, width / 2, height * 0.4);
  fill(80);
  rect(width / 2, height * 0.6, width / 2, 10);
}

function drawCountrysideNight() {
  for (let i = 0; i < 10; i++) {
    fill(60, 90, 40);
    let plantX = i * (width * 0.4 / 10) + 20;
    let plantY = height * 0.7 + (i % 2) * 20;
    rect(plantX, plantY, 60, 35);
    stroke(40, 70, 30);
    strokeWeight(1);
    line(plantX + 5, plantY + 10, plantX + 55, plantY + 10);
    line(plantX + 5, plantY + 25, plantX + 55, plantY + 25);
    noStroke();
  }

  for (let tree of trees) {
    drawTree(tree.x, tree.y, tree.size, color(tree.foliageColor.levels[0] * 0.5, tree.foliageColor.levels[1] * 0.5, tree.foliageColor.levels[2] * 0.5));
  }

  fill(20, 50, 10);
  ellipse(width * 0.08, height * 0.75, 40, 20);
  ellipse(width * 0.35, height * 0.8, 50, 25);

  fill(50, 70, 100, 150);
  beginShape();
  vertex(width * 0.05, height * 0.9);
  curveVertex(width * 0.15, height * 0.85);
  curveVertex(width * 0.25, height * 0.95);
  curveVertex(width * 0.35, height * 0.88);
  vertex(width * 0.45, height * 0.92);
  vertex(width * 0.45, height);
  vertex(width * 0.05, height);
  endShape(CLOSE);

  fill(80, 40, 20);
  rect(width * 0.1, height * 0.58, 80, 60);
  triangle(width * 0.1, height * 0.58, width * 0.1 + 40, height * 0.5, width * 0.1 + 80, height * 0.58);
  fill(30);
  rect(width * 0.1 + 30, height * 0.6, 20, 40);
}

function drawCityNight() {
  for (let building of buildings) {
    fill(building.buildingColor.levels[0] * 0.4, building.buildingColor.levels[1] * 0.4, building.buildingColor.levels[2] * 0.4);
    rect(building.x, building.y, building.width, building.height);

    fill(255, 255, 150, 255);
    for (let j = 0; j < building.windowsLit.length; j++) {
      for (let k = 0; k < building.windowsLit[j].length; k++) {
        if (building.windowsLit[j][k]) {
          rect(building.x + k * 25 + 5, building.y + j * 25 + 5, 15, 15);
        }
      }
    }
    if (building.height > 300) {
      fill(20);
      rect(building.x + building.width / 2 - 5, building.y - 20, 10, 20);
    }
  }

  fill(255, 200, 0);
  for (let i = 0; i < 15; i++) {
    let lightX = width * 0.55 + i * (width * 0.4 / 15);
    let lightY = height * 0.6 + 5;
    ellipse(lightX, lightY, 5, 5);
    stroke(255, 220, 0);
    strokeWeight(1);
    line(lightX, lightY, lightX, lightY - 20);
    noStroke();
  }

  fill(20, 30, 40, 180);
  rect(width * 0.5, height * 0.3, width * 0.5, height * 0.3);
  for (let i = 0; i < 10; i++) {
    rect(width * 0.5 + i * random(40, 80), height * 0.3 - random(10, 50), random(20, 50), random(10, 50));
  }
}

function drawRoadNight() {
  fill(30);
  beginShape();
  vertex(roadPoints[0].x, roadPoints[0].y);
  vertex(roadPoints[1].x, roadPoints[1].y);
  vertex(roadPoints[2].x, roadPoints[2].y);
  vertex(roadPoints[3].x, roadPoints[3].y);
  endShape(CLOSE);

  fill(10, 10, 10, 100);
  beginShape();
  vertex(roadPoints[0].x, roadPoints[0].y);
  vertex(roadPoints[1].x, roadPoints[1].y);
  vertex(roadPoints[1].x, roadPoints[1].y + 10);
  vertex(roadPoints[0].x, roadPoints[0].y + 10);
  endShape(CLOSE);

  stroke(255, 255, 0);
  strokeWeight(3);
  let lineOffset = (frameCount * 2) % 40;
  for (let i = -40; i < width + 40; i += 40) {
    let currentX1 = i + lineOffset;
    let currentX2 = i + 20 + lineOffset;
    let y1 = map(currentX1, 0, width, height * 0.82, height * 0.72);
    let y2 = map(currentX2, 0, width, height * 0.82, height * 0.72);
    line(currentX1, y1, currentX2, y2);
    let y1_offset = map(currentX1, 0, width, height * 0.8, height * 0.70);
    let y2_offset = map(currentX2, 0, width, height * 0.8, height * 0.70);
    line(currentX1, y1_offset, currentX2, y2_offset);
  }
  noStroke();

  stroke(180);
  strokeWeight(4);
  line(roadPoints[0].x, roadPoints[0].y, roadPoints[1].x, roadPoints[1].y);
  line(roadPoints[3].x, roadPoints[3].y, roadPoints[2].x, roadPoints[2].y);
  noStroke();

  fill(80);
  beginShape();
  vertex(roadPoints[0].x, roadPoints[0].y);
  vertex(roadPoints[0].x, roadPoints[0].y - 10);
  vertex(width * 0.45, map(width * 0.45, 0, width, height * 0.82, height * 0.72) - 10);
  vertex(width * 0.45, map(width * 0.45, 0, width, height * 0.82, height * 0.72));
  endShape(CLOSE);

  beginShape();
  vertex(width * 0.55, map(width * 0.55, 0, width, height * 0.82, height * 0.72));
  vertex(width * 0.55, map(width * 0.55, 0, width, height * 0.82, height * 0.72) - 10);
  vertex(roadPoints[1].x, roadPoints[1].y - 10);
  vertex(roadPoints[1].x, roadPoints[1].y);
  endShape(CLOSE);

  fill(100, 60, 0);
  for (let i = 0; i < 5; i++) {
    let poleX = map(i, 0, 4, width * 0.05, width * 0.4);
    let poleYBase = map(poleX, 0, width, height * 0.83, height * 0.73);
    rect(poleX, poleYBase - 40, 5, 40);
    fill(255, 255, 0, 200);
    ellipse(poleX + 2, poleYBase - 40, 10, 10);
  }
}

function drawTrucks() {
  for (let truck of trucks) {
    let currentRoadY = map(truck.x, 0, width, height * 0.82, height * 0.72);
    let truckY = currentRoadY + truck.yOffset;

    push();
    translate(truck.x, truckY);

    fill(truck.color);
    rect(0, -30, 40, 30);
    fill(180, 200, 220);
    rect(5, -25, 30, 15);

    fill(truck.color.levels[0] * 0.8, truck.color.levels[1] * 0.8, truck.color.levels[2] * 0.8);
    rect(40, -30, 60, 30);

    fill(80);
    rect(35, -15, 10, 5);

    fill(50);
    ellipse(10, 0, 15, 15);
    ellipse(50, 0, 15, 15);
    ellipse(90, 0, 15, 15);

    if (!isDay) {
      fill(255, 255, 100);
      ellipse(0, -10, 8, 8);
      ellipse(40, -10, 8, 8);

      fill(200, 50, 50);
      ellipse(100, -10, 8, 8);
    }

    if (truck.hasProduct) {
      if (truck.direction === 1) {
        fill(200, 50, 50);
        ellipse(70, -15, 15, 15);
        fill(50, 100, 30);
        rect(69, -20, 2, 5);
      } else {
        fill(100, 100, 200);
        rect(60, -25, 30, 20);
      }
    }

    pop();

    truck.x += truck.speed * truck.direction;

    if (truck.direction === 1 && truck.x > width + 150) {
      truck.x = -150;
      truck.hasProduct = (random(1) > 0.5);
      truck.direction = (random(1) > 0.7) ? -1 : 1;
    } else if (truck.direction === -1 && truck.x < -150) {
      truck.x = width + 150;
      truck.hasProduct = (random(1) > 0.5);
      truck.direction = (random(1) > 0.7) ? 1 : -1;
    }
  }
}