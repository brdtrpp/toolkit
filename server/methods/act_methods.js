Meteor.methods({
  'actRollup' : function(doc){
    var a = Activities.findOne({_id: doc.activity});
    var s = Subactivity.find({activity: a._id}).fetch();
    var sum = [];
    _.forEach(s, function(p) {
      sum.push(p.rollup);
    });
    var summation = sum.reduce(function(a, b) {
      return a + b;
    }, 0);

    let result = summation * a.times;
    if (a.rollup !== result){
      Activities.update({_id: a._id}, {$set: {rollup: result}});
    }
    
    var actId = a._id;
    Meteor.call('stateRollup', actId)
  },

  'cloneAct': function(doc) {
    var a = Activities.find({state: doc.os}).fetch();
    _.forEach(a, function(na) {
      var oa = na._id;
      doc.oa = oa;
      var ca = Activities.insert({
        state: doc.ns,
        name: na.name,
        times: na.times,
        percent: na.percent,
        rollup: na.rollup
      });
      doc.na = ca;
      Meteor.call('cloneSub', doc);
    });
//     var na = Activity.insert({
//       state: doc
//     });
//     var a = Activities.findOne({state: doc.s, process: doc.p, driver: doc.d});
//     var na = Activities.insert({
//       name: a.name,
//       state: 'future',
//       times: a.times,
//       percent: a.percent,
//       process: a.process,
//       driver: a.driver,
//     });
//     var subs = Subactivity.find({activity: a._id}).fetch();
//     _.forEach(subs, function(sub){
//       Subactivity.insert({
//         activity: na,
//         consumable: sub.consumable,
//         downtime: sub.downtime,
//         duration: sub.duration,
//         name: sub.name,
//         people: sub.people,
//         rate: sub.rate
//       });
//     });
  }
});