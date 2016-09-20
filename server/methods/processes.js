Meteor.methods({
  copyActivity: function(doc) {
    var a = Activities.findOne({state: doc.s, process: doc.p, driver: doc.d});
    var na = Activities.insert({
      name: a.name,
      state: 'future',
      times: a.times,
      percent: a.percent,
      process: a.process,
      driver: a.driver,
    });
    var subs = Subactivity.find({activity: a._id}).fetch()
    _.forEach(subs, function(sub){
      Subactivity.insert({
        activity: na,
        consumable: sub.consumable,
        downtime: sub.downtime,
        duration: sub.duration,
        name: sub.name,
        people: sub.people,
        rate: sub.rate
      });
    });

  }
});
