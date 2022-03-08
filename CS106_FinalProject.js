// Caleb Lynds-Martin
// 20796850

let vol;
let objc = 0;
let objs = ["Recycling" + " " + "Bin", "Cat", "Tennis" + " " + "Ball", "Manhole" + " " + "Cover"];
let endmsg = ["Great" + " " + "Work!", "Amazing" + " " + "Job!", "Incredible" + " " + "Finds!"];

// Recycling Bin Hitbox

let rbx = 127;
let rby = 265;
let rbw = 35;
let rbh = 35;

// Cat Hitbox

let cx = 325;
let cy = 335;
let cw = 20;
let ch = 20;

// Tennis Ball Hitbox

let tbx = 8;
let tby = 278;
let tbw = 8;
let tbh = 8;

// Manhole Cover Hitbox

let mchx = 200;
let mchy = 350;
let mchw = 35;
let mchh = 35;

function preload() {
  song = loadSound("data/music.mp3");
  click = loadSound("data/click.mp3");
  amb = loadSound("data/amb.mp3");
  lid = loadSound("data/lid.mp3");
  meow = loadSound("data/meow.mp3");
  ball = loadSound("data/ball.mp3");
  scrape = loadSound("data/scrape.mp3");
  objset = loadImage("data/obj.png");
}

function setup() {
  createCanvas(400, 400);
  state = 1;
  song.loop();
  createP(" ");
  
  // Music Volume Slider
  
  vol = createSlider(0, 1, 0.2, 0.01);
  vol.size(60);
  
  // Play Button
  
  let col = color(230, 230, 230);
  
  play = createButton('PLAY');
  play.style('font-family', 'Montserrat');
  play.style('font-size', '20');
  play.style('color', '#141414'); 
  play.style('background-color', col);
  play.mousePressed(playButton);
  play.size(90, 40);
  
  // Resume Button
  
  res = createButton('RESUME');
  res.style('font-family', 'Montserrat');
  res.style('font-size', '20');
  res.style('color', '#141414'); 
  res.style('background-color', col);
  res.mousePressed(resButton);
  res.size(110, 40);
  
  // Home Button
  
  home = createButton('HOME');
  home.style('font-family', 'Montserrat');
  home.style('font-size', '20');
  home.style('color', '#141414'); 
  home.style('background-color', col);
  home.mousePressed(homeButton);
  home.size(90, 40);
  
  // Back Button
  
  back = createButton('BACK');
  back.style('font-family', 'Montserrat');
  back.style('font-size', '10');
  back.style('color', '#141414'); 
  back.style('background-color', col);
  back.mousePressed(backButton);
  back.size(45, 25);
}

function draw() {
  background(200);
  
  // Sounds Volume
  
  song.setVolume(vol.value());
  click.setVolume(0.5);
  lid.setVolume(0.5);
  meow.setVolume(0.5);
  ball.setVolume(0.5);
  scrape.setVolume(0.5);
  amb.setVolume(0.3);
  
// Home Screen
  
  if (state === 1) {
   background(150);
   
   noStroke();
   fill(20);
   ellipse(width/2, height/2, 335);
   stroke(230);
   strokeWeight(5);
   ellipse(width/2, height/2, 315);
   noStroke();
   
   // Magnifying Glass
   
   push();
   translate(155, 188);
   maglass();
   pop();
   
   // Title
   
   textSize(50);
   fill(230);
   textAlign(CENTER);
   textStyle(BOLD);
   textFont('Montserrat');
   text('iSPY CITY', width/2, 170); 
   
   // Button Positioning
   
   if (objc < 1) {
    play.position(width/2 - 45, height/2 + 60);
    res.position(-500, 500);
   } else {
     
   res.position(width/2 - 55, height/2 + 60);
   }
   
   home.position(-500, 500);
   back.position(-500, 500);
   vol.position(45, 360);
   
   // Music Note Icon
   
   push();
   translate(10, 356);
   music();
   pop();
  }
  
// Game Screen
  
  if (state === 2) {
   
 // Scene
   
   // Sky
   
   background('#84c1f6');
   
   // Shrub Line
   
   shrubline();
   
   // City
   
   copy(objset, obj[4].x, obj[4].y, 400, 400, 0, 0, 400, 400);
   
   // Recycling Bin
   
   copy(objset, obj[0].x, obj[0].y, 200, 200, rbx, 265, 35, 35);
   
   // Cat
   
   copy(objset, obj[1].x, obj[1].y, 200, 200, cx, 335, 20, 20);
   
   // Car
   
   push();
   translate(280, 280);
   car();
   pop();
   
   // Tennis Ball
   
   copy(objset, obj[2].x, obj[2].y, 200, 200, tbx, 278, 8, 8);
   
   // Manhole Cover
   
   copy(objset, obj[3].x, obj[3].y, 200, 200, 200, 350, 35, 35);
   
 // Object Display
   
   objectDis(objc);
   
 // Music Note Icon
   
   push();
   translate(10, 356);
   music();
   pop();
   
   // Button Positioning
 
   play.position(-500, 500);
   res.position(-500, 500);
   home.position(-500, 500);
   back.position(10, 10);
   vol.position(45, 360);
   
  }
   
// End Screen
 
 if (state === 3) {
  noLoop();
  endscr(floor(random(0, 3)));
  
  // Button Positioning
  
  home.position(width/2 - 45, height/2 + 40);
  play.position(-500, 500);
  res.position(-500, 500);
  back.position(-500, 500);
  vol.position(-500, 360);
 }
}

// Button Functionality

function playButton() {
  state = 2;
  click.play();
  amb.loop();
}

function homeButton() {
  rbx = 127;
  cx = 325;
  tbx = 8;
  state = 1;
  objc = 0;
  click.play();
  amb.pause();
  loop();
}

