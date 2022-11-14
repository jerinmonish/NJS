const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');
const userModel = require('../models/userModel');
const Joi = require('joi');
const helper = require('../helpers/helper');
const fs = require('fs');
var buffer = require('buffer');
var path = require('path');


exports.listAllProducts = async (req, res) => {
  console.log(req?.query?.page);
  var staticLimit = 8;
  var staticOffset = 1;
  if (req?.query?.rl == "Admin") {
    staticLimit = 5;
    staticOffset = 1;
  }
  const limit = req?.query?.size ? +req?.query?.size : staticLimit;
  const offset = req?.query?.page ? req?.query?.page * limit : staticOffset;
  console.log("offset ", offset)
  console.log("Limit ", limit)
  const products = await productModel.findAndCountAll({
    limit: limit,
    offset: offset,
    order: [["id", "DESC"]]
  })
  console.log(products?.length)
  if (products) {
    var tempProducts = [];
    for (const product of products?.rows) {

      tempProducts?.push({
        'id': product?.id,
        'cat_id': product?.cat_id,
        'p_name': product?.p_name,
        'p_description': product?.p_description,
        'p_image': '/images/product_images/' + product?.p_image,
        'status': product?.status,
        'price': product?.price,
        'no_of_qty': product?.no_of_qty,
        'created_on': product?.created_on,
        'updated_on': product?.updated_on,
      });
    }
    var finalResult = {
      'count': products?.count,
      'rows': tempProducts,
    }
    res.json({
      data: getPagingData(finalResult, req?.query?.page, limit),
      message: "Data successfully",
    })
  }
}

exports.listAllProductsBasedOnCategories = async (req, res) => {
  console.log(req?.query?.page);
  const limit = req?.query?.size ? +req?.query?.size : 8;
  const offset = req?.query?.page ? req?.query?.page * limit : 1;
  const category = await categoryModel.findByPk(req?.query?.id);
  const products = await productModel.findAndCountAll({
    where: { cat_id: req?.query?.id },
    limit: limit,
    offset: offset,
    order: [["id", "DESC"]]
  })
  if (products) {
    var tempProducts = [];
    for (const product of products?.rows) {

      tempProducts?.push({
        'id': product?.id,
        'cat_id': product?.cat_id,
        'p_name': product?.p_name,
        'p_description': product?.p_description,
        'p_image': '/images/product_images/' + product?.p_image,
        'status': product?.status,
        'price': product?.price,
        'no_of_qty': product?.no_of_qty,
        'created_on': product?.created_on,
        'updated_on': product?.updated_on,
      });
    }
    var finalResult = {
      'count': products?.count,
      'rows': tempProducts,
    }

    res.status(200).json({
      data: getPagingData(finalResult, req?.query?.page, limit),
      category: category,
      message: "Data successfully",
    })
  }
}

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: rows } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, rows, totalPages, currentPage };
};

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

exports.createProduct = async (req, res) => {
  try {
    var pimage = '';
    const smp = await saveImg(req.body['pimage'][0]).then((data) => {
      if (data) {
        var lsp = data.replace(/\\/g, "/");
        var ppp = lsp.split('/');
        pimage = ppp.slice(-1)[0];
      }
    }).catch((err) => {
      console.log(err);
    })
    // console.log(smp);
  } catch (exe) {
    console.log(exe);
  }
  // req.body['created_on'] = '2022-03-02 10:02:22';
  req.body['p_image'] = pimage;
  //req.body['status'] = 'Active';
  var data = {
    cat_id: req.body['cat_id'],
    p_name: req.body['p_name'],
    p_description: req.body['p_description'],
    p_image: pimage,
    status: req.body['status'],
    price: req.body['price'],
    created_on: '2022-03-02 10:02:22'
  }
  const products = new productModel(data)
  const schemas = Joi.object().keys({
    cat_id: Joi.number().required().label("This field is required"),
    p_name: Joi.string().trim().min(3).max(30).required().label("This field is required"),
    p_description: Joi.string().trim().min(3).required().label("This field is required"),
    status: Joi.string().trim().min(3).max(30).required().label("This field is required"),
    price: Joi.number().precision(2).required().label("This field is required"),
    created_on: Joi.string().required().label("This field is required"),
    p_image: Joi.string().required().label("This field is required"),
  });
  const valid = schemas.validate(data)

  if (!(valid.error)) {
    products.save().then(serRes => {
      res.send(serRes);
    }).catch(err => {
      console.log("ERR1");
      res.status(400).json({
        error: err?.errors[0]?.message
      });
    });
  } else {
    console.log("ERR");
    console.log(valid);
    res.status(400).json({
      error: valid.error.details[0].context
    })
  }
}

