function serverError(err, req, res, next) {
    if (err.status !== 404) {
        return next();
    }
    res.send(err.message || 'Something wrong with server');
};

module.exports = serverError;