const userModal = require('../core/usecases/user')
//import bcrypt for pasword hashing
const bcrypt = require("bcrypt");

// Get user data 
const getUser = async () => {
    let data = await userModal.getUser();
    if (data.length > 0) {
        data = data.map((user) => {
            let userData = {id : user._id, name : user.name, email : user.email, 
                           gender: user.gender, address: user.address, role: user.role }
            return userData ;
        })
    }
    return userData ;
}

// Add New User
const addUser = async (user) => {
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
    let loginUser = await userModal.loginUser(id);
    return loginUser ;
}


module.exports = {getUser, addUser, deleteUser, updateUser, loginUser}