Template.processes.helpers({
  processes: function() {
    return Processes.find().fetch();
  },
});

Template.process.helpers({
  current: function() {
    var id = Session.get('process');
    var dr = Session.get('driver');
    var act = Activities.find({process: id, driver: dr, state: "current"}).count();
    if (act == 1) {
      return "";
    } else {
      return "disabled";
    }
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
    var s = Subactivity.find({activity: this._id}).count();
    return s;
  },

  app: function (){
    var a = Session.get('app');
    return a;
  },

  states: function(){
    var a = Session.get('app');
    var d = Session.get('driver');
    var p = Session.get('process');
    var s = State.find({
      driver: d,
      process: p,
      app: a,
    }).fetch();
    return s;
  },

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
  },

  'click .glyphicon-trash' : function() {
  },

  'click .app': function() {
    var a = Session.set('app', this.name);
  },

})