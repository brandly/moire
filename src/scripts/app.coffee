
do setupLines = ->
  # sliders
  rotation = document.getElementById 'lines-rotation'
  gap = document.getElementById 'lines-gap'
  lineWidth = document.getElementById 'lines-line-width'
  bottomColor = document.getElementById 'lines-bottom-color'
  topColor = document.getElementById 'lines-top-color'

  canvas1 = document.getElementById 'lines-one'
  canvas2 = document.getElementById 'lines-two'
  ctx1 = canvas1.getContext '2d'
  ctx2 = canvas2.getContext '2d'

  size = 400
  canvas1.width = canvas2.width = size
  canvas1.height = canvas2.height = size

  getGapValue = ->
    parseInt gap.value, 10

  getLineWidth = ->
    parseInt lineWidth.value, 10

  drawPattern = ({ctx, color}) ->
    ctx.clearRect 0, 0, size, size
    ctx.lineWidth = getLineWidth()
    ctx.strokeStyle = color
    for i in [0..size] by getGapValue()
      ctx.beginPath()
      ctx.moveTo i, 0
      ctx.lineTo i, size
      ctx.stroke()

  for element in [gap, lineWidth, bottomColor, topColor]
    element.addEventListener 'input', ->
      drawMoireLines()

  rotation.addEventListener 'input', ->
    setRotation()

  crossBrowserTransforms = ['-webkit-transform', '-ms-transform', 'transform']
  do setRotation = ->
    value = "rotate(#{rotation.value}deg)"
    canvas2.style[transform] = value for transform in crossBrowserTransforms

  do drawMoireLines = ->
    drawPattern ctx: ctx1, color: bottomColor.value
    drawPattern ctx: ctx2, color: topColor.value

do setupCircles = ->
  distance = document.getElementById 'circles-distance'
  gap = document.getElementById 'circles-gap'
  lineWidth = document.getElementById 'circles-line-width'
  bottomColor = document.getElementById 'circles-bottom-color'
  topColor = document.getElementById 'circles-top-color'

  canvas = document.getElementById 'circles-canvas'
  ctx = canvas.getContext '2d'

  size = 400
  canvas.width = canvas.height = size

  getDistance = ->
    parseInt distance.value, 10

  getGapValue = ->
    parseInt gap.value, 10

  getLineWidth = ->
    parseInt lineWidth.value, 10

  for element in [distance, gap, lineWidth, bottomColor, topColor]
    element.addEventListener 'input', ->
      drawMoireLines()

  halfCanvas = size / 2
  y = halfCanvas
  drawCircles = ({x, color}) ->
    # at [x, y], draw a series of circles with radious from gap out
    ctx.strokeStyle = color
    gapValue = getGapValue()
    for radius in [gapValue..halfCanvas] by gapValue
      ctx.beginPath()
      ctx.arc x, y, radius, 0, (Math.PI * 2)
      ctx.stroke()

  do drawMoireLines = ->
    ctx.clearRect 0, 0, size, size
    ctx.lineWidth = getLineWidth()
    halfDistance = getDistance() / 2
    drawCircles x: (halfCanvas - halfDistance), color: bottomColor.value
    drawCircles x: (halfCanvas + halfDistance), color: topColor.value


# Basically, the wrapper's height is questionable, since everything is
# absolutely positioned in it. When there are other elements below it,
# it needs an explicit height. There's probably a better way to do this.
wrappers = document.getElementsByClassName 'wrapper'

do setWrapperHeightToWidth = ->
  for wrapper in wrappers
    wrapper.style.height = "#{wrapper.offsetWidth}px"

window.addEventListener 'resize', setWrapperHeightToWidth
