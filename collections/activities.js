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

  state: {
    type: String,
    autoform: {
      omit: true,
    }
  },

  name: {
    type: String,
    label: "What is the name of this Activity?"
  },

  times: {
    type: Number,
    label: "What is the # of times this activity occurs per TIME Period?"
  },

  percent: {
    type: Number,
    label: "What % of the time does the occurance of this activity cause downtime?"
  },

  rollup: {
    type: Number,
    decimal: true,
    autoform: {
      omit: true,
    }
  }

});

Activities.attachSchema(ActivitiesSchema);

