generic-quadtree
================

Generic-Quadtree is a node module that implements a quadtree for storing key-value pairs 
where the keys are two dimensional values.

It is optimized for performing lookup of values in a specified range.

A Point and Box class are included but the quadtree will function with any Point or Box classes that implement the following functions

Point.prototype.gte
Point.prototype.lte
Point.prototype.equals

Box.prototype.contains
Box.prototype.overlaps
Box.prototype.splits
