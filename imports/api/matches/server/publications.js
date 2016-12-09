import { Meteor } from 'meteor/meteor';

import { Matches } from '../matches.js';

Meteor.publish('matches', function() {
  return Matches.find();
});

Meteor.publish('one_match', function(id) {
  return Matches.find(id);
});
