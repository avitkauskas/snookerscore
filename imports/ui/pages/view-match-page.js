import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Matches } from '../../api/matches/matches.js';


Template.View_match_page.onCreated(function() {
  // this.autorun(() => {
    const id = FlowRouter.getParam('id');
    this.subscribe('one_match', id);
  // });
});


Template.View_match_page.onRendered(function() {
  // focus on outer div to be able to catch ESC keydown
  this.$("#cancel-catcher").focus();
});


Template.View_match_page.helpers({
  match() {
    const id = FlowRouter.getParam("id");
    return Matches.findOne(id) || {};
  }
});


Template.View_match_page.events({
  'keydown #cancel-catcher'(event, template) {
    if (event.keyCode == 27) {
      FlowRouter.go('Home_page');
    }
  }
});
