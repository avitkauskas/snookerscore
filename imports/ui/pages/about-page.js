import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';


Template.About_page.onRendered(function() {
  // focus on outer div to be able to catch ESC keydown
  this.$("#cancel-catcher").focus();
});


Template.About_page.events({
  'keydown #cancel-catcher'(event, template) {
    if (event.keyCode == 27) {
      FlowRouter.go('Home_page');
    }
  }
});
