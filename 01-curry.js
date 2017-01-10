const _ = require('lodash')

const add =
    a =>
        b =>
            c => a + b + c

// lets frite a function
add(1)(2)(3)
// =>6

console.log(add(1)(2)(3))

const conventionalAdd = (a, b, c) => a + b + c

const curriedAdd = _.curry(conventionalAdd)

console.log(curriedAdd(1, 2)(3))
