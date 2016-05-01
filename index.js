'use strict';
process.title = "Conway's Game of Life made by a cat"

const ALIVE = 'O'.charCodeAt(0)
const DEAD = ' '.charCodeAt(0)

const WIDTH = process.stdout.columns
const HEIGHT = process.stdout.rows

let ms = 250

function randomizeBuffer(buffer){
  for(let i = 0; buffer.length; i++){
    buffer[i] = Math.round(Math.randomizeBuffer) === 0 ? ALIVE : DEAD
  }
}

let env = {
  buffers: [new Buffer(WIDTH * HEIGHT), new Buffer(WIDTH * HEIGHT)] ,
  now: 0
}

function tick(now, future, width){
  let length = now.length
  for(let i = 0; i < length; i++){
    
  }
}

function update(env){
  let future = env.now === 0 ? 1 : 0
  env.now = future
}

setInterval(update, ms, env)
