const userModal = require('../core/usecases/user')
//import bcrypt for pasword hashing
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get user data 
const getUser = async () => {
    let data = await userModal.getUser();
    let userData = []
    if (data.length > 0) {
         data = data.map((user) => {
            let data = { id : user._id, name : user.name, email : user.email, 
                        gender: user.gender, address: user.address, role: user.role }
            userData.push(data) ;
        })
        return userData ;
    }
    else return userData ;
}

// Add New User
const addUser = async (user) => {
    // checking user email is registered or not 
    let userRecord = await userModal.getUser({ email: user.email});
    if (userRecord.length == 0) return { Error: "Email is already registered" }
    // bcrypt store the pasword in hashing
    // Per bcrypt implementation, only the first 72 bytes of a string are used. 
    // Any extra bytes are ignored when matching passwords. Note that this is not the first 72 characters.
    let passwordHash = bcrypt.hashSync(user.password, 10);
    let userData = user
        userData.password = passwordHash
    let saveUser = await userModal.addUser(userData);
    return saveUser ;
}

// Upaate User Information
const updateUser = async (id , userData) => {
    let updateUser = await userModal.updateUser(id , userData);
    return updateUser ;
}

// Delete User From DataBase
const deleteUser = async (id) => {
    let deleteUser = await userModal.deleteUser(id);
    return deleteUser ;
}

// user Login 
const loginUser = async (userData) => {
    // Get User Records if user is registered or not
    let userRecord = await userModal.getUser({ email: userData.email});
    if (userRecord.length == 0) return { Error: "Invalid Credentials" }

    // bcrypt compare Check User Password in hash is Matching with user password or not 
    const PasswordMatch = await bcrypt.compare(userData.password, userRecord[0].password);
    if (!PasswordMatch) return { Error: "Invalid Credentials" }

    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    // (Asynchronous) If a callback is supplied, the callback is called with the err or the JWT.
    const token = jwt.sign({ userId: userRecord[0]._id },"secret", { expiresIn:(86400*30) });

    // if email and password is valid then it will returns user information with token
    userRecord = { token: token, user: userRecord[0]}
    return userRecord ;
}


module.exports = {getUser, addUser, deleteUser, updateUser, loginUser}