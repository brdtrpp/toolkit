Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: '404',
  waitOn: function(){
    return [
      Meteor.subscribe('drivers'),
      Meteor.subscribe('processes'),
      Meteor.subscribe('activities'),
      Meteor.subscribe('subactivity'),
      Meteor.subscribe('state'),
    ];
  },
});

function noId(){
  Router.current().route.getName()
  if(!Meteor.userId()) {
    this.redirect('home');
    // console.log('text');
  }
  this.next();
}

Router.onBeforeAction(noId, {
  // only: ['/']
  except: ['home', 'terms']
});

Router.route('/terms', function() {
  this.render('terms');
});

Router.route('/', function() {
  this.render('home');
},{
  name: "home",
});

Router.route('/processes', function() {
  this.render('processes');
});

Router.route('/drivers', function(){
  this.render('drivers');
});

Router.route('/drivers/:_id', {
  name: 'driver',
  data: function() {
    return Drivers.findOne({_id: this.params._id});
  },
  onBeforeAction: function () {
    if ( Meteor.isClient ) {
      Session.set('driver', this.params._id);
      this.next();
    }
  },
  onStop: function () {
    if ( Meteor.isClient ) {
      Session.set('driver', null);
    }
  },
});

Router.route('/processes/:_id', {
  name: "process",
  data: function() {
    return Processes.findOne({_id: this.params._id});
  },
  onBeforeAction: function () {
    if ( Meteor.isClient ) {
      Session.set('process', this.params._id);
      this.next();
    }
  },
  onStop: function () {
    if ( Meteor.isClient ) {
      Session.set('process', null);
    }
  },
});
