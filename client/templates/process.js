Template.processes.helpers({
  processes: function() {
    return Processes.find().fetch();
  },
});

Template.process.onRendered(function(){
  import Chart from 'chart.js';
  var ctx = $("#myChart");

  this.autorun(function(){
    let app = Session.get('app');
    let driver = Session.get('driver');

    let dataset = [];

    let s = State.find({app: app, driver: driver}).fetch();

    _.forEach(s, function(i) {
      dataset.push(i.rollup);
    });

    console.log(dataset);

    var multiply = function(num) {
      return num * Math.random();
    }

    var data = {
      labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(179,181,198,0.75)",
          borderColor: "rgba(179,181,198,1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: dataset.map(multiply),
        },
        {
          label: "My Second dataset",
          backgroundColor: "rgba(255,99,132,0.75)",
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
          data: dataset.map(multiply),
        }
      ]
    };

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
    });
  });
});

Template.process.helpers({
  current: function() {
//     var id = Session.get('process');
//     var dr = Session.get('driver');
//     var act = Activities.find({process: id, driver: dr, state: "current"}).count();
//     if (act == 1) {
//       return "";
//     } else {
//       return "disabled";
//     }
    return "";
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
    doc.a = Session.get('app');
    Meteor.call('cloneCurrent', doc);
  },

  'click .glyphicon-trash' : function() {
  },

  'click .app': function() {
    var a = Session.set('app', this.name);
  },

})