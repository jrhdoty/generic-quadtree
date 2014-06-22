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
  if (this.children === null && this.value.length < this.max){
    for(var i = 0; i < this.value.length; i++){
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
  for(var i = 0; i < this.children.length; i++){
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
  //if query area doesn't overlap this box, return
  if ((this.children === null && this.value.length === 0) || !this.box.overlaps(box)){
    return [];
  }

  //if root node with contained value(s), then check against contained objects
  var intersection = [];
  if(this.value.length > 0){
    for(var i = 0; i < this.value.length; i++){
      if(box.contains(this.value[i].point)){
        intersection.push(this.value[i]);
      }
    }
    return intersection;
  }

  //if has children, then make recursive call on children 
  if(this.children !== null){
    for(var i = 0; i < this.children.length; i++){
      intersection = intersection.concat(this.children[i].queryRange(box));
    }
    return intersection;
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
