module.exports = function internalServerError(req, res, next) {
  res.sendStatus(500);
};
