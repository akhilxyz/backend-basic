const mongoose = require('mongoose')

// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection 
// and defines the shape of the documents within that collection.

const gallerySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  src:{ type: String, required: [true,"Image src link is Required"] },
  alt:{ type: String, required: [true,"Image alt title is Required"] , },
  desc:{ type: String, required: [true,"Image description is Required"] },
  created_on: {type: Date, default: Date.now},
  modified_on: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Gallery', gallerySchema)