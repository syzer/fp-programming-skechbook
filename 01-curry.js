// lets frite a function
add(1)(2)(3)
// =>6


const add =
    a =>
        b =>
            c => a + b + c

console.log(add(1)(2)(3))
