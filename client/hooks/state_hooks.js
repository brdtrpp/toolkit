AutoForm.hooks({
  insertStateForm:{
    before: {
      insert: function(doc){
        doc.driver = Session.get('driver');
        doc.app = Session.get('app');
        doc.process= Session.get('process');
        doc.rollup = 0;
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      $('#addState').modal('hide');
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