exports.getProductById = async (req, res) => {
  const product = await productModel.findByPk(req.params.id);
  if (!product) {
    return res.status(400).json({
      error: "No such product found !"
    });
  }
  res.json({
    data: product
  })
}


exports.dummyProductId = async (req, res) => {
  const category = await categoryModel.findByPk(req?.params?.id);
  const products = await productModel.findAndCountAll({
    where: { cat_id: req?.params?.id },
  })
  if (products) {
    var tempProducts = [];
    for (const product of products?.rows) {

      tempProducts?.push({
        'value': product?.id,
        'label': product?.p_name,
      });
    }

    res.status(200).json({
      data: tempProducts,
      message: "Data successfully",
    })
  }
}

exports.getProductByIdFrontend = async (req, res) => {
  var paramData = req.params.id.split('&');
  const product = await productModel.findByPk(paramData[0]);
  var uData = '';
  if (typeof paramData[1] !== 'undefined' && paramData[1]) {
    const user = await userModel.findByPk(paramData[1]);
    uData = user;
  }

  if (!product) {
    return res.status(400).json({
      error: "No such product found !"
    });
  }
  const category = await categoryModel.findByPk(product['cat_id']);
  var tempProducts = [];
  tempProducts.push({
    'id': product['id'],
    'cat_id': product['cat_id'],
    'p_name': product['p_name'],
    'p_description': product['p_description'],
    'p_image': '/images/product_images/' + product['p_image'],
    'status': product['status'],
    'price': product['price'],
    'no_of_qty': product['no_of_qty'],
    'created_on': product['created_on'],
    'updated_on': product['updated_on'],
    'wishlist': (uData?.wishlist?.length > 0) ? uData['wishlist'] : []
  })
  res.json({
    data: tempProducts,
    category: category
  })
}

exports.updateProductById = async (req, res) => {
  const pData = req.body;
  const product = await productModel.update(pData, { where: { id: req.params.id } })
  if (product) {
    return res.status(200).json({
      message: "Updated Successfully !"
    });
  } else {
    return res.status(400).json({
      message: "Failed to Update !"
    });
  }
}

exports.deleteProductById = async (req, res) => {
  if (req.params.id) {
    const product = await productModel.destroy({ where: { id: req.params.id } })
    if (product) {
      return res.status(200).json({
        message: "Successfully Deleted Product !"
      });
    } else {
      return res.status(400).json({
        message: "Failed to Delete !"
      });
    }
  } else {
    return res.status(400).json({
      message: "Delete Id is missing !"
    });
  }
}

exports.getProductForBuyNow = async (req, res) => {
  if (req.params.id) {
    const [results, metadata] = await productModel.sequelize.query("SELECT * FROM product WHERE no_of_qty > 0 AND status = 'Active' AND id = " + req.params.id + " ");
    if (results?.length > 0) {
      results[0].p_image = '/images/product_images/' + results[0].p_image;
      return res.status(200).json({
        data: results[0]
      });
    }
  } else {
    return res.status(400).json({
      message: "Delete Id is missing !"
    });
  }
}

async function saveImg(imgs) {
  // Decoding base-64 image
  // Source: http://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
  var imageTypeRegularExpression = /\/(.*?)$/;
  var base64Data = imgs;
  var imageBuffer = decodeBase64Image(base64Data);
  var userUploadedFeedMessagesLocation = path.normalize(path.join(__dirname, '../assets/images/product_images/'));
  //'../ecom/backend/assets/images/product_images/';
  var uniqueRandomImageName = Date.now();
  // This variable is actually an array which has 5 values,
  // The [1] value is the real image extension
  var imageTypeDetected = imageBuffer.type.match(imageTypeRegularExpression);

  var userUploadedImagePath = userUploadedFeedMessagesLocation + uniqueRandomImageName + '.' + imageTypeDetected[1];

  // Save decoded binary image to disk
  try {
    fs.writeFile(userUploadedImagePath, imageBuffer.data, function () {
      // console.log(userUploadedFeedMessagesLocation + '/' + uniqueRandomImageName + '.' + imageTypeDetected[1]);
    });
    return userUploadedImagePath;
  }
  catch (error) {
    console.log('ERROR:', error);
  }
}

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = Buffer.from(matches[2], 'base64');

  return response;
}