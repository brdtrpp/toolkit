AutoForm.hooks({
  insertProcessForm: {
    before: {
      insert: function(doc) {
        sAlert.success(doc.name + ' Successfully Added');
        $('#collapseProcess').collapse('hide');
        return doc;
      }
    },
    beginSubmit: function() {},
    endSubmit: function() {}
  }
})