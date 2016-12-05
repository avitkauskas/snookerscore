import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Matches = new Mongo.Collection('Matches');

Meteor.methods({

  'matches.insert'(match) {
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Matches.insert(match);
  },

  'matches.remove'(matchId) {
    // TODO: must check if current user is the owner
    Matches.remove(matchId);
  },

  'matches.update'(matchId, match) {
    // TODO: must check if current user is the owner
    Matches.update(matchId, match);
  },
});
