const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, 'Category must be uniqe'],
      required: [true, 'Category is required'],
      minlength: [3, 'Too short category name'],
      maxlength: [32, 'Too long category name'],
    },
    image: String,
    publicId: String,
  },
  { timestamps: true },
)

const categoryModel = mongoose.model('Category', categorySchema)

module.exports = categoryModel
