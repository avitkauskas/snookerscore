import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Matches } from '../../api/matches/matches.js';


Template.Score_match_page.onCreated(function() {
  // this.autorun(() => {
    const id = FlowRouter.getParam('id');
    this.subscribe('one_match', id);
  // });
});


Template.Score_match_page.helpers({
  match() {
    const id = FlowRouter.getParam("id");
    return Matches.findOne(id) || {};
  },

  no_player_to_break() {
    if (this.status.player_to_break === null) {
      return true;
    } else {
      return false;
    }
  },

  playing1() {
    if (this.status.player_at_the_table === 0) {
      return 'visible';
    } else {
      return 'hidden';
    }
  },

  playing2() {
    if (this.status.player_at_the_table === 1) {
      return 'visible';
    } else {
      return 'hidden';
    }
  },

  red_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  yellow_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  green_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  brown_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  blue_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  pink_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  black_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  break_off_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  played_safe_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  missed_pot_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  re_rack_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  foul4_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  foul5_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  foul6_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  foul7_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  miss_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  free_ball_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  put_back_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  play_again_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  frame_won_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  conceded_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  undo_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  redo_disabled() {
    if (this.status.player_to_break === null) {
      return 'disabled';
    }
    return '';
  }

});


Template.Score_match_page.events({

  'click #player1'(event, template) {
    if (this.status.player_to_break === null) {
      Meteor.call('matches.update', this._id,
        {"status.player_to_break": 0, "status.player_at_the_table": 0});
    }
  },

  'click #player2'(event, template) {
    if (this.status.player_to_break === null) {
      Meteor.call('matches.update', this._id,
        {"status.player_to_break": 1, "status.player_at_the_table": 1});
    }
  },

  'click #red'(event, template) {
    if (this.status.red > 0) {
      this.status.red -= 1;
      this.status.score[this.status.player_at_the_table] += 1;
      this.status.break_points += 1;
      // this.status.on_red = false;
      Meteor.call('matches.update', this._id, this);
    }
  }

});
