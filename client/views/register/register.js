Template.register.events({
   'submit #register-form' : function(e, t) {
     e.preventDefault();
     var user;
     // Collect data and validate it.
     var email = t.find('#account-email').value
      , username = t.find('#account-username').value.trim()
      , password = t.find('#account-password').value.trim();
     // Format User data into JSON
     user = {
       username: username,
       password: password,
       email: email
     }
     // Validate new users
     if (user.username.length >=5) {
       if (user.password.length >=6){
         Accounts.createUser(user, function(err){
             if (err) {
               (".error").addClass('alert alert-danger').html(err);
             } else {
               document.getElementById("register-form").reset();
               $('#signUp').modal('hide');
             }
           });
       } else {
         $(".error").addClass('alert alert-danger').html('Password must be greater than 5 characters.');
         $('#signUp').on('hidden.bs.modal', function () {
            document.getElementById("register-form").reset();
            $(".error").removeClass('alert alert-danger').empty();
          });
       }
     } else {
       $(".error").addClass('alert alert-danger').html('Username must be greater than 4 characters.');
       $('#signUp').on('hidden.bs.modal', function () {
          document.getElementById("register-form").reset();
          $(".error").removeClass('alert alert-danger').empty();
        });
     }
     return false;
   },
   'click #showSignIn' : function(){
     console.log("sdafsdf");
     $('#signUp').modal('hide');
     $('#signIn').modal('show');
   }
 });

Template.register.events({
   "click #github": function(e,t){
    Meteor.loginWithGithub({
    requestPermissions: ['user', 'public_repo']
}, function (err) {
      if (err)
        Session.set('errorMessage', err.reason || 'Unknown error');
});
     $('#signUp').modal('hide');
   }
 });

Template.register.events({
   "click #google": function(e,t){
    Meteor.loginWithGoogle({
    requestPermissions: ['profile', 'email']
}, function (err) {
      if (err)
        Session.set('errorMessage', err.reason || 'Unknown error');
});
     $('#signUp').modal('hide');
   }
 });
