import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Matches } from '../matches/matches.js';

export const StatusLog = new Mongo.Collection('StatusLog');

Meteor.methods({

  'statuslog.upsert'(matchId, statusSeq, attributes) {
    // Make sure the current user is the owner
    const match = Matches.findOne(matchId);
    if (!match || match.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    StatusLog.upsert({match_id: matchId, status_seq: statusSeq}, {$set: attributes});
  }

});
