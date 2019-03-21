import React, { Component } from 'react';
export default class Person extends Component {

  componentDidMount() {
function draggable(element) {
  var isMouseDown = false;
    var mouseX;
    var mouseY;
    var elementX = 0;
    var elementY = 0;
    element.addEventListener('mousedown', onMouseDown);
  function onMouseDown(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        isMouseDown = true;
   }
    element.addEventListener('mouseup', onMouseUp);
  function onMouseUp(event) {
        isMouseDown = false;
        elementX = parseInt(element.style.left) || 0;
        elementY = parseInt(element.style.top) || 0;
        alert(elementY);
        var r1 = new VRope(new VPoint(elementX, 20),
                           new VPoint(elementX+500,elementY), 
                           elementY, getRandomColor());
        ropes.push(r1);
    }
    document.addEventListener('mousemove', onMouseMove);
  function onMouseMove(event) {
      if (!isMouseDown) return;
        var deltaX = event.clientX - mouseX;
        var deltaY = event.clientY - mouseY;
        element.style.left = elementX + deltaX + 'px';
        element.style.top = elementY + deltaY + 'px';
    }
}
// Prefer camera resolution nearest to 1280x720.
var constraints = { audio: true, video: { width: 1280, height: 720 } }; 

navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
  var video = document.getElementById('me');
  video.srcObject = mediaStream;
  video.play();
  draggable(video);
}).catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
  var canvas;
var context;
var screenWidth;
var screenHeight;
var PI2 = Math.PI * 2;
var bgColor = '#FFFFFF';
var rope;
var gravity = 0.2;
var ropes = [];
var movementRamp = 0.984;
var windFactor = 0.02;
var windDirection = 1;
var windValue = 0;
var step = 0;
var cutting = false;
var blur = 0.6;
var gui;
var colors = ['#565853', '#5E9190', '#DCD9CD', '#BD4A61'];
window.getAnimationFrame =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback)
{
  window.setTimeout(callback, 16.6);
};
window.onload = function()
{
  canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    window.onresize = function()
  {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    context.fillStyle = bgColor;
    context.fillRect(0, 0, screenWidth, screenHeight);
  };

  window.onresize();
  
  init();
  guiSetup();

    loop();
};

function init()
{
  generateRopes();

  canvas.addEventListener('mousemove', function(e)
  {
    if(cutting) checkRopesIntersection(e.clientX, e.clientY);
  });

  canvas.addEventListener('mousedown', function(e)
  {
    cutting = true;
  });

  canvas.addEventListener('mouseup', function(e)
  {
    cutting = false;
  });
}

function guiSetup()
{
  var controls =
  {
    blur:blur,
    gravity:gravity,
    windFactor:windFactor,
    movementRamp:movementRamp,

    reset:reset
  };
}

function reset()
{
  ropes = [];

  generateRopes();
}

function generateRopes()
{
  var r1 = new VRope(new VPoint(document.getElementById('me').scrollLeft, 20), new VPoint(document.getElementById('me').scrollLeft+500, 20), 26, getRandomColor());

  ropes.push(r1);
}

function getRandomColor()
{
  return colors[(Math.random() * colors.length) >> 0];
}

function checkRopeIntersection(rope, x, y)
{
  var i = rope.points.length - 1;

  for(i; i > -1; --i)
  {
    var point = rope.points[i];
    var vx = x - point.x;
    var vy = y - point.y;
    var length = Math.sqrt(vx * vx + vy * vy);

    if(length < 10)
    {
      var segment = getSegmentFromPoint(point, rope);
      segment.constrainable = false;
    }
  }
};

function checkRopesIntersection(x, y)
{
  var i = ropes.length - 1;

  for(i; i > -1; --i)
  {
    var rope = ropes[i];
    checkRopeIntersection(rope, x, y);
  }
}

function getSegmentFromPoint(point, rope)
{
  var i = rope.segments.length - 1;

  for(i; i > -1; --i)
  {
    var segment = rope.segments[i];

    if(segment.a == point || segment.b == point)
    {
      return segment;

      break;
    }
  }
}
function loop()
{
  context.globalAlpha = 1 - blur;
  context.fillStyle = bgColor;
  context.fillRect(0, 0, screenWidth, screenHeight);
  context.globalAlpha = 1;

  updateWind();
  updateRopes();
  drawRopes();

  ropes[0].x += 1;

  step += 0.06;

  window.getAnimationFrame(loop);
}

function updateWind()
{
  windValue = Math.sin(step * Math.cos(step * 0.02) * Math.sin(step * 0.1) * 0.1) * windFactor * windDirection;
}

function updateRopes()
{
  var i = ropes.length - 1;

  for(i; i > -1; --i)
  {
    var rope = ropes[i];
    rope.update();
  }
}

function drawRopes()
{
  var i = ropes.length - 1;

  for(i; i > -1; --i)
  {
    var rope = ropes[i];
    drawRope(rope, '#FFF', 4);
  }
}

