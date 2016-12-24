import { Meteor } from 'meteor/meteor';

import { StatusLog } from '../statuslog.js';

Meteor.publish('statuslog', function(matchId) {
  return StatusLog.find({match_id: matchId});
});
