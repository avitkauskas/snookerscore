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
  },

  twolines(name) {
    return name.replace(/ (?=[^ ]+$)/, "<br>");
  },

  break1() {
    let s = this.status;
    if (s && s.player_at_the_table === 0) {
      return s.break_points;
    } else {
      return '';
    }
  },

  break2() {
    let s = this.status;
    if (s && s.player_at_the_table === 1) {
      return s.break_points;
    } else {
      return '';
    }
  },

  match_not_finished() {
    let s = this.status;
    if (s.frames[0] >= (this.frames + 1) / 2 ||
        s.frames[1] >= (this.frames + 1) / 2)
    {
      return false;
    } else {
      return true;
    }
  }

});


Template.View_match_page.events({
  'keydown #cancel-catcher'(event, template) {
    if (event.keyCode == 27) {
      FlowRouter.go('Home_page');
    }
  }
});
