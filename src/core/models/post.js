const mongoose = require('mongoose')

// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection 
// and defines the shape of the documents within that collection.

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title:{ type: String, required: [true,"Post Title is Required"] },
  image:{ type: String, required: [true,"Post Image is Required"] , },
  author:{ type: String, required: [true,"Author name is Required"] },
  body:{ type: String, required: [true,"Post body is Required"] },
  feeds:[{user: {  type: mongoose.Schema.Types.ObjectId, ref: 'User',},
          like : {  type: Boolean, default: false } ,
          comment : { type: String, default : null}
        }],
  created_on: {type: Date, default: Date.now},
  modified_on: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Post', postSchema)