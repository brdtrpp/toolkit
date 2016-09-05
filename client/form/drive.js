Template.driver.events({
  'click .toaster' : function(e, template){
    e.preventDefault();
    this.wizard.next();
  },

  'click .backward' : function(e, template){
    e.preventDefault();
    this.wizard.previous();
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
})