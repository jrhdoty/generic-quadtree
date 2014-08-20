var Quadtree = require('../Quadtree/quadtree.js');
var Point = Quadtree.Point;
var Box = Quadtree.Box;
var expect = require('chai').expect;

describe('Point', function () {
  'use strict';
  var point1, point2, point3, point4, point5, point6;

  beforeEach(function(){
    point1 = new Point(10, 10);
    point2 = new Point(20, 20);
    point3 = new Point(15, 15);
    point4 = new Point(5, 15);
    point5 = new Point(0, 0);
    point6 = new Point(15, 5);
  });

  it('exists', function () {
    expect(Box).to.be.a('function');

  });

  it('has functions lte and gte', function () {
    expect(point1.lte).to.be.a('function');
    expect(point1.gte).to.be.a('function');
  });

  it('should have correctly functioning ls function', function(){
    expect(point1.lte(point2)).to.equal(true);
    expect(point1.lte(point5)).to.equal(false);
    expect(point1.lte(point4)).to.equal(false);
    expect(point1.lte(point6)).to.equal(false);
  });

  it('should have correctly functioning ls function', function(){
    expect(point2.gte(point1)).to.equal(true);
    expect(point5.gte(point1)).to.equal(false);
    expect(point5.gte(point1)).to.equal(false);
    expect(point6.gte(point1)).to.equal(false);
  });

  it('should have correctly functioning equals function', function(){
    expect(point1.equals(new Point(10, 10))).to.equal(true);
  });
});
