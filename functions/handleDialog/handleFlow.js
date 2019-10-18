'use strict';

// /////////////////////////////////////////////////////////////////////////////
// Operations for entity types.
// /////////////////////////////////////////////////////////////////////////////

async function createEntityType(projectId, displayName, kind) {
  // [START dialogflow_create_entity_type]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const entityTypesClient = new dialogflow.EntityTypesClient();

  // The path to the agent the created entity type belongs to.
  const agentPath = entityTypesClient.projectAgentPath(projectId);

  const createEntityTypeRequest = {
    parent: agentPath,
    entityType: {
      displayName: displayName,
      kind: kind,
    },
  };

  const responses = await entityTypesClient.createEntityType(
      createEntityTypeRequest
  );
  console.log(`Created ${responses[0].name} entity type`);
  // [END dialogflow_create_entity_type]
}

async function listEntityTypes(projectId) {
  // [START dialogflow_list_entity_types]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const entityTypesClient = new dialogflow.EntityTypesClient();

  // The path to the agent the entity types belong to.
  const agentPath = entityTypesClient.projectAgentPath(projectId);

  const request = {
    parent: agentPath,
  };

  // Call the client library to retrieve a list of all existing entity types.
  const [response] = await entityTypesClient.listEntityTypes(request);
  response.forEach(entityType => {
    console.log(`Entity type name: ${entityType.name}`);
    console.log(`Entity type display name: ${entityType.displayName}`);
    console.log(`Number of entities: ${entityType.entities.length}\n`);
  });
  return response;
  // [END dialogflow_list_entity_types]
}

async function deleteEntityType(projectId, entityTypeId) {
  // [START dialogflow_delete_entity_type]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const entityTypesClient = new dialogflow.EntityTypesClient();

  const entityTypePath = entityTypesClient.entityTypePath(
      projectId,
      entityTypeId
  );

  const request = {
    name: entityTypePath,
  };

  // Call the client library to delete the entity type.
  const response = await entityTypesClient.deleteEntityType(request);
  console.log(`Entity type ${entityTypePath} deleted`);
  return response;
  // [END dialogflow_delete_entity_type]
}

// /////////////////////////////////////////////////////////////////////////////
// Operations for entities.
// /////////////////////////////////////////////////////////////////////////////

async function createEntity(projectId, entityTypeId, entityValue, synonyms) {
  // [START dialogflow_create_entity]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const entityTypesClient = new dialogflow.EntityTypesClient();

  // The path to the agent the created entity belongs to.
  const agentPath = entityTypesClient.entityTypePath(projectId, entityTypeId);

  const entity = {
    value: entityValue,
    synonyms: synonyms,
  };

  const createEntitiesRequest = {
    parent: agentPath,
    entities: [entity],
  };

  const [response] = await entityTypesClient.batchCreateEntities(
      createEntitiesRequest
  );
  console.log('Created entity type:');
  console.log(response);
  // [END dialogflow_create_entity]
}

async function listEntities(projectId, entityTypeId) {
  // [START dialogflow_create_entity]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const entityTypesClient = new dialogflow.EntityTypesClient();

  // The path to the agent the entity types belong to.
  const entityTypePath = entityTypesClient.entityTypePath(
      projectId,
      entityTypeId
  );

  // The request.
  const request = {
    name: entityTypePath,
  };

  // Call the client library to retrieve a list of all existing entity types.
  const [response] = await entityTypesClient.getEntityType(request);
  response.entities.forEach(entity => {
    console.log(`Entity value: ${entity.value}`);
    console.log(`Entity synonyms: ${entity.synonyms}`);
  });
  return response;
  // [END dialogflow_create_entity]
}

async function deleteEntity(projectId, entityTypeId, entityValue) {
  // [START dialogflow_delete_entity]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const entityTypesClient = new dialogflow.EntityTypesClient();

  // The path to the agent the entity types belong to.
  const entityTypePath = entityTypesClient.entityTypePath(
      projectId,
      entityTypeId
  );

  const request = {
    parent: entityTypePath,
    entityValues: [entityValue],
  };

  // Call the client library to delete the entity type.
  await entityTypesClient.batchDeleteEntities(request);
  console.log(`Entity Value ${entityValue} deleted`);
  // [END dialogflow_delete_entity]
}

