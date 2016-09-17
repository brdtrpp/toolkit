AutoForm.hooks({
  insertActivitiesForm: {
    before: {
    // Replace `formType` with the form `type` attribute to which this hook applies
      insert: function(doc) {
        // Potentially alter the doc
        doc.process = Session.get('process');
        doc.driver = Session.get('driver');
//         console.log(doc);
        return doc;

        // Then return it or pass it to this.result()
        //return doc; (synchronous)
        //return false; (synchronous, cancel)
        //this.result(doc); (asynchronous)
        //this.result(false); (asynchronous, cancel)
      }
    },
    // Called at the beginning and end of submission, respectively.
    // This is the place to disable/enable buttons or the form,
    // show/hide a "Please wait" message, etc. If these hooks are
    // not defined, then by default the submit button is disabled
    // during submission.
    beginSubmit: function() {},
    endSubmit: function() {}
  }
});