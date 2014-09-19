
# sliders
rotation = document.getElementById 'rotation'
gap = document.getElementById 'gap'
lineWidth = document.getElementById 'line-width'

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

drawPattern = ({ctx}) ->
  ctx.clearRect 0, 0, size, size
  ctx.lineWidth = getLineWidth()
  for i in [0..size] by getGapValue()
    ctx.beginPath()
    ctx.moveTo i, 0
    ctx.lineTo i, size
    ctx.stroke()

rotation.addEventListener 'input', ->
  setRotation()

do setRotation = ->
  canvas2.style['-webkit-transform'] = "rotate(#{rotation.value}deg)"

do drawMoireLines = ->
  drawPattern ctx: ctx1
  drawPattern ctx: ctx2
