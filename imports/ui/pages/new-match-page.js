import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { serializeJSON } from 'jquery-serializejson';
import moment from 'moment';

Template.New_match_page.onRendered(function() {

  this.$("#datetime").calendar({
    firstDayOfWeek: 1,
    ampm: false,
    formatter: {
      datetime: function (date, settings) {
        return moment(date).format('YYYY-MM-DD HH:mm');
      }
    }
  });

  // reset the datetime field to empty
  // callendar set it to current time automatically
  this.$("#datetime input").val('');

  // initialize countries dropdown
  this.$("#countries").dropdown();

  // focus on outer div to be able to catch ESC keydown
  this.$("#cancel-catcher").focus();
});

Template.New_match_page.events({

  'click #create-button'(event, template) {
    event.preventDefault();
    const match = template.$('#create-form').serializeJSON();
    Meteor.call('matches.insert', match);
    FlowRouter.go('Home_page');
  },

  'keydown #cancel-catcher'(event, template) {
    if (event.keyCode == 27
        && !template.$('.ui.popup.calendar').hasClass("visible")
        && !template.$('#countries').hasClass("visible")) {
      FlowRouter.go('Home_page');
    }
  },

});
