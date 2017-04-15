import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Matches } from '../../api/matches/matches.js';
import { isAdmin } from '../../api/utils.js';

import { COUNTRIES } from './countries-codes.js';

Template.List_matches_page.onCreated(function() {
    this.subscribe('matches');
});

Template.List_matches_page.helpers({
    matches() {
        return Matches.find({}, {sort: {datetime: -1}});
    },
    isOwner(owner) {
        return owner === Meteor.userId() || isAdmin();
    },
    countryname(code) {
        return COUNTRIES[code] || code;
    },
    with_dash(text) {
        return text == '' ? '' : '- ' + text;
    },
    with_eta(text) {
        return text == '' ? '' : text + ' @';
    },
    comma_if(text) {
        return text == '' ? '' : ',';
    },
});
