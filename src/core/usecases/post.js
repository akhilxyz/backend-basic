const model = require("../models/post");

// add Post in database by using modal.save() function
// The save() function is used to save the document to the database. Using this function, new documents can be added to the database.
const addPost = async (post) => {
  return (await new model(post).save()).toObject();
}

// Get Post data from database by using modal.find() function
// The find() function is used to find particular data from the MongoDB database. 
// It takes 3 arguments and they are query (also known as a condition), query projection (used for mentioning which fields to include or exclude from the query), 
// and the last argument is the general query options (like limit, skip, etc).
const getPost = async (postData) => {
  let skip = postData.skip;
  let limit = postData.limit;
  let filter = {} ;
  if (postData._id) filter._id = postData._id;
  return await model.find(filter || {}).populate("comment.posted_by", "_id name").limit(limit).skip(skip).exec() 
}

// Update Post in database by using modal.updateOne() function
// The updateOne() function is used to update the first document that matches the condition. This function is the same as update(), 
// except it does not support the multi or overwrite options.
const updatePost = async (postId,data) => {
  let updateResponse = await model.updateOne({ _id: postId }, { $set: data }).exec() 
  if(updateResponse.ok == 1){
   return await getPost({_id:postId});
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

// for like Post
// The findByIdAndUpdate() function is used to find a matching document, updates it according to the update arg, 
// passing any options, and returns the found document (if any) to the callback.
// push will push the users id inside array 
const likePost = async (userId, postId) => {
  await model.findByIdAndUpdate(postId, {$push:{like : userId} }).exec();
  let resp = await getPost(postId);
  return resp;
}

// for unlike Post
const unlikePost = async (userId, postId) => {
  await model.findByIdAndUpdate(postId, {$pull:{like : userId} }).exec();
  let resp = await getPost(postId);
  return resp;
}

// for Comment on Post
const commentPost = async (postId, userData) => {
  const comment = {comment: userData.comment, posted_by  : userData.posted_by}
  await model.findByIdAndUpdate(postId, {$push:{comment : comment} }).exec();
  let resp = await getPost(postId);
  return resp ;
}

// for deleting Comment on Post

const deleteComment = async (postId, userData) => {
  await model.findByIdAndUpdate(postId, {$pull:{"comment" : {"_id" : userData.comment_id}} }).exec();
  const postInfo = await getPost(postId);
  return postInfo;
}


// exporting all the functions 
module.exports = {addPost , getPost , updatePost , deletePost , likePost, unlikePost, commentPost , deleteComment}


