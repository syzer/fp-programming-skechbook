// X indempotent
function testMe(a, date = new Date()) {
    return date + a
}

// curl -X DELETE localhost:/api/users/666
// => 200
// => 204

// => 404
// not an error
// TODO lets check

// curl -X DELETE localhost:/api/users/666
// curl -X DELETE localhost:/api/users/667

// curl -X DELETE localhost:/api/users/666,667

// curl -X DELETE localhost:/api/users/666
// ... 204

// curl -X DELETE localhost:/api/users/666
// ... 404