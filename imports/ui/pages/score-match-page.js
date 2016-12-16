import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Matches } from '../../api/matches/matches.js';

Template.Score_match_page.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const id = FlowRouter.getParam('id');
    self.subscribe('one_match', id);
  });
});

Template.Score_match_page.helpers({
  match() {
    const id = FlowRouter.getParam("id");
    return Matches.findOne(id) || {};
  }
});

Template.Score_match_page.events({

// TODO: all events are not good yet

  'click #player1'(event, template) {
    if (this.status.player_to_break === 0) {
      Meteor.call('matches.update', this._id,
      {$set: {"status.player_to_break": 1, "status.player_at_the_table": 1}});
    }
  },

  'click #player2'(event, template) {
    if (this.status.player_to_break === 0) {
      Matches.update({_id: this._id},
      {$set: {"status.player_to_break": 2, "status.player_at_the_table": 2}});
    }
  },

  'click #red'(event, template) {
    this.status.red -= 1;
    switch (this.status.player_at_the_table) {
      case 1:
        this.status.score1 += 1;
        break;
      case 2:
        this.status.score2 += 1;
        break;
    }
    this.status.break_points += 1;
    this.status.on_red = false;
    Meteor.call('matches.update', this._id, this);
  }

});
