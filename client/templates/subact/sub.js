Template.subItem.helpers({
  rollupFormat: function() {
    return this.rollup.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  },

  subId: function(){
    // console.log(this._id);
    return this._id;
  },

  onRemoveSuccess: function() {
    let c = function() {
      let doc = Session.get('process');
      // console.log(doc);
      Meteor.call('rollup', doc);
      Bert.alert('Successfully Updated');
    };
    return c;
  },
});