import { Template } from 'meteor/templating';

Template.Header.onRendered(function() {

  this.$('.dropdown').dropdown();

  this.$('#mobile-menu').on("click", function(e) {
    e.preventDefault();
    $('#vertical-menu').toggle();
  });

  this.$('#all-matches').on("click", function(e) {
    $('#vertical-menu').toggle();
  });

  this.$('#new-match').on("click", function(e) {
    $('#vertical-menu').toggle();
  });

});
