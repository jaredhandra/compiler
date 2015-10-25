Template.userDashboard.events({
   'click .logout': function(event){
       event.preventDefault();
       Meteor.logout();
   }
});

Template.userDashboard.helpers({
  user: function() {
     return Meteor.user().username || Meteor.user().profile.login
  }
});