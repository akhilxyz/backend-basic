
const userModal = require('../core/usecases/user')

const getUser = async () => {
    let userData = await userModal.getUser();
    return userData ;
}

const addUser = async (user) => {
    let userData = {
        name: user.name,
        email : user.email,
        phone : user.phone,
        address : user.address,
        gender : user.gender ,
        password : user.password,
        role : user.role,
    }
    let saveUser = await userModal.addUser(userData);
    return saveUser ;
        
}

const updateUser = async (id , userData) => {
    let updateUser = await userModal.updateUser(id , userData);
    return updateUser ;
}

const deleteUser = async (id) => {
    let deleteUser = await userModal.deleteUser(id);
    return deleteUser ;
}

module.exports = {getUser, addUser, deleteUser, updateUser}