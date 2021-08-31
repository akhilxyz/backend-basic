const galleryController = require("../controller/gallery")
require('dotenv').config();

// Gallery Handler to Handle GET request of user to get Images

const getGallery = async (req, res, next) => {
    try {
        let filter = {}
        filter.skip = 0;
        filter.limit = 1000;
        if (req.body.skip) filter.skip = req.body.skip;
        if (req.body.limit) filter.limit = req.body.limit;
        let data = await galleryController.getGallery(filter)
        req.data = data
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

// Gallery Handler to Handle ADD request of user it will validate data from req.body 
// and check if data is incoreected then it will throw error

const addGallery = async (req, res, next) => {
    const { src, alt, desc } = req.body
    try {if (!src) throw new Error("Please Provide Image src Link");
        else if (!alt) throw new Error("Please Provide Image Title");
        else if (!desc) throw new Error("Please Provide Image Description");
        let data = await galleryController.addGallery(req.body);
        req.data = data ;
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

// Gallery Handler to Handle UPDATE request of Updation

const updateGallery = async (req, res, next) => {
    const { id, src, alt, desc } = req.body
    let filter = {}
    try {
        if (!id) throw new Error("Please Provide image id");
        if (src)  filter.src = src; 
        if (alt)  filter.alt = alt; 
        if (desc)  filter.desc = desc; 
        let data = await galleryController.updateGallery(id , filter)
        req.data = data
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

// Handler to Handle DELETE image request from user

const  deleteImage = async (req, res, next) => {
    try {
        if (!req.body.id) throw new Error("Please Provide image id");
        let data = await galleryController.deleteImage(req.body.id)
        req.data = data 
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

module.exports = { getGallery, addGallery , updateGallery,  deleteImage }