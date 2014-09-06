generic-quadtree
================
[![Build Status](https://travis-ci.org/jrhdoty/generic-quadtree.svg?branch=master)](https://travis-ci.org/jrhdoty/generic-quadtree)
## Description

Generic-Quadtree is a node module that implements a quadtree for storing key-value pairs where the keys are two dimensional values.

It is optimized for performing lookup of values in a specified range.

The module comes with implementations of a Point and a Box objects but will work with any objects that implement the methods on their prototypes.

For use in the browser or with node.

## Installation

``` bash
npm install generic-quadtree
```

## Usage

``` javascript
//create bounding area of quadtree
var min = new Point(0,0);
var max = new Point(100, 100);
var totalArea = new Box(min, max);

//instantiate new quadtree
var tree = new Quadtree(totalArea);

//insert item
var position = new Point(25, 35);
var item = 'value';
tree.insert(position, item);

//get array of all point-value pairs contained within range
var range = new Box(new Point(10, 10), new Point(40, 40));
var itemsInRange = tree.queryRange(range); //returns [{point: position; value: item}]

//get value if quadtree contains an item at point
tree.queryPoint(position); //returns 'value'

//remove point from tree
tree.removePoint(position); //tree is now empty

//clear all internal nodes and values
tree.clear();

```
