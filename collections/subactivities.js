Subactivity = new Mongo.Collection('subactivity');

if (Meteor.isServer) {
  Meteor.publish('subactivity', function() {
    return Subactivity.find({"owner.owner": this.userId});
  })
}

SubactivitiesSchema = new SimpleSchema({
  owner: {
    type: OwnerSchema,
    autoform: {
      omit: true,
    }
  },

  activity: {
    type: String,
    autoform: {
      omit: true,
    }
  },

  name: {
    type: String,
    label: "What are the names of the subactivities that make up the parent activity?"
  },

  duration: {
    type: Number,
    label: "How Long Does it take?"
  },

  downtime: {
    type: Boolean,
    label: "Do the minutes contribute to Downtime?",
    autoform: {
      afFieldInput: {
        type: "boolean-radios",

      }
    }
  },

  rate: {
    type: Number,
    label: "Labor Rate $/hr"
  },

  people: {
    type: Number,
    label: "Number of People"
  },

  consumable: {
    type: Number,
    label: "Consumables Cost"
  },

  itemCost: {
    type: Number,
    label: "Cost of Items"
  },

  itemNum: {
    type: Number,
    label: "Number of Items"
  },

  rollup: {
    type: Number,
    decimal: true,
    autoform: {
      omit: true,
    }
  }
});

Subactivity.attachSchema(SubactivitiesSchema);