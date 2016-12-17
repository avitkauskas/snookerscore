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
      frames: [0, 0], score: [0, 0], break_points: 0,
      player_at_the_table: null, player_to_break: null,
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

  'matches.update'(matchId, attributes) {
    // Make sure the current user is the owner
    const match = Matches.findOne(matchId);
    if (!match || match.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Matches.update(matchId, {$set: attributes});
  }
});
