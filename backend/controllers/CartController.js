const { Sequelize } = require('sequelize');
const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');
const cardModel = require('../models/cardModel');
const productPurchasedModel = require('../models/productPurchasedModel');
const Joi = require('joi');
const fs = require('fs');
var buffer = require('buffer');
var path = require('path');
const moment = require('moment');
const stripe = require('stripe')('sk_test_6zecId5CSVpHLmm5G2KvQjC5');
const helper = require('../helpers/helper');

exports.myCartItems = async (req, res, msg = false) => {
  try {
    var userId = req.id ? req.id : (req.params.id) ? req.params.id : '';
    if (userId) {
      try {
        const [results, metadata] = await cartModel.sequelize.query("SELECT c.id as cartid, c.uid, c.pid, c.quantity, c.amount, c.indi_amount, c.cart_added_at, c.status, c.updated_at, p.id as productid, p.p_name, p.p_image FROM product_cart c JOIN product p ON p.id = c.pid WHERE c.uid = " + userId + " AND c.status = 'InCart' ORDER BY c.id DESC");

        if (results?.length > 0) {

          var tempProducts = [];
          for (const product of results) {
            tempProducts?.push({
              'cartid': product?.cartid,
              'uid': product?.uid,
              'pid': product?.pid,
              'quantity': product?.quantity,
              'amount': parseFloat(product?.amount).toFixed(2),
              'indi_amount': parseFloat(product?.indi_amount).toFixed(2),
              'cart_added_at': product?.cart_added_at,
              'status': product?.status,
              'updated_at': product?.updated_at,
              'productid': product?.productid,
              'p_name': product?.p_name,
              'p_image': '/images/product_images/' + product?.p_image
            });
          }

          res.status(200).json({
            data: tempProducts,
            cart_cnt: tempProducts?.length,
            message: msg
          })
        } else {
          res.status(200).json({
            data: [],
            cart_cnt: 0,
            message: msg
          })
        }
      } catch (error) {
        console.log(error)
        res.status(200).json({
          data: [],
          cart_cnt: 0,
          message: msg
        })
      }

    } else {
      res.status(400).json({
        data: [],
        cart_cnt: 0,
        message: 'Unknown User'
      })
    }
  } catch (err) {
    res.status(400).json({
      data: [],
      cart_cnt: 0,
      message: err
    })
  }

}

exports.cartByBookingId = async (req, res, msg = false) => {
  try {
    var bookingId = req.id ? req.id : (req.params.id) ? req.params.id : '';
    if (bookingId) {
      try {

        const [results, metadata] = await cartModel.sequelize.query("SELECT pc.id as cartid, pc.uid, pc.pid, pc.quantity, pc.amount, pc.indi_amount, pc.cart_added_at, pc.status, pc.updated_at, p.id as productid, p.p_name, p.p_image FROM product_purchased pp JOIN product p JOIN product_cart pc WHERE pc.id = pp.c_id AND pp.p_id = p.id AND pp.booking_id = '" + bookingId + "'");

        if (results?.length > 0) {

          var tempProducts = [];
          for (const product of results) {
            tempProducts?.push({
              'cartid': product?.cartid,
              'uid': product?.uid,
              'pid': product?.pid,
              'quantity': product?.quantity,
              'amount': parseFloat(product?.amount).toFixed(2),
              'indi_amount': parseFloat(product?.indi_amount).toFixed(2),
              'cart_added_at': product?.cart_added_at,
              'status': product?.status,
              'updated_at': product?.updated_at,
              'productid': product?.productid,
              'p_name': product?.p_name,
              'p_image': '/images/product_images/' + product?.p_image
            });
          }
          // console.table(tempProducts);
          res.status(200).json({
            data: tempProducts,
            cart_cnt: tempProducts?.length,
            message: msg
          })
        } else {
          res.status(200).json({
            data: [],
            cart_cnt: 0,
            message: msg
          })
        }
      } catch (error) {
        console.log(error)
        res.status(200).json({
          data: [],
          cart_cnt: 0,
          message: msg
        })
      }

    } else {
      res.status(400).json({
        data: [],
        cart_cnt: 0,
        message: 'Unknown User'
      })
    }
  } catch (err) {
    res.status(400).json({
      data: [],
      cart_cnt: 0,
      message: err
    })
  }

}

