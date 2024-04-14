const subCategoryModel = require("../modules/subCategoryModel");
const { uploadSingleImage } = require("../middleware/imageUploadMiddleware");
const resizeImage = require("../middleware/resizeImage");
const factory = require("./handlerFactory");

//upload single image
const uploadSubCategoryImage = uploadSingleImage("image");

// rssize image before upload
const resizeSubCategoryImage = resizeImage("subCategory");

// @ dec create subCategory
// @ route Post  /api/vi/subCategory
// @ access private
const creatSubCategory = factory.creatOne(subCategoryModel, "subCategory");

// @ dec get all  subCategory data
// @ route Get  /api/vi/subCategory
// @ access public
const getAllSubCategory = factory.getAllData(subCategoryModel, "subCategory");

// @ dec get specific subCategory
// @ route Get  /api/vi/subCategory/id
// @ access public
const getOneSubCategory = factory.getOne(subCategoryModel, "subCategory");

// @ dec update specific subCategory
// @ route Update  /api/vi/subCategory/id
// @ access Private
const updateSubCategory = factory.updateOne(subCategoryModel, "subCategory");

// @ dec delete specific subCategory
// @ route Update  /api/vi/subCategory/id
// @ access Private
const deleteSubCategory = factory.deleteOne(subCategoryModel, "subCategory");

// @ dec delete all subCategory
// @ route Update  /api/vi/subCategory
// @ access Private
const deleteAllSubCategory = factory.deleteAll(subCategoryModel, "subCategory");


//@dec nested route
const setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

const createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObject = filterObject;
  next();
};


module.exports = {
  creatSubCategory,
  getAllSubCategory,
  getOneSubCategory,
  updateSubCategory,
  deleteAllSubCategory,
  deleteSubCategory,
  uploadSubCategoryImage,
  resizeSubCategoryImage,
  setCategoryIdToBody,
  createFilterObject
};