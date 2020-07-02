function setup() {
}
var width = 0;
var height = 0;
var algo;

function Start(algotype,rate = 5) {
    const algomap = [
        "HuntAndKill",
        "Backtracker",
        "Kruskal",
        "Prims",
        "GrowingTree",
        "GrowingBinaryTree"
    ];
    noCanvas();
    width = cellSize * cols;
    height = cellSize * rows;
    let cnv = createCanvas(width + 20, height + 20);
    cnv.parent('myWorkspace');
    if(rate){
        frameRate(rate);
    }
    strokeWeight(4);
    translate(10, 10);

    algo = new window[algomap[algotype]]();
    algo.setup();
}

function draw() {
    translate(10, 10);
    if (algo)
        algo.loop();
}