Template.processes.helpers({
  processes: function() {
    return Processes.find().fetch();
  },
});

Template.process.helpers({
  activity: function() {
    const id = Session.get('process');
    const dr = Session.get('driver');
    const act = Activities.find({process: id, driver: dr}).fetch();
    return act
  },

  drivers: function() {
    var d = Drivers.find().fetch();
    return d;
  },

  driverState: function(){
    if( Session.equals('driver', this._id) ) {
      return "active";
    } else {
      return "default";
    }
  },

  driverName: function() {
    const drs = Session.get('driver');
    const dr = Drivers.findOne({_id: drs});
    return dr.driver;
  },

});

Template.process.events({
  'click .driver' : function() {
    Session.set('driver', this._id);
  },
})