import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Matches, isAdmin } from '../../api/matches/matches.js';

Template.List_matches_page.onCreated(function() {
  this.subscribe('matches');
});

Template.List_matches_page.helpers({
  matches() {
    return Matches.find({}, {sort: {datetime: -1}});
  },
  isOwner(owner) {
    return owner === Meteor.userId() || isAdmin();
  }
});
