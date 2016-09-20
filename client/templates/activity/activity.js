Template.activityItem.helpers({
  sub: function(){
    var s = Subactivity.find({activity: this._id}).fetch();
    return s;
  },
});