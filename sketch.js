function setup() {
}
var width = 0;
var height = 0;
var algo;
function Start() {
    noCanvas();
    width = cellSize * cols;
    height = cellSize * rows;
    let cnv = createCanvas(width + 20, height + 20);
    cnv.parent('myWorkspace');
    strokeWeight(4);
    translate(10, 10);

    algo = new Kruskal();
    algo.setup();
}

function draw() {
    translate(10, 10);
    if (algo)
        algo.loop();
}