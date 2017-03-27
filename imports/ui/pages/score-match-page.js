import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Matches, INITIAL_STATUS } from '../../api/matches/matches.js';
import { StatusLog } from '../../api/statuslog/statuslog.js';


Template.Score_match_page.onCreated(function() {
  // this.autorun(() => {
    const id = FlowRouter.getParam('id');
    this.subscribe('one_match', id);
    this.subscribe('statuslog', id);
  // });
});


Template.Score_match_page.onRendered(function() {
  // focus on outer div to catch keyboard events
  this.$("#key-catcher").focus();
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
      this.message = "Please click the name of the player to break in the first frame (or press 1 or 2 on the keyboard)";
      return true;
    } else if (s.frames[0] >= (this.frames + 1) / 2 ||
               s.frames[1] >= (this.frames + 1) / 2) { // match finished
      let winner = (s.frames[0] > s.frames[1]) ? this.players[0] : this.players[1];
      this.message = "Match - " + winner;
      return true;
    } else if (s.player_at_the_table === null) { // re-spotted black
      this.message = "Please click the name of the player to play next (or press 1 or 2 on the keyboard)";
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

  end_break_disabled() {
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
        s.pink < 1 ||
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
        this.status_seq < 1) {
      return 'disabled';
    }
    return '';
  },

  redo_disabled() {
    let s = this.status;
    if (!s ||
        this.status_seq == this.status_max) {
      return 'disabled';
    }
    return '';
  },

  twolines(name) {
    return name ? name.replace(/ (?=[^ ]+$)/, "<br>").toUpperCase() : "";
  },

});