// /////////////////////////////////////////////////////////////////////////////
// Operations for intents
// /////////////////////////////////////////////////////////////////////////////

async function listIntents(projectId) {
  // [START dialogflow_list_intents]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const intentsClient = new dialogflow.IntentsClient();

  // The path to identify the agent that owns the intents.
  const projectAgentPath = intentsClient.projectAgentPath(projectId);

  const request = {
    parent: projectAgentPath,
  };

  console.log(projectAgentPath);

  // Send the request for listing intents.
  const [response] = await intentsClient.listIntents(request);
  response.forEach(intent => {
    console.log('====================');
    console.log(`Intent name: ${intent.name}`);
    console.log(`Intent display name: ${intent.displayName}`);
    console.log(`Action: ${intent.action}`);
    console.log(`Root folowup intent: ${intent.rootFollowupIntentName}`);
    console.log(`Parent followup intent: ${intent.parentFollowupIntentName}`);

    console.log('Input contexts:');
    intent.inputContextNames.forEach(inputContextName => {
      console.log(`\tName: ${inputContextName}`);
    });

    console.log('Output contexts:');
    intent.outputContexts.forEach(outputContext => {
      console.log(`\tName: ${outputContext.name}`);
    });
  });
  // [END dialogflow_list_intents]
}

async function createIntent(
    projectId,
    displayName,
    trainingPhrasesParts,
    messageTexts
) {
  // [START dialogflow_create_intent]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates the Intent Client
  const intentsClient = new dialogflow.IntentsClient();

  // The path to identify the agent that owns the created intent.
  const agentPath = intentsClient.projectAgentPath(projectId);

  const trainingPhrases = [];

  trainingPhrasesParts.forEach(trainingPhrasesPart => {
    const part = {
      text: trainingPhrasesPart,
    };

    // Here we create a new training phrase for each provided part.
    const trainingPhrase = {
      type: 'EXAMPLE',
      parts: [part],
    };

    trainingPhrases.push(trainingPhrase);
  });

  const messageText = {
    text: messageTexts,
  };

  const message = {
    text: messageText,
  };

  const intent = {
    displayName: displayName,
    trainingPhrases: trainingPhrases,
    messages: [message],
  };

  const createIntentRequest = {
    parent: agentPath,
    intent: intent,
  };

  // Create the intent
  const responses = await intentsClient.createIntent(createIntentRequest);
  console.log(`Intent ${responses[0].name} created`);
  // [END dialogflow_create_intent]
}

async function deleteIntent(projectId, intentId) {
  // [START dialogflow_delete_intent]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const intentsClient = new dialogflow.IntentsClient();

  const intentPath = intentsClient.intentPath(projectId, intentId);

  const request = {name: intentPath};

  // Send the request for deleting the intent.
  const result = await intentsClient.deleteIntent(request);
  console.log(`Intent ${intentPath} deleted`);
  return result;
  // [END dialogflow_delete_intent]
}

// /////////////////////////////////////////////////////////////////////////////
// Operations for contexts
// /////////////////////////////////////////////////////////////////////////////

async function createContext(projectId, sessionId, contextId, lifespanCount) {
  // [START dialogflow_create_context]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const contextsClient = new dialogflow.ContextsClient();

  const sessionPath = contextsClient.sessionPath(projectId, sessionId);
  const contextPath = contextsClient.contextPath(
      projectId,
      sessionId,
      contextId
  );

  const createContextRequest = {
    parent: sessionPath,
    context: {
      name: contextPath,
      lifespanCount: lifespanCount,
    },
  };

  const responses = await contextsClient.createContext(createContextRequest);
  console.log(`Created ${responses[0].name} context`);
  // [END dialogflow_create_context]
}

