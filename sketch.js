const w = 512;
const h = 512;
let mlImg = [];
let objects = [];
let counter = 0; 

function setup() {
  createCanvas(w, h);
  createButton('add image').mousePressed(generateImage);
  createButton('save').mousePressed(saveImage);

  // objects
  // let total = 5;
  // for (let i = 0; i < total; i++) {
  //   let x = random(width);
  //   let y = random(height);
  //   let r = random(20, 60);
  //   let b = new ImageObject(x, y, r);
  //   objects.push(b);
  // }
}

function generateImage() {
   const imageZ = [];
  for (let i = 0; i < 512; i++) {
    imageZ[i] = random(-1,1);
  }

  //http request
  //const path="http://localhost:8000";
  //"https://basnet-c144c1fc.hosted-models.runwayml.cloud/v1/query"
  const path = "http://localhost:8000/query"
  const datatype = "json";
  const data = {
    z: imageZ, 
    truncation: 0.5
    
  };
  httpPost(path, 'json', data, gotImage, gotError);
 
}

function gotImage(data) {
  // mlImg = createImg(data.image);
  // mlImg.hide;
  
  mlImg.push(createImg(data.image));
  counter = mlImg.length;

  for (let i = 0; i < mlImg.length; i++) {
   mlImg[i].hide;
  }

 //generate drag target//

  let x = new ImageObject(width*0.5, height*0.5, 50, mlImg[counter]);
  objects.push(x);

  console.log("Got Image: " + mlImg.length);

 

}

function saveImage(){
  saveCanvas('myCanvas', 'jpg');
}

function mousePressed() {
  for (let i = 0; i < objects.length; i++) {
    objects[i].clicked(mouseX, mouseY);
   }
}

function mouseReleased() {
  for (let i = 0; i < objects.length; i++) {
    objects[i].unclicked();
  }
}

function draw() {
  background(0);
  
  for (let i = 0; i < mlImg.length; i++) {

  if (mlImg[i]) {  

   for (let i = 0; i < objects.length; i++) {
   
    objects[i].move();
    //objects[i].drawImage();
    imageMode(CENTER);
    image(mlImg[i],objects[i].x,objects[i].y);

    if (objects[i].isHidden == false) {
      console.log('we got to draw');
      objects[i].show();
     }

       }
    }
  }

}

function gotError(error){
  console.log(error);

}

class ImageObject {
  constructor(x, y, r, img) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
    this.isClicked = false;
    this.isHidden = false;
    this.img = img;
    
    //console.log('new image object created');
  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      this.brightness = 255;
      this.isClicked = true;
      //console.log("Pressed: " + this.isClicked);
    }
  }

  unclicked() {
      this.isClicked = false;
      this.brightness = 0;
      this.isHidden = true;
      //console.log("Released: " + this.isClicked);
  }

  move() {
    if (this.isClicked) {
    this.x = mouseX;
    this.y = mouseY;
  }
  }

  show() {
    stroke(255);
    strokeWeight(1);
    fill(this.brightness, 125);
    ellipse(this.x, this.y, this.r * 2);
  }

  drawImage(){
    imageMode(CENTER);
    image(this.img,this.x,this.y);
  }
}

