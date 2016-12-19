import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Matches, INITIAL_STATUS } from '../../api/matches/matches.js';


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

  message_to_display() {
    let s = this.status;
    if (!s) return false;
    if (s.player_to_break === null) { // match did not start yet
      this.message = "Please click the name of the player to break in the first frame";
      return true;
    } else if (s.frames[0] >= (this.frames + 1) / 2 ||
               s.frames[1] >= (this.frames + 1) / 2) { // match finished
      let winner = (s.frames[0] > s.frames[1]) ? this.players[0] : this.players[1];
      this.message = "Match - " + winner;
      return true;
    } else if (s.player_at_the_table === null) { // re-spotted black
      this.message = "Please click the name of the player to play next";
      return true;
    } else {
      return false;
    }
  },

  playing1() {
    let s = this.status;
    if (s && s.player_at_the_table === 0) {
      return 'visible';
    } else {
      return 'hidden';
    }
  },

  playing2() {
    let s = this.status;
    if (s && s.player_at_the_table === 1) {
      return 'visible';
    } else {
      return 'hidden';
    }
  },

  red_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        s.red < 1) {
      return 'disabled';
    }
    return '';
  },

  yellow_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        !s.on_colour && !s.free_ball ||
        s.yellow < 1) {
      return 'disabled';
    }
    return '';
  },

  green_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        !s.on_colour && !s.free_ball ||
        s.colours_only && s.yellow > 0 && !s.free_ball ||
        s.green < 1) {
      return 'disabled';
    }
    return '';
  },

  brown_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        !s.on_colour && !s.free_ball ||
        s.colours_only && s.green > 0 && !s.free_ball ||
        s.brown < 1) {
      return 'disabled';
    }
    return '';
  },

  blue_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        !s.on_colour && !s.free_ball ||
        s.colours_only && s.brown > 0 && !s.free_ball ||
        s.blue < 1) {
      return 'disabled';
    }
    return '';
  },

  pink_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        !s.on_colour && !s.free_ball ||
        s.colours_only && s.blue > 0 && !s.free_ball ||
        s.pink < 1) {
      return 'disabled';
    }
    return '';
  },

  black_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        !s.on_colour && !s.free_ball ||
        s.colours_only && s.pink > 0 && !s.free_ball ||
        s.black < 1) {
      return 'disabled';
    }
    return '';
  },

  break_off_disabled() {
    let s = this.status;
    if (!s ||
        s.player_to_break === null ||
        s.player_at_the_table === null ||
        s.frame_in_progress ||
        s.frames[0] >= (this.frames + 1) / 2 ||
        s.frames[1] >= (this.frames + 1) / 2) {
      return 'disabled';
    }
    return '';
  },

  played_safe_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        s.black < 1) {
      return 'disabled';
    }
    return '';
  },

  missed_pot_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        s.black < 1) {
      return 'disabled';
    }
    return '';
  },

  red_lost_disabled() {
    let s = this.status;
    if (!s ||
        !s.foul ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        s.red < 1 ||
        s.black < 1) {
      return 'disabled';
    }
    return '';
  },

  re_rack_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        s.black < 1) {
      return 'disabled';
    }
    return '';
  },

  foul4_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        s.brown < 1) {
      return 'disabled';
    }
    return '';
  },

  foul5_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        s.blue < 1) {
      return 'disabled';
    }
    return '';
  },

  foul6_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        s.pink < 1) {
      return 'disabled';
    }
    return '';
  },

  foul7_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        s.black < 1) {
      return 'disabled';
    }
    return '';
  },

  miss_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        !s.foul ||
        s.miss) {
      return 'disabled';
    }
    return '';
  },

  free_ball_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        !s.foul ||
        s.free_ball) {
      return 'disabled';
    }
    return '';
  },

  put_back_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        !s.foul ||
        !s.miss) {
      return 'disabled';
    }
    return '';
  },

  play_again_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null ||
        !s.foul) {
      return 'disabled';
    }
    return '';
  },

  frame_won_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null) {
      return 'disabled';
    }
    return '';
  },

  conceded_disabled() {
    let s = this.status;
    if (!s ||
        !s.frame_in_progress ||
        s.player_at_the_table === null) {
      return 'disabled';
    }
    return '';
  },

  undo_disabled() {
    let s = this.status;
    if (!s ||
        s.player_to_break === null) {
      return 'disabled';
    }
    return '';
  },

  redo_disabled() {
    let s = this.status;
    if (!s ||
        s.player_to_break === null) {
      return 'disabled';
    }
    return '';
  }

});


