const model = require("../models/post");
const mongoose = require("mongoose");

// add Post in database by using modal.save() function
// The save() function is used to save the document to the database. Using this function, new documents can be added to the database.
const addPost = async (post) => {
  post._id = new mongoose.Types.ObjectId();
  return (await new model(post).save()).toObject();
}

// Get Post data from database by using modal.find() function
// The find() function is used to find particular data from the MongoDB database. 
// It takes 3 arguments and they are query (also known as a condition), query projection (used for mentioning which fields to include or exclude from the query), 
// and the last argument is the general query options (like limit, skip, etc).
const getPost = async (imgData) => {
  let skip = imgData.skip;
  let limit = imgData.limit;
  let filter = {}
//   if (imgData.src) filter.src = imgData.src
  
  return await model.find(filter || {}).limit(limit).skip(skip)
}

// Update Post in database by using modal.updateOne() function
// The updateOne() function is used to update the first document that matches the condition. This function is the same as update(), 
// except it does not support the multi or overwrite options.
const updatePost = async (postId,data) => {
  let updateResponse = await model.updateOne({ _id: postId }, { $set: data }).exec() 
  if(updateResponse.ok == 1){
   return await getGalley({_id:postId});
  }
  else{ return {Error: "Something went wrong!!!"}}
}

// Delete Post from database by using modal.deleteOne() function
// The deleteOne() function is used to delete the first document that matches the conditions from the collection. It behaves like the remove()
// function but deletes at most one document regardless of the single option
const deletePost = async (postId) => {
  let updateResponse = await model.deleteOne({ _id: postId }).exec()  
  if(updateResponse.ok == 1){
  return {Message:"Post deleted Successfully!!!"}
}
else{ return {Error: "Something went wrong!!!"} }
}


// exporting all the functions 
module.exports = {addPost , getPost , updatePost , deletePost}