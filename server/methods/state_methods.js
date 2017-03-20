Meteor.methods({
  'stateRollup' : function(actId) {
    var a = Activities.findOne({_id: actId});
    var s = State.findOne({_id: a.state});
    var as = Activities.find({state: s._id}).fetch();
    var sum = [];
    _.forEach(as, function(p) {
      sum.push(p.rollup);
    });
    var result = sum.reduce(function(a, b) {
      return a + b;
    }, 0);
    if (s.rollup !== result) {
      State.update({_id: s._id}, {$set: {rollup: result}});
    }

  },

  'cloneCurrent' : function(doc){
    var s = State.findOne({
      driver: doc.d,
      process: doc.p,
      app: doc.a,
      state: "current",
    });
    doc.os = s._id;
    var ns = State.insert({
      driver: s.driver,
      process: s.process,
      app: s.app,
      name: s.name,
      rollup: s.rollup,
      state: "future",
    });
    doc.ns = ns;
    Meteor.call('cloneAct', doc);
  }
});