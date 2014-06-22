'use strict';

function benchmark() {

  function test(numPoints) {
    var max = 10000;  //dimensions of area
    var p = []; //list of points
    var x, y, i;
    
    //create 'numPoints' many points with random coordinates in area
    for( i = 0; i < numPoints; i++ ){
      x = Math.random()*max;
      y = Math.random()*max;
      p.push(new Point(x, y));
    }

    //create a new quad tree for containing all the points
    var box = new Box(new Point(0, 0), new Point(max, max));
    var quad = new Quadtree(box);

    var start = +new Date();  //set start time for test

    //insert all of the points
    i = numPoints;
    while (i > 0) {
      quad.insert(p[i-1], true);
      i--;
    }

    //do a queryRange lookup on all of the points in a 20x20 box with the point in the middle
    i = numPoints;
    while(i > 0){
      quad.queryRange(new Box(new Point(p[i-1].x-10, p[i-1].y-10), 
                              new Point(p[i-1].x+10, p[i-1].y+10)));
      i--;
    }

    //set end time for the test
    var end = +new Date();
    //translate into seconds and return
    return ((end - start)/1000.0);
  }

  var t, p, output;
  //print results of each test
  for (var i = 10000; i <= 100000; i += 10000) {
    t = test(i);
    output = i + ' insertions: ' + t + ' /sec';
    console.log(output);
    p = document.createElement('p');
    p.innerHTML = output;
    document.body.appendChild(p);
  }
}

benchmark();