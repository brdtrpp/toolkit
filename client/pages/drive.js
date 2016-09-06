Template.drivers.helpers({
  drivers: function() {
    return Drivers.find().fetch();
  }
});

Template.addDriver.helpers({
  drivers: function() {
    return Drivers.find().fetch();
  }
});

Template.activities.events({
  'click .toaster' : function(e, template){
    e.preventDefault();
    this.wizard.next();
  },

  'click .backward' : function(e, template){
    e.preventDefault();
    this.wizard.previous();
  }
});