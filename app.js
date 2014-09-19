(function() {
  var bottomColor, canvas1, canvas2, crossBrowserTransforms, ctx1, ctx2, drawMoireLines, drawPattern, gap, getGapValue, getLineWidth, lineWidth, rotation, setRotation, size, topColor;

  rotation = document.getElementById('rotation');

  gap = document.getElementById('gap');

  lineWidth = document.getElementById('line-width');

  bottomColor = document.getElementById('bottom-color');

  topColor = document.getElementById('top-color');

  canvas1 = document.getElementById('one');

  canvas2 = document.getElementById('two');

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

  gap.addEventListener('input', function() {
    return drawMoireLines();
  });

  lineWidth.addEventListener('input', function() {
    return drawMoireLines();
  });

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

  rotation.addEventListener('input', function() {
    return setRotation();
  });

  bottomColor.addEventListener('input', function() {
    return drawMoireLines();
  });

  topColor.addEventListener('input', function() {
    return drawMoireLines();
  });

  crossBrowserTransforms = ['-webkit-transform', '-ms-transform', 'transform'];

  (setRotation = function() {
    var transform, value, _i, _len, _results;
    value = "rotate(" + rotation.value + "deg)";
    _results = [];
    for (_i = 0, _len = crossBrowserTransforms.length; _i < _len; _i++) {
      transform = crossBrowserTransforms[_i];
      _results.push(canvas2.style[transform] = value);
    }
    return _results;
  })();

  (drawMoireLines = function() {
    drawPattern({
      ctx: ctx1,
      color: bottomColor.value
    });
    return drawPattern({
      ctx: ctx2,
      color: topColor.value
    });
  })();

}).call(this);
