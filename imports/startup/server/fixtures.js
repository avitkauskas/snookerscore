import { Meteor } from 'meteor/meteor';
import { Matches } from '../../api/matches/matches.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Matches.find().count() === 0) {
    Matches.insert({
      country: 'Lithuania',
      city: 'Vilnius',
      venue: 'Cue Club',
      event: 'Snooker Champ',
      datetime: '2016-12-12 14:00',
      frames: 3,
      player1: 'John Higgins',
      player2: 'Jude Trump',
    });
    Matches.insert({
      country: 'Latvia',
      city: 'Riga',
      venue: 'Snooker Club',
      event: 'Baltic Snooker League Round III',
      datetime: '2016-12-25 12:00',
      frames: 3,
      player1: 'Rony O\'Sullivan',
      player2: 'Mark Selby',
    });
  }
});
