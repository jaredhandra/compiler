 Template.login.events({
    'submit #login-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var username = t.find('#login-username').value.trim()
        , password = t.find('#login-password').value.trim();
        //todo trim and add validation
        Meteor.loginWithPassword(username, password, function(err){
        if (err){
          //todo change to message on login page rather than alert
          window.alert(err.reason);
        }
        else{
          document.getElementById("login-form").reset();
          $('#signIn').modal('hide');
        }
      });
         return false;
      }
  });
  Template.user_loggedin.events({
    "click #logout": function(event, template){
      Meteor.logout(function(err){
         if(err){
           //show err message
           console.log(err);
         } else {
           //show alert that says logged out
           console.log("Logged out");
         }
      });
    }
  });

Template.login.events({
   "click #github": function(e,t){
    Meteor.loginWithGithub({
    requestPermissions: ['user', 'public_repo']
}, function (err) {
      if (err)
        Session.set('errorMessage', err.reason || 'Unknown error');
});
      $('#signIn').modal('hide');
   }
 });