import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {serializeJSON} from 'jquery-serializejson';

Template.New_match_page.events({
  'click #create-button'(event, template) {
    event.preventDefault();
    const match = template.$('#create-form').serializeJSON();
    Meteor.call('matches.insert', match);
    FlowRouter.go('Home_page');
  }
});
