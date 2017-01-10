// https://github.com/folktale/data.task
const Task = require('data.task')
const fs = require('fs')
const path = require('path')
const here = fileName => path.join('.', fileName)

// read : String -> Task(Error, Buffer)
const read = (path) =>
    new Task((reject, resolve) =>
        fs.readFile(path, (err, data) =>
            err ? reject(err) : resolve(data)))

// decode : Task(Error, Buffer) -> Task(Error, String)
const decode = (buffer) =>
    buffer.map(a => a.toString('utf-8'))

// toJson : Task(Err, String) -> Task(Error, Object)
const toJson = (str) => str.map(JSON.parse)

// incPropABy1 : Task(Error, Object) -> Task(Error, Number)
const incPropABy1 = (obj) => obj.map(e => e.a + 1)

const intro = incPropABy1(toJson(decode(read(here('in.json')))))
const outro = incPropABy1(toJson(decode(read(here('out.json')))))

// You can use `.chain` to sequence two asynchronous actions, and
// `.map` to perform a synchronous computation with the eventual
// value of the Task.
const concatenated = intro
    .chain(a =>
        outro.map(b => a + b))

// But the implementation of Task is pure, which means that you'll
// never observe the effects by using `chain` or `map` or any other
// method. The Task just records the sequence of actions that you
// wish to observe, and defers the playing of that sequence of actions
// for your application's entry-point to call.
//
// To observe the effects, you have to call the `fork` method, which
// takes a callback for the rejection, and a callback for the success.
concatenated.fork(console.error, console.log)

// Either(Left | Right)
