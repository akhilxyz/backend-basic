const galleryModal = require('../core/usecases/gallery')

// Get Image data 
const getGallery = async (imgprops) => {
    let data = await galleryModal.getGalley(imgprops);
    let imageData = [] ;
    if (data.length > 0) {
        data = data.map((img) => {
            let data = { id : img._id, src : img.src, desc : img.desc , alt : img.alt}
            imageData.push(data) ;
            })
        return imageData ;
    }
    else return imageData ;
}

// Add New Image
const addGallery = async (image) => {
    // checking image link is already add or not
    let imageRecord = await galleryModal.getGalley({ src: image.src});
    if (imageRecord.length > 0) return { Error: "Image link is already in use" }
    let saveImage = await galleryModal.addGallery(image);
    let imageData = {id : saveImage._id , src:  saveImage.src, alt : saveImage.alt, desc : saveImage.desc}
    return imageData ;
}

// Upaate Image Information
const updateGallery = async (id , imgData) => {
    let updateImage = await galleryModal.updateGallery(id , imgData);
    let imageData = updateImage[0]
        imageData = {id : imageData._id , src:  imageData.src, desc : imageData.desc}
    return imageData ;
}

// Delete image From DataBase
const deleteImage = async (id) => {
    let deleteImage = await galleryModal.deleteImage(id);
    return deleteImage ;
}



module.exports = {getGallery, addGallery, updateGallery, deleteImage}