exports.createCart = async (req, res) => {
  if (req.body['pid']) {

    try {
      const [existingCart, metadata] = await cartModel.sequelize.query("SELECT * FROM product_cart WHERE uid = " + req.body['uid'] + " AND pid = " + req.body['pid'] + " AND status = 'Incart'");

      const product = await productModel.findByPk(req.body['pid']);

      var cartupdatedata = {
        uid: req.body['uid'],
        pid: req.body['pid'],
        quantity: parseFloat(req.body['quantity']),
        amount: parseFloat(product['price']) * req.body['quantity'],
        indi_amount: product['price'],
        status: 'InCart',
        cart_added_at: moment().format('YYYY-MM-DD, H:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD, H:mm:ss')
      }
      if (existingCart?.length > 0) {
        const existingCartUpdate = await cartModel.update(cartupdatedata, { where: { id: existingCart?.[0]?.id } })
        if (existingCartUpdate) {
          return this.myCartItems({ 'id': req.body['uid'] }, res, "updated")
          // return res.status(200).json({
          //   message: "Cart has been updated !"
          // });
        } else {
          return res.status(400).json({
            message: "Failed to Update Cart !"
          });
        }
      } else {
        const cart = new cartModel(cartupdatedata)
        cart.save().then(serRes => {
          // res.send(serRes);
          return this.myCartItems({ 'id': req.body['uid'] }, res, "added")
        }).catch(err => {
          console.log("ERR1");
          res.status(400).json({
            error: err?.errors[0]?.message
          });
        });
      }

    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).json({
      error: 'Product is Missing !'
    })
  }
}

