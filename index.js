let els = {
    'max_height': document.querySelector('#max-height'),
    'min_height': document.querySelector('#min-height'),
    'box_count': document.querySelector('#box-count'),
    'delta_angle': document.querySelector('#delta-angle'),
    'wavelength': document.querySelector('#wavelength'),
};
let boxCount = 5;
const SIM_WIDTH = 500;
let angle = 0;
const ROT_Y_ANGLE = Math.atan(1 / Math.sqrt(2));
let maxD;

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL);
    let orthoSize = SIM_WIDTH * 3;
    ortho(-SIM_WIDTH, SIM_WIDTH, -SIM_WIDTH, SIM_WIDTH, -1000, 1000);
    maxD = dist(0,0, SIM_WIDTH, SIM_WIDTH);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight, WEBGL);
    ortho(-SIM_WIDTH, SIM_WIDTH, -SIM_WIDTH, SIM_WIDTH, -1000, 1000);
}

function draw(){
    background(100);
    angle += parseFloat(els.delta_angle.value);
    rotateX(-QUARTER_PI);
    rotateY(ROT_Y_ANGLE);
    drawBoxes();
}

function drawBoxes(){
    let boxSize = SIM_WIDTH / els.box_count.value;
    const SIM_CENTER = SIM_WIDTH / 2 - boxSize / 2;
    let maxHeight = parseInt(els.max_height.value);
    let minHeight = parseInt(els.min_height.value);
    let wavelength = 200 - parseFloat(els.wavelength.value);
    for(let x = 0; x < SIM_WIDTH; x += boxSize){
        for(let z = 0; z < SIM_WIDTH; z += boxSize){
            let a = dist(x, z, SIM_WIDTH / 2 - boxSize / 2, SIM_WIDTH / 2 - boxSize / 2);
            a = map(a, 0, maxD, 0, wavelength)
            a += angle;
            let height = floor(map(sin(a), -1, 1, minHeight, maxHeight));
            push();
            translate(x - SIM_CENTER, 0, z - SIM_CENTER);
            box(boxSize, height, boxSize);
            pop();
        }
    }
}
