
# sliders
rotation = document.getElementById 'rotation'
gap = document.getElementById 'gap'
lineWidth = document.getElementById 'line-width'
bottomColor = document.getElementById 'bottom-color'
topColor = document.getElementById 'top-color'

canvas1 = document.getElementById 'one'
canvas2 = document.getElementById 'two'
ctx1 = canvas1.getContext '2d'
ctx2 = canvas2.getContext '2d'

size = 400
canvas1.width = canvas2.width = size
canvas1.height = canvas2.height = size

getGapValue = ->
  parseInt gap.value, 10

getLineWidth = ->
  parseInt lineWidth.value, 10

gap.addEventListener 'input', ->
  drawMoireLines()

lineWidth.addEventListener 'input', ->
  drawMoireLines()

drawPattern = ({ctx, color}) ->
  ctx.clearRect 0, 0, size, size
  ctx.lineWidth = getLineWidth()
  ctx.strokeStyle = color
  for i in [0..size] by getGapValue()
    ctx.beginPath()
    ctx.moveTo i, 0
    ctx.lineTo i, size
    ctx.stroke()

rotation.addEventListener 'input', ->
  setRotation()

bottomColor.addEventListener 'input', ->
  drawMoireLines()

topColor.addEventListener 'input', ->
  drawMoireLines()

crossBrowserTransforms = ['-webkit-transform', '-ms-transform', 'transform']
do setRotation = ->
  value = "rotate(#{rotation.value}deg)"
  canvas2.style[transform] = value for transform in crossBrowserTransforms

do drawMoireLines = ->
  drawPattern ctx: ctx1, color: bottomColor.value
  drawPattern ctx: ctx2, color: topColor.value