function Vector2(x, y)
{
  this.x = x || 0;
  this.y = y || 0;
}

Vector2.prototype =
{
  constructor:Vector2,

  angle :function()
  {
    return Math.atan2(this.y, this.x);
  },

  setAngle:function(value)
  {
    var length = this.length();

    this.x = Math.cos(value) * length;
    this.y = Math.sin(value) * length;
  },

  length:function()
  {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },

  setLength:function(value)
  {
    var angle = this.angle();

    this.x = Math.cos(angle) * value;
    this.y = Math.sin(angle) * value;
  },

  dx:function()
  {
    return this.x / this.length();
  },

  dy:function()
  {
    return this.y / this.length();
  },

  ln:function()
  {
    return new Vector2(this.y, -this.x);
  },

  rn:function()
  {
    return new Vector2(-this.y, this.x);
  },
};

function VPoint(x, y)
{
  this.x = x || 0;
  this.y = y || 0;
  this.prevX = this.x;
  this.prevY = this.y;
}

VPoint.prototype =
{
  constructor:VPoint,

  setPos:function(x, y)
  {
    this.prevX = this.x = x;
    this.prevY = this.y = y;
  },

  update:function()
  {
    var tx = this.x;
    var ty = this.y;

    this.x += (this.x - this.prevX) * movementRamp;
    this.y += (this.y - this.prevY) * movementRamp;

    this.prevX = tx;
    this.prevY = ty;
  }
};

function VSegment(pointA, pointB)
{
  this.a = pointA;
  this.b = pointB;
  this.constrainable = true;

  this.length = Math.sqrt((this.b.x - this.a.x) * (this.b.x - this.a.x) + (this.b.y - this.a.y) * (this.b.y - this.a.y));
}

VSegment.prototype =
{
  constructor:VSegment,

  constrain:function()
  {
    var vx = this.b.x - this.a.x;
    var vy = this.b.y - this.a.y;

    var t = Math.sqrt(vx * vx + vy * vy);
    var diff = this.length - t;
    var offsetX = ((vx / t) * diff) * 0.5;
    var offsetY = ((vy / t) * diff) * 0.5;

    this.a.x -= offsetX;
    this.a.y -= offsetY;
    this.b.x += offsetX;
    this.b.y += offsetY;
  },

  update:function()
  {
    this.a.x += windValue;
    this.b.x += windValue;
    this.a.y += gravity;
    this.b.y += gravity;

    this.a.update();
    this.b.update();

    if(this.constrainable) this.constrain();
  }
};

function VRope(pa, pb, segs, color)
{
  this.a = pa;
  this.b = pb;
  this.segments = [];
  this.points = [];
  this.color = color || '#F00';
  this.lineWidth = (Math.random() * 8 + 4) >> 0;

  var vx = this.b.x - this.a.x;
  var vy = this.b.y - this.a.y;
  var t = Math.sqrt(vx * vx + vy * vy);
  var segmentWidth = t / segs;

  var i = 0;
  var l = segs;

  for(i; i < l; ++i)
  {
    var pointA = (this.points.length > 0) ? this.points[this.points.length - 1] : new VPoint(segmentWidth * i + pa.x, pa.y);
    var pointB = new VPoint(segmentWidth * (i + 1) + pa.x, pa.y);

    this.points.push(pointA);
    this.points.push(pointB);

    var segment = new VSegment(pointA, pointB);

    this.segments.push(segment);
  }
}

VRope.prototype =
{
  constructor:VRope,

  update:function()
  {
    var i = this.segments.length -1;

    for(i; i > -1; --i)
    {
      var segment = this.segments[i];

      segment.update();
    }

    this.points[0].setPos(this.a.x, this.a.y);
    this.points[this.points.length - 1].setPos(this.b.x, this.b.y);
  }
}

function drawRope(rope, color, lineWidth)
{
  var i = rope.segments.length - 1;
  var c = color || '#FFF';

  for(i; i > -1; --i)
  {
    var segment = rope.segments[i];

    context.strokeStyle = rope.color;
    context.lineWidth = rope.lineWidth;
    context.beginPath();
    context.moveTo(segment.a.x, segment.a.y);
    context.lineTo(segment.b.x, segment.b.y);
    if(segment.constrainable) context.stroke();
  }
}

function Point(x, y)
{
  this.x = x || 0;
  this.y = y || 0;
}

Point.prototype =
{
  constructor:Point
};

function norm(value, min, max)
{
  return (value - min) / (max - min);
};

function lerp(norm, min, max)
{
  return (max - min) * norm + min;
};

function map(value, smin, smax, omin, omax)
{
  return this.lerp(norm(value, smin, smax), omin, omax);
};

function dotProduct(v1, v2)
{
  return v1.dx() * v2.dx() + v1.dy() * v2.dy();
};

function unitRandom()
{
  return 1 - Math.random() * 2;
};
  }
  render() {
  return(
      <div>
      <canvas id='canvas'></canvas>
      <video id='me' autoPlay={true}></video>
    </div>
    );
  }
}