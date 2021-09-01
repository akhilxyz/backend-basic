const model = require("../models/gallery");

// add Image in database by using modal.save() function
// The save() function is used to save the document to the database. Using this function, new documents can be added to the database.
const addGallery = async (img) => {
  return (await new model(img).save()).toObject();
}

// Get Gallery images data from database by using modal.find() function
// The find() function is used to find particular data from the MongoDB database. 
// It takes 3 arguments and they are query (also known as a condition), query projection (used for mentioning which fields to include or exclude from the query), 
// and the last argument is the general query options (like limit, skip, etc).
const getGalley = async (imgData) => {
  let skip = imgData.skip;
  let limit = imgData.limit;
  let filter = {}
  if (imgData.src) filter.src = imgData.src
  
  return await model.find(filter || {}).limit(limit).skip(skip)
}

// Update Image in database by using modal.updateOne() function
// The updateOne() function is used to update the first document that matches the condition. This function is the same as update(), 
// except it does not support the multi or overwrite options.
const updateGallery = async (imgId,data) => {
  let updateResponse = await model.updateOne({ _id: imgId }, { $set: data }).exec() 
  if(updateResponse.ok == 1){
   return await getGalley({_id:imgId});
  }
  else{ return {Error: "Something went wrong!!!"}}
}

// Delete Image from database by using modal.deleteOne() function
// The deleteOne() function is used to delete the first document that matches the conditions from the collection. It behaves like the remove()
// function but deletes at most one document regardless of the single option
const deleteImage = async (imgId) => {
  let updateResponse = await model.deleteOne({ _id: imgId }).exec()  
  if(updateResponse.ok == 1){
  return {Message:"Image deleted Successfully!!!"}
}
else{ return {Error: "Something went wrong!!!"} }
}


// exporting all the functions 
module.exports = {addGallery , getGalley , updateGallery, deleteImage}