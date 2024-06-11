const express = require("express");
let mongodb = require("mongodb");
const url = require("../url");
let mcl = mongodb.MongoClient;
let router = express.Router();
router.post("/", (req, res) => {
  let obj = req.body;
  mcl.connect(url, (err, conn) => {
    if (err) {
      console.log("Error connecting");
    } else {
      let db = conn.db("students");
      db.collection("students").insertOne(obj, (err) => {
        if (err) {
          console.log("Error inserting");
          res.json({ insert: "error" });
        } else {
          console.log("Success inserting");
          res.json({ insert: "success insert" });
          conn.close();
        }
      });
    }
  });
});
module.exports = router;
// const express = require("express");
// let mongodb = require("mongodb");
// //import url
// const url = require("../url");
// //create mongo client
// let mcl = mongodb.MongoClient;
// //create router instance
// let router = express.Router();
// //create rest api
// router.post("/", (req, res) => {
//   let obj = req.body;
//   //connect to mongodb
//   mcl.connect(url, (err, conn) => {
//     if (err) console.log("Error in connection :- ", err);
//     else {
//       let db = conn.db("nodedb");
//       db.collection("products").insertOne(obj, (err) => {
//         if (err) res.json({ insert: "Error " + err });
//         else {
//           console.log("Data inserted");
//           res.json({ insert: "success" });
//           conn.close();
//         }
//       });
//     }
//   });
// });

// //export router
// module.exports = router;
