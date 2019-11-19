//import { Meteor } from 'meteor/meteor';
import '/collections/polls.js';

Meteor.startup(() => {
  if (Polls.find().count() === 0) {

	//NÄIDISKÜSIMUSED
    var samplePolls = [{
        question: 'Mis on sinu lemmikvärv?',
        choices: [
          { text: 'Sinine', votes: 0 },
          { text: 'Punane', votes: 0 },
          { text: 'Roheline', votes: 0 }
        ]},{
        question: 'Kas pitsa peale käib ananass?',
        choices: [
          { text: 'Jah', votes: 0 },
          { text: 'Ei', votes: 0 },
          { text: 'Oleneb pitsast', votes: 0 }
        ]}
    ];

	//LISAB NÄIDISKÜSIMUSED
    _.each(samplePolls, function(poll) {
      Polls.insert(poll);
    });
  }
});
