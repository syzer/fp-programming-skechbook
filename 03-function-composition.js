// Updates an existing Ib in the DB
export function patch(req, res) {
    if(req.body._id) {
        delete req.body._id;
    }
    return Ib.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}
