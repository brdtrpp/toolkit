Meteor.methods({
  'rollup' : function(doc){
    let states = State.find({process: doc}).fetch();
    _.forEach(states, function(state){
      let acts = Activities.find({state: state._id}).fetch();
      _.forEach(acts, function(act){
        let subs = Subactivity.find({activity: act._id}).fetch();
        _.forEach(subs, function(sub){
          Meteor.call('actRollup', sub);
        });
      });
    });
  }
});
