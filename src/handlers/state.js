const Data = require('./data')

const getStates = async (req, res, next) => {
    try {
        req.data = Data.data;
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

const addStates = async (req, res, next) => {
    try {
        if (!req.body.name) throw new Error("Please Provide State Name");
        req.data = `${req.body.name} is added Successfully`
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)

    }
}


module.exports = { getStates, addStates }