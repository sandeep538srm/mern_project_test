const express = require("express");
let mongodb = require("mongodb");
const url = require("../url");
let mcl = mongodb.MongoClient;
let router = express.Router();
router.get("/", (req, res) => {
  mcl.connect(url, (err, conn) => {
    if (err) {
      console.log("Error connecting");
    } else {
      let db = conn.db("students");
      db.collection("students")
        .find()
        .toArray((err, array) => {
          if (err) {
            console.log("Error", err);
          } else {
            console.log("data sent");
            res.json(array);
            conn.close();
          }
        });
    }
  });
});
module.exports = router;
//import modules
// const express = require("express");
// let mongodb = require("mongodb");
// //import url
// const url = require("../url");
// //create mongo client
// let mcl = mongodb.MongoClient;
// //create router instance
// let router = express.Router();
// //create rest api
// router.get("/", (req, res) => {
//   //connect to mongodb
//   mcl.connect(url, (err, conn) => {
//     if (err) console.log("Error in connection");
//     else {
//       let db = conn.db("nodedb");
//       db.collection("products")
//         .find()
//         .toArray((err, array) => {
//           if (err) console.log("Error:- ", err);
//           else {
//             console.log("Data Sent");
//             res.json(array);
//             conn.close();
//           }
//         });
//     }
//   });
// });
// module.exports = router;
