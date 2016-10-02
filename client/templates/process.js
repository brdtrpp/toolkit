Template.processes.helpers({
  processes: function() {
    return Processes.find().fetch();
  },
});

Template.process.onRendered(function(){
  import Chart from 'chart.js';
  var ctx = $("#myChart");

  this.autorun(function(){
    const app = Session.get('app');
    const driver = Session.get('driver');
    const colors = [
      {back: '#158cba', boarder: '#127ba3'},
      {back: '#28b62c', boarder: '#23a127'},
      {back: '#75caeb', boarder: '#5fc1e8'},
      {back: '#ff851b', boarder: '#ff7701'},
      {back: '#ff4136', boarder: '#ff291c'},
      {back: '#eeeeee', boarder: '#e2e2e2'},
    ]
    let dataset = [];
    let l = [];
    let s = State.find({app: app, driver: driver}).fetch();

    _.forEach(s, function(i) {
      let getRandomColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
      let num = Math.floor((Math.random() * 10) + 1);
      let a = Activities.find({state: i._id}).fetch();


      let sdata = [];
      // Define labels
      _.forEach(a, function(as){
        if ( !_.contains(l, as.name)) {
          l.push(as.name);
        }

        let map = l.indexOf(as.name);
        sdata.splice(map, 0, as.rollup);
      });


      let len = dataset.length;

      dataset.push({
        label: i.name + " " + i.state,
        backgroundColor: colors[len].back,
        borderColor: colors[len].boarder,
        borderWidth: 2,
        data: sdata,
      });

    });


    var data = {
      labels: l,
      datasets: dataset,
    };

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
//         options: {
//           scales: {
//             yAxes: [{
//               ticks: {
//                 beginAtZero:true
//               }
//             }]
//           }
//         }
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