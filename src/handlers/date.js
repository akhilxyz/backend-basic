var moment = require('moment');
var dateFormatter = require('../../src/lib/dateFormatter');


const getDate = async (req, res, next) => {
    try {
        let format = dateFormatter();
        req.data = format;
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

const addDate = async (req, res, next) => {
    try {
        let props = req.body.format
        if (!props) throw new Error("Please Provide Date Type");
        const format = dateFormatter(props)
        if (format === null) {
            req.message = "Invalid Format"
        }
        else {
            req.data = format;
        }
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)

    }
}


module.exports = { getDate, addDate }