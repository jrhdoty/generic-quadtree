'use strict';
var Quadtree = function(box, max){

  this.box = box;
  this.children = null;
  this.value = [];
  this.max = max || 10; //max points per node
};

Quadtree.prototype.insert = function(point, object){
  //check if should contain point
  if (!this.box.contains(point)){
    return this;
  }

  //if is a leaf node and not full, then insert
  //need to check if it already exists though
  var i;
  if (this.children === null && this.value.length < this.max){
    for( i = 0; i < this.value.length; i++ ){
      if(this.value[i].point.equals(point)){
        this.value[i].value = object;
        return;
      }
    }
    this.value.push({point: point, value:object});
    return this;
  }

  //if is a leaf node but full, call subdivide
  if(this.children === null){
      this.subdivide();
  }

  // if is not a leaf node, call insert on child nodes
  for( i = 0; i < this.children.length; i++ ){
    this.children[i].insert(point, object);
  }
  this.value = [];
  return this;
};

Quadtree.prototype.subdivide = function(){
  //use box quadrant method to create 4 new equal child quadrants
  this.children = this.box.split();
  for(var i = 0; i < this.children.length; i++){
    this.children[i] = new Quadtree(this.children[i], this.max);
  }
  //try inserting each value into the new child nodes
  for(i = 0; i < this.value.length; i++){
    for(var k = 0; k < this.children.length; k++){
      this.children[k].insert(this.value[i].point, this.value[i].value);
    }
  }
};

Quadtree.prototype.queryRange = function(box){
  //return all point/value pairs contained in range
  var result = [];
  this._queryRangeRec(box, result);
  return result;
};

Quadtree.prototype._queryRangeRec = function(box, result){
  //if query area doesn't overlap this box then return
  if (!this.box.overlaps(box)){
    return;
  }
  //if leaf node with contained value(s), then check against contained objects
  var i;
  if(this.value.length > 0){
    for( i = 0; i < this.value.length; i++ ){
      if(box.contains(this.value[i].point)){
        result.push(this.value[i]);
      }
    }
    return;
  }
  //if has children, then make recursive call on children 
  if(this.children !== null){
    for( i = 0; i < this.children.length; i++ ){
      this.children[i]._queryRangeRec(box, result);
    }
    return;
  }
};

Quadtree.prototype.queryPoint = function(point){
  //return value if tree contains point
  if(!this.box.contains(point)){
    return null;
  }

  if (this.value.length > 0){
    for (var i = 0; i < this.value.length; i++){
      if (this.value[i].point.equals(point)){
       return this.value[i].value;
      }
    }
  }

  if (this.children !== null){
    var val = null;
    for(var i = 0; i < this.children.length; i++){
      val = val || this.children[i].queryPoint(point);
    }
    return val;
  }
  return null;
};

Quadtree.prototype.removePoint = function(point){
  //return if tree doesn't contain point
  if(!this.box.contains(point)){
    return;
  }

  var i;
  if (this.value.length > 0){
    for ( i = 0; i < this.value.length; i++ ){
      if (this.value[i].point.equals(point)){
        this.value.splice(i,1);
        return;
      }
    }
    return; // didn't contain point and is leaf node
  }

  if (this.children !== null){
    for( i = 0; i < this.children.length; i++ ){
      this.children[i].removePoint(point);
    }
  }
  return;
};

Quadtree.prototype.clear = function(){
  this.children = null;
  this.value = [];
};


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

//make compatible with use in browser
if (typeof module !== 'undefined') {
  module.exports.Quadtree = Quadtree;
  module.exports.Box = Box;
  module.exports.Point = Point;
}
