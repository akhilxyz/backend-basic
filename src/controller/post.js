const postModal = require('../core/usecases/post')

// Get post data 
const getPost = async (postprops) => {
    let data = await postModal.getPost(postprops);
    let postData = [] ;
    if (data.length > 0) {
        data = data.map((data) => {
            let formatData = {id : data._id, like: data.like, comment : data.comment , title : data.title, image : data.image, author: data.author, body: data.body, feeds :data.feeds, created_on: data.created_on}
            postData.push(formatData) ;
            })
        return postData ;
    }
    else return postData ;
}

// Add New Post
const addPost = async (post) => {
    let savePost = await postModal.addPost(post);
    let getPostData = await getPost(savePost._id);
    return getPostData ;
}

// Update Post Information
const updatePost = async (id , postData) => {
    let updatePost = await postModal.updatePost(id , postData);
    let data = updatePost[0]
    let getPostData = await getPost(data._id);
    return getPostData ;
}

// Delete Post From DataBase
const deletePost = async (id) => {
    let deletePost = await postModal.deletePost(id);
    return deletePost ;
}

// like a post
const likePost = async (userId,postId) => {
    let getPostData = await getPost(postId);
        getPostData = getPostData[0]
    if (getPostData.like.includes(userId)){ throw new Error("Post Already Liked"); }
    let savePost = await postModal.likePost(userId, postId);
    return savePost ;
}

const unlikePost = async (userId,postId) => {
    let getPostData = await getPost(postId);
        getPostData = getPostData[0]
    if (getPostData.like.includes(userId)){ 
        let savePost = await postModal.unlikePost(userId, postId);
        return savePost ;
    }
    else {throw new Error("Post is not liked yet");}
}

const commentPost = async (postId,userData) => {
    let saveComment = await postModal.commentPost(postId, userData);
    return saveComment ;
}

const deleteComment = async (postId,userData) => {
    let deleteCommentData = await postModal.deleteComment(postId, userData);
    return deleteCommentData ;
}

module.exports = {addPost, getPost, updatePost, deletePost, likePost, unlikePost, commentPost , deleteComment}