exports.deleteCartById = async (req, res) => {
  if (req.params.id && req?.query?.uid) {
    const product = await cartModel.destroy({ where: { id: req.params.id } })
    if (product) {
      return this.myCartItems({ 'id': req?.query?.uid }, res, "deleted cart item")
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

exports.cardPayment = async (req, res) => {
  var data = {
    name_on_card: req.body['name_on_card'],
    card_number: req.body['card_number'],
    expiration: req.body['expiration'],
    cvc: req.body['cvc'],
    uid: req.body['uid'],
    total_temp_price: req.body['total_temp_price'],
    created_on: moment().format('YYYY-MM-DD, H:mm:ss')
  }
  const schemas = Joi.object().keys({
    name_on_card: Joi.string().required().label("This field is required"),
    card_number: Joi.number().required().label("This field is required"),
    expiration: Joi.string().trim().required().label("This field is required"),
    cvc: Joi.string().required().label("This field is required"),
    uid: Joi.required().label("This field is required"),
    total_temp_price: Joi.required().label("This field is required"),
    created_on: Joi.string().required().label("This field is required"),
  });
  const valid = schemas.validate(data)

  if (!(valid.error)) {
    var tempExp = data?.expiration?.split('/');
    try {
      const [cResults, cmetadata] = await cartModel.sequelize.query("SELECT c.id as cartid, c.uid, c.pid, c.quantity, c.amount, c.indi_amount, c.cart_added_at, c.status, c.updated_at, p.id as productid, p.p_name, p.p_image FROM product_cart c JOIN product p ON p.id = c.pid WHERE c.uid = " + data?.uid + " AND c.status = 'InCart' ORDER BY c.id DESC");

      if (cResults?.length > 0) {
        var sum = 0;
        var tempDesc = '';
        var tempCartId = '';
        var user_details = await userModel.findByPk(req.body['uid']);

        for (const product of cResults) {
          sum += parseFloat(parseFloat(product?.amount).toFixed(2));
          tempDesc += product?.p_name + " (" + parseFloat(product?.indi_amount).toFixed(2) + " * " + product?.quantity + "), ";
          tempCartId += product?.cartid + ", "
        }

        sum = Math.round(sum + parseFloat(8.50) + parseFloat(50))
        try {
          const token = await stripe.tokens.create({
            card: {
              number: data?.card_number,
              exp_month: tempExp[0],
              exp_year: 20 + tempExp[1],
              cvc: data?.cvc,
            },
          });


          if (token) {
            const charge = await stripe.charges.create({
              amount: sum,
              currency: 'usd',
              source: token?.id,
              description: "Payment done by " + data?.name_on_card + " For items of " + tempDesc + " On " + data?.created_on,
            });


            if (charge && charge?.status == "succeeded") {
              var cusCard = {
                "user_id": req.body['uid'],
                "name_on_card": data?.name_on_card,
                "card_number": charge?.source?.last4,
                "expiration_month": charge?.source?.exp_month,
                "expiration_year": charge?.source?.exp_year,
                "email": user_details?.email,
                "brand": charge?.source?.brand,
                "stripe_card_id": charge?.source?.id,
                "stripe_fingerprint": charge?.source?.fingerprint,
                "stripe_customer_id": charge?.source?.customer,
                "cvc_check": charge?.source?.cvc_check,
                "mobile_no": user_details?.mobile,
                "created_at": moment().format('YYYY-MM-DD, H:mm:ss'),
              }
              const cardData = new cardModel(cusCard)
              cardData.save().then(async (resd) => {
                const [updatedCart, cartmetadata] = await cartModel.sequelize.query("UPDATE product_cart SET status = 'Paid', payment_method = 'Card', updated_at = '" + moment().format('YYYY-MM-DD H:mm:ss') + "' WHERE id IN (" + tempCartId.replace(/,(?=\s*$)/, '') + ")");
                if (updatedCart) {

                  var uid = (new Date()).getTime().toString(36);
                  for (const product of cResults) {
                    var purData = {
                      'c_id': product?.cartid,
                      'p_id': product?.productid,
                      'u_id': req.body['uid'],
                      'booking_id': uid,
                      'created_at': moment().format('YYYY-MM-DD, H:mm:ss'),
                    }
                    await this.createProductPurchased(purData).then((purSaved) => {
                      return res.status(200).json({
                        message: 'payment_success',
                        tid: uid
                      });
                    }).catch((err) => {
                      console.log(err)
                    });
                  }
                } else {
                  return res.status(400).json({
                    message: 'payment_error'
                  });
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              console.log("CARD ISSUE")
            }
          } else {
            return res.status(200).json({
              message: token
            });
          }

        } catch (tEerror) {
          console.log(tEerror)
        }
        // console.log(charge)
      } else {
        console.log("No products")
      }

    } catch (cerr) {
      console.log(cerr);
    }
  } else {
    console.log(valid);
    res.status(400).json({
      error: valid.error.details[0].context
    })
  }
}

exports.cardSingleProductPayment = async (req, res) => {
  var data = {
    name_on_card: req.body['name_on_card'],
    card_number: req.body['card_number'],
    expiration: req.body['expiration'],
    cvc: req.body['cvc'],
    uid: req.body['uid'],
    pid: req.body['pid'],
    qty: req.body['tqty'],
    total_temp_price: req.body['total_temp_price'],
    created_on: moment().format('YYYY-MM-DD, H:mm:ss')
  }
  const schemas = Joi.object().keys({
    name_on_card: Joi.string().required().label("This field is required"),
    card_number: Joi.number().required().label("This field is required"),
    expiration: Joi.string().trim().required().label("This field is required"),
    cvc: Joi.string().required().label("This field is required"),
    uid: Joi.required().label("This field is required"),
    pid: Joi.required().label("This field is required"),
    qty: Joi.required().label("This field is required"),
    total_temp_price: Joi.required().label("This field is required"),
    created_on: Joi.string().required().label("This field is required"),
  });
  const valid = schemas.validate(data)

  if (!(valid.error)) {
    var tempExp = data?.expiration?.split('/');
    try {
      const [cResults, cmetadata] = await productModel.sequelize.query("SELECT * FROM product WHERE no_of_qty > 0 AND status = 'Active' AND id = " + data?.pid + " ");
      var sum = parseInt(data?.qty) * parseFloat(parseFloat(cResults[0]?.price).toFixed(2));
      if (cResults?.length > 0) {
        sum = Math.round(sum + parseFloat(8.50) + parseFloat(50))

        var cartupdatedata = {
          uid: data?.uid,
          pid: data?.pid,
          quantity: parseInt(data?.qty),
          amount: sum,
          indi_amount: cResults[0]?.price,
          status: 'Payment In Process',
          cart_added_at: moment().format('YYYY-MM-DD, H:mm:ss'),
          updated_at: moment().format('YYYY-MM-DD, H:mm:ss')
        }
        const cart = new cartModel(cartupdatedata)
        cart.save().then(async (serRes) => {
          var tempDesc = '';
          var tempCartId = serRes?.id;
          var user_details = await userModel.findByPk(req.body['uid']);
          tempDesc = cResults[0]?.p_name + " (" + parseFloat(cResults[0]?.price).toFixed(2) + " * " + data?.qty + "), ";
          try {
            const token = await stripe.tokens.create({
              card: {
                number: data?.card_number,
                exp_month: tempExp[0],
                exp_year: 20 + tempExp[1],
                cvc: data?.cvc,
              },
            });

            if (token) {
              const charge = await stripe.charges.create({
                amount: sum,
                currency: 'usd',
                source: token?.id,
                description: "Payment done by " + data?.name_on_card + " For items of " + tempDesc + " On " + data?.created_on,
              });


              if (charge && charge?.status == "succeeded") {
                var cusCard = {
                  "user_id": req.body['uid'],
                  "name_on_card": data?.name_on_card,
                  "card_number": charge?.source?.last4,
                  "expiration_month": charge?.source?.exp_month,
                  "expiration_year": charge?.source?.exp_year,
                  "email": user_details?.email,
                  "brand": charge?.source?.brand,
                  "stripe_card_id": charge?.source?.id,
                  "stripe_fingerprint": charge?.source?.fingerprint,
                  "stripe_customer_id": charge?.source?.customer,
                  "cvc_check": charge?.source?.cvc_check,
                  "mobile_no": user_details?.mobile,
                  "created_at": moment().format('YYYY-MM-DD, H:mm:ss'),
                }
                const cardData = new cardModel(cusCard)
                cardData.save().then(async (resd) => {
                  const [updatedCart, cartmetadata] = await cartModel.sequelize.query("UPDATE product_cart SET status = 'Paid', payment_method = 'Card', status = 'Paid', updated_at = '" + moment().format('YYYY-MM-DD H:mm:ss') + "' WHERE id IN (" + tempCartId + ")");
                  if (updatedCart) {
                    var uid = (new Date()).getTime().toString(36);
                    var purData = {
                      'c_id': tempCartId,
                      'p_id': data?.pid,
                      'u_id': data?.uid,
                      'booking_id': uid,
                      'created_at': moment().format('YYYY-MM-DD, H:mm:ss'),
                    }
                    await this.createProductPurchased(purData).then((purSaved) => {
                      return res.status(200).json({
                        message: 'payment_success',
                        tid: uid
                      });
                    }).catch((err) => {
                      console.log(err)
                    });
                  } else {
                    return res.status(400).json({
                      message: 'payment_error'
                    });
                  }
                }).catch(err => {
                  console.log(err);
                });
              } else {
                console.log("CARD ISSUE")
              }
            } else {
              return res.status(200).json({
                message: token
              });
            }

          } catch (tEerror) {
            console.log(tEerror)
          }
          // console.log(charge)

        }).catch(err => {
          console.log("ERR1");
          res.status(400).json({
            error: err?.errors[0]?.message
          });
        });
      } else {
        console.log("No products")
      }

    } catch (cerr) {
      console.log(cerr);
    }
  } else {
    console.log(valid);
    res.status(400).json({
      error: valid.error.details[0].context
    })
  }
}

exports.createProductPurchased = async (data) => {
  const pPurData = new productPurchasedModel(data);
  pPurData.save().then(async (resd) => {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }).catch(err => {
    console.log("ERR Create Purchased Record", err);
    return err
  });
}