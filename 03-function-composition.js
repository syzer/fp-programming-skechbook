const _ = require('lodash');

// Updates an existing Ib in the DB
function patch(req, res, error) {

    return "123";
}

const onlyAdmin = (req, res) => {
    const error = req.user != 'dmin';

    return {req, res, error}
}

const removeId = (req, res, error) => {
    if(req.body._id) {
        delete req.body._id;
    }
    return {req, res, error};
}

const adminOnlyPatch = _.flow(onlyAdmin, removeId, patch);

adminOnlyPatch({user: 'admin', body: {_id:'123'}}, {});


/*

*/
