Activities = new Mongo.Collection("activities");

if (Meteor.isServer) {
  Meteor.publish('activities', function() {
    return Activities.find({owner: this.userId});
  })
}

ActSchema = new SimpleSchema({
  name: {
    type: String,
    label: "What is the name of this Activity?"
  },

  time: {
    type: Number,
    label: "What is the # of times this activity occurs per TIME Period?"
  },

  percent: {
    type: Number,
    label: "What % of the time does the occurance of this activity cause downtime?"
  },

  "subactivities.$.name": {
    type: String,
    maxCount: 12,
    minCount: 1
  },

  "subactivities.$.rate": {
    type: String,
    maxCount: 12,
    minCount: 1
  },

});

ActivitiesSchema = new SimpleSchema({

  owner: {
    type: String,
    autoValue: function() {
      console.log(this.userId);
      return this.userId;
    },
    autoform: {
      omit: true,
    }
  },

  activities: {
    type: Array,
    minCount: 1,
    maxCount: 3
  },

  "activities.$": {
    type: Object,

  },

  "activities.$.name": {
    type: String,
    label: "What is the name of the FUTURE STATE item (product or service) under review?"
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

  "activities.$.subactivities" : {
    type: Array,
    maxCount: 12,
    minCount: 1
  },

  "activities.$.subactivities.$" : {
    type: Object,
  },

  "activities.$.subactivities.$.name": {
    type: String,
  },

  "activities.$.subactivities.$.rate": {
    type: String,
  },

});

Activities.attachSchema(ActivitiesSchema);

