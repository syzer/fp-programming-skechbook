const _ = require('lodash');
const R = require('ramda')

// Updates an existing Ib in the DB
function patch({ req, res, error }) {
    return "123";
}

const onlyAdmin = ({ req, res, error }) => {
    const newError = req.user != 'dmin';

    return {req, res, error: newError}
}

// 1. use clone Object
const removeId = ({ req, res, error }) => {
    const newReq = _.clone(req)

    if (newReq.body._id) {
        delete req.body._id;
    }

    return { req: newReq, res, error };
}

const adminOnlyPatch = _.flow(onlyAdmin, removeId, patch);

const data = {
    req: { user: 'admin', body: { _id: '123' } },
    res: {},
    error: false
}

adminOnlyPatch(data);

// todo: either monad

// not a good idea
// adminOnlyPatch(data)
//     .then(console.log)
//     .catch(console.error)


// Either(Left | Right)


/*

 */
