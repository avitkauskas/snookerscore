import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { StatusLog } from '../statuslog/statuslog.js';

export const Matches = new Mongo.Collection('Matches');

export const INITIAL_STATUS = {
  frames: [0, 0], score: [0, 0], break_points: 0,
  player_at_the_table: null, player_to_break: null, frame_in_progress: false,
  red: 15, yellow: 1, green: 1, brown: 1, blue: 1, pink: 1, black: 1,
  foul: false, miss: false, free_ball: false,
  colours_only: false, on_colour: false, foul_on_colour: false
};

Meteor.methods({

  'matches.insert'(match) {
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    match.owner = this.userId;
    match.status = INITIAL_STATUS;
    match.status_seq = 0;
    match.status_max = 0;
    const matchId = Matches.insert(match);
    if (!matchId) {
      throw new Meteor.Error('Match insert failed');
    }
    StatusLog.insert({match_id: matchId, status_seq: 0, status: match.status});
  },

  'matches.remove'(matchId) {
    // Make sure the current user is the owner
    const match = Matches.findOne(matchId);
    if (!match || match.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Matches.remove(matchId);
    StatusLog.remove({match_id: matchId});
  },

  'matches.update'(matchId, attributes) {
    // Make sure the current user is the owner
    const match = Matches.findOne(matchId);
    if (!match || match.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Matches.update(matchId, {$set: attributes});
  }
});
