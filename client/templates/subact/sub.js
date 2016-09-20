Template.subItem.helpers({
  subRollUp: function(){
    var a = this;
    var item = a.itemNum * a.itemCost;
    var con = a.consumable;
    var mins = a.duration / 60;
    var lab = a.rate * a.people;

    var res = item + con + ( mins * lab);
    return res;
  }
})