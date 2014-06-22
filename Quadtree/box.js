'use strict';

//generalized box class, defined by two points with lessThan (lte) and greaterThan (gte) functions
var Box = function(least, greatest){
  this.low = least;
  this.high = greatest;
};

//return true if box contains point
Box.prototype.contains = function(point){
  if(this.low.lte(point) && this.high.gte(point)){
    return true;
  }
  return false;
};

//return true if overlap of boxes
Box.prototype.overlaps = function(box){
  //if this contains either point of box, then there is an overlap
  if(this.contains(box.low) || this.contains(box.high) || 
     box.contains(this.low) || box.contains(this.high)){
      return true;
  }
  return false;
};

//return array of children
Box.prototype.split = function(){
  var result = [];
  result.push(new Box(this.low, new Point((this.low.x+this.high.x)/2, (this.low.y+this.high.y)/2)));
  result.push(new Box(new Point((this.low.x+this.high.x)/2, this.low.y), 
              new Point(this.high.x, (this.low.y+this.high.y)/2)));
  result.push(new Box(new Point((this.low.x+this.high.x)/2, (this.low.y+this.high.y)/2), this.high));
  result.push(new Box(new Point(this.low.x, (this.low.y+this.high.y)/2), 
              new Point((this.low.x+this.high.x)/2, this.high.y)));
  return result;
};