import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Matches } from '../../api/matches/matches.js';

import {serializeJSON} from 'jquery-serializejson';
import moment from 'moment';

Template.Edit_match_page.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const id = FlowRouter.getParam('id');
    self.subscribe('one_match', id);
  });
});

Template.Edit_match_page.onRendered(function() {
  this.$("#datetime").calendar({
    firstDayOfWeek: 1,
    ampm: false,
    formatter: {
      datetime: function (date, settings) {
        return moment(date).format('YYYY-MM-DD HH:mm');
      },
    },
  });
});

Template.Edit_match_page.helpers({
  match() {
    const id = FlowRouter.getParam("id");
    return Matches.findOne(id) || {};
  },
});

Template.Edit_match_page.events({
  'click #update-button'(event, template) {
    event.preventDefault();
    const match = template.$('#update-form').serializeJSON();
    const id = FlowRouter.getParam("id");
    Meteor.call('matches.update', id, {$set: match});
    FlowRouter.go('Home_page');
  },
  'click #delete-button'(event, template) {
    event.preventDefault();
    template.$('.ui.modal')
      .modal({
        detachable: false,
        closable : true,
        onDeny : function(){
          return true;
        },
        onApprove : function() {
          const id = FlowRouter.getParam("id");
          Meteor.call('matches.remove', id);
          FlowRouter.go('Home_page');
        },
      })
      .modal('show');
  },
});
