AutoForm.hooks({
  insertSubactivityForm: {
    before: {
      insert: function(doc){
        let p = Session.get('process');
        let pdt = Processes.findOne({_id: p});
        let a = Session.get('activity');
        doc.activity = a;
        if (doc.downtime === true) {
          let ru = ( doc.itemNum * doc.itemCost ) + doc.consumable + ( ( doc.duration / 60 ) * ( doc.rate * doc.people ) ) + ( ( doc.duration / 60 ) * pdt.downtime );
        doc.rollup = ru;
        } else {
          let ru = ( doc.itemNum * doc.itemCost ) + doc.consumable + ( ( doc.duration / 60 ) * ( doc.rate * doc.people ) );
          doc.rollup = ru;
        }


        return doc;
      }
    },

    onSuccess: function(formType, result) {
      $('#addSub').modal('hide');
      let doc = Subactivity.findOne({_id: result});
      let proc = Session.get('process');
      Meteor.call('rollup', proc);
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
        let p = Session.get('process');
        let pdt = Processes.findOne({_id: p});
        if (doc.$set.downtime === true) {
          let ru = ( doc.$set.itemNum * doc.$set.itemCost ) + doc.$set.consumable + ( ( doc.$set.duration / 60 ) * ( doc.$set.rate * doc.$set.people ) ) + ( ( doc.$set.duration / 60 ) * pdt.downtime );
          doc.$set.rollup = ru;
        } else {
          let ru = ( doc.$set.itemNum * doc.$set.itemCost ) + doc.$set.consumable + ( ( doc.$set.duration / 60 ) * ( doc.$set.rate * doc.$set.people ) );
          doc.$set.rollup = ru;
        }
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
  },

  removeSubactivityForm: {
    after: {
      remove: function(doc){
        console.log('toaster');
      }
    },

    onSubmit: function(insertDoc, updateDoc, currentDoc){
      console.log('toaster');
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
  },

});