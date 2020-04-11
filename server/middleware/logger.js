const moment = require('moment');

const logger = (req, res, next) => {
    console.log(`Request: ${req.protocol}://${req.get('host')}${req.originalUrl} ;; Time: ${moment().format()}`);
    next();
};

module.exports = logger;