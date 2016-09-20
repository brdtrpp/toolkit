Template.state.helpers({
  activity: function() {
    const id = Session.get('process');
    const dr = Session.get('driver');
    const app = Session.get('app');
    const act = Activities.find({state: this._id}).fetch();
    return act
  },
});

Template.state.events({
  'click .state': function(){
    Session.set('state', this._id);
  }
})