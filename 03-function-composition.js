const _ = require('lodash');
const R = require('ramda')

// Updates an existing Ib in the DB
function patch({req, res, error}) {

    return "123";
}

const onlyAdmin = ({req, res, error}) => {
    const newError = req.user != 'dmin';

    return {req, res, error: newError}
}

const removeId = ({req, res, error}) => {
    if(req.body._id) {
        delete req.body._id;
    }
    return {req, res, error};
}

const adminOnlyPatch = _.flow(onlyAdmin, removeId, patch);

const data = {
    req: {user: 'admin', body: {_id:'123'}},
    res: {},
    error: false
}

adminOnlyPatch(data);

// todo: either monad
/*

*/
