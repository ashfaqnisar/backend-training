// var createError = require('http-errors');
var express = require('express');
const createError = require("http-errors");
const cors = require("cors")
const logger = require("morgan")
const debug = require("debug")("app:startup")
const {body, validationResult} = require('express-validator');

const createStudent = require("./shared/util");


var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())
app.use(logger("dev"))

app.get('/students', (req, res, next) => {
  console.log(req.query)
  const {branch} = req.query;
  console.log(branch);
  res.send(branch);
});


app.get('/students/:studentId', (req, res, next) => {
  const {studentId} = req.params;
  console.log(studentId);
  res.send({
    "customer": {
      "address": {
        "shipping": {
          "address": "No 19/3,Third Floor,Bikasipura RoadJC Industrial Layout Off Kanakapura Road",
          "district": "Yelachenahalli",
          "state": "Karnataka",
          "pinCode": "560078",
          "stateCode": "29"
        },
        "billing": {
          "address": "No 19/3,Third Floor,Bikasipura RoadJC Industrial Layout Off Kanakapura Road",
          "district": "Yelachenahalli",
          "state": "Karnataka",
          "pinCode": "560078",
          "stateCode": "29"
        },
        "_id": "60b677c2c42fd32cec91e8d0"
      },
      "email": "support@enarka.in",
      "number": 8328277518,
      "name": "Enarka India Private Limited",
      "gst": "29AACCE8724E1Z"
    },
    "charges": {
      "netAmount": 200000,
      "taxAmount": 36000,
      "totalAmount": 236000
    },
    "status": "enquiry_created",
    "createdAt": "2021-06-01T18:02:22.521Z",
    "updatedAt": "2021-06-01T18:02:22.521Z",
    "_id": "60b677c2c42fd32cec91e8cf",
    "lineItems": [
      {
        "_id": "609a17172700a24794e2e942",
        "hsnCode": "154",
        "gstPercentage": 18,
        "unitPrice": 100000,
        "cellCapacity": "32700 Type",
        "noOfCells": "12",
        "bisNo": "R41152323",
        "cellModel": "cyclindrical",
        "dimensions": "160 x 128 x 86",
        "maxDischargeCurrent": "10",
        "maxChargeCurrent": "3",
        "volRange": "10.00 - 14.50",
        "energy": 240,
        "nominalCapacity": "20",
        "nominalVol": "12.8",
        "modelNo": "3634502",
        "modelName": "COMPACT LiION",
        "totalAmount": 118000,
        "taxAmount": 18000,
        "materials": [
          {
            "_id": "609a17172700a24794e2e943",
            "materialId": "mat_1020",
            "quantity": 1
          },
          {
            "_id": "609a17172700a24794e2e944",
            "materialId": "mat_1018",
            "quantity": 1
          },
          {
            "_id": "609a17172700a24794e2e945",
            "materialId": "mat_1017",
            "quantity": 1
          },
          {
            "_id": "609a17172700a24794e2e946",
            "materialId": "mat_1016",
            "quantity": 1
          },
          {
            "_id": "609a17172700a24794e2e947",
            "materialId": "mat_1015",
            "quantity": 1
          }
        ],
        "productId": "product_1005",
        "typeQuantity": {
          "_id": "60b677c2c42fd32cec91e8d7",
          "rtb": 1,
          "rtm": 0
        },
        "quantity": 1,
        "netAmount": 100000
      },
      {
        "_id": "606f164a1167a968d860087b",
        "hsnCode": "156",
        "gstPercentage": 18,
        "unitPrice": 100000,
        "cellCapacity": "32700 Type",
        "noOfCells": "4",
        "bisNo": "R41152323",
        "cellModel": "Rectangular",
        "dimensions": "230 - 100 - 86",
        "maxDischargeCurrent": "230",
        "maxChargeCurrent": "3",
        "volRange": "40",
        "energy": 256,
        "nominalCapacity": "10",
        "nominalVol": "28.4",
        "modelNo": "125882",
        "modelName": "EVLiION",
        "totalAmount": 118000,
        "taxAmount": 18000,
        "materials": [
          {
            "_id": "606f164a1167a968d860087c",
            "materialId": "mat_1017",
            "quantity": 1
          },
          {
            "_id": "606f164a1167a968d860087d",
            "materialId": "mat_1016",
            "quantity": 4
          }
        ],
        "productId": "product_1001",
        "typeQuantity": {
          "_id": "60b677c2c42fd32cec91e8db",
          "rtb": 1,
          "rtm": 0
        },
        "quantity": 1,
        "netAmount": 100000
      }
    ],
    "custId": "cust_1001",
    "salesOrderId": "order_1013",
    "timeline": [
      {
        "_id": "60b677c2c42fd32cec91e8dc",
        "status": "enquiry_created",
        "time": "2021-06-01T18:09:06.909Z"
      }
    ],
    "__v": 0
  });
});

function isEmail() {
  return false
}

app.post(
  '/students',
  body("email").isEmail(),
  // body("name").toLowerCase().trim(),
  (request, response, next) => {

    console.log(request.body);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const data = request.body;
    console.log("Inside the post request")

    createStudent(data)
    return response.send({data: request.body});
});


app.put('/students/:studentId', (req, res, next) => {
  const {studentId} = req.params;

  const data = req.body;
  res.send({data: data?.length});
});

app.patch('/samplePatch', (req, res, next) => {
  const data = req.body;
  res.send({data: data?.length});
});
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
