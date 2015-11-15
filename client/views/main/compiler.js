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
		} else if(Meteor.loggingIn()) {
			this.next();
		}else {
			this.next();
		}
	}
}
Router.onBeforeAction(OnBeforeActions.loginRequired, {
	only: ['dashboard', 'newquestion']
});
Router.configure({
	layoutTemplate: 'ApplicationLayout'
});
Router.route('/', function (){
	this.render('main');
});
Router.route('/dashboard', function(){
	this.render('userDashboard');
	this.render('openQuestions');
});
Router.route('/question/:_id', function(){
	this.render('post', {
		data: function(){
			return Questions.findOne({_id: this.params._id});
		}
	});
});
Router.route('/newquestion', function(){
	this.render('newQuestion');
});