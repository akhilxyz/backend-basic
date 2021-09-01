const mongoose = require('mongoose')

// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection 
// and defines the shape of the documents within that collection.

const postSchema = new mongoose.Schema({
  title:{ type: String, required: [true,"Post Title is Required"] },
  image:{ type: String, required: [true,"Post Image is Required"] , },
  author:{ type: String, required: [true,"Author name is Required"] },
  body:{ type: String, required: [true,"Post body is Required"] },
  comment:[{ posted_by: {  type: mongoose.Schema.Types.ObjectId, ref: 'User'},
             comment : { type: String, default : null }}],
  like : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  created_on: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Post', postSchema) 