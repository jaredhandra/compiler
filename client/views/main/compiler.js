Questions = new Mongo.Collection('questions');

Template.body.helpers({
			questions: function() {
			return Questions.find();
		}
		/*questions:[
		{ title: "test title", questionText: "test question text"},
		{ title: "test title", questionText: "test question text"},
		{ title: "test title", questionText: "test question text"}
		]*/
	});
Template.body.events({
	'submit .new-question': function(event) {
		var title = event.target.title.value;
		var questionText = event.target.questionText.value;

		Questions.insert({
			title : title,
			questionText : questionText,
			createdAt : new Date()
		});

		event.target.title.value ="";
		event.target.questionText.value="";

		return false;
	}
});

Template.loggedUser.helpers({
  user: function() {
     return Meteor.user().username || Meteor.user().profile.login || Meteor.user().profile.name
  }
});
