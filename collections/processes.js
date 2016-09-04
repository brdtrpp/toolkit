Processes = new Mongo.Collection("processes");

// Define the schema
ProcessSchema = new SimpleSchema({
  name: {
    type: String,
    label: "What is the name of the process under review?",
    max: 75
  },

  appName: {
    type: String,
    label: "What application, within the Process is under review?",
    max: 75
  },

  driver: {
    type: String,
    label: "Who pays for the application under review?"
  },

  currentName: {
    type: String,
    label: "What is the name of the CURRENT STATE item (product or service) under review?"
  },

  futureName: {
    type: [String],
    label: "What is the name of the FUTURE STATE item (product or service) under review?",
    maxCount: 3
  },

   timeperiod: {
    type: String,
    label: "What is the time period under review?",
  },

  activities: {
    type: [Object],
    label: "Actvities (max 8)",
    minCount: 1,
    maxCount: 8
  },

  "activities.$.name": {
    type: String,
    label: "What is the name of this Activity?"
  },

  "activities.$.time": {
    type: Number,
    label: "What is the # of times this activity occurs per TIME Period?"
  },

  "activities.$.percent": {
    type: Number,
    label: "What % of the time does the occurance of this activity cause downtime?"
  },

  "activities.$.subactivities.$.name": {
    type: String,
    maxCount: 12,
    minCount: 1
  },

});

Processes.attachSchema(ProcessSchema);