Template.Score_match_page.events({

  'click #player1'(event, template) {
    let s = this.status;
    if (s.player_to_break === null) { // match did not start yet
      s.player_to_break = 0;
      s.player_at_the_table = 0;
      this.status = s;
      updateStatus(this);
    } else if (s.player_at_the_table === null) { // re-spotted black
      s.player_at_the_table = 0;
      this.status = s;
      updateStatus(this);
    }
  },

  'click #player2'(event, template) {
    let s = this.status;
    if (s.player_to_break === null) { // match did not start yet
      s.player_to_break = 1;
      s.player_at_the_table = 1;
      this.status = s;
      updateStatus(this);
    } else if (s.player_at_the_table === null) { // re-spotted black
      s.player_at_the_table = 1;
      this.status = s;
      updateStatus(this);
    }
  },

  'click #break-off'(event, template) {
    let s = this.status;
    if (!s.frame_in_progress) {
      s.frame_in_progress = true;
      s.player_at_the_table ^= 1;
      this.status = s;
      updateStatus(this);
    }
  },

  'click #end-break'(event, template) {
    let s = this.status;
    if (s.frame_in_progress) {
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      s.player_at_the_table ^= 1;
      s.messages[s.player_at_the_table] = "";
      s.break_points = 0;
      if (!s.colours_only) {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      this.status = s;
      updateStatus(this);
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
      s.red = this.reds;
      // restore saved status items
      s.frames = frames;
      s.player_to_break = player_to_break;
      s.player_at_the_table = player_to_break;
      this.status = s;
      updateStatus(this);
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
      let sep = s.messages[s.player_at_the_table] == "" ? "" : "・";
      s.messages[s.player_at_the_table] += sep + "1";
      s.messages[s.player_at_the_table ^ 1] = "";
      s.red -= 1;
      s.on_colour = true;
      this.status = s;
      updateStatus(this);
    }
  },

  'click #yellow'(event, template) {
    let s = this.status;
    if (s.yellow > 0) {
      const was_nominated = s.free_ball && s.red > 0 ? true : false;
      const points_scored = was_nominated ? ballOnValue(s) : 2;
      s.score[s.player_at_the_table] += points_scored;
      s.break_points += points_scored;
      let sep = s.messages[s.player_at_the_table] == "" ? "" : "・";
      s.messages[s.player_at_the_table] += sep + points_scored.toString();
      s.messages[s.player_at_the_table ^ 1] = "";
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      if (was_nominated) {
        s.on_colour = true;
      } else {
        if (s.colours_only) {
          s.yellow -= 1;
        } else {
          if (s.red < 1) {
            s.colours_only = true;
          } else {
            s.on_colour = false;
          }
        }
      }
      this.status = s;
      updateStatus(this);
    }
  },

  'click #green'(event, template) {
    let s = this.status;
    if (s.green > 0) {
      const was_nominated = s.free_ball && s.yellow > 0 ? true : false;
      const points_scored = was_nominated ? ballOnValue(s) : 3;
      s.score[s.player_at_the_table] += points_scored;
      s.break_points += points_scored;
      let sep = s.messages[s.player_at_the_table] == "" ? "" : "・";
      s.messages[s.player_at_the_table] += sep + points_scored.toString();
      s.messages[s.player_at_the_table ^ 1] = "";
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      if (was_nominated) {
        s.on_colour = true;
      } else {
        if (s.colours_only) {
          s.green -= 1;
        } else {
          if (s.red < 1) {
            s.colours_only = true;
          } else {
            s.on_colour = false;
          }
        }
      }
      this.status = s;
      updateStatus(this);
    }
  },

  'click #brown'(event, template) {
    let s = this.status;
    if (s.brown > 0) {
      const was_nominated = s.free_ball && s.green > 0 ? true : false;
      const points_scored = was_nominated ? ballOnValue(s) : 4;
      s.score[s.player_at_the_table] += points_scored;
      let sep = s.messages[s.player_at_the_table] == "" ? "" : "・";
      s.messages[s.player_at_the_table] += sep + points_scored.toString();
      s.messages[s.player_at_the_table ^ 1] = "";
      s.break_points += points_scored;
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      if (was_nominated) {
        s.on_colour = true;
      } else {
        if (s.colours_only) {
          s.brown -= 1;
        } else {
          if (s.red < 1) {
            s.colours_only = true;
          } else {
            s.on_colour = false;
          }
        }
      }
      this.status = s;
      updateStatus(this);
    }
  },

  'click #blue'(event, template) {
    let s = this.status;
    if (s.blue > 0) {
      const was_nominated = s.free_ball && s.brown > 0 ? true : false;
      const points_scored = was_nominated ? ballOnValue(s) : 5;
      s.score[s.player_at_the_table] += points_scored;
      s.break_points += points_scored;
      let sep = s.messages[s.player_at_the_table] == "" ? "" : "・";
      s.messages[s.player_at_the_table] += sep + points_scored.toString();
      s.messages[s.player_at_the_table ^ 1] = "";
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      if (was_nominated) {
        s.on_colour = true;
      } else {
        if (s.colours_only) {
          s.blue -= 1;
        } else {
          if (s.red < 1) {
            s.colours_only = true;
          } else {
            s.on_colour = false;
          }
        }
      }
      this.status = s;
      updateStatus(this);
    }
  },

  'click #pink'(event, template) {
    let s = this.status;
    if (s.pink > 0) {
      const was_nominated = s.free_ball && s.blue > 0 ? true : false;
      const points_scored = was_nominated ? ballOnValue(s) : 6;
      s.score[s.player_at_the_table] += points_scored;
      s.break_points += points_scored;
      let sep = s.messages[s.player_at_the_table] == "" ? "" : "・";
      s.messages[s.player_at_the_table] += sep + points_scored.toString();
      s.messages[s.player_at_the_table ^ 1] = "";
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      if (was_nominated) {
        s.on_colour = true;
      } else {
        if (s.colours_only) {
          s.pink -= 1;
        } else {
          if (s.red < 1) {
            s.colours_only = true;
          } else {
            s.on_colour = false;
          }
        }
      }
      this.status = s;
      updateStatus(this);
    }
  },

  'click #black'(event, template) {
    let s = this.status;
    if (s.black > 0) {
      const was_nominated = s.free_ball && s.pink > 0 ? true : false;
      const points_scored = was_nominated ? ballOnValue(s) : 7;
      s.score[s.player_at_the_table] += points_scored;
      s.break_points += points_scored;
      let sep = s.messages[s.player_at_the_table] == "" ? "" : "・";
      s.messages[s.player_at_the_table] += sep + points_scored.toString();
      s.messages[s.player_at_the_table ^ 1] = "";
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      if (was_nominated) {
        s.on_colour = true;
      } else {
        if (s.colours_only) {
          if (s.score[0] != s.score[1]) {
            s.black -= 1;
          } else { // re-spotted black
            s.messages[s.player_at_the_table] = "";
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
      }
      this.status = s;
      updateStatus(this);
    }
  },

  'click #foul4'(event, template) {
    let s = this.status;
    if (s.frame_in_progress) {
      s.foul = true;
      s.miss = false;
      s.free_ball = false;
      s.foul_on_colour = s.on_colour;
      s.score[s.player_at_the_table ^ 1] += 4;
      let sep = s.messages[s.player_at_the_table] == "" ? "" : "・";
      s.messages[s.player_at_the_table] += sep + "F4";
      s.messages[s.player_at_the_table ^ 1] = "";
      s.player_at_the_table ^= 1;
      s.break_points = 0;
      if (!s.colours_only) {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      this.status = s;
      updateStatus(this);
    }
  },

  'click #foul5'(event, template) {
    let s = this.status;
    if (s.frame_in_progress) {
      s.foul = true;
      s.miss = false;
      s.free_ball = false;
      s.foul_on_colour = s.on_colour;
      s.score[s.player_at_the_table ^ 1] += 5;
      let sep = s.messages[s.player_at_the_table] == "" ? "" : "・";
      s.messages[s.player_at_the_table] += sep + "F5";
      s.messages[s.player_at_the_table ^ 1] = "";
      s.player_at_the_table ^= 1;
      s.break_points = 0;
      if (!s.colours_only) {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      this.status = s;
      updateStatus(this);
    }
  },

  'click #foul6'(event, template) {
    let s = this.status;
    if (s.frame_in_progress) {
      s.foul = true;
      s.miss = false;
      s.free_ball = false;
      s.foul_on_colour = s.on_colour;
      s.score[s.player_at_the_table ^ 1] += 6;
      let sep = s.messages[s.player_at_the_table] == "" ? "" : "・";
      s.messages[s.player_at_the_table] += sep + "F6";
      s.messages[s.player_at_the_table ^ 1] = "";
      s.player_at_the_table ^= 1;
      s.break_points = 0;
      if (!s.colours_only) {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      this.status = s;
      updateStatus(this);
    }
  },

  'click #foul7'(event, template) {
    let s = this.status;
    if (s.frame_in_progress) {
      s.foul = true;
      s.miss = false;
      s.free_ball = false;
      s.foul_on_colour = s.on_colour;
      s.score[s.player_at_the_table ^ 1] += 7;
      let sep = s.messages[s.player_at_the_table] == "" ? "" : "・";
      s.messages[s.player_at_the_table] += sep + "F7";
      s.messages[s.player_at_the_table ^ 1] = "";
      s.player_at_the_table ^= 1;
      s.break_points = 0;
      if (!s.colours_only) {
        if (s.red < 1) {
          s.colours_only = true;
        } else {
          s.on_colour = false;
        }
      }
      this.status = s;
      updateStatus(this);
    }
  },

  'click #miss'(event, template) {
    let s = this.status;
    if (s.foul) {
      s.miss = true;
      this.status = s;
      updateStatus(this);
    }
  },

  'click #free-ball'(event, template) {
    let s = this.status;
    if (s.foul) {
      s.free_ball = true;
      this.status = s;
      updateStatus(this);
    }
  },

  'click #play-again'(event, template) {
    // TODO if the offender was on the colour, he should stay on the colour!
    // TODO Is it realy so after play-again?
    let s = this.status;
    if (s.foul) {
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      s.player_at_the_table ^= 1;
      s.messages[s.player_at_the_table] = "";
      this.status = s;
      updateStatus(this);
    }
  },

  'click #put-back'(event, template) {
    let s = this.status;
    if (s.foul) {
      s.foul = false;
      s.miss = false;
      s.free_ball = false;
      s.on_colour = s.foul_on_colour;
      s.foul_on_colour = false;
      s.player_at_the_table ^= 1;
      this.status = s;
      updateStatus(this);
    }
  },

  'click #red-lost'(event, template) {
    let s = this.status;
    if (s.foul) {
      if (s.red > 0) s.red -= 1;
      s.messages[s.player_at_the_table ^ 1] += "・R" + s.red.toString();
      if (s.red < 1) {
        s.colours_only = true;
        s.on_colour = true;
      }
      this.status = s;
      updateStatus(this);
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
      s.red = this.reds;
      // restore saved status items
      s.frames = frames;
      s.player_to_break = player_to_break;
      if (s.frames[0] < (this.frames + 1) / 2 &&  // match is not finished yet
          s.frames[1] < (this.frames + 1) / 2) {
        s.player_at_the_table = player_to_break;
      }
      this.status = s;
      updateStatus(this);
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
      s.red = this.reds;
      // restore saved status items
      s.frames = frames;
      s.player_to_break = player_to_break;
      if (s.frames[0] < (this.frames + 1) / 2 &&  // match is not finished yet
          s.frames[1] < (this.frames + 1) / 2) {
        s.player_at_the_table = player_to_break;
      }
      this.status = s;
      updateStatus(this);
    }
  },

  'click #undo'(event, template) {
    if (this.status_seq > 0) {
      const seq = this.status_seq - 1;
      statusLog = StatusLog.findOne({match_id: this._id, status_seq: seq});
      if (!statusLog) throw new Meteor.Error('Could not find status log');
      Meteor.call('matches.update', this._id, {status_seq: seq, status: statusLog.status});
    }
  },

  'click #redo'(event, template) {
    if (this.status_seq < this.status_max) {
      const seq = this.status_seq + 1;
      statusLog = StatusLog.findOne({match_id: this._id, status_seq: seq});
      if (!statusLog) throw new Meteor.Error('Could not find status log');
      Meteor.call('matches.update', this._id, {status_seq: seq, status: statusLog.status});
    }
  },

  'keydown #key-catcher'(event, template) {
    switch (event.keyCode) {
      case 27: // Esc
        FlowRouter.go('Home_page');
        break;
      case 49: // 1
        if (this.status.player_to_break === null ||
            this.status.player_at_the_table === null) {
          template.$('#player1').click();
        } else {
          template.$('#red').click();
        }
        break;
      case 50: // 2
        if (this.status.player_to_break === null ||
            this.status.player_at_the_table === null) {
          template.$('#player2').click();
        } else {
          template.$('#yellow').click();
        }
        break;
      case 51: // 3
        template.$('#green').click();
        break;
      case 52: // 4
        if (event.ctrlKey) {
          template.$('#foul4').click();
        } else {
          template.$('#brown').click();
        }
        break;
      case 53: // 5
        if (event.ctrlKey) {
          template.$('#foul5').click();
        } else {
          template.$('#blue').click();
        }
        break;
      case 54: // 6
        if (event.ctrlKey) {
          template.$('#foul6').click();
        } else {
          template.$('#pink').click();
        }
        break;
      case 55: // 7
        if (event.ctrlKey) {
          template.$('#foul7').click();
        } else {
          template.$('#black').click();
        }
        break;
      case 79: // O
        template.$('#break-off').click();
        break;
      case 69: // E
        template.$('#end-break').click();
        break;
      case 76: // L
        template.$('#red-lost').click();
        break;
      case 82: // R
        template.$('#re-rack').click();
        break;
      case 115: // F4
        event.preventDefault();
        template.$('#foul4').click();
        break;
      case 116: // F5
        event.preventDefault();
        template.$('#foul5').click();
        break;
      case 117: // F6
        event.preventDefault();
        template.$('#foul6').click();
        break;
      case 118: // F7
        event.preventDefault();
        template.$('#foul7').click();
        break;
      case 77: // M
        template.$('#miss').click();
        break;
      case 70: // F
        template.$('#free-ball').click();
        break;
      case 66: // B
        template.$('#put-back').click();
        break;
      case 65: // A
        template.$('#play-again').click();
        break;
      case 87: // W
        template.$('#frame-won').click();
        break;
      case 67: // C
        template.$('#conceded').click();
        break;
      case 90: // Z
      case 85: // U
        template.$('#undo').click();
        break;
      case 89: // Y
      case 68: // D
        template.$('#redo').click();
        break;
    }
  }

});

// helper function to get the value of the ball on
function ballOnValue(status) {
  if (status.red > 0) return 1;
  if (status.yellow > 0) return 2;
  if (status.green > 0) return 3;
  if (status.brown > 0) return 4;
  if (status.blue > 0) return 5;
  if (status.pink > 0) return 6;
  if (status.black > 0) return 7;
};

// helper function to update status of the match and status log
function updateStatus(match) {
  const seq = match.status_seq + 1;
  Meteor.call('matches.update', match._id, {status_seq: seq, status_max: seq, status: match.status});
  Meteor.call('statuslog.upsert', match._id, seq, {status: match.status});
};
