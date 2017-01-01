import { Template } from 'meteor/templating';

Template.Header.onRendered(function() {
  this.$('.dropdown').dropdown();
});
