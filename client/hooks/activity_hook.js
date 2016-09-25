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
      sAlert.success(doc.name + ' Successfully Added');
    },

    onError: function(formType, error) {
//       $('#addAct').modal('hide');
      sAlert.error(error);
    },
    beginSubmit: function() {},
    endSubmit: function() {}
  }
});