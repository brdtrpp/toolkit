AutoForm.hooks({
  insertSubactivityForm: {
    before: {
      insert: function(doc){
        var d = Session.get('driver');
        var a = Session.get('activity');
        doc.activity = a;
        console.log(doc);
        return doc;
      }
    },
    beginSubmit: function() {},
    endSubmit: function() {}
  }
})