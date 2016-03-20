Template.loggedUser.helpers({
  user: function() {
  	//We might want to move this route to a different helper if this is going to be used in other places.
  	if(Meteor.user()!=null){
  		Router.go('/dashboard');
    	return Meteor.user().username
	}
	else{
		Router.go('/');
	}
  }
});

Template.avatar.helpers({
	avatarURL: function(){
		if(Meteor.user().avatar != null){
			return Meteor.user().avatar;
		}
		if(Meteor.user().profile != null && Meteor.user().profile.avatar_url != null){
			return  Meteor.user().profile.avatar_url;
		}
		if(Meteor.user().services != null && Meteor.user().services.google != null && Meteor.user().services.google.picture !=null){
			return Meteor.user().services.google.picture;
		}
    return "";
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
	// this.render('openQuestions');
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
Router.route('/editprofile', function(){
  this.render('editProfile');
});
Template.selector.helpers({
  getTags: function () {
    return Tags.find({});
  },
});
Template.languageSelector.helpers({
  getTags: function () {
    return Tags.find({});
  },
});
