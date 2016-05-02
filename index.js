#!/usr/bin/env  node

'use strict';
process.title = "Conway's Game of Life made by a cat"

const CLEAR_SCREEN = "\x1B[2J"

const ALIVE = 'O'.charCodeAt(0)
const DEAD = ' '.charCodeAt(0)

const stdout = process.stdout

let ms = 250

function getDimensions() {
  let dimensions = {
    width: process.stdout.columns,
    height: process.stdout.rows - 1
  }
  return dimensions
}

let dimensions = getDimensions()

function randomizeBuffer(buffer){
  for(let i = 0; i < buffer.length; i++){
    buffer[i] = Math.round(Math.random()) === 0 ? ALIVE : DEAD
  }
}

function newEnvironment (width, height) {
  let env = {
    buffers: [new Buffer(width * height), new Buffer(width * height)] ,
    now: 0
  }
  return env
}

let env = newEnvironment(dimensions.width, dimensions.height)

function tick(now, future, width){
  let length = now.length
  for(let i = 0; i < length; i++){
    const TOP = i - width
    const BOTTOM = i + width
    const LEFT = i - 1
    const RIGHT = i + 1
    const TOP_LEFT = TOP - 1
    const TOP_RIGHT = TOP + 1
    const BOTTOM_LEFT = BOTTOM - 1
    const BOTTOM_RIGHT = BOTTOM + 1
    let alive = 0
    alive += now[TOP] >= 0 && now[TOP] === ALIVE ? 1 : 0
    alive += now[BOTTOM] < length && now[BOTTOM] === ALIVE ? 1 : 0
    alive += now[LEFT] >= 0 && now[LEFT] === ALIVE ? 1 : 0
    alive += now[RIGHT] < length && now[RIGHT] === ALIVE ? 1 : 0
    alive += now[TOP_LEFT] >= 0 && now[TOP_LEFT] === ALIVE ? 1 : 0
    alive += now[TOP_RIGHT] >= 0 && now[TOP_RIGHT] === ALIVE ? 1 : 0
    alive += now[BOTTOM_LEFT] < length && now[BOTTOM_LEFT] === ALIVE ? 1 : 0
    alive += now[BOTTOM_RIGHT] < length && now[BOTTOM_RIGHT] === ALIVE ? 1 : 0
    future[i] = (now[i] === DEAD && alive === 3) || (now[i] === ALIVE && alive >= 2 && alive <= 3) ? ALIVE : DEAD
    //console.log(i, alive, future[i] === ALIVE ? true : false)
  }
}

function drawBuffer(buffer){
  stdout.write(CLEAR_SCREEN)
  stdout.write(buffer)
}

function update(env){
  let future = env.now === 0 ? 1 : 0
  let nowBuffer = env.buffers[env.now]
  let futureBuffer = env.buffers[future]
  tick(nowBuffer, futureBuffer, dimensions.width)
  drawBuffer(nowBuffer)
  env.now = future
}

randomizeBuffer(env.buffers[env.now])
let updateInterval = setInterval(update, ms, env)

process.stdout.on("resize", () => {
  clearInterval(updateInterval)
  dimensions = getDimensions();
  env = newEnvironment(dimensions.width, dimensions.height)
  randomizeBuffer(env.buffers[env.now])
  updateInterval = setInterval(update, ms, env)
})

process.on("SIGINT", () => {
  process.stdout.write(CLEAR_SCREEN)
  console.log(dimensions)
  process.exit(0)
})
