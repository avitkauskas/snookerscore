import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Home_page',
  action() {
    BlazeLayout.render('Main_layout', { main: 'List_matches_page' });
  }
});

FlowRouter.route('/matches/new', {
  name: 'New_match_page',
  action() {
    BlazeLayout.render('Main_layout', { main: 'New_match_page' });
  }
});

FlowRouter.route('/matches/edit/:id', {
  name: 'Edit_match_page',
  action() {
    BlazeLayout.render('Main_layout', { main: 'Edit_match_page' });
  }
});

FlowRouter.route('/matches/score/:id', {
  name: 'Score_match_page',
  action() {
    BlazeLayout.render('Empty_layout', { main: 'Score_match_page' });
  }
});

FlowRouter.route('/matches/view/:id', {
  name: 'View_match_page',
  action() {
    BlazeLayout.render('Empty_layout', { main: 'View_match_page' });
  }
});