function resButton() {
  state = 2;
  click.play();
  amb.loop();
}

function backButton() {
  state = 1;
  click.play();
  amb.pause();
}

function maglass() {
  
  // Handle
  
  stroke(80);
  strokeWeight(10);
  line(60, 25, 8, 50);
  strokeWeight(10);
  stroke(230);
  line(60, 25, 35, 37);
  
  // Spectacle
  
  noStroke();
  fill(80);
  ellipse(60, 25, 50);
  fill(230);
  ellipse(60, 25, 40);
}

function car() {
  stroke(0);
  strokeWeight(2.5);

  // Body

  fill('#C39E46');
  beginShape();
  vertex(0, 23);
  vertex(29, 23);
  vertex(49, 0);
  vertex(92, 0);
  vertex(113, 23);
  vertex(142, 23);
  vertex(142, 61);
  vertex(0, 61);
  endShape(CLOSE);

  // Front Window

  fill('#b0cfec');
  quad(37, 23, 52, 5, 67, 5, 67, 23);

  // Back Window

  push();
  translate(142, 0);
  scale(-1, 1);
  quad(37, 23, 52, 5, 67, 5, 67, 23);
  pop();

  // Head Light

  fill('#CE6A2C');
  rect(0.5, 23.5, 11, 8);

  // Tail Light

  fill('#E74E4B');
  rect(130.5, 23.5, 11, 8);

  // Front Sidedoor

  sidedoor();

  // Back Sidedoor

  push();
  translate(38, 0);
  sidedoor();
  pop();
  
  // Front Wheel
  
  wheel();
  
  // Back Wheel
  
  push();
  translate(85, 0);
  wheel();
  pop();
}

function sidedoor() {

  // Door

  fill('#C39E46');
  rect(37, 30, 30, 30);

  // Handle

  rect(55, 45, 8, 4);
}

function wheel() {
  fill(20);
  ellipse(30, 61, 30);
  
  fill(180);
  ellipse(30, 61, 20);
  
  fill(20);
  ellipse(30, 61, 5);
}

function shrubline() {
  let ss = 0;
  let turb = 0.07;
  let smin = 230;
  let smax = 240;
  
  // Shrub Line Path
  
  fill('#447043');
  stroke(0);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < width + 1; i++) {
    let sep = noise((ss + i) * turb);
    let smap = map(sep, 0, 1, smin, smax);
    vertex(i, smap);
  }

  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function endscr(n) {
  textStyle(BOLD);
  textAlign(CENTER);
  noStroke();
  fill(20);
 
  textSize(35);
  text("You Got Everything", width/2, height/2 - 30);
  
  textSize(30);
  text(endmsg[n], width/2, height/2 + 15);
}

function objectDis(n) {
  
  // Display
  
  fill(20);
  noStroke();
  rect(width/2 - 100, -10, 200, 94, 5);
  
  // Display Stripe
  
  stroke(230);
  noFill();
  strokeWeight(2);
  rect(width/2 - 94.5, -10, 189, 88, 2);
  
  // Display Object Message
  
  textStyle(BOLD);
  textAlign(CENTER);
  noStroke();
  fill(230);
 
  textSize(20);
  text("I Spy A...", width/2, 30);
  
  noStroke();
  fill(230);
  textSize(22);
  text(objs[n], width/2, 61);
}

function music() {
  if (vol.value() > 0) {
    
 // Music On Icon
    
  // Icon Circle
  
  fill(20);
  noStroke();
  ellipse(15, 15, 30);
  
  // Note Ends
  
  fill(230);
  ellipse(18, 19, 6, 4);
  ellipse(9.5, 20, 6, 4);
  
  // Note Legs
  
  stroke(230);
  strokeWeight(2);
  line(11, 11, 20, 10);
  line(20, 18, 20, 10);
  line(11, 11, 11, 20);
  
  } else if (vol.value() === 0) {
    
 // Music Off Icon
      
  // Icon Circle
  
  fill(20);
  noStroke();
  ellipse(15, 15, 30);
  
  // Note Ends
  
  fill(230);
  ellipse(18, 19, 6, 4);
  ellipse(9.5, 20, 6, 4);
  
  // Note Legs
  
  stroke(230);
  strokeWeight(2);
  line(11, 11, 20, 10);
  line(20, 18, 20, 10);
  line(11, 11, 11, 20);
  
  // Line Through
  
  stroke(20);
  strokeWeight(4);
  line(10, 8, 23, 21);
  strokeWeight(2);
  stroke(230);
  line(9, 9, 22, 22);
  }
}

function mousePressed() {
  
  // Recycling Bin Pickup
  
  if (mouseX >= rbx && mouseX <= rbx + rbw && mouseY >= rby && mouseY <= rby + rbh && state === 2 && objc === 0) {
    lid.play();
    rbx = -500;
    objc = objc + 1;
  }
  
  // Cat Pickup
  
  if (mouseX >= cx && mouseX <= cx + cw && mouseY >= cy && mouseY <= cy + ch && state === 2 && objc === 1) {
    meow.play();
    cx = -500;
    objc = objc + 1;
  }
  
  // Tennis Ball Pickup
  
  if (mouseX >= tbx && mouseX <= tbx + tbw && mouseY >= tby && mouseY <= tby + tbh && state === 2 && objc === 2) {
    ball.play();
    tbx = -500;
    objc = objc + 1;
  }
  
  // Manhole Cover Pickup
  
  if (mouseX >= mchx && mouseX <= mchx + mchw && mouseY >= mchy && mouseY <= mchy + mchh && state === 2 && objc === 3) {
    scrape.play();
    objc = objc + 1;
    state = 3;
  }
}
