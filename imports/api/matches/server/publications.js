import { Meteor } from 'meteor/meteor';

import { Matches } from '../matches.js';

Meteor.publish('matches', function() {
  return Matches.find();
});
