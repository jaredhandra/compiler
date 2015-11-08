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
		if(Meteor.user().avatar != null){
			return Metoer.user().avatar;
		}
		if(Meteor.user().profile.avatar_url != null){
			return  Meteor.user().profile.avatar_url;
		}
		if(Meteor.user().services.google.picture !=null){
			return Meteor.user().services.google.picture;
		}
	}
})
var OnBeforeActions;
OnBeforeActions = {
	loginRequired: function(){
		if(!Meteor.userId()){
			this.render('main');
		} else {
			this.next();
		}
	}
}
Router.onBeforeAction(OnBeforeActions.loginRequired, {
	only: ['dashboard']
});
Router.configure({
	layoutTemplate: 'ApplicationLayout'
});
Router.route('/', function (){
	this.render('main');
	name: 'home'
});
Router.route('/dashboard', function(){
	this.render('userDashboard');
	name:'userDashboard'
});

Router.route('/question/:_id', function(){
	this.render('post', {
		data: function(){
			return Questions.findOne({_id: this.params._id});
		}
	});
});