var pixelColor = [255, 255, 255];
var bgColor = [0, 0, 0];
var densidad = 100;
var filas = 1000;
var columnas = 1000;
var grid;
var cols;
var rows;
var div;
var probability;
var generation = 0;
var resolution = 5;
var livingCells = 0; 
var gameOn = false;
var reglas = '';//2,3,3,3 default
var gui;
//var shape = ['Iniciar', 'Detener', 'Reiniciar', 'Graficar'];

function makeGrid(rows, cols) {
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}  

function getRandomDistribution(prob) {
    var states = [0, 1];
    var probabilities = [prob, 100 - prob]; 
    var probArray = new Array(); 
    var state = 0;

    while (state < states.length) {
        for (let i = 0; i < probabilities[state]; i++)
            probArray[probArray.length] = states[state];
        state++;
    }
    return probArray;
}



function setup() {
angleMode(DEGREES);
/////////////Tablero flotante///////////////////////////
gui = createGui('Juego de la vida'); //Crea la GUI
//Slider que nos permite modificar el color de los pixeles
  sliderRange(0, 255, 1);
  gui.addGlobals('pixelColor');
//Permite cambiar el color del fondo
  sliderRange(0, 255, 1);
  gui.addGlobals('bgColor');
  sliderRange(0, 10, 0);
  gui.addGlobals('densidad');
  sliderRange(0, 10, 0);
  gui.addGlobals('columnas');
  sliderRange(0, 10, 0);
  gui.addGlobals('filas');
  gui.addGlobals('reglas');
  sliderRange(0, 255, 1);
  //gui.addGlobals('shape');
  /////Entradas fijas///////////////

    randomBtn = createButton("Iniciar");
    randomBtn.position(1100, 10);
    randomBtn.mousePressed(randomGeneration);

    startBtn =createButton("Reiniciar");
    startBtn.position(1100, 40);
    startBtn.mousePressed(loop);

    stopBtn = createButton("Detener");
    stopBtn.position(1100, 70);
    stopBtn.mousePressed(noLoop);

    manualBtn = createButton("Graficar");
    manualBtn.position(1100,100);
    manualBtn.mousePressed(graph);
    localStorage.setItem("gameOn", 0);    
}

function graph(){
    localStorage.setItem("gameOn", true);
    localStorage.setItem("rows", rows);
    localStorage.setItem("cols", cols);
}


function randomGeneration(){
    generation = 0;
    cols = parseInt(columnas);
    rows = parseInt(filas);
    probability = parseInt(densidad);
    grid = makeGrid(rows, cols);
    rules = reglas.split(",");
    
    var probArray = getRandomDistribution(probability);
    resizeCanvas(cols*resolution, rows*resolution);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            randomNumber = floor(random(100));
            grid[i][j] = probArray[randomNumber];
        }
    }
    gameOn = true;
    draw();

} 
    

function draw(){
    /*switch (shape){

          case 'Detener':
            noLoop();
            break;

          case 'Reiniciar':
            loop();
            break;

          case 'Graficar':
            graph();
             localStorage.setItem("gameOn", 0);
            break;

        }*/
            if(gameOn){
        let next = makeGrid(rows, cols);
        background(bgColor);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let x = i * resolution;
                let y = j * resolution;
                if(grid[i][j] == 1){
                    fill(pixelColor);
                    livingCells += 1;
                    stroke(0);
                    rect(y, x, resolution - 1, resolution - 1);
                }
                let state = grid[i][j];
                let neighbours = countNeighbours(grid, i, j); 
                if(state == 0 && neighbours == parseInt(rules[2])){
                    next[i][j] = 1;
                }
                else if(state == 1 && neighbours < parseInt(rules[0])){
                    next[i][j] = 0;
                }
                else if(state == 1 && neighbours > parseInt(rules[1])){
                    next[i][j] = 0;
                }else{
                    next[i][j] = state;
                }
            }
        }
        localStorage.setItem("livingCells", livingCells);
        localStorage.setItem("generation", generation);
        grid = next;
        generation+=1;
        livingCells = 0;
        deadCells = 0;
    }


    
    
 }

function countNeighbours(grid, x, y){
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (y + j + cols) % cols;
            let row = (x + i + rows) % rows; 
            sum += grid[row][col];
        }
    }
    sum -= grid[x][y];
    return sum
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
