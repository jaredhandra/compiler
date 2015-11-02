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
		var user = Meteor.user();

		Questions.insert({
			title : title,
			questionText : questionText,
			createdAt : new Date(),
			user : user
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

Template.avatar.helpers({
	avatarURL: function(){
		if(Meteor.user().profile.avatar_url != null){
			return  Meteor.user().profile.avatar_url;
		}
		if(Meteor.user().services.google.picture !=null){
			return Meteor.user().services.google.picture;
		}
	}
})
