Meteor.methods({
  'rollup' : function(doc){
    // console.log(doc);
    let states = State.find({process: doc}).fetch();
    // console.log(states);
    _.forEach(states, function(state){
      let acts = Activities.find({state: state._id}).fetch();
      // console.log(acts);
      _.forEach(acts, function(act){
        let subs = Subactivity.find({activity: act._id}).fetch();
        // console.log(subs);
        if ( 0 < subs.length) {
          _.forEach(subs, function(sub){
            Meteor.call('actRollup', sub);
          });
        } else {
          Meteor.call('actRollupNoSubs', act);
        }

      });
    });
  }
});
