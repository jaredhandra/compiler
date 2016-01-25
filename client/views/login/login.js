 Template.login.events({
    'submit #login-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var username = t.find('#login-username').value.trim()
        , password = t.find('#login-password').value.trim();
        //todo trim and add validation
        Meteor.loginWithPassword(username, password, function(err){
        if (err){
          $(".error").removeClass('alert alert-danger').empty();
          var errorString = String(err.reason);
          $(".error").addClass('alert alert-danger').append(errorString);
          $('#signIn').on('hidden.bs.modal', function () {
             document.getElementById("login-form").reset();
           });
        }
        else{
          document.getElementById("login-form").reset();
          $('#signIn').modal('hide');
        }
      });
         return false;
      },
      'click #showSignUp' : function(){
        $('#signIn').modal('hide');
        $('#signUp').modal('show');
      }
  });
  Template.user_loggedin.events({
    "click #logout": function(event, template){
      Meteor.logout(function(err){
         if(err){
           //show err message
           console.log(err);
           Router.go('/dashboard');
           console.log("went to dashboard");
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
       Router.go('/dashboard');
       console.log("went to dashboard");
   }
 });

Template.login.events({
   "click #google": function(e,t){
    Meteor.loginWithGoogle({
     requestPermissions: ['profile', 'email']
}, function (err) {
      if (err)
        Session.set('errorMessage', err.reason || 'Unknown error');
});
      $('#signIn').modal('hide');
       Router.go('/dashboard');
       console.log("went to dashboard");
   }
 });
