Template.modal.helpers({
  subId: function(){
    var id = Session.get('subId');
    console.log(id);
    return id;
  }
})