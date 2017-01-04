import { Template } from 'meteor/templating';

Template.Header.onRendered(function() {
  this.$('.dropdown').dropdown();
  this.$('#top-menu').navBeer();
  // this.autorun( () => {
  //     this.$('#top-menu').navBeer();
  // });
});
