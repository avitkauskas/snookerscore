Template.div.onRendered(function() {
  $(this.firstNode).get(0).className = this.data.class;
});
