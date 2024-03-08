function make2dArray(c, r){
    let arr = new Array(c);
    for(let i = 0; i < arr.length; i++){
        arr[i] = new Array(r);
        for(let j = 0; j < arr[i].length; j++){
            arr[i][j] = floor(random(2));
        }
    }
    return arr;
}


let canvas;
let grid;
let cols;
let rows;
let res = 10;
let fps = 30;
let stack;
let start;
let generation = 0;
let genText;
let speedUP;
let speedDOWN;
let simRunning = false;
let fpsCounter;
let test;
let canvasWIDTH = 600
let canvasHEIGHT = 400
function setup(){
    canvas = createCanvas(canvasWIDTH, canvasHEIGHT);
    canvas.parent('life-board');
    cols = floor(width / res);
    rows = floor(height / res);
    grid = make2dArray(cols,rows);
    stack = new Stack(); 
    drawGrid(grid);
}


function draw() {
    frameRate(fps);
    //clickDraw();
    if(mouseIsPressed)
        my_mousePressed();
    if(simRunning && stack.isEmpty()){
        drawGrid(grid);
        applyRules(grid);
        updateGrid(grid);
        generation += 1; 
    } 
    genText.textContent = `Generation: ${generation}`;
}

function drawGrid(g){
    stroke(0)
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            let x = i * res;
            let y = j * res;
            if(g[i][j] == 1){
                fill('blue');
                rect(x,y,res,res);
            } else{
                fill(0)
                rect(x,y,res,res);
            }
        }
    }
}console.log(grid)

function countNeighbors(g, x, y){
    let count = 0;
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            if(i+x > -1 && j+y > -1 && i+x < cols && j+y < rows){
                count += g[x + i][y + j];
            }
        }
    }
    count -= g[x][y];
    return count;
}

function applyRules(g){
    if(!stack.isEmpty()) return;
    let state;
    let neighbors;
    let newstate;
    for(let i = 0; i < cols; i ++){
        for(let j = 0; j < rows; j++){
            state = g[i][j];
            neighbors = countNeighbors(g,i,j);
            if(state == 1){
                if(neighbors < 2 || neighbors > 3){
                    newstate = 0;
                } else{
                    newstate = state;
                }
            } else if(state == 0){
                if(neighbors == 3){
                    newstate = 1;
                } else{
                    newstate = state;
                }
            }
            stack.push(newstate);
        }
    }
}

function updateGrid(g){
    if(stack.size() != (canvasWIDTH/10)*(canvasHEIGHT/10)) return;
    for(let i = cols-1; i >= 0; i--){
        for(let j = rows-1; j >= 0; j--){
            g[i][j] = stack.pop();
        }
    }
}
window.addEventListener("DOMContentLoaded", (event) =>{
    start =  document.querySelector('#start-button');
    genText = document.querySelector('#gen');
    speedUP = document.querySelector('#speedUP');
    speedDOWN = document.querySelector('#speedDOWN');
    fpsCounter = document.querySelector('#genpersec');
    if(start){
        start.addEventListener('click', clicked, false);
    }
    if(speedUP){
        speedUP.addEventListener('click', speedup, false);
    }
    if(speedDOWN){
        speedDOWN.addEventListener('click', slowdown, false);
    }
});


function clicked(){
    if(!stack.isEmpty()) return;
    simRunning = !simRunning;
    if(simRunning){
        start.textContent = "Pause";
    } else{
        start.textContent = "Continue";
    }
    console.log(simRunning);
}
function slowdown(){
    if(fps <= 1) return;
    fps -= 1;
    fpsCounter.textContent = `Generation Per Second: ${fps}`;
}
function speedup(){
    if(fps >= 60) return;
    fps += 1;
    fpsCounter.textContent = `Generation Per Second: ${fps}`;
}
/*
function clickDraw(){
    if(!stack.isEmpty()) return;
    if(mouseX >= 0 && mouseX < 1280 && mouseY >= 0 && mouseY < 720 && mouseIsPressed){
        let x = Math.trunc(mouseX/res);
        let y = Math.trunc(mouseY/res);
        console.log(x,y)
        if(grid[x][y] == 1){
            grid[x][y] = 0;
        } else{
            grid[x][y] = 1;
        }
        drawGrid(grid);
    }
}
*/

let makecell = true;
function mouseReleased(){
    makecell = !makecell;
}
function my_mousePressed(){
    if(mouseX >= 0 && mouseX < canvasWIDTH && mouseY >= 0 && mouseY < canvasHEIGHT && stack.isEmpty()){
        let x = Math.trunc(mouseX/res);
        let y = Math.trunc(mouseY/res);
        //console.log(x,y)
        //if(grid[x][y] == 1){
        //    grid[x][y] = 0;
        //} else{
        //    grid[x][y] = 1;
        //}
        if(makecell)
            grid[x][y] = 1;
        else
            grid[x][y] = 0;
        if(!simRunning){
            drawGrid(grid);
        }
        generation = 0;
    }
    return false;
}
