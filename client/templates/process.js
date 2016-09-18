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

  subactcount: function() {
    var a = Subactivity.find({activity: this._id}).count();
    return a;
  },

  sub : function(){
    var s = Subactivity.find({activity: this._id}).fetch();
    console.log(s);
    return s;
  }

});

Template.process.events({
  'click .driver' : function() {
    Session.set('driver', this._id);
  },

  'click .sub' : function() {
    Session.set('activity', this._id);
  },

  'click .clone': function() {
    var doc = {};
    doc.d = Session.get('driver');
    doc.p = Session.get('process');
    doc.s = "current";
    Meteor.call('copyActivity', doc);
  }
})