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
      Bert.alert(doc.name + ' Successfully Added');
    },

    onError: function(formType, error) {
      $('#addSub').modal('hide');
      Bert.alert('Something went wrong!', 'danger');
    },

    beginSubmit: function() {},
    endSubmit: function() {}
  },

  updateSubactivityForm: {
    before: {
      update: function(doc){
        let ru = ( doc.$set.itemNum * doc.$set.itemCost ) + doc.$set.consumable + ( ( doc.$set.duration / 60 ) * ( doc.$set.rate * doc.$set.people ) );
        doc.$set.rollup = ru;
//         sAlert.success('Successfully Updated');
        return doc;
      }
    },

    onSuccess: function(formType, result) {
      let doc = Session.get('process');
      Meteor.call('rollup', doc);
      Bert.alert('Successfully Updated');
    },

    onError: function(formType, error) {
      Bert.alert('Something went wrong!', 'danger');
    },

    beginSubmit: function() {},
    endSubmit: function() {}
  }
});