const { ConnectionStates } = require("mongoose");
const postController = require("../controller/post")
require('dotenv').config();

// Post Handler to Handle GET request to get Post data

const getPost = async (req, res, next) => {
    try {
        let filter = {}
        filter.skip = 0;
        filter.limit = 1000;
        if (req.body.skip) filter.skip = req.body.skip;
        if (req.body.limit) filter.limit = req.body.limit;
        const data = await postController.getPost(filter)
        req.data = data
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

// Post Handler to Handle ADD request of user it will validate data from req.body 
// and check if data is incoreected then it will throw error

const addPost = async (req, res, next) => {
    const { title , image , author, body, feeds } = req.body
    try {if (!title) throw new Error("Please Provide Post title");
        else if (!image) throw new Error("Please Provide Post image link");
        else if (!author) throw new Error("Please Provide Post Author");
        else if (!body) throw new Error("Please Provide Post Body");
        const data = await postController.addPost(req.body);
        req.data = data ;
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

// Post Handler to Handle UPDATE request of Updation

const updatePost = async (req, res, next) => {
    const {id, title , image , author, body, feeds } = req.body
    let filter = {}
    try {
        if (!id) throw new Error("Please Provide Post id");
        if (title)  filter.title = title; 
        if (image)  filter.image = image; 
        if (author)  filter.author = author; 
        if (body)  filter.body = body; 
        if (feeds)  filter.feeds = feeds; 
        const data = await postController.updatePost(id , filter)
        req.data = data
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

// Handler to Handle DELETE Post request from user

const  deletePost = async (req, res, next) => {
    try {
        if (!req.body.id) throw new Error("Please Provide Post id");
        const data = await postController.deletePost(req.body.id)
        req.data = data 
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

// Handler to Handle Like Post request from user

const likePost = async (req, res, next) => {
    let filter = {}
    if (req.userData.Id) filter.id = req.userData.Id ;
    try {if (!filter.id) throw new Error("Please login first");
        else if(!req.body.id)  throw new Error("Please Provide post id");
        const data = await postController.likePost(filter.id , req.body.id);
        req.data = data ;
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

// Handler to Handle Unkike Post request from user

const unlikePost = async (req, res, next) => {
    let filter = {}
    if (req.userData.Id) filter.id = req.userData.Id ;
    try {if (!filter.id) throw new Error("Please login first");
        else if(!req.body.id)  throw new Error("Please Provide post id");
        const data = await postController.unlikePost(filter.id , req.body.id);
        req.data = data ;
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

// Handler to Handle commentPost to comment on post

const commentPost = async (req, res, next) => {
    try {
        if (!req.userData.Id) throw new Error("Please login first");
        else if (!req.body.id) throw new Error("Please Enter Post Id");
        else if (!req.body.comment) throw new Error("Please Enter Comment");
        const userData = {comment : req.body.comment ,  posted_by : req.userData.Id}
        const data = await postController.commentPost(req.body.id , userData);
        req.data = data;
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}


const deleteComment = async (req, res, next) => {
    try {
        if (!req.userData.Id) throw new Error("Please login first");
        else if (!req.body.post_id) throw new Error("Please Enter Post Id");
        else if (!req.body.comment_id) throw new Error("Please Enter Post Id");
        const userData = {comment_id : req.body.comment_id ,  posted_by : req.userData.Id}
        const data = await postController.deleteComment(req.body.post_id , userData);
        req.data = data;
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

module.exports = {getPost , addPost , updatePost,  deletePost ,likePost ,unlikePost, commentPost , deleteComment}