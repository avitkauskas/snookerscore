import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Matches } from '../../api/matches/matches.js';

import { serializeJSON } from 'jquery-serializejson';
import moment from 'moment';

import { FORM_VALIDATION_RULES } from './form-validation-rules.js';

Template.Edit_match_page.onCreated(function() {
  // this.autorun(() => {
    const id = FlowRouter.getParam('id');
    this.subscribe('one_match', id);
  // });
});


Template.Edit_match_page.onRendered(function() {

  this.autorun(() => {
    if (this.subscriptionsReady()) {

      // check if the datetime was empty after render
      let empty = false;
      if (this.$("#datetime input").val() == '') {
        empty = true;
      }

      // setup the calendar dropdown
      this.$("#datetime").calendar({
        firstDayOfWeek: 1,
        ampm: false,
        formatter: {
          datetime: function (date, settings) {
            return moment(date).format('YYYY-MM-DD HH:mm');
          },
        },
      });

      // reset the datetime field to empty if it was empty
      // callendar set it to current time automatically if empty
      if (empty) {
        this.$("#datetime input").val('');
      }

      // set countries dropdown to current country value
      const id = FlowRouter.getParam("id");
      const match = Matches.findOne(id) || {};
      this.$("#countries").dropdown('set selected', match.country);

    }
  });

  // form validation
  this.$('#update-form').form(
    Object.assign(
        {
            onSuccess: (event, fields) => {
                event.preventDefault();
                const matchFields = this.$('#update-form').serializeJSON();
                const id = FlowRouter.getParam("id");
                Meteor.call('matches.update', id, matchFields);
                FlowRouter.go('Home_page');
            }
        },
        FORM_VALIDATION_RULES
    )
  );

  // focus on outer div to be able to catch ESC keydown
  this.$("#cancel-catcher").focus();

});


Template.Edit_match_page.helpers({
  match() {
    const id = FlowRouter.getParam("id");
    const match = Matches.findOne(id) || {};
    return match;
  }
});


Template.Edit_match_page.events({

  // 'click #update-button'(event, template) {
  //   event.preventDefault();
  //   const matchFields = template.$('#update-form').serializeJSON();
  //   const id = FlowRouter.getParam("id");
  //   Meteor.call('matches.update', id, matchFields);
  //   FlowRouter.go('Home_page');
  // },

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
          template.$('.ui.modal').modal('hide');
          template.$('.ui.modal').modal('hide dimmer');
          FlowRouter.go('Home_page');
        }
      })
      .modal('show');
  },

  'keydown #cancel-catcher'(event, template) {
    if (event.keyCode == 27
        && !template.$('.ui.popup.calendar').hasClass("visible")
        && !template.$('#countries').hasClass("visible")) {
      FlowRouter.go('Home_page');
    }
  }

});
