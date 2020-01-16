const functions = require("firebase-functions");
const { WebhookClient, Card, Suggestion } = require("dialogflow-fulfillment");
const { app } = require("./api/app");
const config = require("./config/config");
const structjson = require("./structjson.js");
const dialogflow = require("dialogflow");
const intentsClient = new dialogflow.IntentsClient();
const { createIntent } = require("./handleDialog/handleFlow.js");
const projectId = "jenny-hpawmv";
const admin = require("firebase-admin");

("use strict");

exports.surveysClient = functions.https.onRequest(app);

exports.trigger = functions.firestore
  .document("currentSurvey/{surveyID}")
  .onUpdate((change, context) => {
    const {id} = change.after.data();
    const db = admin.firestore();
    const ref = db.collection("surveys").doc(id);
    const {title,data,description} = ref.get()
    .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log(doc.data())
          let {data} = doc.data();
          let questions = data.map(item => item.question);
          return createIntent(projectId, title,questions , ["ITs alive"]);
          
        }
      }).catch(err =>{
        console.log(err)
      })
    return 
  });

exports.fulfillment = functions.https.onRequest((request,response)=>{
  response.send("Works")
});

