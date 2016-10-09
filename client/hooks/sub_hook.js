AutoForm.hooks({
  insertSubactivityForm: {
    before: {
      insert: function(doc){
        let a = Session.get('activity');
        doc.activity = a;
        let ru = ( doc.itemNum * doc.itemCost ) + doc.consumable + ( ( doc.duration / 60 ) * ( doc.rate * doc.people ) );
        doc.rollup = ru;
        return doc;
      }
    },

    onSuccess: function(formType, result) {
      $('#addSub').modal('hide');
      let doc = Subactivity.findOne({_id: result});
      console.log(doc);
      Meteor.call('actRollup', doc)
      sAlert.success(doc.name + ' Successfully Added');
    },

    onError: function(formType, error) {
      $('#addSub').modal('hide');
      sAlert.error('Something went wrong!');
    },

    beginSubmit: function() {},
    endSubmit: function() {}
  }
})