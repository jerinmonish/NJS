require("dotenv").config();
const fs = require('fs');
var buffer = require('buffer');
var path = require('path');
const jwt = require("jsonwebtoken");

exports.saveImg = function (imgs, res) {

  var imageTypeRegularExpression = /\/(.*?)$/;
  var base64Data = imgs;
  var imageBuffer = decodeBase64Image(base64Data);
  var userUploadedFeedMessagesLocation = '../ecom/backend/assets/images/product_images/';
  var uniqueRandomImageName = Date.now();
  // This variable is actually an array which has 5 values,
  // The [1] value is the real image extension
  var imageTypeDetected = imageBuffer.type.match(imageTypeRegularExpression);

  var userUploadedImagePath = userUploadedFeedMessagesLocation + uniqueRandomImageName + '.' + imageTypeDetected[1];

  // Save decoded binary image to disk
  try {
    require('fs').writeFile(userUploadedImagePath, imageBuffer.data,
      function () {
        console.log('DEBUG - feed:message: Saved to disk image attached by user:', userUploadedFeedMessagesLocation + '/' + uniqueRandomImageName + '.' + imageTypeDetected[1]);
        //return res.json({ success: false, message: 'unable to fetch' });
        // return 'JERIN MONISH';
      });
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

exports.GenerateHrmsBearerToken = function () {
  const authToken = jwt.sign(
    { id: "admin" },
    'myjwtkeys',
    { expiresIn: '1h' }
  );
  return authToken;
};


exports.AuthenticateHrmsBearerToken = async function (req, res, next) {
  const authorization = req.headers?.authorization;
  if (authorization) {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      const tokenVerify = await jwt.verify(token, 'myjwtkeys')
      req.decoded = tokenVerify
      // We call next to pass execution to the subsequent middleware
      // res.status(200).json({
      //   statuscode: 200,
      //   status: "Success",
      //   data: { tokenVerify },
      //   error: [{ message: "", errorcode: "" }],
      // });
      next();
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      res.status(401).json({
        statuscode: 401,
        status: "Authentication error",
        data: {},
        error: [{ message: "Bearer Token Invalid", errorcode: 401 }],
      });
    }
  } else {
    res.status(401).json({
      statuscode: 401,
      status: "Authentication error",
      data: {},
      error: [
        { message: "Authentication error. Token required", errorcode: 401 },
      ],
    });
  }
}
