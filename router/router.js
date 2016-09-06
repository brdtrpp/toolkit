Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function() {
  this.render('home');
});

Router.route('/addProcess', function() {
  this.render('addProcess');
});

Router.route('/processes', function() {
  this.render('processes');
});

Router.route('/addDriver', function(){
  this.render('addDriver');
});

Router.route('/drivers', function(){
  this.render('drivers');
});

Router.route('/drivers/:_id', function() {
  this.render('driver', {
    data: function() {
     return Drivers.findOne({_id: this.params._id});
    }
  });
});

Router.route('/processes/:_id', function() {
  this.render('process', {
    data: function() {
      return Processes.findOne({_id: this.params._id});
    }
  });
});