AutoForm.hooks({
  insertStateForm:{
    before: {
      insert: function(doc){
        doc.driver = Session.get('driver');
        doc.app = Session.get('app');
        doc.process= Session.get('process');
        $('#addState').modal('hide');
        sAlert.success(doc.name + ' Successfully Added');
        return doc;
      }
    },
    beginSubmit: function() {},
    endSubmit: function() {}
  }
});