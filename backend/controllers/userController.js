const userModel = require('../models/userModel');
const Joi = require('joi');
const fs = require('fs');
var buffer = require('buffer');
var path = require('path');
const helper = require('../helpers/helper');

exports.createUser = async (req, res) => {
  /*try {
    var profile_pic = '';
    const smp = await saveImg(req.body['profile_pic'][0]).then((data) => {
      if (data) {
        var lsp = data.replace(/\\/g, "/");
        var ppp = lsp.split('/');
        profile_pic = ppp.slice(-1)[0];
      }
    }).catch((err) => {
      console.log(err);
    })
    // console.log(smp);
  } catch (exe) {
    console.log(exe);
  }
  req.body['profile_pic'] = profile_pic;*/
  var data = {
    first_name: req.body['first_name'],
    last_name: req.body['last_name'],
    email: req.body['email'],
    password: req.body['password'],
    // profile_pic: profile_pic,
    created_on: '2022-03-02 10:02:22'
  }
  const user = new userModel(data)
  const schemas = Joi.object().keys({
    first_name: Joi.string().trim().min(3).max(19).required().label("This field is required"),
    last_name: Joi.string().trim().min(3).max(19).required().label("This field is required"),
    email: Joi.string().trim().min(3).required().label("This field is required"),
    password: Joi.string().trim().min(3).max(30).required().label("This field is required"),
    // profile_pic: Joi.string().required().label("This field is required"),
    created_on: Joi.string().required().label("This field is required"),
  });
  const valid = schemas.validate(data)

  if (!(valid.error)) {
    user.save().then(serRes => {
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

exports.userLogin = async (req, res) => {
  const schemas = Joi.object().keys({
    email: Joi.string().trim().min(3).required().label("This field is required"),
    password: Joi.string().trim().min(3).max(30).required().label("This field is required"),
  });
  const valid = schemas.validate(req.body)
  if (!(valid.error)) {
    var login = await userModel.findOne({
      where: {
        email: req.body['email'],
        password: req.body['password']
      }
    });
    // console.log(login.dataValues);

    if (login) {
      const smpt = helper.GenerateHrmsBearerToken();
      console.log(smpt);
      if (smpt) {
        return res.status(200).json({
          message: "Successfully Logged In",
          data: login,
          token: smpt
        });
      }
    } else {
      return res.status(400).json({
        message: "Failed to Login !"
      });
    }
  } else {
    //console.error(valid.error.details[0].context);
    res.status(400).json({
      // error: valid.error.details
      error: valid.error.details[0].context
    })
  }
}

exports.userProfileUpdate = async (req, res) => {
  const schemas = Joi.object().keys({
    first_name: Joi.string().trim().required().label("First Name is required"),
    last_name: Joi.string().trim().required().label("Last Name is required"),
    address: Joi.string().trim().required().label("Address is required"),
    location: Joi.string().trim().required().label("Location is required"),
    country: Joi.string().trim().required().label("Country is required"),
    state: Joi.string().trim().required().label("State is required"),
    city: Joi.string().trim().required().label("City is required"),
    pincode: Joi.string().trim().required().label("Pincode is required"),
    mobile: Joi.string().trim().required().label("Mobile is required"),
  });
  const valid = schemas.validate(req.body)
  const uData = req.body;
  if (!(valid.error)) {
    var pupdated = await userModel.update(uData, { where: { id: req.params.id } })
    if (pupdated) {
      return res.status(200).json({
        message: "Profile Updated Successfully !"
      });
    } else {
      res.status(400).json({
        error: "Failed to update profile !"
      })
    }
  } else {
    //console.error(valid.error.details[0].context);
    res.status(400).json({
      // error: valid.error.details
      error: valid.error.details[0].context
    })
  }
}

exports.updateWishList = async (req, res) => {
  let user = '';
  if (req.body['id']) {
    user = await userModel.findByPk(req.body['id']);
  } else {
    res.status(400).json({
      // error: valid.error.details
      message: 'User Not Found'
    })
  }

  if (user['id']) {
    if (req.body['status']) {
      if (user['wishlist']) {
        var exWish = JSON.parse(user['wishlist'])
        exWish.push(req.body['pid']);
        var pData = {
          'wishlist': JSON.stringify(exWish)
        }
      } else {
        var pData = {
          'wishlist': "[" + req.body['pid'] + "]"
        }
      }
      const userWishList = await userModel.update(pData, { where: { id: req.body['id'] } })
      if (userWishList) {
        res.status(200).json({
          message: "wishlist update success",
        })
      } else {
        res.status(400).json({
          message: "wishlist update failed",
        })
      }
    } else {
      var ss = JSON.parse(user['wishlist']);
      var filteredRecords = ss.filter(item => item !== req.body['pid'])
      var newPData = {
        'wishlist': JSON.stringify(filteredRecords)
      }
      const dbUpdated = await userModel.update(newPData, { where: { id: req.body['id'] } })
      if (dbUpdated) {
        res.status(200).json({
          message: "wishlist remove success",
        })
      } else {
        res.status(400).json({
          message: "wishlist update failed",
        })
      }
    }

  } else {
    res.status(400).json({
      // error: valid.error.details
      message: 'User Not Found'
    })
  }
}