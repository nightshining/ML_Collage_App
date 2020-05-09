# ML_Collage_App 

## Description: 

This is a simple creative app that removes the background of the object within a photo and adds it into the canvas. The user can add multiple images and drag and drop the processed image into a new position within the canvas. There is a 'save' button to export the image to a local directory. 

### Source Image
<img src="https://github.com/nightshining/ML_Collage_App/blob/master/assets/flower2.png?raw=true" width="400" height="480"> </img>


![](https://github.com/nightshining/ML_Collage_App/blob/master/assets/gif_collage.gif?raw=true)

## Usage: 

The code utilizes [P5js](https://p5js.org/) and [RunwayML](https://runwayml.com/) to access the ML library [BASNet](https://github.com/NathanUA/BASNet)'BASNet: Boundary-Aware Salient Object Detection code'.

1. Open your terminal app within the root directory of this repo
2. Start a local server via terminal
``` python -m SimpleHTTPServer 8001 ```
3. Open a browser and enter the the local IP into the URL field 
``` http://127.0.0.1:8001/ ```
4. Open RunwayML app, create model BASNet, choose your file, and [run the server remotely](https://www.youtube.com/watch?v=db1USOwbRPQ)
5. The code does a simple HTTP request when clicking the 'add image' button
``` const path = "http://localhost:8000/query" ```






