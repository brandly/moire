(function() {
  var setWrapperHeightToWidth, setupCircles, setupLines, wrappers;

  (setupLines = function() {
    var bottomColor, canvas1, canvas2, crossBrowserTransforms, ctx1, ctx2, drawMoireLines, drawPattern, element, gap, getGapValue, getLineWidth, lineWidth, rotation, setRotation, size, topColor, _i, _len, _ref;
    rotation = document.getElementById('lines-rotation');
    gap = document.getElementById('lines-gap');
    lineWidth = document.getElementById('lines-line-width');
    bottomColor = document.getElementById('lines-bottom-color');
    topColor = document.getElementById('lines-top-color');
    canvas1 = document.getElementById('lines-one');
    canvas2 = document.getElementById('lines-two');
    ctx1 = canvas1.getContext('2d');
    ctx2 = canvas2.getContext('2d');
    size = 400;
    canvas1.width = canvas2.width = size;
    canvas1.height = canvas2.height = size;
    getGapValue = function() {
      return parseInt(gap.value, 10);
    };
    getLineWidth = function() {
      return parseInt(lineWidth.value, 10);
    };
    drawPattern = function(_arg) {
      var color, ctx, i, _i, _ref, _results;
      ctx = _arg.ctx, color = _arg.color;
      ctx.clearRect(0, 0, size, size);
      ctx.lineWidth = getLineWidth();
      ctx.strokeStyle = color;
      _results = [];
      for (i = _i = 0, _ref = getGapValue(); _ref > 0 ? _i <= size : _i >= size; i = _i += _ref) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, size);
        _results.push(ctx.stroke());
      }
      return _results;
    };
    _ref = [gap, lineWidth, bottomColor, topColor];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      element.addEventListener('input', function() {
        return drawMoireLines();
      });
    }
    rotation.addEventListener('input', function() {
      return setRotation();
    });
    crossBrowserTransforms = ['-webkit-transform', '-ms-transform', 'transform'];
    (setRotation = function() {
      var transform, value, _j, _len1, _results;
      value = "rotate(" + rotation.value + "deg)";
      _results = [];
      for (_j = 0, _len1 = crossBrowserTransforms.length; _j < _len1; _j++) {
        transform = crossBrowserTransforms[_j];
        _results.push(canvas2.style[transform] = value);
      }
      return _results;
    })();
    return (drawMoireLines = function() {
      drawPattern({
        ctx: ctx1,
        color: bottomColor.value
      });
      return drawPattern({
        ctx: ctx2,
        color: topColor.value
      });
    })();
  })();

  (setupCircles = function() {
    var bottomColor, canvas, ctx, distance, drawCircles, drawMoireLines, element, gap, getDistance, getGapValue, getLineWidth, halfCanvas, lineWidth, size, topColor, y, _i, _len, _ref;
    distance = document.getElementById('circles-distance');
    gap = document.getElementById('circles-gap');
    lineWidth = document.getElementById('circles-line-width');
    bottomColor = document.getElementById('circles-bottom-color');
    topColor = document.getElementById('circles-top-color');
    canvas = document.getElementById('circles-canvas');
    ctx = canvas.getContext('2d');
    size = 400;
    canvas.width = canvas.height = size;
    getDistance = function() {
      return parseInt(distance.value, 10);
    };
    getGapValue = function() {
      return parseInt(gap.value, 10);
    };
    getLineWidth = function() {
      return parseInt(lineWidth.value, 10);
    };
    _ref = [distance, gap, lineWidth, bottomColor, topColor];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      element.addEventListener('input', function() {
        return drawMoireLines();
      });
    }
    halfCanvas = size / 2;
    y = halfCanvas;
    drawCircles = function(_arg) {
      var color, gapValue, radius, x, _j, _results;
      x = _arg.x, color = _arg.color;
      ctx.strokeStyle = color;
      gapValue = getGapValue();
      _results = [];
      for (radius = _j = gapValue; gapValue > 0 ? _j <= halfCanvas : _j >= halfCanvas; radius = _j += gapValue) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        _results.push(ctx.stroke());
      }
      return _results;
    };
    return (drawMoireLines = function() {
      var halfDistance;
      ctx.clearRect(0, 0, size, size);
      ctx.lineWidth = getLineWidth();
      halfDistance = getDistance() / 2;
      drawCircles({
        x: halfCanvas - halfDistance,
        color: bottomColor.value
      });
      return drawCircles({
        x: halfCanvas + halfDistance,
        color: topColor.value
      });
    })();
  })();

  wrappers = document.getElementsByClassName('wrapper');

  (setWrapperHeightToWidth = function() {
    var wrapper, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = wrappers.length; _i < _len; _i++) {
      wrapper = wrappers[_i];
      _results.push(wrapper.style.height = "" + wrapper.offsetWidth + "px");
    }
    return _results;
  })();

  window.addEventListener('resize', setWrapperHeightToWidth);

}).call(this);
