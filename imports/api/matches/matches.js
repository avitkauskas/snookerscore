import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Matches = new Mongo.Collection('Matches');

Meteor.methods({

  'matches.insert'(match) {
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    match.owner = this.userId;
    match.status = {
      frames1: 0, frames2: 0, score1: 0, score2: 0, break_points: 0,
      player_at_the_table: 0, player_to_break: 0,
      red: 15, yellow: 1, green: 1, brown: 1, blue: 1, pink: 1, black: 1,
      miss: false, free_ball: false, on_red: true
    };
    Matches.insert(match);
  },

  'matches.remove'(matchId) {
    // Make sure the current user is the owner
    const match = Matches.findOne(matchId);
    if (!match || match.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Matches.remove(matchId);
  },

  'matches.update'(matchId, updatedMatch) {
    // Make sure the current user is the owner
    const match = Matches.findOne(matchId);
    if (!match || match.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Matches.update(matchId, updatedMatch);
  }
});
