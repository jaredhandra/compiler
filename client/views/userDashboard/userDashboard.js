Template.userDashboard.events({
   'click .logout': function(event){
       event.preventDefault();
       Meteor.logout();
   },
   
   'click .goToQuestion': function(event){
	   event.preventDefault();
	   window.location.href = '/question/' + this._id;
	   
   }
});
Template.userDashboard.helpers({
  user: function() {
     return Meteor.user().username || Meteor.user().profile.login || Meteor.user().profile.name
  },
	questions: function() {
			return Questions.find();
		},
	avatarURL: function(){
		if(Meteor.user().profile.avatar_url != null){
			return  Meteor.user().profile.avatar_url;
		}
		if(Meteor.user().services.google.picture !=null){
			return Meteor.user().services.google.picture;
		}
	},
	tags: function() {
		return Tags.find();
	}  
});