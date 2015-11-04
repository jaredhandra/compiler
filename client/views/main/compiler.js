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
		document.getElementById("new-question").reset();
         $('#newQuestion').modal('hide');
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

Router.route('/', function (){
	this.render('main');
});

Router.route('/Dashboard', function(){
	this.render('userDashboard');
});

Router.route('/question/:_id', function(){
	this.render('post', {
		data: function(){
			return Questions.findOne({_id: this.params._id});
		}
	});
});