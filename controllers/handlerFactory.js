const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const fileupload = require('express-fileupload');
const { cloudinary } = require('./../utils/cloudinary');
// const { getCache, setCache, clearCache } = require('../cache/redisCache');


exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    // path = req.path;
    // await clearCache(path);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // path = req.path;
    // await clearCache(path);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    // console.log(fileStr);
    if (req.files) {
      const fileStr = req.files.img;
      const uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath, {
        upload_preset: 'books',
        public_id: `${Date.now()}`,
        resource_type: "auto"
      });
      req.body.img = uploadResponse.url
    }
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: doc
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {

    // path = req.path;
    // let data = await getCache(path);
    // if (data !== null) {
    //   return res.status(304).json({
    //     status: 'success',
    //     results: data.length,
    //     data: data
    //   });
    // }

    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    // await setCache(path, doc);
    res.status(200).json({
      status: 'success',
      data: doc
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on book (hack)

    // path = req.path;
    // let data = await getCache(path);
    // if (data !== null) {
    //   return res.status(304).json({
    //     status: 'success',
    //     results: data.length,
    //     data: data
    //   });
    // }

    let filter = {};
    if (req.params.bookId) filter = { book: req.params.bookId };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // await setCache(path, doc);
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc
    });
  });
