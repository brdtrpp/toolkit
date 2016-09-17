AutoForm.hooks({
  insertProcessForm: {
    before: {
      insert: function(doc) {
        $('#collapseProcess').collapse('hide');
        return doc;
      }
    },
    beginSubmit: function() {},
    endSubmit: function() {}
  }
})