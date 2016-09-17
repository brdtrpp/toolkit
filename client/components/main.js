import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.layout.onCreated( function(){
//   Meteor.subscribe('drivers');
//   Meteor.subscribe('processes');
//   Meteor.subscribe('activities');
  $(function () {
    $('[data-toggle="popover"]').popover()
  });

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });
});