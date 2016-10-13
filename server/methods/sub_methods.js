Meteor.methods({
  'cloneSub' : function(doc){
    var osub = Subactivity.find({activity: doc.oa}).fetch();
    _.forEach(osub, function(item){
      var nsub = Subactivity.insert({
        name: item.name,
        duration: item.duration,
        downtime: item.downtime,
        rate: item.rate,
        people: item.people,
        consumable: item.consumable,
        itemCost: item.itemCost,
        itemNum: item.itemNum,
        activity: doc.na,
        rollup: item.rollup
      });
    });
  },
})