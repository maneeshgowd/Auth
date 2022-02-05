const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let tempProduct = null;

    const id = req.params.productID || req.params.userID;

    if (!id.includes("-")) tempProduct = Model.findById(id || null);
    else tempProduct = Model.findOne({ slug: id } || null);

    const data = await tempProduct;

    if (!data) return next(new ApiError("No product found with the respected id!", 404));
    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.find();

    res.status(200).json({
      status: "success",
      result: data.length,
      data: {
        data,
      },
    });
  });
