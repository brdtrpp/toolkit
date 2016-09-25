Template.activityItem.helpers({
  sub: function(){
    var s = Subactivity.find({activity: this._id}).fetch();
    return s;
  },

  rollupFormat: function() {
    return this.rollup.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
});