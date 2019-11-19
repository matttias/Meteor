import './main.html';
import '/collections/polls.js';

//OTSIB ÜLES KÕIK KÜSITLUSED
Template.body.helpers({
	polls: function() {
		return Polls.find();
	}
});

//LISAB INDEXID
UI.registerHelper('indexedArray', function(context, options) {
	if (context) {
		return context.map(function(item, index) {
			item._index = index;
		return item;
		});
	}
});


Template.pollForm.events({
	'submit form': function(event) {

		//PEATAB KÜSITLUSE ESITAMISE
		event.preventDefault();

		//SAAB INFO UUE KÜSIMUSE KOHTA
		var newPoll = {
			question: event.target.question.value,
			choices: [
				{  text: event.target.choice1.value, votes: 0 },
				{  text: event.target.choice2.value, votes: 0 },
				{  text: event.target.choice3.value, votes: 0 }
			]
		};    
		// LOOB UUE KÜSITLUSE
		Polls.insert(newPoll);
	}
});


Template.poll.events({

	//VASTUSE VALIMINE
	'click .vote': function(event) {

		event.preventDefault();

		//KÜSITLUSE ID
		var pollID = $(event.currentTarget).parent('.poll').data('id');
		var voteID = $(event.currentTarget).data('id');

		var voteString = 'choices.' + voteID + '.votes';
		var action = {};
		action[voteString] = 1;

		//SUURENDAB HÄÄLTE ARVU
		Polls.update(
			{ _id: pollID }, 
			{ $inc: action }
		);
	}
});
