Meteor.methods({
  'rollup' : function(doc){
    let states = State.find({process: doc}).fetch();
    _.forEach(states, function(state){
      let acts = Activities.find({state: state._id}).fetch();
      _.forEach(acts, function(act){
        let subs = Subactivity.find({activity: act._id}).fetch();
        let ru = act.rollup;
        console.log(ru);
        _.forEach(subs, function(sub){
          let ru = sub.rollup;
          let nru = ( sub.itemNum * sub.itemCost ) + sub.consumable + ( ( sub.duration / 60 ) * ( sub.rate * sub.people ) );
          if (nru !== ru) {
            console.log(nru);
          }
        });
      });
    });
  }
});
