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

Schema.driver = new SimpleSchema({
   driver: {
    type: String,
    label: "Who pays for the application under review?"
  },

  timeperiod: {
    type: String,
    label: "What is the time period under review?",
  },
})


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
  btnClass: function() {
    return "btn btn-success btn-block";
  },
  steps: function() {
    var steps = [{
      id: 'process',
      title: 'Add Process',
      schema: Schema.process,
      onSubmit: function(data, wizard) {
        _.map(data.futureName, function(future) {
          steps.push({
            id: "activity" + future,
            title: "Add " + future + " Activities",
            schema: Schema.activity
          });
        });
        console.log(steps);
        wizard.next();
      }
    }, {
      id: "driver",
      title: "Add Time",
      schema: Schema.driver
    }, {
      id: "currentActivity",
      title: "Add Current Activities",
      schema: Schema.activity
    }];

    return steps;
  }
});

Template.steps_bootstrap3.helpers({
    stepClass: function (id) {
        var activeStep = this.wizard.activeStep();
        var step = this.wizard.getStep(id);
        if (activeStep && activeStep.id === id) {
            return 'primary';
        }
        if (step.data()) {
            return 'success';
        }
        return 'default';
    }
});