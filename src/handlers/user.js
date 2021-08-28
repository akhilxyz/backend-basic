const userController = require("../controller/user")
const validator = require("../lib/validator")
require('dotenv').config();

//user Handler to Handle GET request of user

const getUser = async (req, res, next) => {
    try {
        let data = await userController.getUser()
        req.data = data
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

//user Handler to Handle ADD request of user it will validate data from req.body 
//and check if data is incoreected than it will throw error

const addUser = async (req, res, next) => {
    const { name, email, phone, gender, address, password, role, token} = req.body
    try {if (!name) throw new Error("Please Provide User Name");
        else if (!validator.isName(name)) throw new Error("Invalid User Name");
        else if (!email) throw new Error("Please Provide User Email");
        else if (!validator.isEmail(email)) throw new Error("Invalid Email Address");
        else if (!phone) throw new Error("Please Provide User Phone number");
        else if (!validator.isPhonenumber(phone)) throw new Error("Please Provide User Phone number");
        else if (!gender) throw new Error("Please Provide User Gender");
        else if (!validator.isGender(gender)) throw new Error("Invalid Gender Name");
        else if (!address) throw new Error("Please Provide User Address");
        else if (!validator.isAddress(address)) throw new Error("Invalid Address");
        else if (!password) throw new Error("Please Provide User Password");
        else if (!validator.isPassword(password)) throw new Error("Password length should be more than 5 characters");
        else if (role) { if (token !== `${process.env.Token}`) throw new Error("Unauthorized Access to role") }
        let data = await userController.addUser(req.body)
        req.data = data
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

//user Handler to Handle UPDATE request of user

const updateUser = async (req, res, next) => {
    const { id, name, email, phone, gender, address, password, token} = req.body
    let filter = {}
    try {
        if (!id) throw new Error("Please Provide User id");
        if (name) { if (!validator.isName(name)) throw new Error("Invalid User Name"); filter.name = name; }
        if (email) { if (!validator.isEmail(email)) throw new Error("Invalid Email Address"); filter.email = email; }
        if (phone) { if (!validator.isPhonenumber(phone)) throw new Error("Invalid Phone No."); filter.phone = phone;}
        if (gender) { if (!validator.isGender(gender)) throw new Error("Invalid Gender"); filter.gender = gender;}
        if (address) { if (!validator.isAddress(address)) throw new Error("Invalid Address"); filter.address = address;}
        if (password) { if (!validator.isPassword(password)) throw new Error("Password length should be more than 5 characters"); filter.password = password;}
        if (role) { if (token !== `${process.env.Token}`) throw new Error("Unauthorized Access to role");filter.role = role; }
        let data = await userController.updateUser(id , filter)
        req.data = data
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

//user Handler to Handle DELETE request of user

const deleteUser = async (req, res, next) => {
    try {
        if (!req.body.id) throw new Error("Please Provide User id");
        let data = await userController.deleteUser(req.body.id)
        req.data = data
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

const loginUser = async (req, res, next) => {
    const { email , password} = req.body
    try {if (!email) throw new Error("Please Provide Email");
        else if (!password) throw new Error("Please Provide Password");
        let data = await userController.loginUser(req.body)
        req.data = data
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

module.exports = { getUser, addUser, updateUser,  deleteUser, loginUser }