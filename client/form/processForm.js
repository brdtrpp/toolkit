Schema = {};
Schema.process = new SimpleSchema({
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

  timeperiod: {
    type: String,
    label: "What is the time period under review?",
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


});


Schema.activity = new SimpleSchema({
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
  }
});

Template.basicWizard.helpers({
  steps: function() {
    var futureState = [];
    var steps = [{
      id: 'process',
      title: 'Add Process',
      buttonClasses: "btn btn-primary",
      schema: Schema.process,
      onSubmit: function(data, wizard) {
        _.map(data.futureName, function(future) {
          futureState.push(future);
        })
        console.log(wizard);
      }
    }, {
      id: "activity",
      title: "Add Activities",
      schema: Schema.activity
    }];

    return steps;
  }
});

