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
  activities: {
    type: [Object],
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
  }
});

Template.basicWizard.helpers({
  clearOnDestroy: true,

  btnClass: function() {
    return "btn btn-success btn-block";
  },
  steps: function() {
    var steps = [{
      id: 'process',
      title: 'Add Process',
      schema: Schema.process,
      onSubmit: function(data, wizard) {
//         var end = steps.length - 1;
//         _.map(data.futureName, function(future) {

//           var id = future;
//           var Wizard = wizard;

//           var activityFuture = {
//             toaster: "TOASTER",
//             id: id,
//             title: "Add " + future + " Activities",
//             schema: Schema.activity,
//             template: 'activities',
//             formId: 'activity-form',
//             wizard: Wizard,
//             onSubmit: function(data, wizard) {
//               wizard.next(data);
//             },
//           };

//           var stepId = {
//             [id] : activityFuture,
//           };


//           console.log(id);
//           // Push to second to last in array
//           steps.splice(end, 0 , activityFuture);

//           // Add it to the wizard
//           wizard._stepsByIndex.splice(end, 0, id);
//           $.extend(wizard._stepsById, stepId);

//         });
        console.log(wizard);
        wizard.next(data);
      }
    }, {
      id: "driver",
      title: "Add Time",
      schema: Schema.driver,
      template: 'driver',
      formId: 'driver-form',
      onSubmit: function(data, wizard) {
        console.log(wizard);
        wizard.next(data);
        console.log("TOASTER");
        //         Router.go('/');
      }
    }, {
      id: "currentActivity",
      title: "Add Current Activities",
      schema: Schema.activity,
      template: 'activities',
      formId: 'activity-form',
      onSubmit: function(data, wizard) {
        console.log(wizard);
        wizard.next(data);
        console.log("TOASTER");
//         Router.go('/');
      }
    }];

    return steps;
  }
});

Template.steps_bootstrap3.helpers({
    stepClass: function () {
        var activeStep = this.wizard._activeStepId;
        var id = this.wizard.steps;
        console.log(activeStep);
        console.log(id);

        if (activeStep && activeStep.id === id) {
          return 'primary';
        }
        if (step.data()) {
          return 'success';
        }
        return 'default';
    }
});