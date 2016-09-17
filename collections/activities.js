Activities = new Mongo.Collection("activities");

if (Meteor.isServer) {
  Meteor.publish('activities', function() {
    return Activities.find({"owner.owner": this.userId});
  })
}

ActivitiesSchema = new SimpleSchema({
  owner: {
    type: OwnerSchema,
    autoform: {
      omit: true,
    }
  },

  driver: {
    type: String,
    autoform: {
      omit: true,
    }
  },

  process: {
    type: String,
    autoform: {
      omit: true,
    }
  },

  name: {
    type: String,
    label: "What is the name of this Activity?"
  },

  state: {
    type: String,
    autoform: {
      type: "select",
      options: [
        {label: "Current", value: "current"},
        {label: "Future", value: "future"},
      ]
    }
  },

  times: {
    type: Number,
    label: "What is the # of times this activity occurs per TIME Period?"
  },

  percent: {
    type: Number,
    label: "What % of the time does the occurance of this activity cause downtime?"
  },

});

Activities.attachSchema(ActivitiesSchema);

