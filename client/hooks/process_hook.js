AutoForm.hooks({
  insertProcessForm: {
    before: {
      insert: function(doc) {
        $('#collapseProcess').collapse('hide');
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      Bert.alert(doc.name + ' Successfully Updated');
    },
    onError: function(formType, error) {
      Bert.alert('Something went wrong!', 'danger');
    },
    beginSubmit: function() {},
    endSubmit: function() {}
  }
})