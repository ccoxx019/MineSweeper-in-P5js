//following along with https://www.youtube.com/watch?v=LFU5ZlrR21E 33:19

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var grid;
var cols;
var rows;
var w = 20;

var totalBombs = 10;

function setup() {
  createCanvas(200, 200);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }
  
  //pick totalBombs spots
  var options = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }
  
  for (let n = 0; n < totalBombs; n++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    options.splice(index, 1);
    grid[i][j].bomb = true;
    
  }
  
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].countBombs();
    }
  }
  
}

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
}

function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();
        
        if (grid[i][j].bomb) {
          gameOver();
        }
      }
    }
  }
}

function draw() {
  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
  
  
}