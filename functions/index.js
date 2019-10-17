const functions = require("firebase-functions");
const { WebhookClient, Card, Suggestion } = require("dialogflow-fulfillment");
const { app } = require("./api/app");
const config = require("./config/config");
const structjson = require("./structjson.js");
const dialogflow = require("dialogflow");
const intentsClient = new dialogflow.IntentsClient();
const { createIntent } = require("./dialogFlow/dialogFlow");
const projectId = "jenny-hpawmv";

("use strict");

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  (request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log(
      "Dialogflow Request headers: " + JSON.stringify(request.headers)
    );
    console.log("Dialogflow Request body: " + JSON.stringify(request.body));

    function welcome(agent) {
      agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
      agent.add(`I didn't understand`);
      agent.add(`I'm sorry, can you try again?`);
    }

    function yourFunctionHandler(agent) {
      agent.add(
        `This message is from Dialogflow's Cloud Functions for Firebase editor!`
      );
      agent.add(
        new Card({
          title: `Title: this is a card title`,
          imageUrl:
            "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png",
          text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
          buttonText: "Go For IT",
          buttonUrl: "https://assistant.google.com/"
        })
      );
      agent.add(new Suggestion(`Quick Reply`));
      agent.add(new Suggestion(`Suggestion`));
      agent.setContext({
        name: "weather",
        lifespan: 2,
        parameters: { city: "Rome" }
      });
    }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
    intentMap.set("Default Fallback Intent", fallback);
    intentMap.set("Prueba", yourFunctionHandler);

    // intentMap.set('your intent name here', googleAssistantHandler);
    // agent.handleRequest(intentMap);
  }
);

exports.surveysClient = functions.https.onRequest(app);

exports.trigger = functions.firestore
  .document("currentSurvey/{surveyID}")
  .onUpdate((change, context) => {
    const newValue = change.after.data();
    return createIntent(projectId, "prueba", [...newValue], ["ITs alive"]);
  });
