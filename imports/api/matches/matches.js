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
  },
});
