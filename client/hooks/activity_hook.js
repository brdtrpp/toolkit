AutoForm.hooks({
  insertActivitiesForm: {
    before: {
      insert: function(doc) {
        doc.rollup = 0;
        doc.state = Session.get('state');
        return doc;
      }
    },

    onSuccess: function(formType, result) {
      $('#addAct').modal('hide');
      var doc = Subactivity.findOne({_id: result});
      var process = Processes.findOne();
      Meteor.call('rollup', doc);
      Bert.alert(doc.name + ' Successfully Added');
    },

    onError: function(formType, error) {
      Bert.alert('Something went wrong!', 'danger');
    },
    beginSubmit: function() {},
    endSubmit: function() {}
  },

  updateActivitiesForm: {
    before: {
      update: function(doc) {
        console.log(doc);
        return doc;
      }
    },
    
    onSuccess: function(formType, result) {
      let doc = Session.get('process');
      Meteor.call('rollup', doc);
      Bert.alert('Successfully Updated');
    },

    onError: function(formType, error) {
      Bert.alert('Something went wrong!', 'danger');
    },
    
    beginSubmit: function() {},
    endSubmit: function() {}
  }
});