async function listContexts(projectId, sessionId) {
  // [START dialogflow_list_contexts]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const contextsClient = new dialogflow.ContextsClient();

  // The path to identify the agent that owns the contexts.
  const sessionPath = contextsClient.sessionPath(projectId, sessionId);

  const request = {
    parent: sessionPath,
  };

  // Send the request for listing contexts.
  const [response] = await contextsClient.listContexts(request);
  response.forEach(context => {
    console.log(`Context name: ${context.name}`);
    console.log(`Lifespan count: ${context.lifespanCount}`);
    console.log('Fields:');
    if (context.parameters !== null) {
      context.parameters.fields.forEach(field => {
        console.log(`\t${field.field}: ${field.value}`);
      });
    }
  });
  return response;
  // [END dialogflow_list_contexts]
}

async function deleteContext(projectId, sessionId, contextId) {
  // [START dialogflow_delete_context]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const contextsClient = new dialogflow.ContextsClient();

  const contextPath = contextsClient.contextPath(
      projectId,
      sessionId,
      contextId
  );

  const request = {
    name: contextPath,
  };

  // Send the request for retrieving the context.
  const result = await contextsClient.deleteContext(request);
  console.log(`Context ${contextPath} deleted`);
  return result;
  // [END dialogflow_delete_context]
}

// /////////////////////////////////////////////////////////////////////////////
// Operations for session entity type
// /////////////////////////////////////////////////////////////////////////////

async function createSessionEntityType(
    projectId,
    sessionId,
    entityValues,
    entityTypeDisplayName,
    entityOverrideMode
) {
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const sessionEntityTypesClient = new dialogflow.SessionEntityTypesClient();

  const sessionPath = sessionEntityTypesClient.sessionPath(
      projectId,
      sessionId
  );
  const sessionEntityTypePath = sessionEntityTypesClient.sessionEntityTypePath(
      projectId,
      sessionId,
      entityTypeDisplayName
  );

  // Here we use the entity value as the only synonym.
  const entities = [];
  entityValues.forEach(entityValue => {
    entities.push({
      value: entityValue,
      synonyms: [entityValue],
    });
  });

  const sessionEntityTypeRequest = {
    parent: sessionPath,
    sessionEntityType: {
      name: sessionEntityTypePath,
      entityOverrideMode: entityOverrideMode,
      entities: entities,
    },
  };

  const [response] = await sessionEntityTypesClient.createSessionEntityType(
      sessionEntityTypeRequest
  );
  console.log('SessionEntityType created:');
  console.log(response);
}

async function listSessionEntityTypes(projectId, sessionId) {
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const sessionEntityTypesClient = new dialogflow.SessionEntityTypesClient();
  const sessionPath = sessionEntityTypesClient.sessionPath(
      projectId,
      sessionId
  );

  const request = {
    parent: sessionPath,
  };

  // Send the request for retrieving the sessionEntityType.
  const [response] = await sessionEntityTypesClient.listSessionEntityTypes(
      request
  );
  response.forEach(sessionEntityType => {
    console.log(`Session entity type name: ${sessionEntityType.name}`);
    console.log(`Number of entities: ${sessionEntityType.entities.length}\n`);
  });
}

async function deleteSessionEntityType(
    projectId,
    sessionId,
    entityTypeDisplayName
) {
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const sessionEntityTypesClient = new dialogflow.SessionEntityTypesClient();

  // The path to identify the sessionEntityType to be deleted.
  const sessionEntityTypePath = sessionEntityTypesClient.sessionEntityTypePath(
      projectId,
      sessionId,
      entityTypeDisplayName
  );

  const request = {
    name: sessionEntityTypePath,
  };

  // Send the request for retrieving the sessionEntityType.
  const result = await sessionEntityTypesClient.deleteSessionEntityType(
      request
  );
  console.log(`Session entity type ${entityTypeDisplayName} deleted`);
  return result;
}

module.exports = {
  listIntents: listIntents,
  createIntent: createIntent,
  createContext: createContext,
  listContexts: listContexts,
  deleteContext:deleteContext,
  createEntityType: createEntityType,
  ListEntityTypes:listEntityTypes,
  deleteEntityType:deleteEntityType,
  createEntity: createEntity,
  listEntities:listEntities,
  deleteEntity:deleteEntity,
  deleteIntent: deleteIntent,
  createSessionEntityType: createSessionEntityType,
  listSessionEntityTypes: listSessionEntityTypes,
};
