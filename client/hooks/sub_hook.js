AutoForm.hooks({
  insertSubactivityForm: {
    before: {
      insert: function(doc){
        var d = Session.get('driver');
        var a = Session.get('activity');
        doc.activity = a;
        $('#addSub').modal('hide');
        sAlert.success(doc.name + ' Successfully Added');
        return doc;
      }
    },
    beginSubmit: function() {},
    endSubmit: function() {}
  }
})