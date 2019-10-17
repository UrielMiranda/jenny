const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");
const config = require("../config/config");
const intents = require("../dialogFlow/dialogFlow");

admin.initializeApp(config);
const db = admin.firestore();

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/surveys", (req, res) => {
  const data = req.body;
  db.collection("surveys")
    .add(data)
    .then(response => {
      res.send({ result: `Message with ID: ${response} added.` });
    });
});

app.put("/current", (req, res) => {
  const { surveyID } = req.body;
  db.collection("currentSurvey")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(function(doc) {
        db.collection("currentSurvey")
          .doc(doc.id)
          .update({ id: surveyID, data: doc.data() })
          .then(response => {
              // intents.listIntents()
            res
              .status(200)
              .send({ type: "success", msg: "Updated info successfully" });

          });
      });
    })
    .catch(err => {
      res
        .status(403)
        .send({ type: "error", msg: "Error when try to update info" });
    });
});

module.exports = {
  app: app
};