Template.Score_match_page.events({

  'click #player1'(event, template) {
    let s = this.status;
    if (s.player_to_break === null) { // match did not start yet
      s.player_to_break = 0;
      s.player_at_the_table = 0;
      Meteor.call('matches.update', this._id, {status: s});
    } else if (s.player_at_the_table === null) { // re-spotted black
      s.player_at_the_table = 0;
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #player2'(event, template) {
    let s = this.status;
    if (s.player_to_break === null) { // match did not start yet
      s.player_to_break = 1;
      s.player_at_the_table = 1;
      Meteor.call('matches.update', this._id, {status: s});
    } else if (s.player_at_the_table === null) { // re-spotted black
      s.player_at_the_table = 1;
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #break-off'(event, template) {
    let s = this.status;
    if (!s.frame_in_progress) {
      s.frame_in_progress = true;
      s.player_at_the_table ^= 1;
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #played-safe'(event, template) {
    let s = this.status;
    if (s.frame_in_progress) {
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      s.player_at_the_table ^= 1;
      s.break_points = 0;
      if (!s.colours_only) {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #missed-pot'(event, template) {
    let s = this.status;
    if (s.frame_in_progress) {
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      s.player_at_the_table ^= 1;
      s.break_points = 0;
      if (!s.colours_only) {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #re-rack'(event, template) {
    let s = this.status;
    if (s.frame_in_progress) {
      // save some status items
      let frames = s.frames;
      let player_to_break = s.player_to_break;
      // reset status
      s = INITIAL_STATUS;
      // restore saved status items
      s.frames = frames;
      s.player_to_break = player_to_break;
      s.player_at_the_table = player_to_break;
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #red'(event, template) {
    let s = this.status;
    if (s.red > 0) {
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      s.score[s.player_at_the_table] += 1;
      s.break_points += 1;
      s.red -= 1;
      s.on_colour = true;
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #yellow'(event, template) {
    let s = this.status;
    if (s.yellow > 0) {
      s.foul = false;
      s.miss = false;
      // const was_nominated = s.free_ball && s.red > 0 ? true : false;
      s.free_ball = false;
      // const points_scored = was_nominated ? 1 : 2;
      // TODO higher value balls could be nominated an ANY lower value ball!
      // TODO the value of the nominated ball depends on what ball was on!
      // s.score[s.player_at_the_table] += points_scored;
      // s.break_points += points_scored;
      s.score[s.player_at_the_table] += 2;
      s.break_points += 2;
      if (s.colours_only) {
        s.yellow -= 1;
      } else {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #green'(event, template) {
    let s = this.status;
    if (s.green > 0) {
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      s.score[s.player_at_the_table] += 3;
      s.break_points += 3;
      if (s.colours_only) {
        s.green -= 1;
      } else {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #brown'(event, template) {
    let s = this.status;
    if (s.brown > 0) {
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      s.score[s.player_at_the_table] += 4;
      s.break_points += 4;
      if (s.colours_only) {
        s.brown -= 1;
      } else {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #blue'(event, template) {
    let s = this.status;
    if (s.blue > 0) {
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      s.score[s.player_at_the_table] += 5;
      s.break_points += 5;
      if (s.colours_only) {
        s.blue -= 1;
      } else {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #pink'(event, template) {
    let s = this.status;
    if (s.pink > 0) {
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      s.score[s.player_at_the_table] += 6;
      s.break_points += 6;
      if (s.colours_only) {
        s.pink -= 1;
      } else {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #black'(event, template) {
    let s = this.status;
    if (s.black > 0) {
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      s.score[s.player_at_the_table] += 7;
      s.break_points += 7;
      if (s.colours_only) {
        if (s.score[0] != s.score[1]) {
          s.black -= 1;
        } else { // re-spotted black
          s.player_at_the_table = null;
          s.break_points = 0;
        }
      } else {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #foul4'(event, template) {
    let s = this.status;
    if (s.frame_in_progress) {
      s.foul = true;
      s.miss = false;
      s.free_ball = false;
      s.score[s.player_at_the_table ^ 1] += 4;
      s.player_at_the_table ^= 1;
      s.break_points = 0;
      if (!s.colours_only) {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #foul5'(event, template) {
    let s = this.status;
    if (s.frame_in_progress) {
      s.foul = true;
      s.miss = false;
      s.free_ball = false;
      s.score[s.player_at_the_table ^ 1] += 5;
      s.player_at_the_table ^= 1;
      s.break_points = 0;
      if (!s.colours_only) {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #foul6'(event, template) {
    let s = this.status;
    if (s.frame_in_progress) {
      s.foul = true;
      s.miss = false;
      s.free_ball = false;
      s.score[s.player_at_the_table ^ 1] += 6;
      s.player_at_the_table ^= 1;
      s.break_points = 0;
      if (!s.colours_only) {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #foul7'(event, template) {
    let s = this.status;
    if (s.frame_in_progress) {
      s.foul = true;
      s.miss = false;
      s.free_ball = false;
      s.score[s.player_at_the_table ^ 1] += 7;
      s.player_at_the_table ^= 1;
      s.break_points = 0;
      if (!s.colours_only) {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #miss'(event, template) {
    let s = this.status;
    if (s.foul) {
      s.miss = true;
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #free-ball'(event, template) {
    let s = this.status;
    if (s.foul) {
      s.free_ball = true;
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #play-again, click #put-back'(event, template) {
    let s = this.status;
    if (s.foul) {
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      s.player_at_the_table ^= 1;
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #red-lost'(event, template) {
    let s = this.status;
    if (s.foul) {
      if (s.red > 0) s.red -= 1;
      if (s.red < 1) {
        s.colours_only = true;
        s.on_colour = true;
      }
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #frame-won'(event, template) {
    let s = this.status;
    if (s.frame_in_progress) {
      s.frames[s.player_at_the_table] += 1;
      s.player_to_break ^= 1;
      // save some status items
      let frames = s.frames;
      let player_to_break = s.player_to_break;
      // reset status
      s = INITIAL_STATUS;
      // restore saved status items
      s.frames = frames;
      s.player_to_break = player_to_break;
      if (s.frames[0] < (this.frames + 1) / 2 &&  // match is not finished yet
          s.frames[1] < (this.frames + 1) / 2) {
        s.player_at_the_table = player_to_break;
      }
      Meteor.call('matches.update', this._id, {status: s});
    }
  },

  'click #conceded'(event, template) {
    let s = this.status;
    if (s.frame_in_progress) {
      s.frames[s.player_at_the_table ^ 1] += 1;
      s.player_to_break ^= 1;
      // save some status items
      let frames = s.frames;
      let player_to_break = s.player_to_break;
      // reset status
      s = INITIAL_STATUS;
      // restore saved status items
      s.frames = frames;
      s.player_to_break = player_to_break;
      if (s.frames[0] < (this.frames + 1) / 2 &&  // match is not finished yet
          s.frames[1] < (this.frames + 1) / 2) {
        s.player_at_the_table = player_to_break;
      }
      Meteor.call('matches.update', this._id, {status: s});
    }
  }

});
