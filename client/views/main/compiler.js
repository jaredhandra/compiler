Template.loggedUser.helpers({
  user: function() {
     return Meteor.user().username || Meteor.user().profile.login
  }
});
