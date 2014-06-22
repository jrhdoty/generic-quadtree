'use strict';

//two dimensional point
var Point = function(x, y){
  this.x = x;
  this.y = y;
};

//less than or equal to in both dimensions
Point.prototype.lte = function(point){
  if(this.x <= point.x && this.y <= point.y){
    return true;
  }
  return false;
};

//greater than or equal to in both dimensions
Point.prototype.gte = function(point){
  if (this.x >= point.x && this.y >= point.y){
    return true;
  }
  return false;
};

//return true if points are equal in both dimensions
Point.prototype.equals = function(point){
  return (this.x === point.x  && this.y === point.y);
};