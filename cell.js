function Cell(i, j, w) {  
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.neighborCount = 0;
}

Cell.prototype.show = function() {
  stroke(0);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  if (this.revealed) {
    if (this.bomb) {
      fill(0);
      ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * .5);
    } else {
      fill(175);
      rect(this.x, this.y, this.w, this.w);
      if (this.neighborCount > 0) {
        textAlign(CENTER);
        fill(0);
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w * 0.7);
      }
    }
  }
}

Cell.prototype.countBombs = function() {
  if (this.bomb) {
    this.neighborCount = -1;
    return;
  }
  var total = 0;
  for (let xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (let yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbor = grid[i][j];
      if (neighbor.bomb) {
        total++;
      }
    }
  }
  this.neighborCount = total;
}

Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
  this.revealed = true;
  if (this.neighborCount == 0) {
    this.floodFill();
  }
}

Cell.prototype.floodFill = function() {
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbor = grid[i][j];
      if (!neighbor.revealed) {
        neighbor.reveal();
      }
    }
  }
}