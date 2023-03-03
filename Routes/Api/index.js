const route = require('express').Router();

// These would be triggered from the HTML page which is rendered as 
// a interface at the very start
// route.use('/update', require('./update').route);

route.use('/display', require('./display').route);
route.use('/create', require('./create').route);
route.use('/update', require('./update').route);



exports = module.exports = {
    route,
}