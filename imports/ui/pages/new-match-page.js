import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { serializeJSON } from 'jquery-serializejson';
import moment from 'moment';

import { FORM_VALIDATION_RULES } from './form-validation-rules.js';

Template.New_match_page.onRendered(function() {

    $.get("https://freegeoip.app/json/", (data) => {
      this.$("#countries").dropdown('set selected', data.country_code);
    });

    // $.get("https://api.instantcm.com/api/v1/geo-ip", (data) => {
    //     this.$("#countries").dropdown('set selected', data.alpha2);
    // });

    this.$("#datetime").calendar({
        firstDayOfWeek: 1,
        ampm: false,
        formatter: {
            datetime: function (date, settings) {
                return moment(date).format('YYYY-MM-DD HH:mm');
            }
        }
    });

    // set the datetime to the next round 10 minutes
    let datetime = moment().add(10, 'minutes');
    datetime.minutes(Math.floor(datetime.minutes() / 10) * 10);
    $('#datetime').calendar('set date', datetime.format('YYYY-MM-DD HH:mm'));

  // initialize countries dropdown
  this.$("#countries").dropdown();

  // form validation
  this.$('#create-form').form(
    Object.assign(
        {
            onSuccess: (event, fields) => {
                event.preventDefault();
                const match = this.$('#create-form').serializeJSON();
                Meteor.call('matches.insert', match);
                FlowRouter.go('Home_page');
            }
        },
        FORM_VALIDATION_RULES
    )
  );

  // focus on outer div to be able to catch ESC keydown
  this.$("#cancel-catcher").focus();
});

Template.New_match_page.events({

  'keydown #cancel-catcher'(event, template) {
    if (event.keyCode == 27
        && !template.$('.ui.popup.calendar').hasClass("visible")
        && !template.$('#countries').hasClass("visible")) {
      FlowRouter.go('Home_page');
    }
  }

});
