let boxCount = 5;
let simWidth = 600;
let angle = 0;
const ROT_Y_ANGLE = Math.atan(1 / Math.sqrt(2));
let maxD;

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL);
    let orthoSize = simWidth * 3;
    ortho(-simWidth, simWidth, -simWidth, simWidth, -1000, 1000);
    maxD = dist(0,0, simWidth, simWidth);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight, WEBGL);
    ortho(-simWidth, simWidth, -simWidth, simWidth, -1000, 1000);
}

function draw(){
    background(100);
    angle += 0.05;
    rotateX(-QUARTER_PI);
    rotateY(ROT_Y_ANGLE);
    drawBoxes();
}

function drawBoxes(){
    let boxSize = simWidth / boxCount;
    const SIM_CENTER = simWidth / 2 - boxSize / 2;
    for(let x = 0; x < simWidth; x += boxSize){
        for(let z = 0; z < simWidth; z += boxSize){
            let a = dist(x, z, simWidth / 2 - boxSize / 2, simWidth / 2 - boxSize / 2);
            a = map(a, 0, maxD, -1, 1)
            a += angle;
            let height = floor(map(sin(a), -1, 1, 50, simWidth));
            push();
            translate(x - SIM_CENTER, 0, z - SIM_CENTER);
            box(boxSize, height, boxSize);
            pop();
        }
    }
}
