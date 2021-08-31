const postModal = require('../core/usecases/post')

// Get post data 
const getPost = async (postprops) => {
    let data = await postModal.getPost(postprops);
    let newdata = {id : data._id, title : data.title, image : data.image, author: data.author, body: data.body, feeds :data.feeds, created_on: data.created_on}
    return newdata ;
}

// Add New Post
const addPost = async (post) => {
    let savePost = await postModal.addPost(post);
    return savePost ;
}

// Update Post Information
const updatePost = async (id , postData) => {
    let updatePost = await postModal.updatePost(id , postData);
    return updatePost ;
}

// Delete Post From DataBase
const deletePost = async (id) => {
    let deletePost = await userModal.deletePost(id);
    return deletePost ;
}


module.exports = {addPost, getPost, updatePost, deletePost}