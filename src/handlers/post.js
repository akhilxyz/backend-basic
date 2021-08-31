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
        let data = await postController.getPost(filter)
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
        let data = await postController.addPost(req.body);
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
        if (!id) throw new Error("Please Provide image id");
        if (title)  filter.title = title; 
        if (image)  filter.image = image; 
        if (author)  filter.author = author; 
        if (body)  filter.body = body; 
        if (feeds)  filter.feeds = feeds; 
        let data = await postController.updatePost(id , filter)
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
        if (!req.body.id) throw new Error("Please Provide image id");
        let data = await postController.deletePost(req.body.id)
        req.data = data 
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

module.exports = {getPost , addPost , updatePost,  deletePost }