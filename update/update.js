const express = require("express");
let mongodb = require("mongodb");
const url = require("../url");
let mcl = mongodb.MongoClient;
let router = express.Router();
router.put("/", (req, res) => {
  let name = req.body.name;
  let obj = {
    branch: req.body.branch,
    percentage: req.body.percentage,
    gender: req.body.gender,
  };
  mcl.connect(url, (err, conn) => {
    if (err) {
      console.log("Error connecting");
    } else {
      let db = conn.db("students");
      db.collection("students").updateOne(
        { name: name },
        { $set: obj },
        (err) => {
          if (err) {
            console.log("Error updating");
            res.json({ insert: "error" });
          } else {
            console.log("Successfully updated");
            res.json({ insert: "success update" });
            conn.close();
          }
        }
      );
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
// router.put("/", (req, res) => {
//   let p_id = req.body.p_id;
//   let obj = {
//     p_name: req.body.p_name,
//     p_cost: req.body.p_costs,
//   };
//   //connect to mongodb
//   mcl.connect(url, (err, conn) => {
//     if (err) console.log("Error in connection :- ", err);
//     else {
//       let db = conn.db("nodedb");
//       db.collection("products").updateOne(
//         { p_id },
//         { $set: obj },
//         (err, result) => {
//           if (err) res.json({ update: "Error " + err });
//           else {
//             if (result.matchedCount != 0) {
//               console.log("Data updated ");
//               res.json({ update: "success" });
//             } else {
//               console.log("Data Not updated ");
//               res.json({ update: "Record Not found" });
//             }
//             conn.close();
//           }
//         }
//       );
//     }
//   });
// });

// //export router
// module.exports = router;
